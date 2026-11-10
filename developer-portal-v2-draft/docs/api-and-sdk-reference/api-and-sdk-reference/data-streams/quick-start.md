# Quick start

Create a stream, subscribe from one sub-composition, and publish two different text values without reloading the Player. This example requires access to the Singular Dashboard and Composer, plus an HTTP client such as curl.

## 1. Create the stream

1. In the Singular Dashboard, open the user menu and select **Data Stream Manager**.
2. Select **New** and give the stream a descriptive name.
3. Locate its **public token** and **private token**. Both must belong to this same stream.

Use the public token in the receiving script. Use the private token only in the publishing application or HTTP client. The [stream setup page](create-a-stream.md) explains these roles in detail.

## 2. Prepare the graphic

1. Add a sub-composition and a Metric Text widget named `Stream Text`.
2. Leave the text property of the `Stream Text` widget unlinked while the script owns it. Keep unrelated native links, such as shared color controls, in place.
3. Open the Composition Script editor and select that sub-composition’s script.
4. Paste the complete script below and replace `your-data-stream-public-token` with the public token.

Use a unique widget name within the owning composition. `findWidget("Stream Text")` returns an array; `[0]` selects the first matching widget.

## 3. Subscribe

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

Save the script, take the sub-composition In, and keep its output preview open. It displays Waiting for data until a value is received; an existing stream may immediately deliver its retained latest value instead.

The callback receives `(status, message)`. The published JSON body is available as `message.payload` when status is `message`. This focused example uses a string field named `text`. It ignores messages without that field, accepts an empty string for clearing, and omits diagnostic logging.

`releaseResources` is an application-defined cleanup function, not a built-in Singular API. It closes over the subscription and local state created inside `init`. The script lifecycle calls `close(compCurrent)`, which releases that subscription and prevents late messages from changing the widget. Merge this cleanup if the script already owns other resources.

## 4. Publish the first value

Replace `YOUR_PRIVATE_TOKEN` with this stream’s private token. This command uses Bash/POSIX quoting:

```bash
curl --request PUT \
  --url "https://datastream.singular.live/datastreams/YOUR_PRIVATE_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{"text":"First update"}'
```

On Windows PowerShell, use `curl.exe` with a JSON file to avoid differences in shell quoting. Create `message.json` containing:

```json
{ "text": "First update" }
```

Then run:

```powershell
curl.exe --request PUT --url "https://datastream.singular.live/datastreams/YOUR_PRIVATE_TOKEN" --header "Content-Type: application/json" --data-binary "@message.json"
```

The documented success status is `200 OK`. The widget should show First update. The publishing endpoint uses the private token in its path; no public token belongs in this URL.

## 5. Publish again without reloading

Send `{"text":"Second update"}` using the same request. For the PowerShell command, change the JSON file before sending again. The same running preview should now show Second update.

Send `{"text":""}` to demonstrate intentional clearing. To see retained data, publish a known value and then initialize a new subscriber; it should receive the stream’s latest payload.

## 6. Check the deployed output

Save the composition. If the Control App uses a managed extract, update that extract as required and test the app’s actual output URL separately. Script preview success does not establish that a different output is using the same saved script or extract.

Continue with [publishing details](publish.md), [subscription ownership](subscribe.md), or [troubleshooting](troubleshooting.md).

For an alternative that logs every callback status with timestamps and a message counter, see [the diagnostic subscription example](subscribe.md#2-log-every-callback-status).
