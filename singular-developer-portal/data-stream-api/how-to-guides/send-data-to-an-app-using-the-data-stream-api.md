# Send data to an app using the data stream API

In this how-to guide, you'll learn how to send data to an app using the data stream API.

### Requirements

1. You have [created a data stream](create-a-data-stream.md)
2. You have [linked the data stream to a composition](link-a-data-stream-to-a-composition.md)

This guide is language and platform agnostic. Thus, you can follow along using cURL or whatever language you use to make API requests as well as on Postman or the API platform of your choice. To try it out on Postman, visit the [Singular Postman collection](https://documenter.getpostman.com/view/2177855/2s83zcTSu6).

### How to send data to an app using the data stream API

1. Prepare a `PUT` request to send to `https://datastream.singular.live/datastreams/:datastreamPrivateToken`, which is the endpoint for the [Singular data stream API](../api-reference.md).&#x20;
2. Replace `:datastreamPrivateToken` with the actual private token. (This can be found on the [data stream manager](https://app.singular.live/datastreammanager), located on the user menu on the Singular Dashboard.)&#x20;
3. Add a request body that matches the format of, and updates, the [payload of the sub-composition](../../rest-api/how-to-guides/get-a-compositions-sub-composition-ids-and-names-and-their-payload-structures.md) that is connected to the data stream in the overlay's composition.
4. With the composition editor in Composer open, send the request and watch the data update.
