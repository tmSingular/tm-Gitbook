# Widget UI definition

The widget UI definition contains **field** and **group definitions** in a JSON structure.

## Defining UI fields

The minimal definition of a fields includes the `id`, `type`, `title`, and `defaultValue`.

<table><thead><tr><th width="227">Field model property</th><th width="100">Type</th><th>Description</th></tr></thead><tbody><tr><td>id</td><td>string</td><td><strong>(required)</strong> - field id returned in the JSON data by onSingularValue()</td></tr><tr><td>type</td><td>string</td><td><strong>(required)</strong> - type of data (<code>infotext</code>, <code>text</code>, <code>textarea</code>, <code>number</code>, <code>checkbox</code>, <code>composition</code>, <code>button</code>, <code>selection</code>, <code>JSON</code>, <code>color</code>, <code>gradient</code>, <code>image</code>, <code>timecontrol</code>)</td></tr><tr><td>title</td><td>string</td><td>Field title displayed in the widget UI</td></tr><tr><td>defaultValue</td><td>string</td><td>Default value</td></tr></tbody></table>

{% code title="UI field definition" %}
```json
{
  "model": {
    "fields": [
      {
        "id": "textId",
        "type": "text",
        "title": "Single line text",
        "defaultValue": "enter text here ..."
      },
      {
        "id": "numberId",
        "type": "number",
        "title": "Number",
        "defaultValue": "50",
        "min": "0",
        "max": "100",
        "step": "0.1",
        "unit": "%",
        "format": "0.1"
      }
    ],
    "groups": [...]
  }
}
```
{% endcode %}

## Grouping UI fields

Use **groups** to arrange UI fields in cards.&#x20;

**Group properties:**

<table><thead><tr><th width="142">Field</th><th width="164">Type</th><th>Description</th></tr></thead><tbody><tr><td>id</td><td>string</td><td><strong>(required)</strong> - group id</td></tr><tr><td>title</td><td>string</td><td>Group title</td></tr><tr><td>width</td><td>string</td><td>Width of card <code>single</code> (default) or <code>double</code></td></tr><tr><td>toolTip</td><td>string</td><td>Tool tip trext</td></tr><tr><td>childIds</td><td>array of strings</td><td>Array of UI field ids</td></tr></tbody></table>

{% code title="Group definition" overflow="wrap" %}
```json
{
  "model": {
    "fields": [...],
    "groups": [
      {
        "id": "groupId",
        "title": "Input Options",
        "width": "double",
        "toolTip": "Enter your values",
        "childIds": [
          "textId",
          "numberId"
        ]
      }
    ]
  }
}
```
{% endcode %}

## Widget UI definition - full reference&#x20;

```json
{  
  "model": {
    "fields": [{
        "id": "infotextId",
        "type": "infotext",
        "title": "Info",
        "defaultValue": "this is a readonly text..."
      },
      {
        "id": "textId",
        "type": "text",
        "title": "Single line text",
        "defaultValue": "enter text here ..."
      },
      {
        "id": "textAreaId",
        "type": "textarea",
        "title": "Text Area",
        "defaultValue": "Enter text into this area...",
        "rows": "5",
        "cols": "15"
      },
      {
        "id": "numberId",
        "type": "number",
        "title": "Number",
        "defaultValue": "50",
        "min": "0",
        "max": "100",
        "step": "0.1",
        "unit": "%",
        "format": "0.1"
      },
      {
        "id": "checkboxId",
        "type": "checkbox",
        "title": "Enable",
        "defaultValue": false
      },
      {
        "id": "compositionId",
        "type": "composition",
        "title": "Composition",
        "defaultValue": ""
      },
      {
        "id": "buttonId",
        "type": "button",
        "title": "Click me",
        "defaultValue": ""
      },
      {
        "id": "selectionId",
        "type": "selection",
        "title": "Selection",
        "defaultValue": "0",
        "selections": [{
            "id": "0",
            "title": "Option 1"
          },
          {
            "id": "1",
            "title": "Option 2"
          },
          {
            "id": "2",
            "title": "Option 3"
          }
        ]
      },
      {
        "id": "jsonId",
        "type": "json",
        "title": "Json data",
        "defaultValue": "{}",
        "width": "350",
        "height": "200"
      },
      {
        "id": "useCustomParameterId",
        "type": "checkbox",
        "title": "Enable",
        "defaultValue": false
      },
      {
        "id": "colorId",
        "type": "color",
        "title": "Color",
        "defaultValue": "#9B9B9B"
      },
      {
        "id": "gradientId",
        "type": "gradient",
        "title": "Gradient",
        "defaultValue": "#9B9B9B"
      },
      {
        "id": "imageId",
        "type": "image",
        "title": "Image",
        "defaultValue": "https://app.singular.live/images/logo.png"
      }, {
        "id": "countdownControlId",
        "title": "TimeControl",
        "type": "timecontrol",
        "defaultValue": {
          "UTC": 0,
          "isRunning": false,
          "value": 0
        }
      }
    ],
    "groups": [{
        "id": "group1Id",
        "title": "Input Options",
        "width": "double",
        "toolTip": "Enter your values and define a custom widget composition",
        "childIds": ["infotextId", "textId", "textAreaId", "numberId", "checkboxId", "selectionId", "compositionId"]
      },
      {
        "id": "group2Id",
        "title": "Customize and Control Options",
        "width": "double",
        "toolTip": "Customize and control options",
        "activeId": "useCustomParameterId",
        "childIds": ["jsonId", "colorId", "gradientId", "imageId", "countdownControlId", "buttonId"]
      }
    ]
  }
}
```
