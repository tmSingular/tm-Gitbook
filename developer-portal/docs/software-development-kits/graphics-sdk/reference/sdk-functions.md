# SDK functions

### SingularGraphics(domElement) <a href="#singulargraphicsdomelement" id="singulargraphicsdomelement"></a>

Use the following code to create an instance of a Singular overlay:

```javascript
const overlay = SingularGraphics("SingularOverlay");
```

<table><thead><tr><th width="131">Attributes</th><th width="82">Type</th><th>Required</th><th width="375">Description</th></tr></thead><tbody><tr><td>domId</td><td>String</td><td>Yes</td><td>The target <code>div</code> that the SingularOverlay will replace.</td></tr></tbody></table>

### SDK properties <a href="#sdk-properties" id="sdk-properties"></a>

<table><thead><tr><th width="121">Name</th><th width="94">Type</th><th>Example</th><th width="274">Description</th></tr></thead><tbody><tr><td>host</td><td>String</td><td>"https://app.singular.live"</td><td>Domain of the SDK player client.</td></tr><tr><td>id</td><td>String</td><td>"SingularOverlay"</td><td>iframe ID.</td></tr></tbody></table>

```javascript
const compMain = overlay.getMainComposition();
console.log("compMain =", compMain);
```

#### **Return**

`object`: Graphic SDK object

{% code title="overlay:" %}
```log
> addListener: ƒ (event, callback)
> getAdaptationGlobals: ƒ ()
> getCompositionById: ƒ (compId)
> getCompositionInfo: ƒ ()
> getConfig: ƒ ()
> getMainComposition: ƒ ()
> getSequencer: ƒ ()
> host: "https://app.singular.live"
> id: "SingularOverlay"
> loadComposition: ƒ loadComposition(compositionId, cb)
> noTrack: ƒ ()
> onmessage: ƒ (e)
> removeAllListener: ƒ ()
> removeListener: ƒ (event, callback)
> renderAppOutput: ƒ renderAppOutput(appId, output, cb)
> renderComposition: ƒ renderComposition(compositionObject, cb)
> setAdaptationGlobals: ƒ setAdaptationGlobals(data)
> setConfig: ƒ (_config)
> setFrameNumber: ƒ setFrameNumber(frame)
> videoCommand: ƒ videoCommand(cmd, time)
```
{% endcode %}

### SDK functions <a href="#sdk-functions" id="sdk-functions"></a>

The reference documentation provided in the following sections describes the Graphic SDK structure and methods.

<table><thead><tr><th width="308.3333333333333">Method</th><th width="126">Return type</th><th>Description</th></tr></thead><tbody><tr><td><a href="sdk-functions.md#addlistener">addListener(event, callback)</a></td><td>-</td><td>Adds an event listener.</td></tr><tr><td><a href="sdk-functions.md#getadaptationglobals">getAdaptationGlobals()</a></td><td>Object</td><td>Returns adaptation global parameters.</td></tr><tr><td><a href="sdk-functions.md#getcompositionbyid">getCompositionById(compId)</a></td><td>Object</td><td>Returns the composition object requested by its ID.</td></tr><tr><td><a href="sdk-functions.md#getcompositioninfo">getCompositionInfo()</a></td><td>Object</td><td>Returns a detailed description of a composition's structure, control and data nodes, animation, and timeline states.</td></tr><tr><td><a href="sdk-functions.md#getconfig">getConfig()</a></td><td>Object</td><td>Returns configuration details.</td></tr><tr><td><a href="sdk-functions.md#getmaincomposition">getMainComposition()</a></td><td>Object</td><td>Returns the main composition object.</td></tr><tr><td><a href="sdk-functions.md#getsequencer">getSequencer()</a></td><td>Object</td><td>Returns the sequencer object.</td></tr><tr><td><a href="sdk-functions.md#loadcomposition">loadComposition(compositionId, callback)</a></td><td>-</td><td>Loads a composition defined by its ID or JSON URL.</td></tr><tr><td><a href="sdk-functions.md#notrack">noTrack()</a></td><td>-</td><td>Deactivates tracking of analytics.</td></tr><tr><td><a href="sdk-functions.md#onmessage">onmessage(event)</a></td><td>-</td><td>Depreciated.</td></tr><tr><td><a href="sdk-functions.md#removealllistener">removeAllListener()</a></td><td>-</td><td>Removes all event listeners.</td></tr><tr><td><a href="sdk-functions.md#removelistener">removeListener(event, callback)</a></td><td>-</td><td>Removes an event listener defined by its name.</td></tr><tr><td><a href="sdk-functions.md#renderappoutput">renderAppOutput(appId, output, callback)</a></td><td>-</td><td>Loads a composition defined by its app ID.</td></tr><tr><td><a href="sdk-functions.md#rendercomposition">renderComposition(compositionObject, callback)</a></td><td>-</td><td>Loads the composition defined in a composition object.</td></tr><tr><td><a href="sdk-functions.md#setadaptationglobals">setAdaptationGlobals(data)</a></td><td>-</td><td>Sets adaptation global parameters.</td></tr><tr><td><a href="sdk-functions.md#setconfig">setConfig(data)</a></td><td>-</td><td>Sets configuration properties.</td></tr><tr><td><a href="sdk-functions.md#setframenumber">setFrameNumber(frame)</a></td><td>-</td><td>Depreciated.</td></tr><tr><td><a href="sdk-functions.md#videocommand">videoCommand(cmd, time)</a></td><td>-</td><td>Depreciated.</td></tr></tbody></table>

