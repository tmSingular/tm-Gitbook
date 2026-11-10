# Subscribe in a composition script

Use the public read token and `context.utils.createDataStream` in the script that owns the consuming graphic. The [quick start](quick-start.md#3-subscribe) contains the complete script and publishing commands on one page.

## Client contract

| Member | Meaning |
| --- | --- |
| `context.utils.createDataStream(publicToken, callback)` | Create a subscription and return its handle |
| `callback(status, message)` | Receive connection-state notifications and data messages |
| `status === "message"` | The callback carries a published data message |
| `message.payload` | The publisher’s JSON data |
| `handle.close()` | Close the owned subscription |

The callback uses a status string and a message object. It is distinct from `compCurrent.addListener("message", ...)`, which handles composition events such as widget custom messages. Do not interchange the callback signatures or envelopes.

Other status names include `connecting`, `connect`, `open`, `close`, `disconnect`, and `error`. Handle only the events relevant to your application; the names do not establish a guaranteed transition sequence or reconnect delay. Only read `message.payload` for a data-message status.

## 1. Basic example

Use `context.utils.createDataStream(publicToken, callback)` in a root or sub-composition script. The widget must belong to that script’s composition. Create one Text/Metric Text widget named `Stream Text` and leave its text property unlinked while the script owns it.

Replace the token with the **public** read token from Data Stream Manager. The private token belongs only in the HTTP publishing endpoint. Use one of these examples at a time; installing both creates two subscriptions.

```javascript
// Example: basic-data-stream
(function() {
  return {
    init: function(compCurrent, context) {
      const publicToken = "your-data-stream-public-token";
      const wiText = compCurrent.findWidget("Stream Text")[0];
      let closed = false;

      wiText.setPayload({ text: "Waiting for data" });

      const dataStream = context.utils.createDataStream(publicToken, (status, message) => {
        if (closed || status !== "message") return;

        const data = message && message.payload;
        if (data && typeof data.text === "string") {
          wiText.setPayload({ text: data.text });
        }
      });

      compCurrent.releaseResources = function() {
        if (closed) return;
        closed = true;
        dataStream.close();
      };
    },
    close: function(compCurrent) {
      compCurrent.releaseResources();
    }
  };
})();
```

`findWidget("Stream Text")` returns an array. With the unique name required by the setup, `[0]` selects the intended widget. The callback reads published JSON from `message.payload`; invalid or missing text leaves the last display unchanged, while an empty string clears it.

### Publish a test message

The raw HTTP request is:

```http
PUT https://datastream.singular.live/datastreams/{privateToken}
Content-Type: application/json

{ "text": "Hello from a data stream" }
```

Or use this executable Bash/POSIX curl command:

```bash
curl --request PUT \
  --url "https://datastream.singular.live/datastreams/YOUR_PRIVATE_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{"text":"Hello from a data stream"}'
```

The widget should show Hello from a data stream. Send a second text value without reloading to verify live updates. The [publishing page](publish.md) includes a PowerShell/file-based command and response details.

## 2. Log every callback status

This diagnostic example handles the known callback statuses: `connecting`, `connect`, `open`, `message`, `close`, `disconnect`, and `error`, plus an unknown-status route. It timestamps its logs, counts data messages, ignores callbacks after cleanup, and keeps widget updates separate from logging.

It follows the portal’s styled logging convention: all levels use `console.log()` with `%c`; colors distinguish information, warnings, and errors. Unlike `reportOnce`, it intentionally logs each callback so you can inspect the event sequence. Full message and payload logging are for deliberate diagnostic use with appropriate sample data.

```javascript
// Example: diagnostic-data-stream
(function() {
  return {
    init: function(compCurrent, context) {
      const publicToken = "your-data-stream-public-token";
      const tag = "[DataStream]";
      const colorInfo = "#1565c0";
      const colorWarn = "#b36b00";
      const colorError = "#c62828";
      const wiText = compCurrent.findWidget("Stream Text")[0];
      let closed = false;
      let messageCount = 0;

      function log(level, ...args) {
        const color = level === "error" ? colorError :
          level === "warn" ? colorWarn : colorInfo;
        console.log("%c" + tag + " " + new Date().toISOString(), "color: " + color, ...args);
      }

      function handleMessage(message) {
        messageCount += 1;
        log("log", "message #" + messageCount + " — full message:", message);

        const data = message && message.payload;
        if (!data) {
          log("warn", "message has no payload, ignoring");
          return;
        }
        log("log", "payload:", JSON.stringify(data, null, 2));

        if (wiText && typeof data.text === "string") {
          wiText.setPayload({ text: data.text });
        }
      }

      log("log", 'init script for composition "' + compCurrent.name + '"');
      if (!wiText) log("warn", 'widget "Stream Text" not found — logging only');

      const dataStream = context.utils.createDataStream(publicToken, (status, message) => {
        if (closed) return;

        switch (status) {
          case "connecting":
            log("info", "connecting…");
            break;
          case "connect":
            log("info", "connected to data stream server");
            break;
          case "open":
            log("info", "stream open");
            break;
          case "message":
            handleMessage(message);
            break;
          case "close":
            log("info", "stream closed");
            break;
          case "disconnect":
            log("warn", "disconnected from data stream server");
            break;
          case "error":
            log("error", "data stream error:", message);
            break;
          default:
            log("warn", 'unhandled status "' + status + '":', message);
        }
      });

      compCurrent.releaseResources = function() {
        if (closed) return;
        log("log", "closing script — " + messageCount + " message(s) received");
        closed = true;
        dataStream.close();
      };
    },
    close: function(compCurrent) {
      compCurrent.releaseResources();
    }
  };
})();
```

This diagnostic intentionally includes payload checks and reporting branches that the focused basic example does not need. With no matching widget it continues logging without attempting a widget update. The message count includes every `message` callback, even one without a payload; it is not a count of every connection status.

The ISO time in each log prefix is the receiving browser’s logging time. It is distinct from a publisher timestamp or backend timestamp metadata. Both severities are ordinary log entries for browser filtering because the helper uses `console.log`, not native warning/error console methods.

## How the stream behaves

- **Latest payload is retained.** A connecting subscriber receives the latest stored payload when one exists, even if no new value has just been published. Connection-status names do not promise a particular callback order or timing.
- **Delivery includes timestamp metadata.** The full-message log lets you inspect the actual envelope in your deployed client. Establish the timestamp’s exact property, format, and units before calculating age or latency; do not confuse it with the log prefix’s local time. See [Message format and timestamps](messages.md).
- **Control Nodes are not filled automatically.** The script reads `message.payload` and explicitly updates its chosen destination. If a deliberate runtime input consumer requires it, `compCurrent.setPayload(...)` can write Control Node values; this does not synchronize the Control App operator form. Direct widget writes are appropriate for the feed-owned text shown here.
- **Close the subscription.** The example-owned `releaseResources` closure calls `dataStream.close()` from `close(compCurrent)` and suppresses late callbacks. Close prior subscriptions when replacing or unloading scripts rather than leaving redundant consumers active.

Neither example adds automatic retries, a stale-data timeout, history replay, or a guaranteed reconnect sequence. Use [Connection lifecycle](lifecycle.md) when designing those application policies. These examples use the same init-local resource structure as the rest of the portal; `releaseResources` is application code rather than a built-in stream method.

## Composition ownership

Put the subscription in the sub-composition that interprets that feed unless an explicit shared-feed coordinator owns delivery. Keep script-owned widget fields unlinked. Leave unrelated native links in place, including local operator inputs and root-owned styles.

Writing `wiStreamText.setPayload({ text: message.payload.text })` updates a widget in the running output. It does not create a Text Control Node, update a Control App form, or persist the widget’s text in the saved Composer document.

Resolve widgets through their owning composition, using unique names and the first matching array element only when that uniqueness is part of the setup. Use the [composition-script lookup reference](../../composition-scripting/api-reference/the-composition-object.md) for scope rules.

## Subscription lifetime

Create the subscription once in `init(compCurrent, context)`, not inside another message callback or on every payload change. Retain the returned handle in the init-local closure and close it from the script’s cleanup path. A local closed flag can stop callbacks received after cleanup from touching widgets.

The quick-start script exposes its own `releaseResources` function for `close(compCurrent)` to invoke. This is an example-owned method, not an extra Data Stream API. When combining resources in one script, combine their cleanup under one owned lifecycle function rather than overwriting it.

For a more detailed script-side walkthrough, see [Connect to a data stream](../../composition-scripting/how-to-guides/connect-to-a-data-stream.md). All required publishing details are included locally in [Publish data](publish.md).
