# Connect to a data stream

Create a Data Stream, then add an unlinked Metric Text widget named `Stream Text` in the consuming sub-composition. Use its public read token in the consumer; keep the private write token in the publisher. This example expects the published JSON body `{ "text": "Hello" }`.

The callback receives `(status, message)`; published data is in `message.payload`, not the envelope itself. This complete script holds and closes the stream handle:

```javascript
(function() {
  var stream = null;
  var output = null;
  var closed = true;
  var PUBLIC_TOKEN = 'your-data-stream-public-token';

  return {
    init: function(comp, context) {
      var matches = comp.findWidget('Stream Text');
      if (matches.length !== 1) throw new Error('Expected one Stream Text widget');
      output = matches[0];
      closed = false;
      output.setPayload({ text: 'Waiting for data' });
      stream = context.utils.createDataStream(PUBLIC_TOKEN, function(status, message) {
        if (closed) return;
        if (status === 'message') {
          var data = message && message.payload;
          if (!data || typeof data.text !== 'string') {
            console.warn('Stream message has invalid text');
            return;
          }
          if ((output.getPayload() || {}).text !== data.text) {
            output.setPayload({ text: data.text });
          }
        } else if (status === 'error') {
          console.warn('Data stream connection error');
        }
      });
    },
    close: function() {
      closed = true;
      if (stream) stream.close();
      stream = null;
      output = null;
    }
  };
})();
```

Invalid input and connection errors preserve the last good text. A closed script ignores late callbacks. This is not a complete application-specific stale-data or reconnect policy: define those requirements for your feed.

Publish `{"text":"First"}` and then `{"text":"Second"}` while keeping one initialized Player open. Verify the exact widget changes, invalid-message preservation, eventual cleanup, and the actual app output separately.

- [Publishing reference](../../api-and-sdk-reference/data-streams/publish.md)
- [Data ownership](../core-concepts/data-ownership.md)
- [Lifecycle](../core-concepts/lifecycle.md)
