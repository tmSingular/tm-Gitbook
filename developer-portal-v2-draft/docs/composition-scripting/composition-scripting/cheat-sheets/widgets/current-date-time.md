# Current Date and Time

Widget type **3616**. Use an existing Current Date and Time widget named `Current Date and Time` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Field | Type | Contract |
| --- | --- | --- |
| `offset` | number | Additional seconds; include explicitly in repeated settings writes |
| `format` | string | Moment formatting string |
| `frequency` | selection string | 100, 1000, or 60000 milliseconds |
| `timezone` | selection | local or catalog fixed-offset minutes; preserve ID type |
| `leadingZeros` | boolean | Pad component outputs |
| `language` | selection string | Inspected locale ID or device |
| `composition` | string | Preserve existing template relationship |

Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Current Date and Time");
if (wiMatches.length !== 1) throw new Error("Expected exactly one Current Date and Time");
const wiClock = wiMatches[0];
const current = wiClock.getPayload() || {};
wiClock.setPayload({ offset: 0, format: "YYYY-MM-DD HH:mm:ss", frequency: "1000", timezone: "0", leadingZeros: true, language: "en" });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

Offset uses seconds, frequency milliseconds, and numeric timezone selections represent fixed UTC-offset minutes. No IANA timezone/DST rules are loaded. Include offset explicitly in repeated settings updates. Allow another tick after a locale change. `timeChanged.time` is Unix milliseconds, unlike the duration widgets.

## Events and messages

Messages: **timeChanged**. Activation: Emits on updates; no activation flag documented. See [message envelopes and listeners](../widget-messages.md).

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
