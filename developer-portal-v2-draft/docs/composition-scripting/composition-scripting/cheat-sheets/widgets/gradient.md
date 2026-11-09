# Gradient

Widget type **12**. Use an existing Gradient widget named `Gradient` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Field | Type | Contract |
| --- | --- | --- |
| `css_string` | string | Complete inline paint declarations; empty clears |

Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Gradient");
if (wiMatches.length !== 1) throw new Error("Expected exactly one Gradient");
const wiGradient = wiMatches[0];
const current = wiGradient.getPayload() || {};
wiGradient.setPayload({ css_string: "background: linear-gradient(90deg, #ff0000 0%, #0000ff 100%);" });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

`css_string` is a complete CSS declaration string, not a native gradient object. Each changed style replaces the drawing surface inline style; include all paint declarations that should remain. `css_string: ""` clears paint. Layout still belongs to Composer.

## Events and messages

No message contract is established on this page. This does not establish that the widget has no messages.

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
