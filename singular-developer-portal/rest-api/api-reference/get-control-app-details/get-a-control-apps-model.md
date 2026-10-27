# Get a control app's model

## Get control app model

<mark style="color:blue;">`GET`</mark> `https://app.singular.live/apiv2/controlapps/:appToken/model`

Returns the model of a control app instance, including the content, type, and structure of its controllable elements. Can be used to build a user interface.



#### Path Parameters

| Name                                       | Type   | Description                                                                                                                                                                                                                                 |
| ------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appToken<mark style="color:red;">\*</mark> | String | The shared app token for the app. This is a unique token for this app instance. [How to find the shared app token](../../../singular-basics/managing-overlays-in-the-dashboard/how-to-find-an-apps-shared-app-token-and-shared-api-url.md). |

{% tabs %}
{% tab title="200: OK JSON payload" %}
```json
[
  {
    "id": "-NC_s8grzroliz2xbx7e",
    "name": "default",
    "model": [],
    "logicLayer": null,
    "snapshot": null,
    "subcompositions": [
      {
        "id": "1695dbd7-430c-40eb-82f7-85287a965849",
        "name": "compTextArea",
        "state": "Out",
        "model": [
          {
            "defaultValue": "Multi-line Text \nfrom Google Sheet",
            "id": "text-area-control-node-id",
            "immediateUpdate": false,
            "index": 1,
            "resetValue": "Default Text",
            "title": "text-area-control-node-id",
            "type": "textarea"
          }
        ],
        "logicLayer": null,
        "snapshot": null,
        "subcompositions": []
      },
      {
        "id": "1e602003-5bfa-45f4-8049-8892220fdff2",
        "name": "compTimer",
        "state": "Out",
        "model": [
          {
            "defaultValue": {
              "UTC": 1615816679354,
              "isRunning": false,
              "value": 0
            },
            "id": "time-control-node-id",
            "immediateUpdate": true,
            "index": 0,
            "resetValue": {
              "UTC": 0,
              "isRunning": false,
              "value": 0
            },
            "title": "time-control-node-id",
            "type": "timecontrol"
          }
        ],
        "logicLayer": null,
        "snapshot": null,
        "subcompositions": []
      },
      {
        "id": "41aaf130-468c-4f11-9bca-c1ea68ba1c8b",
        "name": "compColor",
        "state": "Out",
        "model": [
          {
            "defaultValue": {
              "a": 1,
              "b": 156,
              "g": 188,
              "r": 26
            },
            "id": "color-control-node-id",
            "immediateUpdate": false,
            "index": 2,
            "resetValue": {
              "a": 1,
              "b": 255,
              "g": 255,
              "r": 255
            },
            "title": "color-control-node-id",
            "type": "color"
          },
          {
            "defaultValue": "crimson",
            "id": "cnColorText",
            "immediateUpdate": false,
            "index": 1,
            "resetValue": "Default Text",
            "title": "cnColorText",
            "type": "text"
          }
        ],
        "logicLayer": null,
        "snapshot": null,
        "subcompositions": []
      },
      {
        "id": "755bd36f-fff0-4250-b703-4cbd310f07fb",
        "name": "compVideoClip",
        "state": "Out",
        "model": [
          {
            "defaultValue": {
              "__singularButton": true,
              "ts": 0
            },
            "id": "cnVideoClipPause",
            "immediateUpdate": true,
            "index": 2,
            "resetValue": {
              "__singularButton": true,
              "ts": 0
            },
            "title": "cnVideoClipPause",
            "type": "button"
          },
          {
            "defaultValue": {
              "__singularButton": true,
              "ts": 0
            },
            "id": "cnVideoClipPlay",
            "immediateUpdate": true,
            "index": 1,
            "resetValue": {
              "__singularButton": true,
              "ts": 0
            },
            "title": "cnVideoClipPlay",
            "type": "button"
          },
          {
            "defaultValue": {
              "__singularButton": true,
              "ts": 0
            },
            "id": "cnVideoClipStart",
            "immediateUpdate": true,
            "index": 0,
            "resetValue": {
              "__singularButton": true,
              "ts": 0
            },
            "title": "cnVideoClipStart",
            "type": "button"
          }
        ],
        "logicLayer": null,
        "snapshot": null,
        "subcompositions": []
      },
      {
        "id": "7ccc118d-5333-474d-9a33-b5fb951cd765",
        "name": "compJsonTable",
        "state": "Out",
        "model": [
          {
            "defaultValue": "{\"content\": [\r\n    {\"pos\": \"1\", \"name\": \"NYG\", \"image\": \"https://image.singular.live/f12f184c9a0eb763beb40478e02a1250/images/4BhR3iwVI7oTpuMPQFSNBE.png\"},\r\n    {\"pos\": \"2\", \"name\": \"SF\", \"image\": \"https://image.singular.live/f12f184c9a0eb763beb40478e02a1250/images/1PpN2FpuAutk3zeYILkDum.png\"},\r\n    {\"pos\": \"3\", \"name\": \"DEN\", \"image\": \"https://image.singular.live/f12f184c9a0eb763beb40478e02a1250/images/7Mg4XYFRQWiwT5IKIoH1E7.png\"},\r\n    {\"pos\": \"4\", \"name\": \"PIT\", \"image\": \"https://image.singular.live/f12f184c9a0eb763beb40478e02a1250/images/5K84dUL3ACt2l4pCCfwRP4.png\"}\r\n  ]\r\n}",
            "height": "100px",
            "id": "json-control-node-id",
            "immediateUpdate": false,
            "index": 0,
            "resetValue": "{}",
            "title": "json-control-node-id",
            "type": "json"
          }
        ],
        "logicLayer": null,
        "snapshot": null,
        "subcompositions": []
      },
      {
        "id": "816df4ac-3231-49a2-b744-ccd48aa33a40",
        "name": "compText",
        "state": "Out",
        "model": [
          {
            "defaultValue": "Text from Google Sheet",
            "id": "text-control-node-id",
            "immediateUpdate": false,
            "index": 0,
            "resetValue": "Default Text",
            "title": "text-control-node-id",
            "type": "text"
          }
        ],
        "logicLayer": null,
        "snapshot": null,
        "subcompositions": []
      },
      {
        "id": "9d0ebd84-bdae-6adc-2050-d54c36448d70",
        "name": "background",
        "state": "Out",
        "model": [],
        "logicLayer": {
          "name": "Background",
          "tag": "#5e35b1"
        },
        "snapshot": null,
        "subcompositions": []
      },
      {
        "id": "ab6e39f9-5550-47c2-81be-fa07611a6666",
        "name": "compCheckbox",
        "state": "Out",
        "model": [
          {
            "defaultValue": true,
            "id": "checkbox-control-node-id",
            "immediateUpdate": false,
            "index": 0,
            "resetValue": true,
            "title": "checkbox-control-node-id",
            "type": "checkbox"
          }
        ],
        "logicLayer": null,
        "snapshot": null,
        "subcompositions": []
      },
      {
        "id": "ca6f12cf-d990-464b-948b-5d7ad9dd3d33",
        "name": "compNumber",
        "state": "Out",
        "model": [
          {
            "defaultValue": "1234.56",
            "id": "number-control-node-id",
            "immediateUpdate": false,
            "index": 0,
            "resetValue": 0,
            "step": "0.01",
            "title": "number-control-node-id",
            "type": "number"
          },
          {
            "defaultValue": "$1,234.56",
            "id": "cnNumberDisplayed",
            "immediateUpdate": false,
            "index": 1,
            "resetValue": "Default Text",
            "title": "cnNumberDisplayed",
            "type": "text"
          }
        ],
        "logicLayer": null,
        "snapshot": null,
        "subcompositions": []
      }
    ]
  }
]
```
{% endtab %}
{% endtabs %}

