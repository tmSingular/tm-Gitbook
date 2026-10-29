# Context & utilities

The `context` object is available in the `init` function of every script type.

| Property / Method                                 | Description                                                                               |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `context.global`                                  | Shared object for storing variables and functions across scripts                          |
| `context.utils.createDataStream(token, callback)` | Creates a Singular Data Stream listener                                                   |
| `context.utils.createMoment(timestamp)`           | Creates a [Moment.js](https://momentjs.com) object for date/time formatting               |
| `context.utils.createTinyColor(value)`            | Creates a [TinyColor](https://github.com/bgrins/TinyColor) object for colour manipulation |
| `context.utils.getSingularWindow()`               | Returns the render context: `"app_output"`, `"app_control"`, or `"script_editor"`         |

## createMoment()

```javascript
// Moment.js — format a Unix timestamp
const t = context.utils.createMoment(1694178435003);
console.log(t.format("HH:mm:ss")); // > "20:09:00"
```

## createTinyColor()

```javascript
// TinyColor — convert and manipulate colours
const color = context.utils.createTinyColor("rgb(255, 0, 0)");
console.log(color.toHslString()); // > "hsl(0, 100%, 50%)"

// Calculate a legible text colour based on background
const bg = context.utils.createTinyColor("crimson");
const textColor = bg.isDark() ? "#FFFFFF" : "#000000";
```

## createDataStream()

```javascript
// Data Stream
const token = "your-public-token";
let datastream;

// In init():
datastream = context.utils.createDataStream(token, (status, payload) => {
  if (status === "message") {
    console.log("Received:", payload);
  }
});

// In close():
if (datastream) datastream.close();
```
