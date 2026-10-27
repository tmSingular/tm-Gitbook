# Take out all of an app's output

## Take out all output

<mark style="color:green;">`POST`</mark> `https://app.singular.live/apiv2/controlapps/:appToken/command`

Animates all overlays in a control app to their `Out` state.

#### Path Parameters

| Name                                       | Type   | Description                                                                                                                                                                                                                              |
| ------------------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appToken<mark style="color:red;">\*</mark> | String | The shared app token for the app. This is a unique token for this app instance. [How to find the shared app token](../../singular-basics/managing-overlays-in-the-dashboard/how-to-find-an-apps-shared-app-token-and-shared-api-url.md). |

#### Request Body

| Name                                     | Type   | Description                                               |
| ---------------------------------------- | ------ | --------------------------------------------------------- |
| action<mark style="color:red;">\*</mark> | String | The command property. Required value: `TakeOutAllOutput`. |

{% tabs %}
{% tab title="200: OK Success" %}
```javascript
{
    "success": true
}
```
{% endtab %}
{% endtabs %}

### Request body

```json
{
    "action": "TakeOutAllOutput"
}
```
