# Grid

Widget type **3284**. Use an existing Grid widget named `Grid` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Field | Type | Contract |
| --- | --- | --- |
| `tableContent` | JSON string / supported decoded shape | Canonical JSON text: {content: items} |
| `composition` | string | Existing cell template relationship |
| `cols, rows` | numeric strings | Positive integer dimensions; product at most 1,000 |
| `colsSpacing, rowsSpacing` | numeric strings | Inspect loaded units/ranges |
| `updateStyle` | selection | update or timeline |
| `currentPage` | numeric string | One-based; 0 hides cells |
| `pageTransitionStyle` | selection | Inspect exact supported IDs |
| `pageTransitionOffset` | numeric string | Total stagger in seconds |
| `showLayout` | boolean | Show layout helper |

Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Grid");
if (wiMatches.length !== 1) throw new Error("Expected exactly one Grid");
const wiGrid = wiMatches[0];
const current = wiGrid.getPayload() || {};
wiGrid.setPayload({ cols: "2", rows: "2", currentPage: "1", tableContent: JSON.stringify({ content: [{ title: "Alpha" }, { title: "Beta" }] }) });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

Requires a cell template with Text control ID `title`. Content fills down columns before moving right. Page 1 starts at item zero; page 0 hides cells. Clear with an empty content array. Validate positive integer dimensions and at most 1,000 cells; template readiness is asynchronous.

## Events and messages

No message contract is established on this page. This does not establish that the widget has no messages.

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
