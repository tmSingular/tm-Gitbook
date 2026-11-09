# Video Animation

Widget type **3934**. Use an existing Video Animation widget named `Video Animation` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Field | Type | Contract |
| --- | --- | --- |
| `videoIn, videoOut, videoLoop` | URL strings | Separate In, Out, and loop assets |
| `objectFit` | selection | contain, cover, fill |
| `shift` | number | Inspect loaded alignment range |
| `loopActive` | boolean | Enable optional loop clip |
| `fadeDuration` | number | Seconds |

Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Video Animation");

const wiVideo = wiMatches[0];
const current = wiVideo.getPayload() || {};
wiVideo.setPayload({ videoIn: "https://example.com/in.webm", videoOut: "https://example.com/out.webm", loopActive: false, fadeDuration: 0.5, objectFit: "cover", shift: 0 });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

Separate In/Out/optional-loop clips follow Composer Timeline animation. `fadeDuration` uses seconds. This is not the Video Clip button API. Replace example URLs with actual clips and verify transitions over time.

## Events and messages

Messages: **loadedmetadata, error, canplay, playing, pause, ended**. Activation: Activation flag not established. See [message envelopes and listeners](../widget-messages.md).

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
