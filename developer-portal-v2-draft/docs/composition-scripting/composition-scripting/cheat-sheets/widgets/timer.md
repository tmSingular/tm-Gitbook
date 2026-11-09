# Timer widget

Widget type **3558**. Use an existing Timer widget widget named `Timer widget` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Payload field | Type | Meaning |
| --- | --- | --- |
| `timeControl` | object | Native `{UTC,isRunning,value}` state; normally preserve the linked Control Node value. |
| `beginHours`, `beginMinutes`, `beginSeconds` | number | Starting offset components. |
| `endHours`, `endMinutes`, `endSeconds` | number | Optional terminal components. |
| `endActive` | boolean | Clamp at the end value when true. |
| `format` | string | Moment UTC formatting string. |
| `composition` | string | Widget-owned template ID; preserve unless intentionally replacing it. |
| `frequency` | string | Update interval in milliseconds: `"100"`, `"1000"`, or `"60000"`. |
| `leadingZeros` | boolean | Pad component outputs below ten. |


Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Timer widget");

const wiTimer = wiMatches[0];
const current = wiTimer.getPayload() || {};
wiTimer.setPayload({ format: "mm:ss", frequency: "1000", leadingZeros: true });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

This widget consumes legacy Time Control state; it is not a native Timer Control Node. Preserve its existing `timeControl` and template relationship. Time formatting wraps component hours; totals are separate Widget Node outputs. `timeChanged.time` uses elapsed seconds, and `limit` can repeat while clamped.

## Events and messages

Messages: **timeChanged**. Activation: Emits on updates; no activation flag documented. See [message envelopes and listeners](../widget-messages.md).

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
