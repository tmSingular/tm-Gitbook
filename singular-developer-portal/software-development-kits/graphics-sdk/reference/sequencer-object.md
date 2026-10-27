# Sequencer object

## Properties <a href="#properties" id="properties"></a>

<table><thead><tr><th width="103">Name</th><th width="113">Type</th><th>Example</th><th>Description</th></tr></thead><tbody><tr><td>seqId</td><td>String</td><td>"-N8o2dhQeHQXZ6Emr2I7"</td><td>The ID of a sequencer.</td></tr></tbody></table>

## Methods <a href="#methods" id="methods"></a>

The sequencer object has the following methods:

<table><thead><tr><th width="233">Method</th><th width="146.33333333333331" align="center">Return type</th><th>Description</th></tr></thead><tbody><tr><td><a href="sequencer-object.md#playtime">play(time)</a></td><td align="center">-</td><td>Plays a sequence to <code>time</code>.</td></tr><tr><td><a href="sequencer-object.md#seektime">seek(time)</a></td><td align="center">-</td><td>Seeks a sequence to <code>time</code>.</td></tr><tr><td><a href="sequencer-object.md#setdurationduration">setDuration(duration)</a></td><td align="center">-</td><td>Sets the duration of a sequence.</td></tr><tr><td><a href="sequencer-object.md#setpayloadpayload">setPayload(payload)</a></td><td align="center">-</td><td>Sets a sequencer payload.</td></tr><tr><td><a href="sequencer-object.md#start">start()</a></td><td align="center">-</td><td>Starts playing a sequence.</td></tr><tr><td><a href="sequencer-object.md#stop">stop()</a></td><td align="center">-</td><td>Stops playing a sequence.</td></tr></tbody></table>

### play(time) <a href="#playtime" id="playtime"></a>

Plays a sequence to a specified `time`.

**Parameters**

| Name | Type   | Description      |
| ---- | ------ | ---------------- |
| time | number | Time in seconds. |

```javascript
sequencer.play(10.5);
```

**See also**

[getSequencer](sdk-functions.md#getsequencer)\
[seek](sequencer-object.md#seektime)\
[start](sequencer-object.md#start)\
[stop](sequencer-object.md#stop)

### seek(time) <a href="#seektime" id="seektime"></a>

Seeks a sequence to a specified `time`.

**Parameters**

| Name | Type   | Description      |
| ---- | ------ | ---------------- |
| time | number | Time in seconds. |

```javascript
sequencer.seek(10.5);
```

**See also**

[getSequencer](sdk-functions.md#getsequencer)\
[play](sequencer-object.md#playtime)\
[start](sequencer-object.md#start)\
[stop](sequencer-object.md#stop)

### setDuration(duration) <a href="#setdurationduration" id="setdurationduration"></a>

Sets the duration of a sequence.

**Parameters**

| Name     | Type   | Description          |
| -------- | ------ | -------------------- |
| duration | number | Duration in seconds. |

```javascript
sequencer.setDuration(120.0);
```

**See also**

[getSequencer](sdk-functions.md#getsequencer)\
[setPayload](sequencer-object.md#setpayloadpayload)

### setPayload(payload) <a href="#setpayloadpayload" id="setpayloadpayload"></a>

Sets the payload of a sequence.

**Parameters**

<table><thead><tr><th width="137.33333333333331">Name</th><th width="185">Type</th><th>Description</th></tr></thead><tbody><tr><td>payload</td><td>JSON</td><td>A payload defining a sequence's data and timing.</td></tr></tbody></table>

```javascript
const payload = {
  "2ed116aa-bb56-49a5-adc4-37f7654312a8": [{
    "beginTime": 2,
    "endTime": 5,
    "controlNode": {
      "payload": {
        "Text": "This is headline 1"
      }
    }
  }, {
    "beginTime": 5,
    "endTime": 9,
    "controlNode": {
      "payload": {
        "Text": "This is headline 2"
      }
    }
  }],
  "dce1e90c-1d8d-4854-87e0-da8eed153105": [{
    "beginTime": 7,
    "endTime": 10,
    "controlNode": {
      "payload": {
        "Image": "https://assets.singular.live/7072b13f9e20b98034f48d6202400ff9/svgs/57VdHBnRTPNEU4yirlLfKm_w880h146.svg",
        "Image Size": "100",
        "Title": "A panel on the left size"
      }
    }
  }]
};

sequencer.setPayload(payload);
```

**See also**

[getSequencer](sdk-functions.md#getsequencer)\
[setDuration](sequencer-object.md#setdurationduration)

### start() <a href="#start" id="start"></a>

Starts playing a sequence.

### stop() <a href="#stop" id="stop"></a>

Stops playing a sequence.
