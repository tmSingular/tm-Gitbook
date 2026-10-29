# Get a control app's metadata

An app's metadata includes its Dashboard information and URLs.

To get a control app's metadata:

1. [Get the control app's app token](get-a-control-apps-api-token.md).
2. Send a `GET` request to the endpoint for [Get a control app's metadata](../api-reference/get-control-app-details/get-a-control-apps-metadata.md), `https://app.singular.live/apiv2/controlapps/:appToken` replacing `:appToken` with the app token for your app instance.

The response should look like this:

<details>

<summary>The control app's metadata:</summary>

```json
{
    "id": 1689254,
    "userId": 25290,
    "accountId": 22123,
    "thumbnail": "//image.singular.live/fit-in/150x150/7072b13f9e20b98034f48d6202400ff9/images/2uxfaGbSr90q1Xk35HSFX2.jpg",
    "updatedAt": "2022-10-07T08:12:20.000Z",
    "createdAt": "2022-10-07T04:27:59.000Z",
    "type": "controlapp",
    "outputUrl": "https://app.singular.live/output/2xD4oI77sW2KIbNugYoZYD/Output?aspect=16:9",
    "broadcastOutputUrl": "https://app.singular.live/output/2xD4oI77sW2KIbNugYoZYD/Broadcast?aspect=16:9",
    "publicControlUrl": "https://app.singular.live/control/6tM4SnlHlWp9Ll1iBNozQd",
    "publicControlApiUrl": "https://app.singular.live/apiv2/controlapps/6tM4SnlHlWp9Ll1iBNozQd/control",
    "publicCommandApiUrl": "https://app.singular.live/apiv2/controlapps/6tM4SnlHlWp9Ll1iBNozQd/command",
    "publicModelApiUrl": "https://app.singular.live/apiv2/controlapps/6tM4SnlHlWp9Ll1iBNozQd/model",
    "appTemplateId": 518,
    "appTemplateVersion": 10,
    "name": "UNO Lowers | Momentum",
    "folder": "5389373f-f476-4cdc-99c8-0593c046c5a3",
    "compositionId": 441440
}
```

</details>
