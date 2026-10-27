# Get a control app's model

By getting an app's model, or payload descriptions, you can see its control parameters in detail, including data types of the control node fields. With this data, you can integrate the Singular API into your app or platform.

To get a control app's model:

1. [Get the control app's app token](get-a-control-apps-api-token.md).
2. Send a `GET` request to the endpoint for [Get a control app's model](../api-reference/get-control-app-details/get-a-control-apps-model.md), `https://app.singular.live/apiv2/controlapps/:appToken/model` , replacing `:appToken` with the app token for your app instance.

The response should look like this:

<details>

<summary>The control app's model:</summary>

```json
[
    {
        "id": "-MwbugjuLzQ1fYlGAczq",
        "name": "UNO Lowers | Momentum",
        "model": [
            {
                "defaultValue": {
                    "a": 1,
                    "b": 51,
                    "g": 51,
                    "r": 51
                },
                "id": "Primary Text Color",
                "immediateUpdate": false,
                "index": 3,
                "resetValue": {
                    "a": 1,
                    "b": 255,
                    "g": 255,
                    "r": 255
                },
                "title": "Primary Text Color",
                "type": "color"
            },
            {
                "defaultValue": {
                    "a": 1,
                    "b": 255,
                    "g": 255,
                    "r": 255
                },
                "id": "Accent Text Color",
                "immediateUpdate": false,
                "index": 4,
                "resetValue": {
                    "a": 1,
                    "b": 255,
                    "g": 255,
                    "r": 255
                },
                "title": "Accent Text Color",
                "type": "color"
            },
            {
                "defaultValue": {
                    "a": 1,
                    "b": 66,
                    "g": 66,
                    "r": 66
                },
                "id": "Dropline Color",
                "immediateUpdate": false,
                "index": 2,
                "resetValue": {
                    "a": 1,
                    "b": 255,
                    "g": 255,
                    "r": 255
                },
                "title": "Dropline Color",
                "type": "color"
            },
            {
                "defaultValue": {
                    "a": 1,
                    "b": 0,
                    "g": 0,
                    "r": 180
                },
                "id": "Secondary Color",
                "immediateUpdate": false,
                "index": 1,
                "resetValue": {
                    "a": 1,
                    "b": 255,
                    "g": 255,
                    "r": 255
                },
                "title": "Secondary Color",
                "type": "color"
            },
            {
                "defaultValue": {
                    "a": 1,
                    "b": 255,
                    "g": 255,
                    "r": 255
                },
                "id": "Primary Color",
                "immediateUpdate": false,
                "index": 0,
                "resetValue": {
                    "a": 1,
                    "b": 255,
                    "g": 255,
                    "r": 255
                },
                "title": "Primary Color",
                "type": "color"
            }
        ],
        "logicLayer": null,
        "snapshot": null,
        "subcompositions": [
            {
                "id": "57d57254-f15b-42ca-b68e-75b69875f5ea",
                "name": "Lower - Header",
                "state": "Out",
                "model": [
                    {
                        "defaultValue": "MAIN LINE OF TEXT",
                        "id": "Main Text",
                        "immediateUpdate": false,
                        "index": 1,
                        "resetValue": "BIDEN DIRECTS STATES TO OPEN VACCINATIONS TO ALL ADULTS BY MAY 1",
                        "rows": 10,
                        "title": "Main Text",
                        "type": "text"
                    },
                    {
                        "defaultValue": "HEADER",
                        "id": "Header",
                        "immediateUpdate": false,
                        "index": 0,
                        "resetValue": "BREAKING NEWS",
                        "rows": 10,
                        "title": "Header",
                        "type": "text"
                    }
                ],
                "logicLayer": {
                    "delay": "auto",
                    "name": "Lower Third",
                    "tag": "#5e35b1"
                },
                "snapshot": null,
                "subcompositions": []
            },
            {
                "id": "6cb2b49c-03e1-499b-89b1-93664560e92b",
                "name": "Lower - Header + Dropline",
                "state": "Out",
                "model": [
                    {
                        "defaultValue": "HEADER",
                        "id": "Header",
                        "immediateUpdate": false,
                        "index": 0,
                        "resetValue": "Default Text",
                        "title": "Header",
                        "type": "text"
                    },
                    {
                        "defaultValue": "MAIN LINE OF TEXT",
                        "id": "Main Text",
                        "immediateUpdate": false,
                        "index": 1,
                        "resetValue": "Default Text",
                        "title": "Main Text",
                        "type": "text"
                    },
                    {
                        "defaultValue": "DROPLINE MESSAGE",
                        "id": "Dropline",
                        "immediateUpdate": false,
                        "index": 2,
                        "resetValue": "Default Text",
                        "title": "Dropline",
                        "type": "text"
                    }
                ],
                "logicLayer": {
                    "delay": "auto",
                    "name": "Lower Third",
                    "tag": "#5e35b1"
                },
                "snapshot": null,
                "subcompositions": []
            },
            {
                "id": "f771e339-dde9-45ef-a8a4-5545f0bde56c",
                "name": "Lower - Breaking News",
                "state": "In",
                "model": [
                    {
                        "defaultValue": "MAIN LINE OF TEXT",
                        "id": "Text 2",
                        "immediateUpdate": false,
                        "index": 2,
                        "resetValue": "BIDEN DIRECTS STATES TO OPEN VACCINATIONS TO ALL ADULTS BY MAY 1",
                        "rows": 10,
                        "title": "Text 2",
                        "type": "text"
                    },
                    {
                        "defaultValue": "BREAKING NEWS",
                        "id": "Text 1",
                        "immediateUpdate": false,
                        "index": 1,
                        "resetValue": "Default Text",
                        "title": "Text 1",
                        "type": "text"
                    },
                    {
                        "defaultValue": "HEADER",
                        "id": "Header",
                        "immediateUpdate": false,
                        "index": 0,
                        "resetValue": "BREAKING NEWS",
                        "rows": 10,
                        "title": "Header",
                        "type": "text"
                    }
                ],
                "logicLayer": {
                    "delay": "auto",
                    "name": "Lower Third",
                    "tag": "#5e35b1"
                },
                "snapshot": null,
                "subcompositions": []
            }
        ]
    }
]
```

</details>
