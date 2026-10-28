# Link a data stream to a composition

Subscribe to a data stream from a sub-composition script and display its text in a widget. This example writes feed data directly to a widget; a Control Node is not required.

### Prepare the composition

1. [Create a data stream](create-a-data-stream.md) and copy its **public** token.
2. Open your composition in Composer. Add or select a sub-composition, then add a Text widget inside it and name the widget **Stream Text**.
3. Unlink the widget's text property from any Control Node. The script will own that property. Keep native links for unrelated operator-controlled properties.
4. Open the [composition script editor](../../composition-scripting/composition-script-editor-reference.md#accessing-the-composition-script-editor), select the script for the sub-composition containing **Stream Text**, and paste the complete script below. Replace `your-data-stream-public-token` with your public token.

{% hint style="warning" %}
Use only the public read token in composition scripts. Keep the private write token in your publishing application; anyone with it can write to the stream. See [Authorization](../authorization.md).
{% endhint %}

### Subscribe and update the widget

The callback's second argument is the stream message. For a `message` status, read your published data from `message.payload`. This example expects a payload with a string field named `text`.

{% code title="Sub-composition script" %}
```javascript
(function() {
  const DATA_STREAM_PUBLIC_TOKEN = "your-data-stream-public-token";
  let datastream = null;
  let textWidget = null;
  let closed = true;

  return {
    init: function(comp, context) {
      textWidget = comp.findWidget("Stream Text")[0];
      if (!textWidget) {
        throw new Error('Text widget "Stream Text" was not found');
      }

      closed = false;
      textWidget.setPayload({ text: "Waiting for data" });

      datastream = context.utils.createDataStream(
        DATA_STREAM_PUBLIC_TOKEN,
        function(status, message) {
          if (closed) return;

          if (status === "message") {
            const data = message && message.payload;
            if (!data || typeof data.text !== "string") {
              console.warn('Expected a stream payload with a string "text" field');
              return;
            }
            textWidget.setPayload({ text: data.text });
          } else if (status === "error") {
            console.error("Data stream connection error");
          }
        }
      );
    },

    close: function() {
      closed = true;
      if (datastream) {
        datastream.close();
        datastream = null;
      }
      textWidget = null;
    }
  };
})();
```
{% endcode %}

The script closes its subscription when unloaded and ignores callbacks received after `close()`. Invalid messages leave the last displayed text unchanged. It does not write feed values back to the Control App's operator fields.

### Send a test message

1. Save the scripts and view the sub-composition in the script editor's output preview. Take it In if needed.
2. Follow [Send data to an app using the data stream API](send-data-to-an-app-using-the-data-stream-api.md) to send a `PUT` request using the **private** token. Use this JSON request body:

```json
{
  "text": "Hello from a data stream"
}
```

3. Confirm that **Stream Text** displays `Hello from a data stream`.
4. Send a second request with different text while keeping the same preview open. Confirm that it updates without reloading.
5. Save the composition. If your Control App uses a managed extract, update that extract, then test the app's actual output URL separately.

If nothing changes, check the widget's exact name, the selected script's sub-composition, the text property's links, the public/private token roles, and the `text` field in the published payload. Use the preview's browser console to inspect the script's diagnostic messages.
