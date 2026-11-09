# Date / Time Countdown

Widget type **3617**. Use an existing Date / Time Countdown widget named `Date / Time Countdown` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Payload field | Type | Meaning |
| --- | --- | --- |
| `anchorTime` | Integer Unix milliseconds | Absolute target instant. Resolve the requested time zone before conversion. |
| `stopAtZero` | boolean | Clamp elapsed output at zero when true; otherwise continue counting up. |
| `leadingZeros` | boolean | Pad component values below ten, not totals. |
| `composition` | string | Existing widget-owned template ID; normally preserve it. |


Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Date / Time Countdown");
if (wiMatches.length !== 1) throw new Error("Expected exactly one Date / Time Countdown");
const wiCountdown = wiMatches[0];
const current = wiCountdown.getPayload() || {};
const targetTimestampMs = Date.parse("2030-01-01T00:00:00Z");
wiCountdown.setPayload({ anchorTime: targetTimestampMs, stopAtZero: true, leadingZeros: true });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

`anchorTime` is integer Unix milliseconds; resolve timezone before conversion. Invalid targets can leave previous digits displayed. `stopAtZero` clamps output but does not stop the update interval. `timeChanged.time` is duration seconds; `limit` is not a one-shot completion signal. Preserve the template.

## Events and messages

Messages: **timeChanged**. Activation: Emits on successful updates; no activation flag documented. See [message envelopes and listeners](../widget-messages.md).

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
