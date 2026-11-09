# Video Clip

Widget type **812**. Use an existing Video Clip widget named `Video Clip` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Key | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `videoFile` | string | `""` | URL to a video file (`.mp4` or `.webm`). The widget auto-detects playable format. |
| `opacity` | number | — | Opacity (`0`–`100`). |
| `volume` | number | — | Volume (`0`–`100`). Note: the video element is rendered `muted` (browser autoplay restriction), so volume changes may not take effect in practice. |
| `autoplay` | boolean | — | If `true`, starts playing the video automatically. |
| `loop` | boolean | — | If `true`, loops the video. |
| `objectFit` | string | — | Fit mode: `"contain"` (fit entirely, letterbox) or `"cover"` (fill entirely, crop). |
| `shift` | number | — | Alignment shift as a percentage. Shifts the video position when it doesn't perfectly fit the layout. |


Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Video Clip");
if (wiMatches.length !== 1) throw new Error("Expected exactly one Video Clip");
const wiVideo = wiMatches[0];
const current = wiVideo.getPayload() || {};
wiVideo.setPayload({ videoFile: "https://example.com/clip.mp4", autoplay: false, loop: false });
// Call a transport action when playback is required:
wiVideo.click("start");
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

Actions are `start` (reset and play), `play` (resume), `pause`, and `seek0` (pause and seek to zero). Widget 812 is muted; volume does not establish audible output. Payload opacity and tile opacity are separate properties.

## Events and messages

Messages: **loadedmetadata, error, canplay, playing, pause, ended**. Activation: Activation flag not established. See [message envelopes and listeners](../widget-messages.md).

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
