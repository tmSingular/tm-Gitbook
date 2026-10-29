# Class ServerDate

Returns an object to request time details from the Singular server. `ServerDate()` is required for synchronizing clocks and timers between in an app instance and an overlay.

## Methods <a href="#methods" id="methods"></a>

The ServerDate object has following methods:

| Method      | Return type | Description                                                                   |
| ----------- | ----------- | ----------------------------------------------------------------------------- |
| getOffset() | Number      | Returns the time offset between the Singular server and a local device in ms. |
| now()       | Number      | Returns the Singular server time as a UTC timestamp.                          |

### getOffset() <a href="#getoffset" id="getoffset"></a>

Returns the time offset between the Singular server and a local device in ms.

```javascript
// The code below prints the time offset to the console
var timeOffset = singularApp.ServerDate().getOffset();
console.log("timeOffset =", timeOffset);
```

**Return**

`number`: time offset as a number

```
timeOffset = 829.5
```

### now() <a href="#now" id="now"></a>

Returns the Singular server time as a UTC timestamp.

```javascript
// The code below prints the Singular server time to the console
var timeNow = singularApp.ServerDate().now();
console.log("timeNow =", timeNow);
```

**Return**

`number`: server time as a number

```
timeNow = 1588976118246.5a
```
