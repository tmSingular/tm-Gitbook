# Class subcomposition

## Properties <a href="#properties" id="properties"></a>

| Name | Type   | Example                                | Description                    |
| ---- | ------ | -------------------------------------- | ------------------------------ |
| id   | String | "a4db02c8-df43-4737-a43d-ba9a4430cd86" | The ID of a sub-composition.   |
| name | String | "Lower Title"                          | The name of a sub-composition. |

## Methods <a href="#methods" id="methods"></a>

The sub-composition object has following methods:

<table><thead><tr><th width="309">Method</th><th width="84">Return type</th><th>Description</th></tr></thead><tbody><tr><td>getControlNode()</td><td>Object</td><td>Returns a sub-composition's control nodes.</td></tr><tr><td>getLogicLayer()</td><td>Object</td><td>Returns a sub-composition's logic layers.</td></tr><tr><td>getModel()</td><td>Object</td><td>Returns a sub-composition's model description.</td></tr><tr><td>getPayload()</td><td>Object</td><td>Returns a sub-composition's payload.</td></tr><tr><td>getState()</td><td>Object</td><td>Returns a sub-composition's animation state.</td></tr><tr><td>getSubcompositionById(id)</td><td>Object</td><td>Returns the sub-composition object of a sub-composition with a specified <code>id</code>.</td></tr><tr><td>getSubcompositionByName(name)</td><td>Object</td><td>Returns the sub-composition object of a sub-composition with a specified <code>name</code>.</td></tr><tr><td>jumpTo(toState)</td><td>Object</td><td>Jumps to the animation state specified by <code>toState</code>.</td></tr><tr><td>listSubcompositions()</td><td>Object</td><td>Returns a sub-composition's sub-compositions as an array.</td></tr><tr><td>playTo(toState)</td><td>Object</td><td>Plays to the animation state specified by <code>toState</code>.</td></tr><tr><td>resetPayload()</td><td>Object</td><td>Resets a payload to its default values.</td></tr><tr><td>setPayload(payload)</td><td>Object</td><td>Sets a sub-composition's payload.</td></tr></tbody></table>

### getControlNode() <a href="#getcontrolnode" id="getcontrolnode"></a>

Returns a composition's control node model and payload.

```javascript
// The code below prints the list of controlnode description to the console
var controlnode = subCompObject.getControlNode();
console.log("controlnode =", controlnode);
```

**Return**

`object`: A JSON description if the composition has control nodes

`undefined`: if the composition doesn't have any control nodes

```json
{
  "id": "controlNode",
  "model": {
    "fields": {
      "3c686562-1cf3-7493-7fae-803009afa22e": {
        "defaultValue": "Default Text",
        "id": "Top Title",
        "index": 2,
        "title": "Top Title",
        "type": "text"
      },
      "502a7d0e-e0f8-a895-1b80-43cdb81a1ca9": {
        "defaultValue": "Default Text",
        "id": "Bottom Title",
        "index": 3,
        "title": "Bottom Title",
        "type": "text"
      }
    }
  },
  "name": "Control Node",
  "payload": {
    "Bottom Title": "Extra Information",
    "Top Title": "SINGULAR.LIVE"
  },
  "thumbnail": "/images/noimage.png"
}
```

### getLogicLayer() <a href="#getlogiclayer" id="getlogiclayer"></a>

Returns the details of a composition's logic layer.

```javascript
// The code below prints the logic layer description to the console
var logicLayer = subCompObject.getLogicLayer();
console.log("logicLayer =", logicLayer);
```

**Return**

`object`: A JSON description if a logic layer has been defined for the composition

`undefined`: if no logic layer has been defined for the composition

```json
{
  "name": "Lower",
  "tag": "#B0C8CD"
}
```

### getModel() <a href="#getmodel" id="getmodel"></a>

Returns the model description of a composition's control node fields.

```javascript
// The code below prints the list of controlnode description to the console
var cnModel = subCompObject.getModel();
console.log("cnModel =", cnModel);
```

**Return**

`object`: An array of JSON objects if the composition has control nodes

`undefined`: if the composition doesn't have any control nodes

```json
[
  {
    "0": {
      "defaultValue": "Default Text",
      "id": "Top Title",
      "index": 2,
      "title": "Top Title",
      "type": "text"
    }
  },
  {
    "1": {
      "defaultValue": "Default Text",
      "id": "Bottom Title",
      "index": 3,
      "title": "Bottom Title",
      "type": "text"
    }
  }
]
```

### getPayload() <a href="#getpayload" id="getpayload"></a>

Returns the payload of a composition's control node.

```javascript
// The code below prints the list of controlnode payload to the console
var cnPayload = subCompObject.getPayload();
console.log("cnPayload =", cnPayload);
```

**Return**

`object`: An array of JSON objects if the composition has control nodes

`undefined`: if the composition doesn't have any control nodes

