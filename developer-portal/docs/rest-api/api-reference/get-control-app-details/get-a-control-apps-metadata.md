# Get a control app's metadata

## Get control app metadata

<mark style="color:blue;">`GET`</mark> `https://app.singular.live/apiv2/controlapps/:appToken`

Returns the metadata of a control app instance.

#### Path Parameters

| Name                                       | Type   | Description                                                                                                                                                                                                                                 |
| ------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appToken<mark style="color:red;">\*</mark> | String | The shared app token for the app. This is a unique token for this app instance. [How to find the shared app token](../../../singular-basics/managing-overlays-in-the-dashboard/how-to-find-an-apps-shared-app-token-and-shared-api-url.md). |

{% tabs %}
{% tab title="200: OK JSON payload" %}
```json
{
  "id": 1630476,
  "userId": 25290,
  "accountId": 22123,
  "thumbnail": "//image.singular.live/fit-in/150x150/f12f184c9a0eb763beb40478e02a1250/images/4GcvLpm2JA5lUFrshMO7vK.png",
  "updatedAt": "2022-09-26T10:41:36.000Z",
  "createdAt": "2022-09-22T15:46:54.000Z",
  "type": "controlapp",
  "outputUrl": "https://app.singular.live/output/3AVwVLk51gGVCFWckgBcti/Output?aspect=16:9",
  "broadcastOutputUrl": "https://app.singular.live/output/3AVwVLk51gGVCFWckgBcti/Broadcast?aspect=16:9",
  "publicControlUrl": "https://app.singular.live/control/1H7sRGX6UhgQHlAgtAXTB6",
  "publicControlApiUrl": "https://app.singular.live/apiv2/controlapps/1H7sRGX6UhgQHlAgtAXTB6/control",
  "publicCommandUrl": "https://app.singular.live/apiv2/controlapps/1H7sRGX6UhgQHlAgtAXTB6/command",
  "publicModelApiUrl": "https://app.singular.live/apiv2/controlapps/1H7sRGX6UhgQHlAgtAXTB6/model",
  "appTemplateId": 518,
  "appTemplateVersion": 10,
  "name": "REST-Control Node Field Types app",
  "folder": "7623f754-e32a-48f8-8d2d-46105df16ea0",
  "compositionId": 454606
}
```
{% endtab %}
{% endtabs %}

### Response definitions

The following table describes each item in the response.

<table><thead><tr><th width="204">Response item</th><th width="377">Description</th><th width="111">Data type</th></tr></thead><tbody><tr><td>id</td><td>The app's internal ID in the database.</td><td>Integer</td></tr><tr><td>userId</td><td>The ID of the user that created the app.</td><td>Integer</td></tr><tr><td>accountId</td><td>The account that the app is stored in.</td><td>Integer</td></tr><tr><td>thumbnail</td><td>The URL of the app's thumbnail preview on the Dashboard.</td><td>URL</td></tr><tr><td>updatedAt</td><td>The most recent time the app was updated.</td><td>String</td></tr><tr><td>createdAt</td><td>When the app was created.</td><td>String</td></tr><tr><td>type</td><td>The type of overlay, which for control apps is <code>controlapp</code>.</td><td>String</td></tr><tr><td>outputUrl</td><td>The app's output URL.</td><td>URL</td></tr><tr><td>broadcastOutputUrl</td><td>The app's broadcast output URL.</td><td>URL</td></tr><tr><td>publicControlUrl</td><td>The app's public control URL.</td><td>URL</td></tr><tr><td>publicControlApiUrl</td><td>The app's public control API URL.</td><td>URL</td></tr><tr><td>publicCommandUrl</td><td>The app's public command URL.</td><td>URL</td></tr><tr><td>publicModelApiUrl</td><td>The app's broadcast API URL.</td><td>URL</td></tr><tr><td>appTemplateId</td><td>The app's template ID.</td><td>Integer</td></tr><tr><td>appTemplateVersion</td><td>The app template version.</td><td>Integer</td></tr><tr><td>compositionJson</td><td>The composition JSON URL</td><td>URL</td></tr><tr><td>name</td><td>The app's name.</td><td>String</td></tr><tr><td>folder</td><td>The ID of the folder where the app lives.</td><td>String</td></tr><tr><td>compositionId</td><td>The ID of the composition linked to this app.</td><td>Integer</td></tr></tbody></table>
