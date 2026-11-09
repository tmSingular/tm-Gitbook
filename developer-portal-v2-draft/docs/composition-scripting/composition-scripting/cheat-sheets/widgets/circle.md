# Circle

Widget type **1052**. Use an existing Circle widget named `Circle` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Key | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `fillGradient` | string, object | `#cccccc` | Fill color or gradient. See Rectangle color and gradient formats. |
| `strokeGradient` | string, object | `"black"` | Outline stroke color or gradient. Same formats as `fillGradient`. |
| `strokeWidth` | number | `0` | Stroke width in pixels. |
| `radius` | number | `100` | Radius as a percentage of the layout size (`0`–`100`). |
| `holeSize` | number | `0` | Donut hole size as a percentage of the radius (`0`–`100`). `0` = solid circle. |
| `startAngle` | number | `0` | Arc start angle in degrees. |
| `endAngle` | number | `0` | Arc end angle in degrees. |
| `keepAspect` | boolean | `false` | If `true`, forces the circle to stay perfectly round regardless of layout aspect ratio. |


Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Circle");
if (wiMatches.length !== 1) throw new Error("Expected exactly one Circle");
const wiShape = wiMatches[0];
const current = wiShape.getPayload() || {};
wiShape.setPayload({ fillGradient: "orange", startAngle: 0, endAngle: 360, holeSize: 40 });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

Zero degrees is at the top and angles increase clockwise. Equal input angles draw nothing; 0 to 360 draws a full circle. Larger endpoints normalize, so 0 to 450 is not a full circle. `holeSize` is percentage of radius.

## Events and messages

No message contract is established on this page. This does not establish that the widget has no messages.

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