### Response definitions

The following table describes the top level key-value pairs for a sub-composition in the **Get control app model** request.

<table><thead><tr><th width="178">Response item</th><th width="441">Description</th><th>Data type</th></tr></thead><tbody><tr><td>id</td><td>Composition ID or sub-composition ID, depending where it is in the hierarchy.</td><td>String</td></tr><tr><td>name</td><td>Composition name or sub-composition name, depending where it is in the hierarchy.</td><td>String</td></tr><tr><td>state</td><td>The in/out state of a sub-composition. Supported values: <code>In</code>, <code>Out</code>, <code>Out1</code>, <code>Out2</code>. <code>In</code> and <code>Out</code> are default. When there are multiple timelines, <code>Out1</code>  plays in reverse of the In animation. <code>Out2</code> defines a separate <code>Out</code> animation.</td><td>String</td></tr><tr><td>model</td><td>The sub-composition's model. It contains a <code>defaultValue</code>, <code>id</code>, <code>immediateUpdate</code>, <code>index</code>, <code>resetValue</code>, <code>title</code>, and <code>type</code>. See the <a href="get-a-control-apps-model.md#model-contents">model content table</a> below for descriptions.</td><td>Array</td></tr><tr><td>logicLayer</td><td>The sub-compositions assigned logic layer, if any; default is null. See the <a href="get-a-control-apps-model.md#logic-layer-contents">logicLayer content table</a> below for a description of its content.</td><td>Object</td></tr><tr><td>snapshot</td><td>The URL of the snapshot shown when hovering over a sub-composition in the composition tree in Composer. Generate and invoke them from camera icon in Composer's preview toolbar.</td><td>URL</td></tr><tr><td>subcompositions</td><td>An array of sub-compositions (if any) nested within a composition or sub-composition.</td><td>Array</td></tr></tbody></table>

### Model content

The key-value pairs within the `model` array.

|                 |                                                                                                                                     |                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| defaultValue    | The sub-composition's default value. Defined in the overlay's composition.                                                          | String, Integer, Object |
| id              | The Model ID.                                                                                                                       | String                  |
| immediateUpdate | A flag used by control applications to immediately send data.                                                                       | Boolean                 |
| index           | Defines the control node field's position in the hierarchy of control nodes fields. 0 is the top position.                          | Number                  |
| resetValue      | The sub-composition's reset value. Defined in the overlay's composition.                                                            | String, Integer, Object |
| title           | The title of the control node field in Composer.                                                                                    | String                  |
| type            | Field type. Supported values: `text`, `textarea`, `number`, `image`, `color`, `checkbox`, `audio`, `json`, `timecontrol`, `button`. | String                  |

Field types

| Type        | Description                          | Data type      |
| ----------- | ------------------------------------ | -------------- |
| text        | The field type for a single of text. | String         |
| textarea    | The field type for multi-line text.  | String         |
| number      | The field type for a number.         | Integer        |
| image       | The field type for an image.         | URL            |
| color       | The field type for a color.          | Object, String |
| checkbox    | The field type for a checkbox.       | Boolean        |
| audio       | The field type for an audio file.    | URL            |
| json        | The field type for JSON data.        | Object         |
| timecontrol | The field type for a timer.          | Object         |
| button      | The field type for a button.         | Object         |

### `logicLayer` content

The content within the logicLayer object.

| Response item | Description                                                                                             | Data type |
| ------------- | ------------------------------------------------------------------------------------------------------- | --------- |
| name          | The logic layer's name.                                                                                 | String    |
| delay         | The logic later's delay type as defined in the composition. Supported values: `none`, `auto`, `custom`. | String    |
| tag           | The hex color value assigned to the logic layer. Example: `#e53935`                                     | String    |
