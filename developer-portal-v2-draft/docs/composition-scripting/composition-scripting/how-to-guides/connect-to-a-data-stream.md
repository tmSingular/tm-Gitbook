# Connect to a data stream

Create a Data Stream, then add an unlinked Metric Text widget named `Stream Text` in the consuming sub-composition. Use its public read token in the consumer; keep the private write token in the publisher. This example expects the published JSON body `{ "text": "Hello" }`.

The callback receives `(status, message)`; published data is in `message.payload`, not the envelope itself. This complete script holds and closes the stream handle:

```javascript
(function() {
  return {
    init: function(compCurrent, context) {
      const PUBLIC_TOKEN = 'your-data-stream-public-token';

      let stream = null;
      let closed = false;

      const wiOutput = compCurrent.findWidget('Stream Text')[0];

      wiOutput.setPayload({ text: 'Waiting for data' });
      stream = context.utils.createDataStream(PUBLIC_TOKEN, function(status, message) {
        if (closed) return;
        if (status === 'message') {
          const data = message && message.payload;
          if (!data || typeof data.text !== 'string') {
            return;
          }
          if ((wiOutput.getPayload() || {}).text !== data.text) {
            wiOutput.setPayload({ text: data.text });
          }
        }
      });

      compCurrent.releaseResources = function() {
        closed = true;
        if (stream) stream.close();
        stream = null;
      };
    },
    close: function(compCurrent) {
      compCurrent.releaseResources();
    }
  };
})();
```

Invalid input and connection errors preserve the last good text. Resource cleanup stops the subscription and disables its late callbacks. This is not a complete application-specific stale-data or reconnect policy: define those requirements for your feed.

Publish `{"text":"First"}` and then `{"text":"Second"}` while keeping one initialized Player open. Verify the exact widget changes, invalid-message preservation, eventual cleanup, and the actual app output separately.

* [Publishing reference](../../../api-and-sdk-reference/api-and-sdk-reference/data-streams/publish.md)
* [Data ownership](../core-concepts/data-ownership.md)
* [Lifecycle](../core-concepts/lifecycle.md)

### Resource cleanup structure

This resource-owning example keeps its state and helper functions inside `init`. Its application-defined `compCurrent.releaseResources` function closes over those local values; the lifecycle `close(compCurrent)` invokes it. `releaseResources` is a custom function owned by this example, not a built-in Singular method. Reserve that name for the script’s cleanup and merge resource cleanup when combining examples.
