# Metric Text ML

Widget type **4671**. Use an existing Metric Text ML widget named `Metric Text ML` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Key | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `text` | string | `""` | Text content. Wrap with `<html>...</html>` to render HTML. Newlines separate lines. |
| `font` | object | — | Complete existing font definition; see [font preservation](../colors-and-nested-objects.md). |
| `color` | string, object | `"white"` | Solid text color using the Metric Text color contract. Gradient stops are not rendered; Metric Text Style supports gradient text but is single-line. |
| `alignment` | string | `"left"` | Horizontal alignment: `"left"`, `"center"`, `"right"`. |
| `lineHeight` | number | `100` | Line height as percentage (e.g. `120` = 1.2× line spacing). |
| `minLines` | number | `1` | Minimum number of lines to reserve space for. |
| `maxLines` | number | — | Maximum number of lines before truncation. Defaults to `minLines`. |
| `ellipsis` | boolean | `false` | When truncation is required at `maxLines`, append an ellipsis (`…`) to the last surviving text run. |
| `verticalAlignment` | string | `"top"` | Vertical alignment: `"top"`, `"center"`, `"bottom"`; `"middle"` is a renderer compatibility alias. |
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
const wiMatches = compCurrent.findWidget("Metric Text ML");

const wiTitle = wiMatches[0];
const current = wiTitle.getPayload() || {};
wiTitle.setPayload({ text: "First line\nSecond line" });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

Wrapping, truncation, line count, and line spacing affect bounds. Bounds width is the union of rendered line fragments, not the wrapping-column width. Preserve Font 2.0 metrics. Wrap trusted HTML in `<html>...</html>`; verify wrapping and truncation with the actual markup. See [HTML text](../html-text.md).

## Events and messages

Messages: **bounds**. Activation: `emitEvents: true`. See [message envelopes and listeners](../widget-messages.md).

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
