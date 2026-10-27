# Composition instance

{% code overflow="wrap" %}
```log
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
> stop: ƒ ()
```
{% endcode %}

## Properties

<table><thead><tr><th width="145.33333333333331">Name</th><th width="95">Type</th><th width="180">Example</th><th width="294">Description</th></tr></thead><tbody><tr><td>onAirRefId</td><td>String</td><td>"56344bcd-9b83-43e2-863b-a5e5fde60c4f"</td><td>The ID of the sub-composition that contains the widget.</td></tr></tbody></table>

## Methods

### animate()

Animates a composition instance using the event object(t) produced by an [onAnimation ](/broken/pages/lbVM6qfRVExav9sbmKGj#onsingularanimation)callback.

### destroy()

Destroys a composition instance.

```javascript
// The code below destroys a composition instance

// check if composition instance exists
if (compInstance!= null) {
  compInstance.destroy();
  compInstance= null;
}
```

#### Return

`none`

### getDuration()

Returns the duration of the **In** and **Out** animation timelines.

```javascript
// The code below prints the animation durations to the console
const animDuration = compInstance.getDuration();
console.log("animDuration =", animDuration);
```

#### Return

`object`: JSON object&#x20;

```bash
animationDuration = {
  In: 1.3,
  Out: 0.5
}
```

### is2Timeline()

Returns if a composition instance has one or two timelines.

```javascript
// The code below prints the return value
const has2Timelines = compInstance.is2Timeline();
console.log("has2Timelines =", has2Timelines);
```

#### Return

`boolean` : `false` , has single timeline; `true`, has two timelines

```bash
has2Timelines = true
```

### jumpTo()

Jumps to a specified animation state.&#x20;

#### Parameter

<table><thead><tr><th width="123.33333333333331">Name</th><th width="102">Type</th><th>Description</th></tr></thead><tbody><tr><td>toState</td><td>String</td><td><code>In</code>: jump to "In" state<br><code>Out</code>: jump to "Out" state</td></tr></tbody></table>

```javascript
const toState = "In";
compInstance.jumpTo(toState);
```

### playTo()

Plays the animation to the specified state.

#### Parameter

<table><thead><tr><th width="127.33333333333331">Name</th><th width="113">Type</th><th>Description</th></tr></thead><tbody><tr><td>toState</td><td>String</td><td><code>In</code>: jump to "In" state<br><code>Out</code>: jump to "Out" state</td></tr></tbody></table>

```javascript
const toState = "In";
compInstance.playTo(toState);
```

### resize()

Resizes a composition instance when a window size changes.

```javascript
/**
 * addEventListener for window resizing
 */
window.addEventListener("resize", function() {
    if (windowWidth != window.innerWidth || windowHeight != window.innerHeight) {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        if (compInstance) {
            compInstance.resize(windowWidth, windowHeight);
        }
    }
});
```

#### Return

`none`

### seek()

Seeks the timeline to the specified time in \[s].

#### Parameter

<table><thead><tr><th width="147.33333333333331">Name</th><th width="136">Type</th><th>Description</th></tr></thead><tbody><tr><td>t</td><td>Number</td><td>Time in [s].</td></tr></tbody></table>

```javascript
const t = 1.5; // 1.5 [s]
compInstance.seek(t);
```

#### Return

`none`

### setControlNode()

Sets the content of control nodes defined in a composition instance.&#x20;

{% hint style="info" %}
Users can manually define control nodes in widget compositions.
{% endhint %}

#### Parameter

<table><thead><tr><th width="155.33333333333331">Name</th><th width="134">Type</th><th>Description</th></tr></thead><tbody><tr><td>payload</td><td>JSON</td><td>A payload that contains control node content.</td></tr></tbody></table>

<pre class="language-javascript" data-overflow="wrap"><code class="lang-javascript"><strong>// The code below sets content of the control nodes "Pos", "Name", and "Age" in the composition instance.
</strong><strong>const payload = {
</strong>  "Pos": 1,
  "Name": "John Doe",
  "Age": "32"
};

compInstance.setControlNode(payload);
</code></pre>

#### Return

`none`

### setWidgetNode()

Sets the content of widget nodes defined in a composition instance.&#x20;

{% hint style="info" %}
Widget nodes are created programmatically and managed by the widget dynamically.
{% endhint %}

#### Parameter

<table><thead><tr><th width="127.33333333333331">Name</th><th width="152">Type</th><th>Description</th></tr></thead><tbody><tr><td>payload</td><td>JSON</td><td>A payload containing widget node content.</td></tr></tbody></table>

{% code overflow="wrap" %}
```javascript

// The code below sets content of the widget nodes "id", "longitude", "latitude", and "temperature" in the composition instance.
const payload = {
  "id": 1001,
  "longitude": 45.67,
  "latitude": 18.97,
  "temperature": "25°C"
};

compInstance.setWidgetNode(payload);
```
{% endcode %}

#### Return

`none`

### stop()

Stops a widget animation.
