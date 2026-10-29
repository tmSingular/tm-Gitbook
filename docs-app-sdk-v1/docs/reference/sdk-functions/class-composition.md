# Class composition

## Properties <a href="#properties" id="properties"></a>

| Name | Type   | Example                       | Description                  |
| ---- | ------ | ----------------------------- | ---------------------------- |
| id   | String | "303798-latest-1589207585405" | The ID of the composition.   |
| name | String | "Default"                     | The name of the composition. |

## Methods <a href="#methods" id="methods"></a>

The composition object has following methods:

| Method                        | Return type | Brief description                                                            |
| ----------------------------- | ----------- | ---------------------------------------------------------------------------- |
| getControlNode()              | Object      | Returns a composition's control nodes.                                       |
| getLogicLayer()               | Object      | Returns a composition's logic layers.                                        |
| getModel()                    | Object      | Returns a description of a composition's model.                              |
| getPayload()                  | Object      | Returns a composition's payload.                                             |
| getRefId()                    | Object      | Returns a composition's reference ID.                                        |
| getState()                    | Object      | Returns a composition's state.                                               |
| getSubcompositionById(id)     | Object      | Returns the composition object of a sub-composition with a specified `id`.   |
| getSubcompositionByName(name) | Object      | Returns the composition object of a sub-composition with a specified `name`. |
| jumpTo(toState)               | Object      | Jumps to an animation state specified by `toState`.                          |
| listSubcompositions()         | Object      | Returns an array of sub-compositions of the composition.                     |
| playTo(toState)               | Object      | Plays to the animation state specified by `toState`.                         |
| remove(callback)              | Object      | The register `callback` function.                                            |
| resetAllPayloads()            | Object      | Resets all payloads to default values.                                       |
| resetPayload()                | Object      | Resets payload to default values.                                            |
| setPayload(payload)           | Object      | Sets the composition's payload                                               |

### getControlNode() <a href="#getcontrolnode" id="getcontrolnode"></a>

Returns the control node's model and the payload of the composition.

```javascript
// The code below prints the list of controlnode description to the console
var controlnode = compositionObject.getControlNode();
console.log("controlnode =", controlnode);
```

**Return**

`object`: JSON description if the composition has control nodes

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

Returns a composition's logic layer details.

```javascript
// The code below prints the logic layer description to the console
var logicLayer = compositionObject.getLogicLayer();
console.log("logicLayer =", logicLayer);
```

**Return**

`object`: JSON description if a logic layer is defined for the composition

`undefined`: if no logic layer is defined for the composition

```
{
  "name": "Lower",
  "tag": "#B0C8CD"
}
```

### getModel() <a href="#getmodel" id="getmodel"></a>

Returns a description of a composition's model.

```javascript
// The code below prints the list of controlnode description to the console
var cnModel = compositionObject.getModel();
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

Returns the payload of the control node of the composition.

```javascript
// The code below prints the list of controlnode payload to the console
var cnPayload = compositionObject.getPayload();
console.log("cnPayload =", cnPayload);
```

**Return**

`object`: An array of JSON objects, if the composition has control nodes

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

### getRefId() <a href="#getrefid" id="getrefid"></a>

Returns a composition's reference ID. The reference ID is a unique ID that identifies a composition in the Singular dashboard.

```javascript
// The code below prints the refid to the console
var refid = compositionObject.getRefId();
console.log("refid =", refid);
```

**Return**

`number`: A composition's reference ID

```
refid = 303798
```

### getState() <a href="#getstate" id="getstate"></a>

Returns a composition's animation state.

```javascript
// The code below prints the animation to the console
var animState = compositionObject.getState();
console.log("animState =", animState);
```

**Return**

`String`: animation state

```
getState = Out
```

### getSubcompositionById(id) <a href="#getsubcompositionbyid-id" id="getsubcompositionbyid-id"></a>

Returns the composition object of a sub-composition with a specified `id`.

**Parameters**

| Name | Type   | Description                 |
| ---- | ------ | --------------------------- |
| id   | String | The ID of a sub-composition |

```javascript
// The code below prints the composition object to the console
var subCompId = "a4db02c8-df43-4737-a43d-ba9a4430cd86";
var subCompObject = singularApp.getSubcompositionById(subCompId);
console.log("subCompObject =", subCompObject);
```

**Return**

`object`: A sub-composition object

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

Returns the composition object of a sub-composition with a specified `name`.

**Parameters**

| Name | Type   | Description                  |
| ---- | ------ | ---------------------------- |
| id   | String | The ID of a sub-composition. |

```javascript
// The code below prints the composition object to the console
var subCompName = "Lower Title";
var subCompObject = singularApp.getSubcompositionByName(subCompName);
console.log("subCompObject =", subCompObject);
```

**Return**

`object`: A sub-composition object

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
compositionObject.jumpTo("In");
```

**Return**

`none`

### listSubcompositions() <a href="#listsubcompositions" id="listsubcompositions"></a>

Returns the composition's sub-compositions as an array.

```javascript
// The code below prints the list of subcompositions to the console
var subcompositionList = compositionObject.listSubcompositions();
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
compositionObject.playTo("In");
```

**Return**

`none`

### remove(callback) <a href="#remove-callback" id="remove-callback"></a>

The register `callback` function. The function `callback` is called when the composition gets removed from the output.

#### **Parameters** <a href="#parameters-2" id="parameters-2"></a>

| Name     | Type bb  | Description                                                   |
| -------- | -------- | ------------------------------------------------------------- |
| callback | function | The callback function triggered when composition was removed. |

```javascript
// The code below removes the composition
var compositionId = "303798-latest-1588928586739";
var compositionObject = singularApp.getComposition(compositionId);
compositionObject.remove( function () =>
  {
    // clear composition object
    compositionObject = undefined;
    console.log("composition removed successfully.");
  });
```

**Return**

`none`

### resetAllPayloads() <a href="#resetallpayloads" id="resetallpayloads"></a>

Resets all payloads in a composition and its sub-compositions to their default values.

```javascript
// The code below resets all of a composition's payloads
compositionObject.resetAllPayloads();
```

**Return**

`none`

### resetPayload() <a href="#resetpayload" id="resetpayload"></a>

Resets the the composition's payload to its default value.

```javascript
// The code below reset payloads of the composition
compositionObject.resetPayload();
```

**Return**

`none`

### setPayload(payload) <a href="#setpayload-payload" id="setpayload-payload"></a>

Sets a composition's control node payloads.

```javascript
// The code below sets the composition's payloads
var payload = {
  "Bottom Title": "Extra Information",
  "Top Title": "SINGULAR.LIVE",
};
compositionObject.setPayload(payload);
```

**Return**

`none`
