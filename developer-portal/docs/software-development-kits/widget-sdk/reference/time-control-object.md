# Time control object

The `createTimeControl()` function returns a time control object to manage clocks, timers, and countdowns.

{% code title="Create time control object" %}
```javascript
// This code prints the time control object to the console
const timeControl = SingularWidget.createTimeControl();
console.log(timeControl);
```
{% endcode %}

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

## Properties

<table><thead><tr><th width="212">Name</th><th width="108">Type</th><th>Example</th><th width="257">Description</th></tr></thead><tbody><tr><td>allowBackwardsJump</td><td>Boolean</td><td><code>false</code> (default)</td><td>Allows the timer to jump backward due to network latency when restarting or continue playing a paused timer.</td></tr><tr><td>intervalID</td><td>Integer</td><td></td><td>The interval ID (internal).</td></tr><tr><td>intervalTime</td><td>Integer</td><td>10, 100, 1000</td><td>Interval time in [ms].</td></tr><tr><td>offsetToServerTime</td><td>Integer</td><td></td><td>The time offset of a local browser to Singular server time.</td></tr><tr><td>roundToInterval</td><td>Boolean</td><td><code>true</code> (default)</td><td>Rounds time to the next interval.</td></tr><tr><td>tc</td><td>Object</td><td><code>{</code><br>  <code>"UTC": 0,</code><br>  <code>"isRunning": false,</code><br>  <code>"value": 0</code><br><code>}</code></td><td>The time control object.<br>  UTC: UTC start time [ms];<br>  isRunning: boolean;<br>  value: offset in [ms]</td></tr><tr><td>timeoutID</td><td>Integer</td><td></td><td>The timeout ID (internal).</td></tr><tr><td>updateCallback</td><td>Function</td><td></td><td>A callback function triggered  at every interval.</td></tr></tbody></table>

## Methods

### getCurrentTime()

Returns the current running time of the timer in \[ms].

```javascript
// This code prints the current running time to the console
const currTime = timeControl.getCurrentTime();
console.log("currTime =", currTime);
```

#### Return

&#x20;`integer`: time in \[ms]

```bash
currTime = 1234
```

### setAllowBackwardsJump()

Due to a slow internet connection and/or network latency, clocks can jump backwards when starting, pausing, or restarting. Use the `setAllowBackwardsJump()` call to set this behavior.

#### Parameter

<table><thead><tr><th width="217">Name</th><th width="116.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td>allowBackwardsJump</td><td>Boolean</td><td><code>false</code>: (default) don't allow backwards jump<br><code>true</code>: allow backwards jump</td></tr></tbody></table>

```javascript
// This code avoids backwards jumps
timeControl.allowBackwardsJump(false);
```

#### &#x20;Return

`none`

### setIntervalTime()

Sets the interval frequency for the timer.

#### Parameter

<table><thead><tr><th width="113.33333333333331">Name</th><th width="127">Type</th><th>Description</th></tr></thead><tbody><tr><td>tInterval</td><td>Number</td><td>The interval duration in [ms].</td></tr></tbody></table>

```javascript
// This code sets the interval frequency to 1000 [ms]
const tInterval = 1000;
timeControl.setIntervalTime(tInterval );
```

#### Return

`none`

### setOffsetToServerTime()

Sets the offset from the local browser to the Singular server time.

#### Parameter

<table><thead><tr><th width="108.33333333333331">Name</th><th width="102">Type</th><th>Description</th></tr></thead><tbody><tr><td>tOffset</td><td>Number</td><td>Offset from the local browser time to the Singular server time.</td></tr></tbody></table>

```javascript
// This code sets the offset to the Singular server time in [ms]
const tOffset = 876;
timeControl.setOffsetToServerTime(tOffset);
```

#### Return

`none`

### setRoundToInterval()

Rounds the time to the interval frequency.

#### Parameter

<table><thead><tr><th width="153.33333333333331">Name</th><th width="125">Type</th><th>Description</th></tr></thead><tbody><tr><td>doRounding</td><td>Boolean</td><td><code>true</code>: (default) round time to interval frequency<br><code>false</code>: do not round time</td></tr></tbody></table>



```javascript
// This code sets the round-to-interval flag
timeControl.setRoundToInterval(true);
```

#### Return

`none`

### setTimeControl()

The time control object defines the current timer state.

```javascript
// This code shows examples of the time control object
const tStart = Date.now();
const tcStart = {
  "UTC": tStart,     // set start time to current UTC time in [ms]
  "isRunning": true, // start timer
  "value": 0         // offset is 0
};

// .... later
const tPause = Date.now();
const tcPause = {
  "UTC": tPause,             // set start time to current UTC time in [ms]
  "isRunning": false,        // start false
  "value": tcPause - tcStart // offset is 0
};

// .... even later
const tcContinue = {
  "UTC": Date.now(),         // set start time to current UTC time in [ms]
  "isRunning": true,         // start false
  "value": tcPause - tcStart // offset is 0
};
```

#### Parameter

<table><thead><tr><th width="153.33333333333331">Name</th><th width="162">Type</th><th>Description</th></tr></thead><tbody><tr><td>tc</td><td>object</td><td>The time control object.</td></tr></tbody></table>

```javascript
// This code starts the timer
timeControl.setTimeControl(tcStart)(;
```

#### Return

`none`

### setUpdateCallback()

Sets the time control callback function. This function is called at every interval.

#### Parameter

<table><thead><tr><th width="155.33333333333331">Name</th><th width="128">Type</th><th>Description</th></tr></thead><tbody><tr><td>cb</td><td>function</td><td>The callback function.</td></tr></tbody></table>

```javascript
// The code below updates the timer callback function
timeControl.setUpdateCallback(() => {
  console.log("elapsed time = %d[ms]", timeControl.getCurrentTime());
  // add your code here ...
});
```

#### Return

`none`

```javascript
let tControl = {
    UTC: 0,
    isRunning: false,
    value: value
};

// The code below creates a timecontrol object
const timeControl = SingularWidget.createTimeControl();
// set update callback function
timeControl.setUpdateCallback(updateCallback);
// this will stop the clock from jumping backwards when it is stopped. A jump
// backwards can happen due to network latency
timeControl.setAllowBackwardsJump(false);
// round the time to the interval frequency
timeControl.setRoundToInterval(true);
// tell the timer control object how often to update the callback
timeControl.setIntervalTime(100); //milliseconds

timeControl.setTimeControl(tControl); // todo...

const updateCallback = () => {
  // get current timer value
  let currentTime = timeControl.getCurrentTime();
  console.log("currentTime = %d[ms]", currentTime);
}

```
