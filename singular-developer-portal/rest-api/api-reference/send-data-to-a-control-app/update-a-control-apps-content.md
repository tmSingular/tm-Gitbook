# Update a control app's content

## Update control app

<mark style="color:purple;">`PATCH`</mark> `https://app.singular.live/apiv2/controlapps/:appToken/control`

Updates the data of a sub-composition in an overlay. Either `subCompositionID` or `subCompositionName` is required.

#### Path Parameters

| Name     | Type   | Description                                                                                                                                                                                                                   |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appToken | String | The shared app token is a unique token for a single app instance. [How to find the shared app token](../../../singular-basics/managing-overlays-in-the-dashboard/how-to-find-an-apps-shared-app-token-and-shared-api-url.md). |

#### Request Body

| Name               | Type      | Description                                                                                                                                                                                                                                           |
| ------------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subCompositionId   | String    | The sub-composition ID. Either the `subCompositionID` or the `subCompositionName` must be included in the request. Get them from the payload of the [Get control app model](../get-control-app-details/get-a-control-apps-model.md) request.          |
| payload            | Object    | A JSON object that contains control-level elements of the sub-composition.                                                                                                                                                                            |
| controlnodeID      | String    | The ID of a control node.                                                                                                                                                                                                                             |
| controlNodeContent | FieldType | New control node content.                                                                                                                                                                                                                             |
| subCompositionName | String    | The name of the sub-composition. Either the `subCompositionID` or the `subCompositionName` must be included in the request. Get them from the payload of the [Get control app model](../get-control-app-details/get-a-control-apps-model.md) request. |

{% tabs %}
{% tab title="200: OK Success" %}
```json
{
    "success": true
}
```
{% endtab %}
{% endtabs %}

### Example request bodies by sub-composition name or ID&#x20;

{% tabs %}
{% tab title="By name" %}
```json
[
  {
    "subCompositionName": "<subCompositionName>",
    "payload": {
      "<controlnodeId>": "<controlnode content>",
      "<...>": "<...>"
    }
  }, {
    ... 
  }
]
```
{% endtab %}

{% tab title="By ID" %}
```json
[
  {
    "subCompositionId": "<subcompositionId>",
    "payload": {
      "<controlnodeId>": "<controlnode content>",
      "<...>": "<...>"
    }
  }, {
    ... 
  }
]
```
{% endtab %}
{% endtabs %}

### Control node field types

<table data-full-width="true"><thead><tr><th>&#x3C;fieldType></th><th>Example</th><th>Description</th></tr></thead><tbody><tr><td>&#x3C;Text></td><td>"John Doe"</td><td>A single line of text.</td></tr><tr><td>&#x3C;Text Area></td><td>"Title/nSubtitle"</td><td>Multiple lines of text.</td></tr><tr><td>&#x3C;Number></td><td>123.45</td><td>A number.</td></tr><tr><td>&#x3C;NormalizedNumber></td><td>50.0</td><td>A value between 0 and 100.</td></tr><tr><td>&#x3C;Counter></td><td>1</td><td>A number.</td></tr><tr><td>&#x3C;Selection></td><td>"option"</td><td>The id of the selected item from the option list.</td></tr><tr><td>&#x3C;Image></td><td>"https://www.gstatic.com/webp/gallery3/1.png"</td><td>An image URL.</td></tr><tr><td>&#x3C;Color></td><td>"lightgray", "#33AAFF", "#33AAFF55", rbg(150, 150, 150)", rgba(255, 150, 150, 0.5)"</td><td>An HTML color name, a color HEX code, a color HEX code with alpha, a color rgb value, or a color rgba value.</td></tr><tr><td>&#x3C;Checkbox></td><td>true, false</td><td>A checkbox checked (true) or unchecked (false).</td></tr><tr><td>&#x3C;Audio></td><td>"https://domain.com/audio.mp3"</td><td>The URL of an audio file.</td></tr><tr><td>&#x3C;JSON Text></td><td>"{"id": 1,"firstname": "John","lastname": "Doe"}"</td><td>A stringified JSON object.</td></tr><tr><td>&#x3C;Time Control></td><td>{"command": "play"}, {"command": "pause"}, {"command": "reset"},<br>{"command": "start"}</td><td>Plays, pauses, starts, or resets the timer.</td></tr><tr><td>&#x3C;Button></td><td>"execute"</td><td>Triggers a button click event.</td></tr></tbody></table>