```json
[
  {
    "0": {
      "key": "Bottom Title",
      "value": "Extra Information"
    }
  },
  {
    "1": {
      "key": "Top Title",
      "value": "SINGULAR.LIVE"
    }
  }
]
```

### getState() <a href="#getstate" id="getstate"></a>

Returns a composition's animation state.

```javascript
// The code below prints the animation to the console
var animState = subCompObject.getState();
console.log("animState =", animState);
```

**Return**

`String`: animation state

```
getState = Out
```

### getSubcompositionById(id) <a href="#getsubcompositionbyid-id" id="getsubcompositionbyid-id"></a>

Returns a sub-composition's sub-composition object with a specified `id`.

**Parameters**

| Name | Type   | Description            |
| ---- | ------ | ---------------------- |
| id   | String | A sub-composition's ID |

```javascript
// The code below prints the subcomposition object to the console
var subCompId = "a4db02c8-df43-4737-a43d-ba9a4430cd86";
var subCompObject = compositionObject.getSubcompositionById(subCompId);
console.log("subCompObject =", subCompObject);
```

**Return**

`object`: Sub-composition object

```
subcompositionObject:
> getControlNode: ƒ subcomp_getControlNode()
> getLogicLayer: ƒ subcomp_getLogicLayer()
> getModel: ƒ subcomp_getModel()
> getPayload: ƒ subcomp_getPayload()
> getState: ƒ subcomp_getState()
> getSubcompositionById: ƒ subcomp_getSubcompositionById(id)
> getSubcompositionByName: ƒ subcomp_getSubcompositionByName(name)
> id: "a4db02c8-df43-4737-a43d-ba9a4430cd86"
> jumpTo: ƒ jumpTo(to)
> listSubcompositions: ƒ subcomp_listSubcompositions()
> name: "Lower Title"
> playTo: ƒ playTo(to)
> resetPayload: ƒ subcomp_resetPayload()
> setPayload: ƒ subcomp_setPayload(payload)
```

**See also**

Class subcomposition

### getSubcompositionByName(name) <a href="#getsubcompositionbyname-name" id="getsubcompositionbyname-name"></a>

Returns a sub-composition's sub-composition object with a specified `name`.

**Parameters**

| Name | Type   | Description                |
| ---- | ------ | -------------------------- |
| id   | String | ID of the sub-composition. |

```javascript
// The code below prints the subcomposition object to the console
var subCompName = "Lower Title";
var subCompObject = compositionObject.getSubcompositionByName(subCompName);
console.log("subCompObject =", subCompObject);
```

**Return**

`object`: Sub-composition object

```
subcompositionObject:
> getControlNode: ƒ subcomp_getControlNode()
> getLogicLayer: ƒ subcomp_getLogicLayer()
> getModel: ƒ subcomp_getModel()
> getPayload: ƒ subcomp_getPayload()
> getState: ƒ subcomp_getState()
> getSubcompositionById: ƒ subcomp_getSubcompositionById(id)
> getSubcompositionByName: ƒ subcomp_getSubcompositionByName(name)
> id: "a4db02c8-df43-4737-a43d-ba9a4430cd86"
> jumpTo: ƒ jumpTo(to)
> listSubcompositions: ƒ subcomp_listSubcompositions()
> name: "Lower Title"
> playTo: ƒ playTo(to)
> resetPayload: ƒ subcomp_resetPayload()
> setPayload: ƒ subcomp_setPayload(payload)
```

**See also**

Class subcomposition

### jumpTo(toState) <a href="#jumpto-to" id="jumpto-to"></a>

Jumps to the animation state specified by `to`.

```javascript
// The code below sets the animation state to "In"
subCompObject.jumpTo("In");
```

**Return**

`none`

### listSubcompositions() <a href="#listsubcompositions" id="listsubcompositions"></a>

Returns an array of the composition's sub-compositions.

```javascript
// The code below prints the list of subcompositions to the console
var subcompositionList = subCompObject.listSubcompositions();
console.log("subcompositionList =", subcompositionList);
```

**Return**

`object`: An array of JSON objects

```json
[
  {
    "id": "a4db02c8-df43-4737-a43d-ba9a4430cd86",
    "name": "Lower 1 Line - Large"
  }
]
```

### playTo(toState) <a href="#playto-to" id="playto-to"></a>

Plays to the animation state specified by `to`.

```javascript
// The code below plays the animation state to "In"
subCompObject.playTo("In");
```

**Return**

`none`

### resetPayload() <a href="#resetpayload" id="resetpayload"></a>

Resets a composition's payload to its default value.

```javascript
// The code below reset payloads of the composition
subCompObject.resetPayload();
```

**Return**

`none`

### setPayload(payload) <a href="#setpayload-payload" id="setpayload-payload"></a>

Sets the payload of a composition's control nodes.

```javascript
// The code below sets payloads of the composition
var payload = {
  "Bottom Title": "Extra Information",
  "Top Title": "SINGULAR.LIVE",
};
subCompObject.setPayload(payload);
```

**Return**

`none`
