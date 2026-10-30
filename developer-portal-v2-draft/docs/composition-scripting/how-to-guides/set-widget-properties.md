# Set widget properties

Select the target's loaded [widget payload contract](../api-reference/widget-payloads/README.md). Send only intended content fields, preserving unrelated fields and complete font/template definitions.

Fragments inside an owning composition's `init(comp)`; each destination must be unlinked:

```javascript
const title = comp.findWidget('Title')[0];
if (!title) throw new Error('Title was not found');
title.setPayload({ text: 'Updated title' });
```

```javascript
const image = comp.findWidget('Logo')[0];
if (!image) throw new Error('Logo was not found');
image.setPayload({ image: 'https://example.com/logo.png', objectFit: 'contain' });
```

The image URL is an illustrative placeholder; replace it with a trusted accessible asset and verify loading in the Player.

```javascript
const table = comp.findWidget('Results Table')[0];
if (!table) throw new Error('Results Table was not found');
table.setPayload({ tableContent: JSON.stringify({ content: [{ label: 'First' }] }) });
```

The Table template must expose the exact `label` public control ID. Keep its Composer-authored template relationship. For tile dimensions, use `setSizeX/Y()`, not a guessed content field named width/height.

After changing a value, check readback and actual rendering separately. [Table/Grid](../api-reference/widget-payloads/table-and-grid.md), font loading, and image loading can require asynchronous readiness.
