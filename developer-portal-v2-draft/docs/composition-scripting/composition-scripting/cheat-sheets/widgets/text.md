# Text

Widget type **1032**. Use an existing Text widget named `Text` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Key | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `text` | string | `""` | Text content. Wrap with `<html>...</html>` to render HTML. |
| `color` | string, object | `"white"` | Text color. See Color Formats. |
| `font` | object | — | Complete existing font definition; see [font preservation](../colors-and-nested-objects.md). |
| `lineHeight` | string | `"normal"` | Line height: `"normal"`, `"single"`, `"s1.15"`, `"s1.5"`, `"double"`, `"custom"`. |
| `lineHeightCustom` | number | — | Custom line height as percentage (used when `lineHeight` is `"custom"`). |
| `minimumOfLines` | number | — | Minimum number of lines to reserve space for. |
| `maximumOfLines` | number | — | Maximum number of lines before truncation. |
| `overflow` | string | — | Overflow behavior: `"adjustLetterSize"`, `"adjustLetterWidth"`, `"wrapWord"`, `"wrapLetter"`, `"clip"`, `"ellipsis"`. |
| `letterSpacing` | number | `0` | Letter spacing in pixels. |
| `wordSpacing` | number | `0` | Word spacing in pixels. |
| `indent` | number | `0` | Text indent in pixels (negative for hanging indent). |
| `verticalAlignment` | string | `"top"` | Vertical alignment: `"top"`, `"middle"`, `"bottom"`. |
| `verticalAdjustment` | number | — | Fine-tune vertical position adjustment. |
| `textDirection` | string | — | Text direction CSS value (e.g. `"rtl"`, `"ltr"`). |
| `transform` | string | — | Text transform: `"uppercase"`, `"lowercase"`, `"capitalize"`, `"small-caps"`. |
| `shadowActive` | boolean | `false` | Enable text shadow. |
| `shadowDistance` | number | — | Shadow offset distance. |
| `shadowDirection` | number | — | Shadow direction in degrees. |
| `shadowBlur` | number | — | Shadow blur radius. |
| `shadowColor` | string, object | — | Shadow color. Same formats as `color`. |
| `paddingActive` | boolean | `false` | Enable padding clipping. |
| `paddingLeft` | number | — | Left padding as percentage of widget width / 200. |
| `paddingRight` | number | — | Right padding as percentage of widget width / 200. |
| `paddingTop` | number | — | Top padding as percentage of widget height / 200. |
| `paddingBottom` | number | — | Bottom padding as percentage of widget height / 200. |


Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Text");

const wiText = wiMatches[0];
const current = wiText.getPayload() || {};
wiText.setPayload({ text: "Hello", color: "#ffffff" });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

The `text` field accepts `<html>...</html>` display markup. Font alignment belongs inside the complete `font` object. Preserve existing font fields when changing alignment. See [HTML text](../html-text.md).

## Events and messages

No message contract is established on this page. This does not establish that the widget has no messages.

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
