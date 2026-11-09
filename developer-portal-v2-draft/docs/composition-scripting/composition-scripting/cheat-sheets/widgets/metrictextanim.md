# Metric Text Animation

Widget type **4706**. Use an existing Metric Text Animation widget named `Metric Text Animation` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Key | Type | Renderer fallback / meaning |
| --- | --- | --- |
| `animationTarget` | string | `characters`; `words` keeps whitespace separators outside animated units. |
| `inEffect` | string | `fade`; select from the live effect list. |
| `inEasing` | string | `cubic`; easing profile per unit. |
| `inOrigin` | string | `left`; unit ordering, including center and random options. |
| `inOverlap` | number | 50; percentage overlap between units. |
| `outEffect` | string | `same`; reversed In, or an independent effect with two timelines. |
| `outEasing`, `outOrigin`, `outOverlap` | string, string, number | `cubic`, `left`, 50 for an independent Out effect. |
| `useUpdateAnimation` | boolean | Enabled unless explicitly false. |
| `updateOverlap` | number | 0; overlap of leaving and entering text during native text updates. |
| `in...`, `out...` effect fields | live schema type | Per-effect namespaced parameters, e.g. `inMoveDistance`. Discover after selecting the effect. |


Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Metric Text Animation");
if (wiMatches.length !== 1) throw new Error("Expected exactly one Metric Text Animation");
const wiTitle = wiMatches[0];
const current = wiTitle.getPayload() || {};
wiTitle.setPayload({ text: "Breaking update" });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

Configure a positive-duration Widget Timeline effect in Composer. Native text-change animation requires settled In state, nonempty old/new text, `useUpdateAnimation`, and a text-only delta. Clearing or non-text changes can snap/rebuild. Effect-specific parameters appear after effect selection; inspect exact keys. Base content/font fields follow [Metric Text](metrictext.md). Trusted HTML uses a separate split builder.

## Events and messages

Messages: **bounds**. Activation: `emitEvents: true`. See [message envelopes and listeners](../widget-messages.md).

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
