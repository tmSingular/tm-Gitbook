# Bodymovin Loop

Widget type **3783**. Use an existing Bodymovin Loop widget named `Bodymovin Loop` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Payload field | Type | Meaning |
| --- | --- | --- |
| `bodymovinJson` | string | Approved hosted Lottie JSON URL, not inline JSON. |
| `speed` | number | Percentage of the original animation speed; `100` is normal speed. |
| `animationDirection` | string | `forwards`, `backwards`, or `alternating`. |


Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Bodymovin Loop");

const wiAnimation = wiMatches[0];
const current = wiAnimation.getPayload() || {};
wiAnimation.setPayload({ bodymovinJson: "https://example.com/animation.json", speed: 100, animationDirection: "forwards" });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

Speed is percent, with 100 meaning original speed. Directions are `forwards`, `backwards`, and `alternating`. In plays and other nonempty states pause. Asset replacement can preserve cached settings without reapplying them to the new instance; verify replacement instead of using toggles as a workaround.

## Events and messages

No message contract is established on this page. This does not establish that the widget has no messages.

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
