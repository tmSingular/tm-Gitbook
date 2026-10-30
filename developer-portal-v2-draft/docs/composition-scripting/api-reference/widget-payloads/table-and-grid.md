# Table and Grid

Table (1182) and Grid (3284) repeat an authored composition template. Resolve the owning widget by its inspected name, retain its Composer-established `composition` relationship, and address the template's actual public Control Node IDs in each row/item.

For script-owned content, leave `tableContent` unlinked. Do not add a backing Table control just to hold fetched rows or also write a linked destination from script.

## Canonical content format

Fragment inside `init(comp)`; the template must expose a Text control with public ID `label`:

```javascript
const table = comp.findWidget("Results Table")[0];
if (!table) throw new Error("Results Table was not found");
table.setPayload({
  tableContent: JSON.stringify({ content: [
    { label: "First item" },
    { label: "Second item" }
  ] })
});
```

The runtime also accepts a direct row array, an object with `content`, and a stringified row array inside `content`. Decode readback carefully: parse a string, unwrap `content`, parse that if it is a string, then require an array. An invalid shape is not a successful empty result. Use `JSON.stringify({ content: [] })` for an intentional empty dataset.

A static template with no controls can use empty objects to select instance count. Never guess or store a template edit-session ID, and do not invent runtime `update-table` or `update-grid` methods; those names belong to authoring tools.

## Table options

Inspect `elementsPerPage`, `lineSpacing`, `layoutDirection`, `updateStyle`, `pageTransitionStyle`, `pageTransitionOffset`, `showLayout`, and `currentPage`. Preserve inspected numeric-string conventions. Visible pages are one-based; `elementsPerPage` caps visible slots at 100. In the documented renderer, `layoutDirection: "horizontal"` advances hosts vertically; do not infer the alternate choice.

`updateStyle: "update"` changes retained slots. `"timeline"` alternates template instances for exits/entrances. The template owns effective motion: In-only artwork may remain visible without an effective Out effect. Element In plus group Out, or group In plus element Out, are valid combinations; both effects need not exist on each object.

Shrinking content does not establish automatic page-input clamping. Application code owns page policy; do not pad rows or force-hide containers to compensate for missing authored motion.

## Grid options

Inspect `cols`, `rows`, `colsSpacing`, `rowsSpacing`, `updateStyle`, `currentPage`, and transition settings. Current source lays items down a column before moving right. Page 1 starts at item zero; page 2 starts at `cols * rows`; page 0 hides cells. Enforce positive integer dimensions and at most 1,000 allocated cells. These are source-specific behaviors; confirm the loaded version.

`pageTransitionOffset` is total stagger in seconds. Traversal settings affect stagger order, not item layout. Dimension/template/mode changes can rebuild instances. There is no generic Grid start/stop API.

## Verify repeated content

Template instantiation is asynchronous. Test initial population and later bulk replacement, first-item restoration, shrinking, empty data, partial pages, both motion modes, resize, and the exact template relationship used. Successful payload delivery or Player load does not prove repeated rows are ready.

Version-specific source/fixture observations do not guarantee every deployed version or interrupted transition. Separate model identity, saved source, sampled Player output, and actual Control App delivery.
