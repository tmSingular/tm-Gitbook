# Bodymovin

Widget type **3367**. Use an existing Bodymovin widget named `Bodymovin` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Payload key | Type | Default | Meaning |
| --- | --- | --- | --- |
| `bodymovinJson` | string | `""` | Hosted Bodymovin/Lottie JSON URL. This is not inline JSON. |


Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Bodymovin");
if (wiMatches.length !== 1) throw new Error("Expected exactly one Bodymovin");
const wiAnimation = wiMatches[0];
const current = wiAnimation.getPayload() || {};
wiAnimation.setPayload({ bodymovinJson: "https://example.com/animation.json" });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

Replace the example URL with hosted Lottie JSON. The Widget Timeline effect drives playback; this widget has no public speed/loop/frame payload or play/pause button contract. A changed URL reloads asynchronously and does not guarantee playback-state preservation.

## Events and messages

No message contract is established on this page. This does not establish that the widget has no messages.

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
