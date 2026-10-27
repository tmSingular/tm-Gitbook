# Update a control app's animation state

## Update control app animation state

<mark style="color:purple;">`PATCH`</mark> `https://app.singular.live/apiv2/controlapps/:appToken/control`

Animates an overlay to its In or Out state.

#### Path Parameters

| Name                                       | Type   | Description                                                                                                                                                                                                                                 |
| ------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appToken<mark style="color:red;">\*</mark> | String | The shared app token for the app. This is a unique token for this app instance. [How to find the shared app token](../../../singular-basics/managing-overlays-in-the-dashboard/how-to-find-an-apps-shared-app-token-and-shared-api-url.md). |

#### Request Body

| Name                                                 | Type   | Description                                                                                                                                                                                                                                           |
| ---------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subCompositionId<mark style="color:red;">\*</mark>   | String | The sub-composition ID. Either the `subCompositionID` or the `subCompositionName` must be included in the request. Get them from the payload of the [Get control app model](../get-control-app-details/get-a-control-apps-model.md) request.          |
| state<mark style="color:red;">\*</mark>              | String | <p>Animates an overlay to its In or Out state.</p><p>Supported values: <code>In</code>, <code>Out1</code>, <code>Out2</code></p>                                                                                                                      |
| subCompositionName<mark style="color:red;">\*</mark> | String | The name of the sub-composition. Either the `subCompositionID` or the `subCompositionName` must be included in the request. Get them from the payload of the [Get control app model](../get-control-app-details/get-a-control-apps-model.md) request. |

{% tabs %}
{% tab title="200: OK Success" %}
```json
{
    "success": true
}
```
{% endtab %}
{% endtabs %}

### Example request bodies by sub-composition name or ID

{% tabs %}
{% tab title="Subcomposition Name" %}
```json
[
    {
        "subCompositionName": "<subCompositionName>",
        "state": "<toState>"
    }
]
```
{% endtab %}

{% tab title="Subcomposition Id" %}
```json
[
    {
        "subCompositionId": "< string >",
        "state": "< toState >"
    },
    {
        "subCompositionId": "<...>",
        "state": "<...>"
    }
]
```
{% endtab %}
{% endtabs %}

### Animation state

<table><thead><tr><th width="174"> Animation state</th><th>Description</th></tr></thead><tbody><tr><td>In</td><td>Sends an overlay to its <code>In</code> state.</td></tr><tr><td>Out</td><td>Sends an overlay to its <code>Out</code> state. This is the default <code>Out</code> animation.</td></tr><tr><td>Out1</td><td>When there are multiple timelines, <code>Out1</code> animates an overlay <code>Out</code> in reverse of the <code>In</code> animation.</td></tr><tr><td>Out2</td><td>When there are multiple timelines, <code>Out2</code> defines an independent <code>Out</code> animation.</td></tr></tbody></table>