### addListener <a href="#addlistener" id="addlistener"></a>

Adds a listener for events coming from the overlay.

```javascript
overlay.addListener(type, callback);
```

<table><thead><tr><th>Attributes</th><th width="315">Description</th><th width="108">Type</th><th>Required</th><th></th></tr></thead><tbody><tr><td>type</td><td>A string containing one of the values described below</td><td>String</td><td>Yes</td><td></td></tr><tr><td>callback</td><td>The callback function for the <code>type</code> of event</td><td>Function</td><td>Yes</td><td></td></tr></tbody></table>

#### **Values for listener `type`**

<table><thead><tr><th width="314">Setting</th><th>Description</th></tr></thead><tbody><tr><td>payload_changed</td><td>Listens to messages from control node updates.</td></tr><tr><td>datanode_payload_changed</td><td>Listens to messages from data node updates.</td></tr><tr><td>state_changed</td><td>Listens to messages for animation state changes.</td></tr><tr><td>message</td><td>Listens to messages from the interactive events and widgets.</td></tr><tr><td>error</td><td>Listens to errors reported by overlay instances.</td></tr></tbody></table>

**See also:**

[removeAllListener](sdk-functions.md#removealllistener) [removeListener](sdk-functions.md#removelistener)

#### payload\_changed <a href="#payload_changed" id="payload_changed"></a>

Listens to `payload_changed` from control node updates.

```javascript
overlay.addListener('payload_changed', (event, msg) => {
  console.log("Composition payload changed:", event, msg);
});
```

**Callback attributes**

<table><thead><tr><th width="142.33333333333331">Attributes</th><th>Type</th><th width="309">Description</th></tr></thead><tbody><tr><td>event</td><td>String</td><td>The event name.</td></tr><tr><td>msg</td><td>Object</td><td>JSON data containing event details.</td></tr></tbody></table>

```json
{
  "compId": "your-composition-id",
  "compName": "your-composition-name",
  "compositionId": "your-composition-id",
  "compositionName": "your-composition-name",
  "payload": {
    "your-control-node-ids": "your-control-node-values"
  }
}
```

#### datanode\_payload\_changed <a href="#datanode_payload_changed" id="datanode_payload_changed"></a>

Listens to `datanode_payload_changed` from data node updates

```javascript
overlay.addListener('datanode_payload_changed', (event, msg) => {
  console.log("Composition datanode payload:", event, msg);
});
```

**Callback attributes**

<table><thead><tr><th>Attributes</th><th>Type</th><th width="283.3333333333333">Description</th></tr></thead><tbody><tr><td>event</td><td>String</td><td>The event name.</td></tr><tr><td>msg</td><td>Object</td><td>JSON containing event details.</td></tr></tbody></table>

```json
{
  "id": "your-datanode-id",
  "name": "your-datanode-name",
  "payload": {
    "your-datanode-ids": "your-datanode-values"
  }
}
```

#### state\_changed <a href="#state_changed" id="state_changed"></a>

Listens to `state_changed` for animation state changes.

```javascript
overlay.addListener('state_changed', (event, msg) => {
  console.log("Composition state changed:", event, msg);
});
```

**Callback attributes**

<table><thead><tr><th>Attributes</th><th width="154.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td>event</td><td>String</td><td>The event name.</td></tr><tr><td>msg</td><td>Object</td><td>JSON containing event details.</td></tr></tbody></table>

```json
{
  "compositionId": "your-composition-id",
  "compositionName": "your-composition-name",
  "state": "In" | "Out" | "Out1" | "Out2"
}
```

#### message <a href="#message" id="message"></a>

Listens to `message` from interactive events and widgets

```javascript
overlay.addListener('message', (event, msg) => {jaconsole.log("Composition message:", event, msg);
});
```

**Callback attributes**

| Attributes | Type   | Description                    |
| ---------- | ------ | ------------------------------ |
| event      | String | The event name.                |
| msg        | Object | JSON containing event details. |

```json
{
  "event": "custom",
  "params": {
    "compId": "your-composition-id",
    "id": "your-widget-id",
    "name": "your-widget-name",
    "widgetId": "widget-id",
    "type": "type-of-message-sender",
    "data": {
      "JSON-object-with-custom-data"
    }
  }
}
```

#### error <a href="#error" id="error"></a>

Listens to `error` reported by an overlay instance.

```javascript
overlay.addListener("error", (params) => {
  console.log("Error:", params);
});
```

**Callback attributes**

<table><thead><tr><th>Attributes</th><th width="149.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td>params</td><td>Object</td><td>JSON containing error details.</td></tr></tbody></table>

### getAdaptationGlobals <a href="#getadaptationglobals" id="getadaptationglobals"></a>

Makes a request to get adaptation global settings.

```javascript
const adaptationGlobals = overlay.getAdaptationGlobals();
console.log("adaptationGlobals =", adaptationGlobals);
```

#### **Return**

`object`: adaptation globals as a JSON object

```json
{
  "custom1": "",
  "custom2": "",
  "custom3": "",
  "interactive": "interactive",
  "language": "",
  "layout": "landscape",
  "screenSize": "small",
  "textDirection": "ltr"
}
```

#### **See also**

[setAdaptationGlobals](sdk-functions.md#setadaptationglobals)

### getCompositionById <a href="#getcompositionbyid" id="getcompositionbyid"></a>

Returns the composition object requested by its ID.

#### **Parameters**

| Name          | Type   | Description              |
| ------------- | ------ | ------------------------ |
| compositionId | String | The ID of a composition. |

```javascript
const compositionId = "dbc46c1a-1375-4c2c-9f0d-1df5a86d0baf";
const compositionObject = overlay.getComposition(compositionId);
console.log("compositionObject =", compositionObject);
```

#### **Return**

`object`: Composition object

{% code title="compositionObject:" %}
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
> setPayload: ƒ (_payload)
```
{% endcode %}

#### **See also**

[Composition object](composition-object.md)

### getCompositionInfo <a href="#getcompositioninfo" id="getcompositioninfo"></a>

Returns the JSON definition of the loaded composition.

```javascript
const compositionInfo = overlay.getCompositionInfo();
console.log("compositionInfo =", compositionInfo);
```

#### **Return**

`object`: Composition object

```javascript
{
  "adaptationGlobals": {"screenSize": "small", "layout": "landscape", "textDirection": "ltr", "interactive": "interactive", "language": "", …}
  "compositionDuration": {"-N8o2dhQeHQXZ6Emr2I7": {…}, "04234444-4383-4772-9619-ff971119eb5a": {…}, …}
  "compositionId": "-N8o2dhQeHQXZ6Emr2I7"
  "compositionProps": {"logicLayers": {…}, "timeline2Active": {…}, "durations": {…}}
  "compositionStates": {"-Kn25RyfewL29LigHvV1": "Out1", "-KnXXbHZpD6sKVP4iHCD": "Out1", "-Knh0082CSZTy0CXJ_B_": "Out1", …}
  "dataSources": {"-N8o2dhQeHQXZ6Emr2I7": {…}, "04234444-4383-4772-9619-ff971119eb5a": {…}, …}
  "effect": {"-N8o2dhQeHQXZ6Emr2I7": {…}, "04234444-4383-4772-9619-ff971119eb5a": {…}, …}
  "idToName": {"04234444-4383-4772-9619-ff971119eb5a": "Panel Left - Image", "1c895c6d-f17d-400a-8591-0c38298bbb4f": "Fullscreen - Title", …}
  "nameToId": {"Panel Left - Image": "04234444-4383-4772-9619-ff971119eb5a", "Fullscreen - Title": "1c895c6d-f17d-400a-8591-0c38298bbb4f", …}
  "subcompositionNames": {"-N8o2dhQeHQXZ6Emr2I7": {…}, "04234444-4383-4772-9619-ff971119eb5a": {…}, …}
}
```

### getConfig <a href="#getconfig" id="getconfig"></a>

Returns the configuration of the overlay.

```javascript
const config = overlay.getConfig();
console.log("config =", config);
```

#### **Return**

`object`: JSON object

### getMainComposition <a href="#getmaincomposition" id="getmaincomposition"></a>

Returns the composition object of the main or root composition.

```javascript
const compMain = overlay.getMainComposition();
console.log("compMain =", compMain);
```

#### **Return**

`object`: Composition object

{% code title="compMain:" %}
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
> id: "-N8o2dhQeHQXZ6Emr2I7"
> jumpTo: ƒ (to)
> listSubcompositions: ƒ ()
> playTo: ƒ (to)
> seek: ƒ (to)
> sendMessage: ƒ (message)
> setPayload: ƒ (_payload)
```
{% endcode %}

#### **See also**

[Composition object](composition-object.md)

### getSequencer <a href="#getsequencer" id="getsequencer"></a>

Returns the sequencer object of the overlay.

```javascript
const sequencer = overlay.getSequencer();
console.log("sequencer =", sequencer);
```

#### **Return**

`object`: Sequencer object

{% code title="sequencer:" %}
```log
> play: ƒ (time)
> seek: ƒ (time)
> seqId: "-N8o2dhQeHQXZ6Emr2I7"
> setDuration: ƒ (duration)
> setPayload: ƒ (payload)
> start: ƒ ()
> stop: ƒ ()
```
{% endcode %}

**See also**

[Sequencer object](sequencer-object.md)

### loadComposition <a href="#loadcomposition" id="loadcomposition"></a>

Loads a composition into an overlay instance.

```javascript
overlay.loadComposition(composition, outputName, callback);
```

<table><thead><tr><th width="157">Attributes</th><th width="102">Type</th><th width="111">Required</th><th>Description</th></tr></thead><tbody><tr><td>composition</td><td>String</td><td>Yes</td><td>A composition referenced by token or URL.</td></tr><tr><td>outputName</td><td>String</td><td>Yes</td><td>Depreciated. Set output name to <code>null</code> for compatibility reasons.</td></tr><tr><td>callback</td><td>Function</td><td>Yes</td><td>Callback function called when the content has been loaded.</td></tr></tbody></table>

**Sample**

{% tabs %}
{% tab title="Load by composition URL" %}
```javascript
const compositionUrl = "https://assets.singular.live/f12f184c9a0eb763beb40478e02a1250/jsons/164gBjjETnHFKEU3LjPCKe.json";

overlay.loadComposition(compositionUrl, (success) => {
  // called when content finished loading
  if (success) {
    console.log("Composition loaded");
  } else {
    console.warn("Couldn't load composition");
  }
});
```
{% endtab %}

{% tab title="Load by composition token" %}
```javascript
const compositionToken = "08EBsfeF4yoYLejOXM51Rk";

overlay.loadComposition(compositionToken , null, (success) => {
  // called when content finished loading
  if (success) {
    console.log("Composition loaded");
  } else {
    console.warn("Couldn't load composition");
  }
});
```
{% endtab %}
{% endtabs %}

### noTrack <a href="#notrack" id="notrack"></a>

Deactivates analytic tracking.

### onmessage <a href="#onmessage" id="onmessage"></a>

This call has been depreciated.

### removeAllListener <a href="#removealllistener" id="removealllistener"></a>

Removes all registered listeners.

```javascript
overlay.removeAllListener();
```

#### **See also**

[addListener](sdk-functions.md#addlistener)

[removeListener](sdk-functions.md#removelistener)

### removeListener <a href="#removelistener" id="removelistener"></a>

Removes a listener specified by its type.

```javascript
overlay.removeListener(type, callback);
```

<table><thead><tr><th>Attributes</th><th width="98">Type</th><th width="104">Required</th><th>Description</th></tr></thead><tbody><tr><td>type</td><td>String</td><td>Yes</td><td>A string containing one of the values described below.</td></tr><tr><td>callback</td><td>Function</td><td>Yes</td><td>The callback function for the <code>type</code> of event.</td></tr></tbody></table>

#### **Values for listener `type`**

| Setting                    | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| payload\_changed           | Listens to messages from control node updates.               |
| datanode\_payload\_changed | Listens to messages from data node updates.                  |
| state\_changed             | Listens to messages for animation state changes.             |
| message                    | Listens to messages from the interactive events and widgets. |
| error                      | Listens to errors reported by an overlay instance.           |

#### **See also:**

[removeAllListener](sdk-functions.md#removealllistener)\
[removeListener](sdk-functions.md#removelistener)

### renderAppOutput <a href="#renderappoutput" id="renderappoutput"></a>

Load san app output into the overlay instance.

```javascript
overlay.renderAppOutput(appInstanceId, outputName, callback);
```

<table><thead><tr><th width="159">Attributes</th><th width="116">Type</th><th width="102">Required</th><th>Description</th></tr></thead><tbody><tr><td>appInstanceId</td><td>String</td><td>Yes</td><td>The ID of an app instance.</td></tr><tr><td>outputName</td><td>String</td><td>Yes</td><td>Depreciated. Sets output name to <code>null</code> for compatibility reasons.</td></tr><tr><td>callback</td><td>Function</td><td>Yes</td><td>The callback function called when the content has been loaded.</td></tr></tbody></table>

#### **Sample**

```javascript
const appInstanceId = 12345;

overlay.renderAppOutput(appInstanceId, null, (success) => {
  // called when content finished loading
  if (success) {
    console.log("App output loaded");
  } else {
    console.warn("Couldn't load app output");
  }
});
```

### renderComposition <a href="#rendercomposition" id="rendercomposition"></a>

Loads a composition into an overlay instance.

```javascript
overlay.renderComposition(composition, callback);
```

<table><thead><tr><th width="156">Attributes</th><th width="103">Type</th><th width="115">Required</th><th>Description</th></tr></thead><tbody><tr><td>composition</td><td>Object</td><td>Yes</td><td>A composition's JSON object.</td></tr><tr><td>callback</td><td>Function</td><td>Yes</td><td>The callback function called when the content has been loaded.</td></tr></tbody></table>

#### **Sample**

```javascript
const composition = {...};

overlay.renderComposition(composition, null, (success) => {
  // called when content finished loading
  if (success) {
    console.log("Composition loaded");
  } else {
    console.warn("Couldn't load composition");
  }
});
```

### setAdaptationGlobals <a href="#setadaptationglobals" id="setadaptationglobals"></a>

Sets adaptation global settings.

```javascript
const adaptationGlobals = {
  "custom1": "stationId=abc123",a
  "custom2": "",
  "custom3": "",
  "interactive": "",
  "language": "",
  "layout": "portrait",
  "screenSize": "small",
  "textDirection": "ltr"
};

overlay.setAdaptationGlobals(adaptationGlobals);
```

#### **See also**

[getAdaptationGlobals](sdk-functions.md#getadaptationglobals)

### setConfig <a href="#setconfig" id="setconfig"></a>

Sets the configuration of an overlay.

```javascript
const config = {...};
overlay.setConfig(config);
```

### setFrameNumber <a href="#setframenumber" id="setframenumber"></a>

This call has been depreciated.

### videoCommand <a href="#videocommand" id="videocommand"></a>

This call has been depreciated.
