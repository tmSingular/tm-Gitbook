# Context & utilities

Global scripts receive `init(context)`. Root/sub-composition scripts receive `init(compCurrent, context)`. Overlay scripts have different arguments; see [Script types](../core-concepts/script-types.md).

| Member | Contract |
|---|---|
| `context.global` | Shared runtime storage and library functions for composition scripts |
| `context.utils.createDataStream(publicToken, callback)` | Subscribe; callback receives `(status, message)`; close the returned handle |
| `context.utils.createMoment(timestamp)` | Moment object; timestamps in the example are milliseconds |
| `context.utils.createTinyColor(value)` | TinyColor object; validate colors before converting or comparing |
| `context.utils.getSingularWindow()` | Runtime context name, such as `app_output`, `app_control`, `script_editor` |
| `context.utils.getDisplayVariant()` | Copy of current variant definition, or `undefined` |
| `context.utils.getAdaptationGlobals()` | Copy of live adaptation globals, falling back to setup globals |

Variant definitions can contain `name`, nominal `resolution`, and optional `description` / `globals`. Resolution is configuration, not a measured canvas size. Different names can share a resolution. Neither getter subscribes to updates or supplies a variant-change event; mutating the returned copy does not update the composition.

## Shared helpers: define once and use in several compositions

**Setup:** merge this definition into the existing **Global Script**. It receives `context`, not a composition object. The namespace below is application-defined; it is not a built-in utility. The consumer below requires version 1 to be initialized; the version field documents that application contract.

```javascript
// Example: global-formatters
(function() {
  return {
    init: function(context) {
      context.global.portalFormattersV1 = {
        version: 1,
        fullName: function(first, last) {
          const left = first == null ? "" : String(first).trim();
          const right = last == null ? "" : String(last).trim();
          return (left + " " + right).trim();
        }
      };
    },
    close: function() {}
  };
})();
```

Now add one unlinked Text/Metric Text widget named `Full Name` to each consuming sub-composition, with standalone Text controls `Firstname` and `Lastname`. Use this **fragment inside each consumer’s `init(compCurrent, context)`**:

```javascript
// Example: use-global-formatters (init fragment)
const helpers = context.global.portalFormattersV1;

const wiMatches = compCurrent.findWidget("Full Name");

const wiFullName = wiMatches[0];
const values = compCurrent.getPayload2() || {};
wiFullName.setPayload({ text: helpers.fullName(values.Firstname, values.Lastname) });
```

