# Class singularApp

## Methods

<table><thead><tr><th width="317">Method</th><th width="125">Return type</th><th>Description</th></tr></thead><tbody><tr><td>ServerDate()</td><td>Object</td><td>Returns an object to request time details from the Singular server.</td></tr><tr><td>audioBrowserEventCallback(windowParent, callback)</td><td>-</td><td>A callback function to handle audio browser events.</td></tr><tr><td>compositionBrowserEventCallback(windowParent, callback)</td><td>-</td><td>A callback function to handle composition browser events.</td></tr><tr><td>createSingularForm(window, dom, controlNode, callback, options)</td><td>-</td><td>Creates a Singular fill-in form for a defined control node.</td></tr><tr><td>destroySingularForm(dom)</td><td>-</td><td>Destroys a Singular fill-in form.</td></tr><tr><td>getAppInstanceInfo()</td><td>Object</td><td>Makes a request to get app instance details.</td></tr><tr><td>getAudioBrowserUrl()</td><td>URL</td><td>Returns the URL for the Singular audio browser.</td></tr><tr><td>getCompositionBrowserUrl()</td><td>URL</td><td>Returns the URL for the Singular composition browser.</td></tr><tr><td>getCompositionById(id)</td><td>Object</td><td>Returns a composition object that is requested by its ID.</td></tr><tr><td>getCompositionByName(name)</td><td>Object</td><td>Returns a composition object that is requested by name.</td></tr><tr><td>getCompositionUrl(comp)</td><td>URL</td><td>Returns the URL for the JSON description of a composition.</td></tr><tr><td>getImageBrowserUrl()</td><td>URL</td><td>Returns the URL for the Singular image browser.</td></tr><tr><td>getOutputById(id)</td><td>Object</td><td>Returns an output by its ID.</td></tr><tr><td>getOutputByName(name)</td><td>Object</td><td>Returns an output by its name.</td></tr><tr><td>imageBrowserEventCallback(windowParent, callback)</td><td>Object</td><td>A callback function to handle image browser events.</td></tr><tr><td>importComposition(comp, callback)</td><td>-</td><td>Imports a composition into an app instance.</td></tr><tr><td>listCompositions()</td><td>Object</td><td>Returns an array of composition names and IDs.</td></tr><tr><td>listOutputs()</td><td>Object</td><td>Returns an array of output names and IDs.</td></tr><tr><td>registerWindow(window)</td><td>-</td><td>Registers a browser window.</td></tr><tr><td>removeAllCompositions(callback)</td><td>-</td><td>Removes all compositions from an app instance.</td></tr><tr><td>removeCompositionById (id, callback)</td><td>-</td><td>Removes compositions by ID from an app instance.</td></tr><tr><td>removeCompositionByName (name, callback)</td><td>-</td><td>Removes compositions by name from an app instance.</td></tr><tr><td>removeSingularForm()</td><td>-</td><td>Removes a Singular fill-in form.</td></tr><tr><td>renderSingularForm()</td><td>-</td><td>Renders a Singular fill-in form.</td></tr><tr><td>storage</td><td>Object</td><td>Returns a storage object for syncing data between app instance UIs.</td></tr></tbody></table>

### ServerDate <a href="#serverdate" id="serverdate"></a>

Returns an object to request time details from the Singular server.

`ServerDate()` is required for synchronizing clocks and timers between an app instance and overlay.

**Return**

`object`: ServerDate object

```
ServerDate: ƒ ServerDate()
> getOffset: ƒ ()
> now: ƒ ()
```

**See also**

Class `ServerDate`

### audioBrowserEventCallback <a href="#audiobrowsereventcallback" id="audiobrowsereventcallback"></a>

Registers the `callback` function for an audio browser select event.

### compositionBrowserEventCallback <a href="#compositionbrowsereventcallback" id="compositionbrowsereventcallback"></a>

Registers the `callback` function for an composition browser select event.

### createSingularForm <a href="#createsingularform" id="createsingularform"></a>

Creates a Singular fill-in-form.

### destroySingularForm <a href="#destroysingularform" id="destroysingularform"></a>

Destroys a Singular fill-in-form.

### getAppInstanceInfo <a href="#getappinstanceinfo" id="getappinstanceinfo"></a>

Makes a request to get app instance details.

```javascript
// The code below prints the app instance info to the console
var appInstanceInfo = singularApp.getAppInstanceInfo();
console.log("appInstanceInfo =", appInstanceInfo);
```

**Return**

`object` : app instance information as a JSON object

