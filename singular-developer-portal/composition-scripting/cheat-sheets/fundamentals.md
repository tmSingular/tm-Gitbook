# Fundamentals

This section of the composition scripting documentation includes essential cheat sheets for the following:

* [Composition scripting fundamentals](fundamentals.md#fundamentals)
* The [global script](fundamentals.md#the-global-script)
* [Sub-composition scripts](fundamentals.md#sub-composition-scripts)
* [Object types, properties, and methods](fundamentals.md#object-types-properties-and-methods)
* The [composition object](fundamentals.md#the-composition-object)
* [The widget object](fundamentals.md#the-widget-object)
* [Context and utility functions](fundamentals.md#context-and-utility-functions)
* [Event listeners](fundamentals.md#event-listener)

### Composition scripting fundamentals

The initialization of composition scripts works from the bottom up and  starts from the lowest child up to the root.

All composition scripts have an `init()` and a `close()` function. Initialize your custom code and variables in the `init()` function and use the `close()` function to clean up memory and clear timeouts and intervals.

### The global script

{% code title="Global Script" %}
```javascript
(function() {

  return {

    init: function(context) {
      // ...
    },

    close: function() {
      // ...
    }
  };
})();
```
{% endcode %}

The `init` function is called after the script is evaluated. The context provides access to common objects, including global storage and utility functions.

The `close` function is called when the script is unloaded, for example when a browser tab is closed. Use it to clean up memory and clear timeouts, intervals, XHR requests, etc.

### Sub-composition scripts

{% code title="Root & sub-composition Script" %}
```javascript
(function() {

  return {

    init: function(comp, context) {
      // ...
    },

    close: function(comp, context) {
      // ...
    }
  };
})();
```
{% endcode %}

The `init` function is called after the script is evaluated. The `comp` argument contains the composition object the script is attached to. The context provides access to common objects, including custom global objects and utility functions.

The `close` function is called when the script is unloaded, e.g. when closing the browser tab. Use it to clean up memory and clear timeouts, intervals, XHR requests, etc.

### **Object types, properties, and methods**

### **The composition object**

The composition object provides methods to navigate through the composition structure, read and update content, transformation and effects parameters, access the DOM element, and trigger animations.

The most frequently used methods are:

{% code title="Composition object properties and methods" %}
```log
> find: ƒ ()
> findRegExp: ƒ ()
> findGroup: ƒ ()
> findGroupRegExp: ƒ ()
> findWidget: ƒ ()
> findWidgetRegExp: ƒ ()
> getPayload: ƒ ()
> getPayload2: ƒ ()
> getState: ƒ ()
> getSubcompositionById: ƒ (t)
> id: "1234-5678-abcd-efgh"
> jumpTo: ƒ (i)
> listSubcompositions: ƒ ()
> name: "subCompName"
> parent: ƒ ()
> playTo: ƒ (i)
> setPayload: ƒ (i)
```
{% endcode %}

### Finding Objects with Regular Expressions

Use `findRegExp`, `findWidgetRegExp`, and `findGroupRegExp` for pattern matching. Each name argument accepts a JavaScript `RegExp` object or an exact, case-sensitive string. Strings are never interpreted as regex patterns. Existing `find`, `findWidget`, and `findGroup` methods retain their original behavior.

All three methods return arrays, including an empty array when nothing matches. Regexes can match part of a name; use `^` and `$` for full-name matching and `i` for case-insensitive matching. Every candidate is tested from index zero, including with `g` or `y` flags, and the caller's `lastIndex` is preserved. Invalid name types throw `TypeError`; `findWidgetRegExp` requires one or two arguments.

#### **`find()`**

Returns an array of composition objects that matches the defined search string.&#x20;

```javascript
// We use the first composition with the matching name
const compClock = comp.find("Clock")[0];
```

#### findRegEx&#x70;**`()`**

`findRegExp(...names)` searches descendants (excluding the current composition) for the first name, then matches each remaining name against direct children of the preceding match. Each matching composition appears once. With no arguments it returns an empty array.

```javascript
// Find compositions starting with "Team ", e.g. "Team 1", "Team 2", ...
const teams = comp.findRegExp(/^Team /);
// Find compositions in the subcomposition starting with "Player ", e.g. "Player 1", "Player 2", ...
const players = comp.findRegExp("Scoreboard", /^Player \d+$/);
```

#### findGroup()

Returns an array of group objects that matches the defined search string.

```javascript
// We use the first group with the matching name
const groupLowers = comp.findGroup("Lowers Group")[0];
```

#### findGroupRegExp()

```javascript
// Find all groups starting with "Row "
const rows = comp.findGroupRegExp(/^Row \d+$/);
```

#### findWidget()

Returns an array of widget objects that matches the defined search string.

<pre class="language-javascript"><code class="lang-javascript"><strong>// We use the first widget with the matching name
</strong>const wiTitle = comp.findWidget("Title")[0];

// Find the first matching widget in a group
const wiTeam1Name = comp.findWidget("Team1 Group", "teamName")[0];
const wiTeam2Name = comp.findWidget("Team2 Group", "teamName")[0];
</code></pre>

#### findWidgetRegExp()

`findWidgetRegExp(name)` searches all widgets in the current composition. `findWidgetRegExp(groupName, name)` searches widgets belonging to matching groups in that composition. `findGroupRegExp(name)` searches that composition's groups. These methods do not search inside child compositions.

```javascript
// Find widgets including "score"
const scores = comp.findWidgetRegExp(/score/i);
// Find widgets in the group "Team A" starting with "Name"
const names = comp.findWidgetRegExp("Team A", /^Name/);
// Find widgets named "Score" in groups starting "Team "
const teamScores = comp.findWidgetRegExp(/^Team /, "Score");
```

#### **`getPayload()`**

Returns the control node content from the composition as an array of key value pairs.

```javascript
const payload = comp.getPayload();
console.log(payload);
```

{% code title="Debug console" %}
```log
> [
>   {
>     "key": "Title",
>     "value": "The Title"
>   }
> ]
```
{% endcode %}

#### `getPayload2()`

Returns the control node content from the composition as a JSON object.

```javascript
const payload = comp.getPayload2();
console.log(payload);
```

{% code title="Debug console" %}
```log
> {
>   "Title": "The Title"
> }
```
{% endcode %}

#### `getState()`

Returns the animation state of the composition.&#x20;

<table><thead><tr><th width="180" align="center">Animation state</th><th width="361">Description</th></tr></thead><tbody><tr><td align="center"><code>In</code></td><td>Timeline at In state</td></tr><tr><td align="center"><code>Out</code></td><td>Timeline at Out state</td></tr><tr><td align="center"><code>Out1</code></td><td>Timeline 1 at Out state</td></tr><tr><td align="center"><code>Out2</code></td><td>Timeline 2 at Out state</td></tr></tbody></table>

```javascript
const animState = comp.getState();
console.log(animState );
```

{% code title="Debug console" %}
```log
> In
```
{% endcode %}

#### `getSubcompositionById()`

Returns the composition object defined by its ID.

```javascript
const compClock = comp.getSubcompositionById("ceedfea8-c060-6d2e-2199-c5f794dcbd16");
```

#### `id`

The composition ID.

```javascript
console.log(compClock.id);
```

{% code title="Debug console" %}
```log
> ceedfea8-c060-6d2e-2199-c5f794dcbd16
```
{% endcode %}

#### `jumpTo()`

Jumps to the specified animation state.

```javascript
comp.jumpTo("In");
```

#### `listSubcompositions()`

Returns an array of JSON objects containing sub-composition names and IDs.

```javascript
const subcomps = comp.listSubcompositions();
```

{% code title="Debug console" %}
```log
> [
>   {
>     "id": "-NHTgDrKFKdlaexZeerp",
>     "name": "Clock"
>   }, {
>     ...
>   }
> ]
```
{% endcode %}

#### `name`

The composition name.

```javascript
console.log(compClock.name);
```

{% code title="Debug console" %}
```log
> Clock
```
{% endcode %}

#### `parent()`

Returns the parent composition object.

```javascript
const compParent = comp.parent();
```

#### `playTo()`

Plays the animation to the specified state.

```javascript
comp.playTo("In");
```

#### `setPayload()`

Sets the control node content of the composition.

```javascript
const payload = {"Title": "The Title"};
comp.setPayload(payload);
```

### The widget object

The widget object provides methods to read and update widget specific properties, transformation and effects parameters, and access the `Dom` element.&#x20;

The most frequently used methods are:

{% code title="Widget Object Properties and Methods" %}
```log
> getDomElement: ƒ (t)
> getPayload: ƒ ()
> getPositionX: ƒ (o)
> getPositionY: ƒ (o)
> getRotateZ: ƒ (o)
> getSizeX: ƒ (o)
> getSizeY: ƒ (o)
> getVisibility: ƒ (o)
> id: "262ec4f4-3a1d-43ee-90c5-20116e8b2e49"
> setPayload: ƒ (o)
> setPositionX: ƒ (o)
> setPositionY: ƒ (o)
> setRotateZ: ƒ (o)
> setSizeX: ƒ (o)
> setSizeY: ƒ (o)
> setVisibility: ƒ (o)
```
{% endcode %}

#### `getDomElement()`

Returns the HTML `Dom` element for the widget.

{% code overflow="wrap" %}
```javascript
const wiDom = wiText.getDomElement();
console.log(wiDom);
```
{% endcode %}

{% code title="Debug console" %}
```log
> <div data-singular-type="widget" data-singular-name="Text" id="onair262ec4f4-3a1d-43ee-90c5-20116e8b2e49" 
> style="position: absolute; left: 25%; top: 42.5%; height: 15%; width: 50%; visibility: inherit; z-index: -1; pointer-events: none; opacity: 1;">
> ...
> subComp</div></div></div>
```
{% endcode %}

#### `getPayload()`

Returns the widget type specific properties as a JSON object.

```javascript
const propsText= wiTitle.getPayload();
console.log(props.Text);
```

{% code title="Debug console" %}
```log
> {
>   "color": {...},
>   "font": {...},
>   "indent": 0,
>   "letterSpacing": 0,
>   "lineHeight": "normal",
>   "lineHeightCustom": 115,
>   "maximumOfLines": 1,
>   "minimumOfLines": 1,
>   "overflow": "adjustLetterWidth",
>   "paddingActive": false,
>   "paddingBottom": 0,
>   "paddingLeft": 0,
>   "paddingRight": 0,
>   "paddingTop": 0,
>   "shadowActive": false,
>   "shadowBlur": 2,
>   "shadowColor": {...},
>   "shadowDirection": 45,
>   "shadowDistance": 3,
>   "text": "The Title",
>   "transform": "none",
>   "verticalAdjustment": 0,
>   "verticalAlignment": "baseline",
>   "wordSpacing": 0
> }
```
{% endcode %}

#### `getPositionX()`, `getPositionY()`

Returns the `positionX` or `positionY` value in a percentage.

```javascript
const posX = wiText.getPositionX();
const posY = wiText.getPositionY();
console.log("posX = %d, posY = %d", posX, posY);
```

{% code title="Debug console" %}
```log
> posX = 50, posY = 50
```
{% endcode %}

#### `getRotationZ()`

Returns the `rotationZ` value in degrees.

```javascript
const rotZ = wiText.getRotationZ();
console.log("rotZ = %d", rotZ);
```

{% code title="Debug console" %}
```log
> rotZ = 90
```
{% endcode %}

#### `getSizeX()`, `getSizeY()`

Returns the sizeX or sizeY value in a percentage.

```javascript
const sizeX = wiText.getSizeX();
const sizeY = wiText.getSizeY();
console.log("sizeX = %d, sizeY = %d", sizeX, sizeY );
```

{% code title="Debug console" %}
```log
> sizeX = 25, sizeY = 80
```
{% endcode %}

#### `getVisibility()`

Returns the visibility as a boolean.

```javascript
const isVisible = wiText.getVisibilty();
console.log("isVisible =", isVisible );
```

{% code title="Debug console" %}
```log
> isVisible = true
```
{% endcode %}

#### `id`

Returns the widget ID.

```javascript
console.log(wiText.id);
```

{% code title="Debug console" %}
```log
"262ec4f4-3a1d-43ee-90c5-20116e8b2e49"
```
{% endcode %}

#### `setPayload()`

Sets one or multiple widget specific properties.

```javascript
wiText.setPayload({"text": "The new title"});
```

#### `setPositionX()`, `setPositionY()`

Sets the `positionX` or `positionY` value in a percentage.

```javascript
wiText.setPositionX(75);
wiText.setPositionY(50);
```

#### `setRotateZ()`

Sets the `rotationZ` value in degrees.

```javascript
wiText.setRotationZ(180);
```

#### `setSizeX()`, `setSizeY()`

Sets the `sizeX` or `sizeY` value in a percentage.

```javascript
wiText.setSizeX(50);
wiText.setSizeY(25);
```

#### `setVisibility()`

Sets the visibility as a boolean.

```javascript
wiText.setVisibility(false);
```

### **Context and utility functions**

```javascript
{
  "global": {},
  "utils": {
    createDataStream: ƒ (t,e,i)
    createMoment: ƒ i()
    createTinyColor: ƒ c(e,t)
    getSingularWindow: ƒ ()
  }
}
```

#### `global:{}`

A custom global object including variables, objects, and functions.

#### `utils.createDataStream()`

Creates a data stream listener.&#x20;

{% hint style="info" %}
Create a Data Stream in the [Data Stream Manager](https://support.singular.live/hc/en-us/articles/360056901272-Data-Stream-Manager)!
{% endhint %}

{% code title=" Create and close a Data Stream" %}
```javascript
(function() {

  //  https://support.singular.live/hc/en-us/articles/360056901272-Data-Stream-Manager
  const data_stream_public_token = "your-data-stream-public-token";
  
  // we define the datas tream variable in the global scope
  let datastream = undefined;

  return {

    init: function(comp, context) {

      // we create the data stream object using the public token
      datastream = context.utils.createDataStream(data_stream_public_token,
        (status, payload) => {
          switch (status) {
            case "message":
              console.log("we have received data:", status, payload);
              break;
            case "connecting":
            case "connect":
            case "open":
            case "close":
            case "disconnect":
              console.log("status:", status);
              break;
            case "error":
              console.error("error:", status);
              break;
          }
        });

    },

    close: function(comp, context) {
      // we close the data stream connection
      if (datastream != undefined) {
        datastream.close();
      }
    }
  };
})();

```
{% endcode %}

#### `utils.createMoment()`

Creates a momentjs object.

{% hint style="info" %}
For a detailed description of the momentjs library visit [https://momentjs.com/](https://momentjs.com/).
{% endhint %}

{% code title="Create a momentjs object." %}
```javascript
const myMoment = context.utils.createMoment(1694178435003);
console.log("myMoment =", myMoment.format("HH:MM:SS"));
```
{% endcode %}

{% code title="Debug console" %}
```log
> myMoment = 20:09:00
```
{% endcode %}

#### `utils.createTinyColor()`

Creates a tinycolor object.

{% hint style="info" %}
For a detailed description of the tinycolor library visit [https://github.com/bgrins/TinyColor](https://github.com/bgrins/TinyColor)
{% endhint %}

<pre class="language-javascript" data-title="Create a tinyColor object"><code class="lang-javascript"><strong>const myColor = context.utils.createTinyColor("rgb (255, 0, 0)");
</strong>const hsl = myColor.toHsl();
const hslString = myColor.toHslString();

console.log("hsl =", JSON.stringify(hsl));
console.log("hslString =", hslString);

// calculate text color depending on the background color
const bgColor = "crimson";
const textColor = context.utils.createTinyColor(bgColor).isDark() ? "#FFFFFF" : "000000";
console.log("textColor =", textColor);
</code></pre>

{% code title="Debug console" %}
```log
hsl = {"h":0,"s":1,"l":0.5,"a":1}
hslString = hsl(0, 100%, 50%)
textColor = #FFFFFF
```
{% endcode %}

#### `utils.getSingularWindow()`

Returns the render window name.

```javascript
const singularWindow = context.utils.getSingularWindow();
console.log("Singular window name:", singularWindow);
```

{% code title="Debug console" %}
```log
> Singular window name: app_output or app_control or script_editor
```
{% endcode %}

### Event listener

#### `comp.addListener`(eventType, callbackFunction)

The `addListener()` method attaches an event handler to the composition without overwriting existing event handlers. You can add multiple event handlers for the same event type.

The first parameter defines the type of the event. Event types include:

* [`payload_changed`](fundamentals.md#payload_changed)
* [`state_changed`](fundamentals.md#state_changed)&#x20;
* [`timeline_event`](fundamentals.md#timeline_event)
* [`button_clicked`](fundamentals.md#button_clicked)
* [`datanode_payload_changed`](fundamentals.md#datanode_payload_changed)
* [`message`](fundamentals.md#message)

The second parameter is a function that you call when an event occurs.

#### `payload_changed`

This event occurs when the control nodes of the composition or a sub-composition changes.

The callback function receives three parameters:

* **event**: the type of the event
* **msg**: a JSON object containing the composition ID, name, and payload
* **e**: an event handle<br>

<pre class="language-javascript"><code class="lang-javascript">comp.addListener('payload_changed', (event, msg, e) => {
  if (msg.compositionId === comp.id) {
    console.log("listen to:", event);
<strong>    console.log("msg:", msg);
</strong><strong>  }
</strong>  e.stopPropagation();
});
</code></pre>

{% code title="Debug console" %}
```log
> listen to: payload_changed
> msg: {
>   "compId": "...",
>   "compName": "subComp",
>   "compositionId": "...",
>   "compositionName": "subComp",
>   "payload": {
>     "Title": "The Title."
>   }
> }
```
{% endcode %}

#### `state_changed`

This event occurs at the end of an animation when the animation state of the composition or a sub-composition changes.

The callback function receives three parameters:

* **event**: the type of the event
* **msg**: a JSON object containing the composition ID, name, and new animation state
* **e**: an event

<pre class="language-javascript"><code class="lang-javascript">comp.addListener('state_changed', (event, msg, e) => {
  if (msg.compositionId === comp.id) {
    console.log("listen to:", event);
<strong>    console.log("msg:", msg);
</strong><strong>  }
</strong>  e.stopPropagation();
});
</code></pre>

{% code title="Debug console" %}
```log
> listen to: state_changed
> msg: {
>   "compositionId": "...",
>   "compositionName": "subComp",
>   "state": "In", "Out", "Out1", "Out2"
> }
```
{% endcode %}

#### `timeline_event`

This event occurs at the **start and end of an animation** of the composition or a sub-composition.

The callback function receives three parameters:

* **event**: the type of the event
* **msg**: a JSON object containing the composition ID, name, and timeline event details
* **e**: an event

```javascript
comp.addListener('timeline_event', (event, msg, e) => {
  if (msg.compositionId === comp.id) {
    const message = msg.message;
    console.log("listen to:", event);
    console.log("timeline event:", message.event);
    console.log("msg:", msg);
  }
  e.stopPropagation();
});
```

{% code title="Debug console" %}
```log
> listen to: timeline_event
> timeline event: start
> msg: {
>   "compositionId": "...",
>   "compositionName": "subComp",
>   "message": {
>     "event": "start",
>     "direction": "forward",
>     "timeline": "In",
>     "currentTime": 0,
>     "duration": 0.8,
>     "targetState": "In"
>   }
> }

> listen to: timeline_event
> timeline event: stop
> msg: {
>   "compositionId": "...",
>   "compositionName": "subComp",
>   "message": {
>     "event": "stop",
>     "duration": 0.8,
>     "currentTime": 0.8,
>     "direction": "forward",
>     "timeline": "In",
>     "targetState": "In"
>   }
> }
```
{% endcode %}

#### `button_clicked`

This event occurs when a button control node is clicked.

The callback function receives three parameters:

* **event**: the type of the event
* **msg**: a JSON object containing the composition ID, name, and data node details
* **e**: an event

```javascript
comp.addListener('button_clicked', (event, msg, e) => {
  if (msg.compositionId === comp.id) {
    console.log("listen to:", event);
    console.log("msg:", msg);
  }
  e.stopPropagation();
});
```

{% code title="Debug Console" %}
```
> listen to: button_clicked
> msg: {
>   "compositionId": "...",
>   "compositionName": "subComp",
>   "buttonId": "Button 1"
> }
```
{% endcode %}

#### `datanode_payload_changed`

This event occurs when a data node of the composition or a sub-composition changes.

The callback function receives three parameters:

* **event**: the type of the event
* **msg**: a JSON object containing the composition ID, name, and data node details
* **e**: an event

```javascript
comp.addListener('datanode_payload_changed', (event, msg, e) => {
  console.log("listen to:", event);
  console.log("msg:", msg);
  e.stopPropagation();
});
```

{% code title="Debug Console" %}
```log
> listen to: datanode_payload_changed
> msg: {
>   "compId": "...",
>   "compName": "subComp",
>   "compositionId": "...",
>   "compositionName": "subComp",
>   "payload": {
>     ...
>   }
> }
```
{% endcode %}

#### `message`

This event occurs when the graphics SDK, widgets, and interactive events send custom messages to the comp or a sub comp.

The callback function receives three parameters:

* **event**: the type of the event
* **msg**: a JSON object containing the composition ID, name, details and payload
* **e**: an event

```javascript
comp.addListener('message', (event, msg, e) => {
  if (msg.params && msg.params.compId === comp.id) {
    console.log("listen to:", event);
    console.log("msg:", msg);
  }
  e.stopPropagation();
});
```

The following logs show the `msg` object returned by interactive events.

{% code title="Debug console" %}
```log
> listen to: message
> msg: {
>  "params": {
>    "type": "widget", or "group"
>    "name": "bgButton",
>    "id": "e9a3f5e5-7c19-6f83-8a0e-ecc43dca3997",
>    "compId": "-NHgm9qQim1PjR0Ecnxa",
>    "event": {
>      "button": 0,
>      "shiftKey": false,
>      "altKey": false,
>      "ctrlKey": false,
>      "metaKey": false,
>      "screenX": 848,
>      "screenY": 370,
>      "clientX": 344,
>      "clientY": 269,
>      "offsetX": 334,
>      "offsetY": 2,
>      "layerX": 307,
>      "layerY": 109,
>      "movementX": 0,
>      "movementY": 1,
>      "pageX": 344,
>      "pageY": 269,
>      "x": 344,
>      "y": 269
>    },
>    "info": ""
>  },
>  "type": "mouseenter" or "mousedown" or "mouseleave" or "mouseenter"
> }
```
{% endcode %}
