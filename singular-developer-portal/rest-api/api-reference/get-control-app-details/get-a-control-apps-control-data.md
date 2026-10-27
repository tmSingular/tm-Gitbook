# Get a control app's control data

## Get control app control

<mark style="color:blue;">`GET`</mark> `https://app.singular.live/apiv2/controlapps/:appToken/control`

Returns a control app instance's control properties, or a list of its sub-compositions, including all of its control nodes fields. Use this call to get the IDs you need to control various elements in a control app.

#### Path Parameters

| Name                                       | Type   | Description                                                                                                                                                                                                                                 |
| ------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appToken<mark style="color:red;">\*</mark> | String | The shared app token for the app. This is a unique token for this app instance. [How to find the shared app token](../../../singular-basics/managing-overlays-in-the-dashboard/how-to-find-an-apps-shared-app-token-and-shared-api-url.md). |

{% tabs %}
{% tab title="200: OK JSON payload" %}
```json
[
  {
    "subCompositionId": "-NC_s8grzroliz2xbx7e",
    "mainComposition": true,
    "state": "Out1",
    "payload": {}
  },
  {
    "subCompositionId": "1695dbd7-430c-40eb-82f7-85287a965849",
    "mainComposition": false,
    "state": "Out1",
    "payload": {
      "text-area-control-node-id": "Multi-line Text \nfrom Google Sheet"
    }
  },
  {
    "subCompositionId": "1e602003-5bfa-45f4-8049-8892220fdff2",
    "mainComposition": false,
    "state": "Out1",
    "payload": {
      "time-control-node-id": {
        "UTC": 1664044077270,
        "isRunning": true,
        "value": 9917
      }
    }
  },
  {
    "subCompositionId": "41aaf130-468c-4f11-9bca-c1ea68ba1c8b",
    "mainComposition": false,
    "state": "Out1",
    "payload": {
      "cnColorText": "crimson",
      "color-control-node-id": {
        "a": 1,
        "b": 230,
        "g": 216,
        "r": 173
      }
    }
  },
  {
    "subCompositionId": "57d57254-f15b-42ca-b68e-75b69875f5ea",
    "mainComposition": false,
    "state": "Out2",
    "payload": {}
  },
  {
    "subCompositionId": "755bd36f-fff0-4250-b703-4cbd310f07fb",
    "mainComposition": false,
    "state": "Out1",
    "payload": {
      "cnVideoClipPause": {
        "__singularButton": true,
        "ts": 0
      },
      "cnVideoClipPlay": {
        "__singularButton": true,
        "ts": 0
      },
      "cnVideoClipStart": {
        "__singularButton": true,
        "ts": 0
      }
    }
  },
  {
    "subCompositionId": "7b7c8944-ba1f-4eec-a361-2c9ce308d462",
    "mainComposition": false,
    "state": "Out2",
    "payload": {
      "image": "https://image.singular.live/f12f184c9a0eb763beb40478e02a1250/images/4BhR3iwVI7oTpuMPQFSNBE.png",
      "name": "NYG",
      "pos": "88"
    }
  },
  {
    "subCompositionId": "7ccc118d-5333-474d-9a33-b5fb951cd765",
    "mainComposition": false,
    "state": "Out1",
    "payload": {
      "json-control-node-id": "{\"content\": [\r\n    {\"pos\": \"1\", \"name\": \"NYG\", \"image\": \"https://image.singular.live/f12f184c9a0eb763beb40478e02a1250/images/4BhR3iwVI7oTpuMPQFSNBE.png\"},\r\n    {\"pos\": \"2\", \"name\": \"SF\", \"image\": \"https://image.singular.live/f12f184c9a0eb763beb40478e02a1250/images/1PpN2FpuAutk3zeYILkDum.png\"},\r\n    {\"pos\": \"3\", \"name\": \"DEN\", \"image\": \"https://image.singular.live/f12f184c9a0eb763beb40478e02a1250/images/7Mg4XYFRQWiwT5IKIoH1E7.png\"},\r\n    {\"pos\": \"4\", \"name\": \"PIT\", \"image\": \"https://image.singular.live/f12f184c9a0eb763beb40478e02a1250/images/5K84dUL3ACt2l4pCCfwRP4.png\"}\r\n  ]\r\n}"
    }
  },
  {
    "subCompositionId": "816df4ac-3231-49a2-b744-ccd48aa33a40",
    "mainComposition": false,
    "state": "Out1",
    "payload": {
      "text-control-node-id": "Text from Google Sheet"
    }
  },
  {
    "subCompositionId": "9d0ebd84-bdae-6adc-2050-d54c36448d70",
    "mainComposition": false,
    "state": "Out1",
    "payload": {}
  },
  {
    "subCompositionId": "ab6e39f9-5550-47c2-81be-fa07611a6666",
    "mainComposition": false,
    "state": "Out1",
    "payload": {
      "checkbox-control-node-id": true
    }
  },
  {
    "subCompositionId": "ca6f12cf-d990-464b-948b-5d7ad9dd3d33",
    "mainComposition": false,
    "state": "Out1",
    "payload": {
      "cnNumberDisplayed": "$1,234.56",
      "number-control-node-id": "1234.56"
    }
  }
]
```
{% endtab %}
{% endtabs %}

### Response definitions

The following table describes each item in the response.

| Response item      | Description                                                                    | Data type |
| ------------------ | ------------------------------------------------------------------------------ | --------- |
| subCompositionId   | The sub-composition ID.                                                        | String    |
| subCompositionName | The name of the sub-composition.                                               |           |
| mainComposition    | The main composition ID.                                                       | String    |
| state              | The in/out state of a sub-composition. Supported values: `In`, `Out1`, `Out2`. | String    |
| payload            | A JSON object that contains control-level elements.                            | Object    |
