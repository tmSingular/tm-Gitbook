# Send data to an app using the data stream API

In this how-to guide, you'll learn how to send data to an app using the data stream API.

### Requirements

1. You have [created a data stream](create-a-data-stream.md)
2. You have [linked the data stream to a composition](link-a-data-stream-to-a-composition.md)

This guide is language and platform agnostic. Thus, you can follow along using cURL or whatever language you use to make API requests as well as on Postman or the API platform of your choice. To try it out on Postman, visit the [Singular Postman collection](https://documenter.getpostman.com/view/2177855/2s83zcTSu6).

### How to send data to an app using the data stream API

1. Prepare a `PUT` request to send to `https://datastream.singular.live/datastreams/:datastreamPrivateToken`, which is the endpoint for the [Singular data stream API](../api-reference.md).&#x20;
2. Replace `:datastreamPrivateToken` with the actual private token. (This can be found on the [data stream manager](https://app.singular.live/datastreammanager), located on the user menu on the Singular Dashboard.)&#x20;
3. Set `Content-Type: application/json` and add a JSON body matching the data your composition script reads. A stream does not automatically map these fields to Control Nodes. The [linking guide](link-a-data-stream-to-a-composition.md) reads `message.payload.text`, so its test request body is:

```json
{
  "text": "Hello from a data stream"
}
```

4. Save the composition scripts, keep the script editor's output preview open, and send the request. Confirm that the text widget updates. Send a second value without reloading to check live updates. If testing a Control App, update its managed extract where required and verify the actual output URL separately.
