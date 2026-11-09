# Metric Text Style

Widget type **4758**. Use an existing Metric Text Style widget named `Metric Text Style` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Payload fields | Contract |
| --- | --- |
| `text`, `font` | First-line text string and complete inspected Font 2.0 metricfont object. Preserve `fontData` and metrics. Empty/whitespace text hides all layers and stops the animator. HTML input is reduced to plain SVG text. |
| `alignment`, `overflow`, `transform` | Inspect the live selection choices. Alignment supports left/center/right and separator alignment. Overflow supports none/clip/fitWidth/fitScale. Transform supports none/uppercase/lowercase/capitalize/small-caps. |
| `letterSpacing`, `wordSpacing` | Numbers, percentages of widget height. |
| `color`, `gradientExtent` | Complete solid/linear/radial gradient object and text/widget extent. |
| `outlineActive`, `outlineColor`, `outlineWidth` | Boolean toggle, complete gradient and width as percentage of height. |
| `shadowActive`, `shadowColor`, `shadowDirection`, `shadowDistance`, `shadowBlur` | Boolean, inspected color value, degrees, distance/blur as percentages of height. |
| `sheenActive`, `sheenColor`, `sheenWidth`, `sheenFalloff`, `sheenAngle`, `sheenIntensity`, `sheenBlend` | Boolean, inspected color, percentage controls, degrees and a live blend selection. |
| `glowActive`, `glowColor`, `glowSize`, `glowStrength` | Boolean, inspected color, size/strength percentage controls. |
| `insetActive`, `insetLeft`, `insetRight`, `insetTop`, `insetBottom` | Boolean and numeric percentages; horizontal uses widget width, vertical uses height. |
| `fillAnimMode`, `sheenAnimMode`, `glowAnimMode` | Mode selectors; use the dynamic fields discovered after selecting each mode for parameters. |
| `emitEvents` | Boolean enabling widget custom `bounds` messages for nonempty rendered text. |


Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Metric Text Style");
if (wiMatches.length !== 1) throw new Error("Expected exactly one Metric Text Style");
const wiTitle = wiMatches[0];
const current = wiTitle.getPayload() || {};
wiTitle.setPayload({ text: "CHAMPIONS", outlineActive: true, outlineWidth: 2 });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

SVG text supports gradient fill, outline, glow, shadow, sheen, and native looping style effects. HTML is reduced to plain SVG text: it does not provide the HTML styling behavior of Text. Preserve complete fonts/gradients. Style loops resume on In and pause in other states; they are distinct from character/word Timeline animation.

## Events and messages

Messages: **bounds**. Activation: `emitEvents: true`. See [message envelopes and listeners](../widget-messages.md).

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
