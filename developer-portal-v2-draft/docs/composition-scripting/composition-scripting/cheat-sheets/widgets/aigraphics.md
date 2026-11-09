# AI Graphics

Widget type **4792**. Use an existing AI Graphics widget named `AI Graphics` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Field | Type | Contract |
| --- | --- | --- |
| `<generated field ID>` | definition-specific | Use the installed definition’s exact fields/shapes; no universal payload |
| `definition` | authoring-only | Never send from a composition script |

Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("AI Graphics");

const wiGraphic = wiMatches[0];
const current = wiGraphic.getPayload() || {};
wiGraphic.setPayload({ headline: "Updated", amount: 42 });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

This example requires an installed definition declaring exactly `headline` (text) and `amount` (numeric). There is no universal generated-field catalog. Use the installed definition’s exact IDs/shapes. Never send `definition` from a composition script. Generated JSON fields receive JSON text; declared buttons use `wiGraphic.click("trigger")` with their exact ID.

## Events and messages

No message contract is established on this page. This does not establish that the widget has no messages.

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
