# Class output

## Properties <a href="#properties" id="properties"></a>

<table><thead><tr><th width="147">Name</th><th width="137">Type</th><th>Example</th><th>Description</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>"-M6lIq_2TvSmz4cfTSNY"</td><td>An output's ID.</td></tr><tr><td>name</td><td>String</td><td>"Default"</td><td>An output's name.</td></tr></tbody></table>

## Methods <a href="#methods" id="methods"></a>

The output object has following methods:

<table><thead><tr><th width="287">Method</th><th width="145">Return type</th><th>Description</th></tr></thead><tbody><tr><td>getComposition()</td><td>Object</td><td>Returns the composition loaded to an output.</td></tr><tr><td>getUrl()</td><td>URL</td><td>Returns an output's output URL.</td></tr><tr><td>setComposition(composition)</td><td>-</td><td>Loads a composition into an output.</td></tr></tbody></table>

### getComposition() <a href="#getcomposition" id="getcomposition"></a>

Returns the composition loaded to an output.

```javascript
// The code below prints the composition object to the console
var outputId = "-M6lIq_2TvSmz4cfTSNY";
var outputObject = singularApp.getOutputaById(outputId);
var compositionObject = outputObject.getComposition();
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

Composition object

### getUrl() <a href="#geturl" id="geturl"></a>

Returns an output's output URL.

```javascript
// This code prints the output URL to the console
var outputId = "-M6lIq_2TvSmz4cfTSNY";
var outputObject = singularApp.getOutputById(outputId);
var outputURL = outputObject.getUrl();
console.log("outputURL =", outputURL);
```

**Return**

`string`: Output URL

```
outputURL = https://app.singular.live/appinstances/388278/outputs/Default/onair
```

### setComposition(composition) <a href="#setcomposition-composition" id="setcomposition-composition"></a>

Loads the composition object `composition` into the output.

**Parameters**

| Name        | Type   | Description            |
| ----------- | ------ | ---------------------- |
| composition | Object | The composition object |

```javascript
// This code loads the composition 'compositionObject' into the output
var outputId = "-M6lIq_2TvSmz4cfTSNY";
var outputObject = singularApp.getOutputById(outputId);
outputObject.setComposition(compositionObject);
```

**Return**

`none`
