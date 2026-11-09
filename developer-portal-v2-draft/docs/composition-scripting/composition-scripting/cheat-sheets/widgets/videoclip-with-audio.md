# Video Clip with Audio

Widget type **4307**. Use an existing Video Clip with Audio widget named `Video Clip with Audio` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

The example below shows a supported payload shape. Use the complete property table on [Video Clip](videoclip.md).

Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Video Clip with Audio");
if (wiMatches.length !== 1) throw new Error("Expected exactly one Video Clip with Audio");
const wiVideo = wiMatches[0];
const current = wiVideo.getPayload() || {};
wiVideo.setPayload({ videoFile: "https://example.com/clip.mp4", autoplay: false, volume: 80 });
wiVideo.click("play");
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

Uses the [Video Clip](videoclip.md) payload and action contract, but does not force muting. Volume is 0–100. Audible output remains subject to browser policy and device state.

## Events and messages

Messages: **loadedmetadata, error, canplay, playing, pause, ended**. Activation: Activation flag not established. See [message envelopes and listeners](../widget-messages.md).

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