```json
{
  "account_id": 1,
  "apptemplate": {
    "id": 347,
    "name": "tm-Lower Third",
    "version": 1
  },
  "fid": "5dab1a49-3a18-4287-856f-5041bde364e9",
  "iLog": 0,
  "id": 377711,
  "name": "tm-Lower Third",
  "noHeader": 0,
  "tenant": null,
  "theme": "",
  "uiLayout": ""
}
```

### getAudioBrowserUrl <a href="#getaudiobrowserurl" id="getaudiobrowserurl"></a>

Returns the URL for the Singular audio browser.

```javascript
// The code below prints the audio browser URL to the console
var audioBrowserUrl = singularApp.getAudioBrowserUrl();
console.log("audioBrowserUrl =", audioBrowserUrl);
```

**Return**

`string`: the audio browser URL

```
audioBrowserUrl = https://app.singular.live/externals/browser?type=audio&showSearch=true&showHeader=true
```

### getCompositionBrowserUrl <a href="#getcompositionbrowserurl" id="getcompositionbrowserurl"></a>

Returns the URL for the Singular composition browser.

```javascript
// The code below prints the composition browser URL to the console
var compositionBrowserUrl = singularApp.getCompositionBrowserUrl();
console.log("compositionBrowserUrl =", compositionBrowserUrl);
```

**Return**

`string`: the composition browser URL

```
compositionBrowserUrl = https://app.singular.live/externals/browser?showSearch=true&showHeader=true
```

### getCompositionById <a href="#getcompositionbyid" id="getcompositionbyid"></a>

Returns a composition object that is requested by its ID.

**Parameters**

| Name          | Type   | Description                |
| ------------- | ------ | -------------------------- |
| compositionId | String | The ID of the composition. |

```javascript
// The code below prints the composition object to the console
var compositionId = "303798-latest-1588928586739";
var compositionObject = singularApp.getComposition(compositionId);
console.log("compositionObject =", compositionObject);
```

**Return**

`object`: a composition object

```
compositionObject:
> getControlNode: ƒ getControlNode()
> getLogicLayer: ƒ getLogicLayer()
> getModel: ƒ getModel()
> getPayload: ƒ getPayload()
> getRefId: ƒ getRefId()
> getSequencer: ƒ getSequencer()
> getState: ƒ getState()
> getSubcompositionById: ƒ getSubcompositionById(id)
> getSubcompositionByName: ƒ getSubcompositionByName(name)
> id: "303798-latest-1589207585405"
> jumpTo: ƒ jumpTo(to)
> listSubcompositions: ƒ listSubcompositions()
> name: "Default"
> playTo: ƒ playTo(to)
> remove: ƒ remove(callback)
> resetAllPayloads: ƒ resetAllPayloads()
> resetPayload: ƒ resetPayload()
> setPayload: ƒ setPayload(payload)
```

**See also**

Class `composition`

### getCompositionByName <a href="#getcompositionbyname" id="getcompositionbyname"></a>

Returns a composition object that is requested by its name.

**Parameters**

| Name            | Type   | Description                  |
| --------------- | ------ | ---------------------------- |
| compositionName | String | The name of the composition. |

```javascript
// The code below prints the composition object to the console
var compositionName = "Default";
var compositionObject = singularApp.getCompositionByName(compositionName);
console.log("compositionObject =", compositionObject);
```

**Return**

`object`: Composition object

```
compositionObject:
> getControlNode: ƒ getControlNode()
> getLogicLayer: ƒ getLogicLayer()
> getModel: ƒ getModel()
> getPayload: ƒ getPayload()
> getRefId: ƒ getRefId()
> getSequencer: ƒ getSequencer()
> getState: ƒ getState()
> getSubcomposition: ƒ getSubcompositionById(id)
> getSubcompositionById: ƒ getSubcompositionById(id)
> getSubcompositionByName: ƒ getSubcompositionByName(name)
> id: "303798-latest-1589207585405"
> jumpTo: ƒ jumpTo(to)
> listSubcompositions: ƒ listSubcompositions()
> name: "Default"
> playTo: ƒ playTo(to)
> remove: ƒ remove(callback)
> resetAllPayloads: ƒ resetAllPayloads()
> resetPayload: ƒ resetPayload()
> setPayload: ƒ setPayload(payload)
```

**See also**

Class `composition`

### getCompositionUrl <a href="#getcompositionurl" id="getcompositionurl"></a>

Returns the URL for the JSON description of a composition.

**Parameters**

| Name        | Type   | Description             |
| ----------- | ------ | ----------------------- |
| composition | Object | The composition object. |

