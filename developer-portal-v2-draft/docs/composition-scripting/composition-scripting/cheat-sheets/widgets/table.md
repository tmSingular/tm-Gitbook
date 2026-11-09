# Table

Widget type **1182**. Use an existing Table widget named `Table` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Field | Type | Contract |
| --- | --- | --- |
| `tableContent` | JSON string / supported decoded shape | Canonical JSON text: {content: rows} |
| `composition` | string | Existing row template relationship |
| `elementsPerPage` | numeric setting | Visible slot count; runtime caps at 100 |
| `lineSpacing` | numeric setting | Percentage spacing between slots |
| `layoutDirection` | selection | Inspect IDs; horizontal advances hosts down the vertical axis |
| `updateStyle` | selection | update or timeline |
| `pageTransitionStyle` | selection | Inspect supported transition IDs |
| `pageTransitionOffset` | numeric setting | Inspect loaded units |
| `showLayout` | boolean | Show layout helper |
| `currentPage` | numeric setting | Visible pages are one-based; application owns clamping |

Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Table");

const wiTable = wiMatches[0];
const current = wiTable.getPayload() || {};
wiTable.setPayload({ tableContent: JSON.stringify({ content: [{ label: "First" }, { label: "Second" }] }) });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

Requires a row template with Text control ID `label`. Keep the existing `composition` relationship. Canonical rows are JSON text containing a `content` array. Clear with an empty array. Pages are one-based; shrinking data does not promise page clamping. `update` changes instances in place; `timeline` alternates instances with template-owned In/Out motion.

## Events and messages

No message contract is established on this page. This does not establish that the widget has no messages.

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
