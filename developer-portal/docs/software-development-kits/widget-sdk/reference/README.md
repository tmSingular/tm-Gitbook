# Reference

The reference documentation provided in the following sections describes the Widget SDK structure and methods, and the widget UI definition.

The Widget SDK returns an object with the following properties and methods:

{% code title="Debug Console" overflow="wrap" %}
```bash
SingularWidget {init: ƒ, getStyle: ƒ, instantiate: ƒ, sendCustomMessage: ƒ}
> compositionId: "-NIqFVJ1rRnNsiUQJing"
> createTimeControl: ƒ ()
> init: ƒ (hash)
> instanceId: undefined
> instantiate: ƒ (compName, domTarget, instantiateCallback)
> sendCustomMessage: ƒ (obj)
> widgetId: 4215
> widgetVersion: 1
```
{% endcode %}

## Properties

The widget object has the following properties:

<table><thead><tr><th width="157">Name</th><th width="96.33333333333331">Type</th><th width="224">Example</th><th width="236">Description</th></tr></thead><tbody><tr><td>compositionId</td><td>String</td><td>"-NIqFVJ1rRnNsiUQJing"</td><td>The ID of a (sub)composition.</td></tr><tr><td>instanceId</td><td>String</td><td></td><td>The ID of a widget composition instance.</td></tr><tr><td>widgetId</td><td>Number</td><td>4215</td><td>The ID of a widget template.</td></tr><tr><td>widgetVersion</td><td>Number</td><td>1</td><td>The version of a widget.</td></tr></tbody></table>

## Methods

The widget object has the following methods:

<table><thead><tr><th width="249.33333333333331">Method</th><th width="179">Return type</th><th>Description</th></tr></thead><tbody><tr><td><a href="./#createtimecontrol">createTimeControl()</a></td><td>Object</td><td>Creates a Singular timer object.</td></tr><tr><td><a href="./#init">init()</a></td><td>-</td><td>Registers callback functions for <code>onInit</code>, <code>onValue</code>, <code>onButtonClicked</code>, <code>onEditComp</code>, and <code>onAnimation</code> events.</td></tr><tr><td><a href="./#instantiate">instantiate()</a></td><td>-</td><td>Creates an instantiate of a widget composition.</td></tr><tr><td><a href="./#sendcustommessage">sendCustomMessage()</a></td><td>-</td><td>Sends a custom message to a composition script.</td></tr></tbody></table>

### createTimeControl()

Returns a Singular timer control object.&#x20;

Use `createTimeControl()` to manage timers and synchronize them globally in all composition and output instances.&#x20;

#### Parameter

`none`

#### Return

`object`: Time control object

{% code overflow="wrap" %}
```bash
timeControl: {tc: {…}, allowBackwardsJump: false, roundToInterval: true, intervalID: null, timeoutID: null, …}
> allowBackwardsJump: false
> getCurrentTime: ƒ ()
> intervalID: null
> intervalTime: 1000
> offsetToServerTime: 0
> oldRunningTime: 0
> roundToInterval: true
> setAllowBackwardsJump: ƒ (v)
> setIntervalTime: ƒ (time)
> setOffsetToServerTime: ƒ (time)
> setRoundToInterval: ƒ (v)
> setTimeControl: ƒ (tc)
> setUpdateCallback: ƒ (callback)
> tc: {UTC: 0, isrunning: false, value: 0}
> timeoutID: null
> updateCallback: null
```
{% endcode %}

#### See also

[Time control object](time-control-object.md)

### init()

Initializes and registers callback functions.

```javascript
/**
 * initialize the Singular widget object and define callback functions
 */
SingularWidget.init({
    onInit: onSingularInit,
    onValue: onSingularValue,
    onButtonClicked: onSingularButtonClicked,
    onEditComp: onSingularEditComp,
    onAnimation: onSingularAnimation
});
```

#### Parameter

The `init()` function defines callback functions for events in a JSON object.

<table><thead><tr><th width="207.33333333333331">Event</th><th>Description</th></tr></thead><tbody><tr><td><code>onInit</code></td><td>Called when loading a composition, adding a widget, or closing a widget composition.</td></tr><tr><td><code>onValue</code></td><td>Called when changing a value in a widget UI field.</td></tr><tr><td><code>onButtonClicked</code></td><td>Called when clicking a button in a widget UI.</td></tr><tr><td><code>onEditComp</code></td><td>Called when starting to edit a widget composition. Creates and initializes widget nodes in this callback.</td></tr><tr><td><code>onAnimation</code></td><td>Called when a widget supports custom widget animations and a user selected using the widget animation in the animation timeline.</td></tr></tbody></table>

#### Also see

[Boilerplate example](../guides-and-examples/widget-example-css-patterns.md)

#### Return

`none`

### instantiate()

Creates an instance of a composition and initializes it. This function is only required when a widget supports widget compositions.&#x20;

```javascript
// The code below creates a new composition instance
// compositionId returned by the onValue() callback
const domElement = document.getElementById("container");

// check if compositionInstance exists
if (compInstance != null) {
  compInstance.destroy();
  compInstance = null;
}

SingularWidget.instantiate(compositionId, domElement, function cb(comp) {
  // returns a composition instance
  compInstance = comp;
});
```

#### Parameter

<table><thead><tr><th width="178.33333333333331">Name</th><th width="124">Type</th><th>Description</th></tr></thead><tbody><tr><td>compositionID</td><td>string</td><td>A Composition ID returned by the onValue() function.</td></tr><tr><td>domElement</td><td>html</td><td>An HTML dom element.</td></tr><tr><td>cb</td><td>function</td><td>The callback function.</td></tr></tbody></table>

#### Return

`object`: Composition Instance

{% code overflow="wrap" %}
```bash
compInstance: {onAirRefId: '56344bcd-9b83-43e2-863b-a5e5fde60c4f', getDuration: ƒ,  is2Timeline: ƒ, …}
> animate: ƒ (t)
> destroy: ƒ ()
> getDuration: ƒ ()
> is2Timeline: ƒ ()
> jumpTo: ƒ (t)
> onAirRefId: "56344bcd-9b83-43e2-863b-a5e5fde60c4f"
> playTo: ƒ (t,i)
> resize: ƒ (t,e)
> seek: ƒ (t,i)
> setControlNode: ƒ (t)
> setWidgetNode: ƒ (t)
> stop: ƒ () -> ask Khing
```
{% endcode %}

#### See also

[Composition instance](composition-instance.md)

### sendCustomMessage()

Sends a custom message to the composition script. Registers a message listener in composition script to receive and process the message object.

```javascript
// define custom message object
const message = {
    "type": "json",
    "timestamp": Date.now(),
    "tableJson": jsonData
};
// send custom message object
SingularWidget.sendCustomMessage(message);
```

#### Parameter

<table><thead><tr><th width="126.33333333333331">Name</th><th width="249">Type</th><th>Description</th></tr></thead><tbody><tr><td>message</td><td>string, number, object</td><td>A message object.</td></tr></tbody></table>

#### Return

`none`
