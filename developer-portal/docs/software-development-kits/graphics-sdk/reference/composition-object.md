# Composition object

### Properties <a href="#properties" id="properties"></a>

<table><thead><tr><th width="107">Name</th><th width="91">Type</th><th>Example</th><th width="196">Description</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>"303798-latest-1589207585405"</td><td>The ID of the composition.</td></tr></tbody></table>

### Methods <a href="#methods" id="methods"></a>

The composition object has following methods:

<table><thead><tr><th width="254">Method</th><th width="135.33333333333331" align="center">Return type</th><th>Brief description</th></tr></thead><tbody><tr><td><a href="composition-object.md#findname">find(name)</a></td><td align="center">Object</td><td>Returns the composition object of a sub-composition with a specified <code>name</code>.</td></tr><tr><td><a href="composition-object.md#getcompositionbyidid">getCompositionById(id)</a></td><td align="center">Object</td><td>Returns the composition object of a sub-composition with a specified <code>id</code>.</td></tr><tr><td><a href="composition-object.md#getcontrolnode">getControlNode()</a></td><td align="center">Object</td><td>Returns a composition's control nodes.</td></tr><tr><td>getDataNode()</td><td align="center">Object</td><td>Returns a composition's data nodes.</td></tr><tr><td><a href="composition-object.md#getlogiclayer">getLogicLayer()</a></td><td align="center">Object</td><td>Returns a composition's logic layers.</td></tr><tr><td><a href="composition-object.md#getmodel">getModel()</a></td><td align="center">Object</td><td>Returns a composition's model description.</td></tr><tr><td><a href="composition-object.md#getpayload">getPayload()</a></td><td align="center">Object</td><td>Returns a composition's payload as an array.</td></tr><tr><td><a href="composition-object.md#getpayload2">getPayload2()</a></td><td align="center">Object</td><td>Returns a composition's payload as a JSON object.</td></tr><tr><td><a href="composition-object.md#getstate">getState()</a></td><td align="center">Object</td><td>Returns a composition's state.</td></tr><tr><td><a href="composition-object.md#getsubcompositionbyidid">getSubcompositionById(id)</a></td><td align="center">Object</td><td>Returns the composition object of a sub-composition with a specified <code>id</code>.</td></tr><tr><td><a href="composition-object.md#jumptoto">jumpTo(to)</a></td><td align="center">-</td><td>Jumps to the animation state specified by <code>to</code>.</td></tr><tr><td><a href="composition-object.md#listsubcompositions">listSubcompositions()</a></td><td align="center">Object</td><td>Returns an array of a composition's sub-compositions.</td></tr><tr><td><a href="composition-object.md#playtoto">playTo(to)</a></td><td align="center">-</td><td>Plays to the animation state specified by <code>to</code>.</td></tr><tr><td><a href="composition-object.md#sendmessagemessage">sendMessage(message)</a></td><td align="center">-</td><td>Sends a custom message.</td></tr><tr><td><a href="composition-object.md#setpayloadpayload">setPayload(payload)</a></td><td align="center">-</td><td>Sets a composition's payload.</td></tr></tbody></table>

### find(name) <a href="#findname" id="findname"></a>

Returns an array of composition objects with a specified `name`.

#### **Parameters**

<table><thead><tr><th>Name</th><th width="158.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td>name</td><td>String</td><td>The name of the composition.</td></tr></tbody></table>

```javascript
const name = "LowerThird";
// we use the first element in the array
const compObject = composition.find(name)[0];
```

#### **Return**

`Array`: An array of composition objects

{% code title="compObject:" %}
```log
> find: ƒ ()
> getCompositionById: ƒ (subCompId)
> getControlNode: ƒ ()
> getDataNodes: ƒ ()
> getLogicLayer: ƒ ()
> getModel: ƒ ()
> getPayload: ƒ ()
> getPayload2: ƒ ()
> getState: ƒ ()
> getSubcompositionById: ƒ (subCompId)
> id: "dbc46c1a-1375-4c2c-9f0d-1df5a86d0baf"
> jumpTo: ƒ (to)
> listSubcompositions: ƒ ()
> playTo: ƒ (to)
> seek: ƒ (to)
> sendMessage: ƒ (message)
> setPayload: ƒ (payload)
```
{% endcode %}

#### **See also**

[Composition object](composition-object.md)

### getCompositionById(id) <a href="#getcompositionbyidid" id="getcompositionbyidid"></a>

Returns the composition object of a sub-composition with a specified `id`.

#### **Parameters**

| Name | Type   | Description             |
| ---- | ------ | ----------------------- |
| id   | String | The sub-composition ID. |



```javascript
const id = "dbc46c1a-1375-4c2c-9f0d-1df5a86d0baf";
const compObject = composition.find(id);
```

#### **Return**

`object`: Composition object