```javascript
// The code below prints the image browser URL to the console
var compositionUrl = singularApp.getCompositionUrl(singularApp.getCompositionByName("Default"));
console.log("compositionUrl =", compositionUrl);
```

**Return**

`string`: the composition URL

```
imageBrowserUrl = https://assets.singular.live/f12f184c9a0eb76ja3beb40478e02a1250/jsons/1BRahf3g9F8bMJleFx5nqQ.json
```

### getImageBrowserUrl <a href="#getimagebrowserurl" id="getimagebrowserurl"></a>

Returns the URL for the Singular image browser.

```javascript
// The code below prints the image browser URL to the console
var imageBrowserUrl = singularApp.getImageBrowserUrl();
console.log("imageBrowserUrl =", imageBrowserUrl);
```

**Return**

`string`: the image browser URL

```
imageBrowserUrl = https://app.singular.live/externals/browser?type=image&showSearch=true&showHeader=true
```

### getOutputById <a href="#getoutputbyid" id="getoutputbyid"></a>

Returns an output object by `id`.

**Parameters**

| Name | Type   | Description           |
| ---- | ------ | --------------------- |
| id   | String | The ID of the output. |

```javascript
// The code below prints the output object to the console
var outputId = "-M6lIq_2TvSmz4cfTSNY";
var outputObject = singularApp.getOutputById(outputId);
console.log("outputObject =", outputObject);
```

**Return**

`object`: the output object

```
outputObject
> getComposition: ƒ output_getComposition(),
> getUrl: ƒ getUrl(),
> id: "-M6lIq_2TvSmz4cfTSNY",
> name: "Default",
> setComposition: ƒ output_setComposition(comp)
```

**See also**

Class `output`

### getOutputByName <a href="#getoutputbyname" id="getoutputbyname"></a>

Returns an output object defined by `name`.

**Parameters**

| Name | Type   | Description                  |
| ---- | ------ | ---------------------------- |
| name | String | The name of the composition. |

```javascript
// The code below prints the output object to the console
var outputName = "Default";
var outputObject = singularApp.getOutputByName(outputName);
console.log("outputObject =", outputObject);
```

**Return**

`object`: output object

```
outputObject
> getComposition: ƒ output_getComposition(),
> getUrl: ƒ getUrl(),
> id: "-M6lIq_2TvSmz4cfTSNY",
> name: "Default",
> setComposition: ƒ output_setComposition(comp)
```

**See also**

Class `output`

### imageBrowserEventCallback <a href="#imagebrowsereventcallback" id="imagebrowsereventcallback"></a>

Registers the `callback` function for the image browser select event.

### importComposition <a href="#importcomposition" id="importcomposition"></a>

Imports a composition into an app instance.

### listCompositions <a href="#listcompositions" id="listcompositions"></a>

Returns an array of composition names and IDs.

```javascript
// The code below prints the audio browser URL to the console
var compositionList = singularApp.listCompositions();
console.log("compositionList =", compositionList);
```

**Return**

`object`: An array of JSON objects

```json
[ "0" { "name": "Default", "id": "303798-latest-1588891446073" } ]
```

### listOutputs <a href="#listoutputs" id="listoutputs"></a>

Returns an array of output names and IDs.

```javascript
// The code below prints the audio browser URL to the console
var outputList = singularApp.listOutputs();
console.log("outputList =", outputList);
```

**Return**

`object`: An array of JSON objects

```json
[ "0" { "name": "Default", "id": "-M6lIq_2TvSmz4cfTSNY" } ]
```

### registerWindow <a href="#registerwindow" id="registerwindow"></a>

Registers a window for Singular browsers.

### removeAllCompositions <a href="#removeallcompositions" id="removeallcompositions"></a>

Removes all compositions from an app instance.

### removeCompositionById <a href="#removecompositionbyid" id="removecompositionbyid"></a>

Removes a composition by its `id`.

### removeCompositionByName <a href="#removecompositionbyname" id="removecompositionbyname"></a>

Removes a composition by its `name`.

### removeSingularForm <a href="#removesingularform" id="removesingularform"></a>

Removes a Singular fill-in-form from the `dom`.

### renderSingularForm <a href="#rendersingularform" id="rendersingularform"></a>

Renders a Singular fill-in form.

### storage <a href="#storage" id="storage"></a>

Returns a storage object for syncing data between app instance UIs.

**Return**

`object`: a storage object

```
storage object:
> get: ƒ (key,callback),
> off: ƒ off(key,cb),
> on: ƒ on(key,cb),
> remove: ƒ remove(key,callback),
> set: ƒ (key,data,callback),
> update: ƒ update(key,data,callback)
```

**See also**

Class storage