**Expected result:** each consumer displays its own input values using the same helper, including correct spacing when a name is empty. The Global Script initializes before composition scripts; the consumer assumes its version 1 helper is installed. This fragment applies once; for live inputs, call the helper from the [reactive input pattern](event-listeners.md#example-initialize-and-react-to-local-inputs) as well.

The namespace is owned by the application’s Global Script. Keep deterministic functions there, rather than per-widget references or one composition’s mutable presentation state. Shared storage is runtime-local, not durable storage or synchronization between independent Players. Extend the existing namespace deliberately instead of overwriting other owners’ helpers.

## Dates: format a timestamp and handle invalid input

**Setup:** add a Number control with public ID `Start Timestamp`, containing Unix **milliseconds**, and an unlinked Text/Metric Text widget named `Start Time`. This is a **fragment inside `init(compCurrent, context)`**:

```javascript
// Example: format-start-time (init fragment)
const wiMatches = compCurrent.findWidget("Start Time");

const wiStartTime = wiMatches[0];
const timestampMs = (compCurrent.getPayload2() || {})["Start Timestamp"];
let formatted = "Invalid start time";
if (typeof timestampMs === "number" && Number.isFinite(timestampMs)) {
  const instant = context.utils.createMoment(timestampMs);
  if (instant.isValid()) formatted = instant.utc().format("YYYY-MM-DD HH:mm:ss [UTC]");
}
wiStartTime.setPayload({ text: formatted });
```

**Try it:** set the input to `1893456000000`; expect `2030-01-01 00:00:00 UTC`. Invalid or missing input produces the fallback text. Numeric strings are intentionally rejected here; normalize them explicitly if your integration permits them.

Unix seconds require an explicit conversion to milliseconds before this call. UTC is chosen deliberately rather than depending on the browser timezone. `MM` means month, `mm` minutes, and `ss` seconds. Locale-sensitive formatting needs an explicit supported locale and deployed locale data. This example does not load IANA timezone rules or create a ticking clock. Reapply from your input handler when the timestamp changes.

## Colors: validate, convert, and compare alpha

**Setup:** a Color input with public ID `Brand Color` and an unlinked Rectangle named `Background`. This **fragment inside `init(compCurrent, context)`** preserves the previous fill if input is invalid:

```javascript
// Example: apply-brand-color (init fragment)
const wiMatches = compCurrent.findWidget("Background");

const wiBackground = wiMatches[0];
const input = (compCurrent.getPayload2() || {})["Brand Color"];
const parsed = context.utils.createTinyColor(input);
if (input != null && parsed.isValid()) {
  const rgba = parsed.toRgb();
  const previous = (wiBackground.getPayload() || {}).fillGradient;
  const previousColor = context.utils.createTinyColor(previous);
  const old = previousColor.isValid() ? previousColor.toRgb() : null;
  const sameColor = old && old.r === rgba.r && old.g === rgba.g &&
    old.b === rgba.b && old.a === rgba.a;
  if (!sameColor) wiBackground.setPayload({ fillGradient: rgba });
}
```

**Try it:** use `{r: 18, g: 52, b: 86, a: 0.5}`, then the same RGB with alpha `1`. The second input must update the fill even though RGB is unchanged. Equivalent color strings can compare equal after parsing. Invalid input preserves the last fill; this fragment does not create a fallback color.

This comparison treats a previously unparseable value, including a structured gradient wrapper, as different and replaces it with the intended solid color. If the input should preserve or edit gradient stops instead, use the complete gradient contract rather than TinyColor alone. Native Color inputs use supported native color values, not renderer gradient wrappers. Alpha is 0–1; tile opacity is 0–100. Comparing parsed colors is different from preserving exact stored representation.

## Data Streams: separate content from connection status

**Setup:** add unlinked Text/Metric Text widgets `Stream Text` and `Connection Status`. Replace the public-token placeholder with the stream’s read token. Publish bodies such as `{"text":"First"}`. This complete composition script owns the subscription and both text fields:

```javascript
// Example: stream-with-status
(function() {
  let stream = null;
  let wiText = null;
  let wiStatus = null;
  let active = false;
  const publicToken = "your-data-stream-public-token";

  return {
    init: function(compCurrent, context) {
      const wiTexts = compCurrent.findWidget("Stream Text");
      const wiStatuses = compCurrent.findWidget("Connection Status");
      wiText = wiTexts[0];
      wiStatus = wiStatuses[0];
      active = true;
      wiText.setPayload({ text: "Waiting for data" });
      wiStatus.setPayload({ text: "Connecting" });
      stream = context.utils.createDataStream(publicToken, function(status, message) {
        if (!active) return;
        if (status === "message") {
          const data = message && message.payload;
          if (!data || typeof data.text !== "string") {
            wiStatus.setPayload({ text: "Invalid message; keeping previous content" });
            return;
          }
          if ((wiText.getPayload() || {}).text !== data.text) {
            wiText.setPayload({ text: data.text });
          }
          wiStatus.setPayload({ text: "Data received" });
        } else if (status === "error") {
          wiStatus.setPayload({ text: "Connection error; keeping previous content" });
        } else if (status === "connecting" || status === "connect" || status === "open" ||
                   status === "close" || status === "disconnect") {
          wiStatus.setPayload({ text: "Connection: " + status });
        }
      });
    },
    close: function() {
      active = false;
      if (stream) stream.close();
      stream = null;
      wiText = null;
      wiStatus = null;
    }
  };
})();
```

**Try it:** publish First, then Second in one running Player. Send an invalid body, then an empty text string. Invalid messages and connection errors preserve content; valid empty text clears it. Closing releases the handle, and late callbacks do nothing.

Connection status and content freshness are different: an open connection does not prove new data has arrived. This example does not implement a retry schedule, stale-data timeout, or replay guarantee. Define those policies for your application rather than opening another subscription on every error. The public read token belongs in the consumer; never place the private publishing token in it. See the [Data Stream guide](../how-to-guides/connect-to-a-data-stream.md).

## Runtime context: enable diagnostics deliberately

**Fragment inside `init(compCurrent, context)`**. No widget setup is required:

```javascript
// Example: runtime-diagnostics (init fragment)
const runtimeName = context.utils.getSingularWindow();
const diagnosticContexts = ["script_editor"];
if (diagnosticContexts.indexOf(runtimeName) !== -1) {
  console.log("Composition diagnostics:", compCurrent.name, runtimeName);
}
```

**Expected result:** this diagnostic is emitted only in a context whose reported name is `script_editor`. Other names, including unknown future values, remain outside this example’s allowlist. Inspect the actual reported value in your deployment before designing context-specific behavior. Runtime context is not an authentication or permission check, and it is not a display-variant name. Keep required graphic behavior independent of diagnostic logging.

## Display variants: handle missing configuration

**Setup:** add an unlinked Text/Metric Text widget named `Variant Info`. This is a **fragment inside `init(compCurrent, context)`**:

```javascript
// Example: display-variant (init fragment)
const wiMatches = compCurrent.findWidget("Variant Info");

const wiVariantInfo = wiMatches[0];
const variant = context.utils.getDisplayVariant();
const label = variant && typeof variant.name === "string" ? variant.name : "No variant";
const resolutionText = variant && variant.resolution != null ?
  JSON.stringify(variant.resolution) : "not configured";
wiVariantInfo.setPayload({ text: label + " | nominal resolution: " + resolutionText });
```

**Expected result:** the readout identifies the current definition, or displays a useful no-variant fallback. Resolution is deliberately serialized without assuming an undocumented array/object shape. It is nominal configuration, not a measured canvas or widget size. Distinct variant names can have identical resolution.

The getter returns a copy and does not subscribe. Call it again from an application-owned refresh path when current variant information is needed, for example when the host reinitializes the composition or invokes a documented refresh hook. Do not invent a `variant_changed` event, assume `payload_changed` always accompanies a variant switch, or poll every frame merely to reread configuration.

## Adaptation globals: apply an application-defined theme value

**Setup:** your adaptation configuration deliberately defines a global named `accentColor`, and the composition contains an unlinked Rectangle named `Accent`. `accentColor` is this example’s application contract, not a built-in adaptation-global name. Use this **fragment inside `init(compCurrent, context)`**:

```javascript
// Example: adaptation-accent (init fragment)
const wiMatches = compCurrent.findWidget("Accent");

const wiAccent = wiMatches[0];
const globals = context.utils.getAdaptationGlobals() || {};
const candidate = globals.accentColor;
const parsed = context.utils.createTinyColor(candidate);
const rgba = candidate != null && parsed.isValid() ? parsed.toRgb() :
  { r: 18, g: 52, b: 86, a: 1 };
wiAccent.setPayload({ fillGradient: rgba });
```

**Try it:** configure a valid accent color, then remove it or provide an invalid value. The graphic uses the configured color or the explicit fallback. This getter reads live adaptation globals when available and otherwise falls back to setup globals; the example does not assume which source supplied the result.

Changing the returned object does not change the composition or adaptation configuration. Reread through an explicitly supported application refresh path when values must be reapplied; this getter supplies no subscription or guaranteed change event. Globals are application values, not a guaranteed canvas-size API.

## Verification

These examples use the reviewed utility contracts. Static and mocked checks do not establish behavior in every deployed runtime. Verify actual date/color library behavior, initial and later application inputs, stream delivery and closure, and configured variant/adaptation values in the target Player. The one-time utility fragments need an explicit refresh path if their inputs change after initialization.
