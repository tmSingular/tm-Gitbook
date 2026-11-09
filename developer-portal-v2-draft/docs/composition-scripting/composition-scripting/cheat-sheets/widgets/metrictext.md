# Metric Text

Widget type **4662**. Use an existing Metric Text widget named `Metric Text` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Key | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `text` | string | `""` | Text content. Only content before the first newline is rendered. Empty or whitespace-only text is hidden. Optional `<html>...</html>` markup is unsanitized; use trusted display markup only. |
| `font` | object | — | Complete existing font definition; see [font preservation](../colors-and-nested-objects.md). |
| `color` | string, object | `"white"` | Solid text color: a supported CSS color string or RGBA object. A structured gradient contributes only its `solidColor` (or fallback white); gradient stops are not rendered. Use Metric Text Style for gradient text. |
| `alignment` | string | `"left"` | Horizontal alignment: `"left"`, `"center"`, `"right"`, or `"align"` + character (e.g. `"align."` aligns on the last `.`). |
| `overflow` | string | `"none"` | Overflow behavior: `"none"`, `"clip"` (clips horizontally), `"fitScale"` (uniform scale to fit width), `"fitWidth"` (scale X only to fit width). |
| `letterSpacing` | number | `0` | Letter spacing as percentage of widget height. |
| `wordSpacing` | number | `0` | Word spacing as percentage of widget height. |
| `transform` | string | — | Text transform: `"uppercase"`, `"lowercase"`, `"capitalize"`, `"small-caps"`. |
| `shadowActive` | boolean | — | Enable text shadow. |
| `shadowDirection` | number | — | Shadow direction in degrees. |
| `shadowDistance` | number | — | Shadow distance as percentage of widget height. |
| `shadowBlur` | number | — | Shadow blur radius as percentage of widget height. |
| `shadowColor` | string, object | — | Shadow color. Same formats as `color`. |
| `insetActive` | boolean | — | Enable inset padding. |
| `insetLeft` | number | — | Left inset as percentage of widget width. |
| `insetRight` | number | — | Right inset as percentage of widget width. |
| `insetTop` | number | — | Top inset as percentage of widget height. |
| `insetBottom` | number | — | Bottom inset as percentage of widget height. |
| `emitEvents` | boolean | — | If `true`, emits a `bounds` custom message with text bounding box. |


Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Metric Text");
if (wiMatches.length !== 1) throw new Error("Expected exactly one Metric Text");
const wiTitle = wiMatches[0];
const current = wiTitle.getPayload() || {};
wiTitle.setPayload({ text: "12.345", alignment: "align.", overflow: "fitScale" });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

Only the first plain-text line renders. `align.` aligns the last decimal separator. Preserve the complete Font 2.0 object, including metrics. HTML markup is supported; structured gradient stops are not rendered by `color`. See [HTML text](../html-text.md).

## Events and messages

Messages: **bounds**. Activation: `emitEvents: true`. See [message envelopes and listeners](../widget-messages.md).

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
