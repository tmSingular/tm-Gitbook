# Sound

Widget type **3585**. Use an existing Sound widget named `Sound` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Payload field | Type | Meaning |
| --- | --- | --- |
| `file` | string | Approved Player-reachable audio URL; empty means no playable source. |
| `playbackStyle` | string | `in`, `out`, `inout`, or `loop`. |
| `volume` | number | Percentage from `0` to `100`; the renderer normalizes it to media volume `0` to `1`. |


Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Sound");

const wiSound = wiMatches[0];
const current = wiSound.getPayload() || {};
wiSound.setPayload({ file: "https://example.com/sting.mp3", playbackStyle: "in", volume: 80 });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

`file` is an audio URL; volume is 0–100. Playback styles are `in`, `out`, `inout`, and `loop`. Verify actual audio and transition behavior, including autoplay restrictions; a screenshot cannot establish sound output. An empty source provides no playable audio.

## Events and messages

No message contract is established on this page. This does not establish that the widget has no messages.

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
