# Connect to a data stream

Use `context.utils.createDataStream()` to subscribe to a Singular Data Stream. Always close the stream in the `close()` function to prevent memory leaks.

```javascript
(function() {

  const DATA_STREAM_TOKEN = "your-data-stream-public-token";
  let datastream;

  return {
    init: function(comp, context) {

      datastream = context.utils.createDataStream(DATA_STREAM_TOKEN, (status, payload) => {
        switch (status) {
          case "message":
            console.log("Data received:", payload);
            // process and apply payload here
            break;
          case "connect":
          case "open":
            console.log("Connected");
            break;
          case "disconnect":
          case "close":
            console.log("Disconnected");
            break;
          case "error":
            console.error("Stream error:", payload);
            break;
        }
      });

    },

    close: function(comp, context) {
      if (datastream) {
        datastream.close();
      }
    }
  };
})();
```

> Create Data Streams in the [Data Stream Manager](https://support.singular.live/hc/en-us/articles/360056901272-Data-Stream-Manager) in the Singular dashboard.

***

####