{% code title="compObject:" %}
```log
> find: ƒ ()
> getCompositionById: ƒ (subCompId)
> getControlNode: ƒ ()
> getDataNodes: ƒ ()
> getLogicLayer: ƒ ()
> getModel: ƒ ()
> getPayload: ƒ ()
> getPayload2: ƒ ()
> getState: ƒ ()
> getSubcompositionById: ƒ (subCompId)
> id: "dbc46c1a-1375-4c2c-9f0d-1df5a86d0baf"
> jumpTo: ƒ (to)
> listSubcompositions: ƒ ()
> playTo: ƒ (to)
> seek: ƒ (to)
> sendMessage: ƒ (message)
> setPayload: ƒ (payload)
```
{% endcode %}

#### **See also**

[Composition object](composition-object.md)

### getControlNode() <a href="#getcontrolnode" id="getcontrolnode"></a>

Returns a composition's control node model and payload.

```javascript
const controlnode = compositionObject.getControlNode();
```

#### **Return**

`object`: A JSON description, if the composition has control nodes\
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
const logicLayer = compositionObject.getLogicLayer();
```

#### **Return**

`object`: a JSON description, if a logic layer has been defined for the composition

`undefined`: if no logic layer has been defined for the composition

```json
{
  "name": "Lower",
  "tag": "#B0C8CD"
}
```

### getModel() <a href="#getmodel" id="getmodel"></a>

Returns the model description of a composition's control node fields.

```
const model = compositionObject.getModel();
```

#### **Return**

`object`: An array of JSON objects, if the composition has control nodes

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
const payload = compositionObject.getPayload();
```

#### **Return**

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

### getPayload2()

Returns the control node content from the composition as a JSON object.

```javascript
const payload = comp.getPayload2();
console.log(payload);
```

### getState() <a href="#getstate" id="getstate"></a>

Returns the composition's animation state.

```javascript
const animState = compositionObject.getState();
```

#### **Return**

`String`: animation state

```javascript
getState = Out
```

### getSubcompositionById(id) <a href="#getsubcompositionbyidid" id="getsubcompositionbyidid"></a>

Returns the composition object of a sub-composition with a specified `id`.

#### **Parameters**

| Name | Type   | Description               |
| ---- | ------ | ------------------------- |
| id   | String | ID of the sub-composition |

```
const id = "dbc46c1a-1375-4c2c-9f0d-1df5a86d0baf";
const compObject = composition.find(id);
```

#### **Return**

`object`: Composition object

{% code title="compObject:" %}
```log
> find: ƒ ()
> getCompositionById: ƒ (subCompId)
> getControlNode: ƒ ()
> getDataNodes: ƒ ()
> getLogicLayer: ƒ ()
> getModel: ƒ ()
> getPayload: ƒ ()
> getPayload2: ƒ ()
> getState: ƒ ()
> getSubcompositionById: ƒ (subCompId)
> id: "dbc46c1a-1375-4c2c-9f0d-1df5a86d0baf"
> jumpTo: ƒ (to)
> listSubcompositions: ƒ ()
> playTo: ƒ (to)
> seek: ƒ (to)
> sendMessage: ƒ (message)
> setPayload: ƒ (payload)
```
{% endcode %}

#### **See also**

[Composition object](composition-object.md)

### jumpTo(to) <a href="#jumptoto" id="jumptoto"></a>

Jumps to the animation state specified by `to`.

```javascript
compositionObject.jumpTo("In");
```

#### **Return**

`none`

### listSubcompositions() <a href="#listsubcompositions" id="listsubcompositions"></a>

Returns an array of a composition's sub-compositions.

```javascript
const subcompositionList = compositionObject.listSubcompositions();
```

#### **Return**

`object`: An array of JSON objects

```json
[ { "id": "a4db02c8-df43-4737-a43d-ba9a4430cd86", "name": "Lower 1 Line - Large" } ]
```

### playTo(to) <a href="#playtoto" id="playtoto"></a>

Plays to the animation state specified by `to`.

```javascript
compositionObject.playTo("In");
```

#### **Return**

`none`

### sendMessage(message) <a href="#sendmessagemessage" id="sendmessagemessage"></a>

Send a message to the composition. Use the [message listener](https://developer.singular.live/composition-scripting/cheat-sheets/fundamentals#message) to receive the message in the [Composition Script](https://app.gitbook.com/s/3cdPul5g3lHEzkm2UkSf/composition-scripting).

<table><thead><tr><th width="140">Attributes</th><th width="103">Type</th><th width="127">Required</th><th>Description</th></tr></thead><tbody><tr><td>object</td><td>object</td><td>Yes</td><td>Custom data as JSON object</td></tr></tbody></table>

### setPayload(payload) <a href="#setpayloadpayload" id="setpayloadpayload"></a>

Sets the payload of a composition's control nodes.

```javascript
const payload = {
  "Bottom Title": "Extra Information",
  "Top Title": "SINGULAR.LIVE",
};
compositionObject.setPayload(payload);
```

#### **Return**

`none`
