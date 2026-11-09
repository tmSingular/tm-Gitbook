# Set widget properties

Select the target's loaded [widget payload contract](../api-reference/widget-payloads/README.md). Send only intended content fields, preserving unrelated fields and complete font/template definitions.

Fragments inside an owning composition's `init(compCurrent)`; each destination must be unlinked:

```javascript
const wiTitle = compCurrent.findWidget('Title')[0];

wiTitle.setPayload({ text: 'Updated title' });
```

```javascript
const wiImage = compCurrent.findWidget('Logo')[0];

wiImage.setPayload({ image: 'https://example.com/logo.png', objectFit: 'contain' });
```

The image URL is an illustrative placeholder; replace it with a trusted accessible asset and verify loading in the Player.

```javascript
const wiTable = compCurrent.findWidget('Results Table')[0];

wiTable.setPayload({ tableContent: JSON.stringify({ content: [{ label: 'First' }] }) });
```

The Table template must expose the exact `label` public control ID. Keep its Composer-authored template relationship. For tile dimensions, use `setSizeX/Y()`, not a guessed content field named width/height.

After changing a value, check readback and actual rendering separately. [Table/Grid](../api-reference/widget-payloads/table-and-grid.md), font loading, and image loading can require asynchronous readiness.
