# Rectangle

Widget type **1022**. Use an existing Rectangle widget named `Rectangle` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Key | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `fillGradient` | string, object | `#cccccc` | Fill color or gradient. See Color & Gradient Formats below. |
| `strokeGradient` | string, object | `#cccccc` | Outline stroke color or gradient. Same formats as `fillGradient`. The fallback is visible only when `strokeWidth` is greater than `0`. |
| `strokeWidth` | number | `0` | Stroke width in pixels (does not use a unit property — always px). |
| `bevelSize` | number | `0` | Bevel/chamfer corner cut size. |
| `bevelSizeUnit` | string | `"%"` | Unit for `bevelSize`: `"%"` (percent of layout width) or `"px"`. |
| `bevelStyle` | string | `"flat"` | Corner treatment: `"flat"` (chamfer), `"outside"` (rounded out), `"inside"` (rounded in). |
| `outlineWidth` | number | `0` | Width of the outline ring (used when `renderStyle` is `"outline"`). |
| `outlineWidthUnit` | string | `"%"` | Unit for `outlineWidth`: `"%"` or `"px"`. |
| `renderStyle` | string | `"filled"` | Render mode: `"filled"` (solid filled shape) or `"outline"` (hollow ring). Use the live schema value `"filled"`; although the renderer treats any value other than `"outline"` as filled, undocumented aliases are not part of the payload contract. |
| `width` | number | `100` | Rectangle width as a percentage of the layout width (`0`–`100`). |
| `height` | number | `100` | Rectangle height as a percentage of the layout height (`0`–`100`). |
| `pivotX` | string | — | Horizontal anchor: `"left"`, `"center"`, `"right"`. |
| `pivotY` | string | — | Vertical anchor: `"top"`, `"center"`, `"bottom"`. |


Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Rectangle");
if (wiMatches.length !== 1) throw new Error("Expected exactly one Rectangle");
const wiShape = wiMatches[0];
const current = wiShape.getPayload() || {};
wiShape.setPayload({ fillGradient: "#123456", width: 80, height: 100, renderStyle: "filled" });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

Payload width/height size the shape inside its tile. Use `setSizeX/Y` for tile dimensions. Stroke width uses pixels; bevel and outline ring have separate unit fields. See [colors and nested objects](../colors-and-nested-objects.md) for a complete gradient example.

## Events and messages

No message contract is established on this page. This does not establish that the widget has no messages.

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
