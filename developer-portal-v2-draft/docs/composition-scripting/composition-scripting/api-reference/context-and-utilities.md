# Context & utilities

Global scripts receive `init(context)`. Root/sub-composition scripts receive `init(comp, context)`. Overlay scripts have different arguments; see [Script types](../core-concepts/script-types.md).

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

## Shared helpers

Put deterministic helpers used by several scripts in a versioned namespace such as `context.global.composerHelpers`. Merge into an existing Global Script rather than replacing unrelated code. Keep one-off presentation local. The [communication guide](../how-to-guides/communicate-between-sub-compositions.md) shows a small shared helper.

## Dates and colors

Fragments inside `init(comp, context)`:

```javascript
const instant = context.utils.createMoment(1694178435003);
const formatted = instant.utc().format("HH:mm:ss");
const parsed = context.utils.createTinyColor({ r: 255, g: 150, b: 0, a: 0.5 });
if (!parsed.isValid()) throw new Error("Invalid color");
const css = parsed.toRgbString();
```

Choose date/time locale and zone deliberately. Use `mm` for minutes and `ss` for seconds. Color alpha is 0–1; layout opacity is 0–100. A native Color control accepts a valid native color, such as RGBA; a solid-gradient wrapper belongs to widget gradient fields, not the Color input itself.

For runtime color comparison, compare parsed RGBA channels including alpha. For model preservation, compare exact stored values separately.

## Data Streams

On `status === "message"`, published data is in `message.payload`. Other statuses include connecting/connect/open/close/disconnect/error. Handle each before reading data. Keep the public token in the consumer, the private token in the publisher, and release the stream in `close()`.

Use the complete [Data Stream guide](../how-to-guides/connect-to-a-data-stream.md) for guarded writes, invalid messages, cleanup, and verification.
