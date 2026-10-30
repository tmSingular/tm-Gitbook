# Application object

Use the object supplied to `singularAppInit(app)`. Do not confuse it with the global local-bootstrap factory `SingularApp`.

## Lookups and metadata

| Method | Result / behavior |
| --- | --- |
| `listCompositions()` | Array of `{name, id}` records for available imported extracts. |
| `getCompositionById(id)` | Composition or `undefined`; use an extract ID from the list. |
| `getCompositionByName(name)` | First matching composition or `undefined`; prefer IDs when names repeat. |
| `listOutputs()` | Array of `{name, id}` records. |
| `getOutputById(id)` / `getOutputByName(name)` | Output or `undefined`. |
| `getAppInstanceInfo()` | App-instance metadata object. |
| `getCompositionUrl(comp)` | Composition JSON URL (or `undefined`); pass an imported composition object or list record with its extract `id`. |
| `getCompositionInfo(refId, callback)` | Asynchronous source-composition metadata lookup; callback receives metadata, or no value on a failed HTTP response. |
| `registerWindow(window)` | Register a window for SDK UI integration. |

A list is an ordinary JSON array, for example:

```json
[{ "name": "Default", "id": "EXTRACT_ID" }]
```

## Import and remove

`importComposition(selection, callback)` imports the selection object returned by the composition browser. Pass that selection through rather than constructing an undocumented object shape. The 1.0.0 callback reports success or failure:

```javascript
// selection comes from compositionBrowserEventCallback.
app.importComposition(selection, function (result) {
  if (!result || !result.success) {
    console.error("Import failed", result && result.desc);
    return;
  }
  const imported = result.compositionIds || [];
  // compositionId is the EXTRACT ID used by the application lookup.
  const composition = imported[0] &&
    app.getCompositionById(imported[0].compositionId);
  if (!composition) return;
  console.log("Imported", composition.name);
});
```

On success, each `compositionIds` entry has `{name, compositionId, id}`: `compositionId` is the imported extract ID; `id` is its main composition's internal ID. Import does not by itself express which output your UI wants to use. Assign a selected imported composition with [output.setComposition](output.md).

`removeCompositionById(id, callback)`, `removeCompositionByName(name, callback)`, and `removeAllCompositions(callback)` remove imported compositions from the app instance. Their optional completion callbacks do not use the import result shape. Removal can clear affected outputs. Require a deliberate operator action before invoking these commands in your UI.

`app.log.info(title, description)`, `app.log.warn(title, description)`, and `app.log.error(title, description)` send diagnostic messages through the app runtime. Avoid logging tokens, credentials, or complete private payloads.

For `storage`, `ServerDate()`, form creation, and browser URL/event helpers, use the dedicated pages in the [reference index](README.md).
