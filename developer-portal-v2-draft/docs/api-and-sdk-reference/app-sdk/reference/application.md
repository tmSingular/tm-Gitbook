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

## Lookup parameters and missing results

| Signature | Parameter | Result |
| --- | --- | --- |
| `getCompositionById(id)` | String extract ID from `listCompositions()` | Imported composition, or `undefined` |
| `getCompositionByName(name)` | String imported-composition name | First match, or `undefined` |
| `getOutputById(id)` | String output ID from `listOutputs()` | Output, or `undefined` |
| `getOutputByName(name)` | String output name | Output, or `undefined` |

List methods take no arguments and return ordinary arrays. A composition source reference ID is not an extract ID. Check every optional result before using it.

## getAppInstanceInfo()

Returns metadata for the connected instance. This shortened illustrative response shows the app-definition metadata separately from the instance identity; inspect your runtime's returned object for additional fields.

```javascript
const info = app.getAppInstanceInfo();
const template = info && info.apptemplate;
if (template) console.log("App version", template.version);
```

```json
{
  "id": 123456,
  "name": "Test lower third",
  "apptemplate": { "id": 123, "name": "Lower-third app", "version": 1 }
}
```

These numbers are illustrative, rather than usable identifiers. Avoid logging the complete metadata object if it contains account-specific information.

## getCompositionUrl(comp)

Pass an imported composition object or list record containing its extract `id`. The result is a composition JSON URL, or `undefined` if unavailable.

```javascript
const output = app.getOutputByName("Default");
const composition = output && output.getComposition();
const url = composition && app.getCompositionUrl(composition);
if (url) console.log("Composition URL is available");
```

The JSON URL and output URL serve different purposes. `output.getUrl()` displays the rendered output.

## getCompositionInfo(refId, callback)

`refId` identifies the source composition, for example the root's `getRefId()` result. The callback receives the metadata object, or no value on a failed HTTP response. The call is asynchronous; its immediate return value is not the metadata and it is not a Promise.

```javascript
app.getCompositionInfo(composition.getRefId(), function (info) {
  if (!info) return;
  // Read the source metadata needed by this UI.
});
```

The equivalent root method is `composition.getCompositionInfo(callback)`.

## importComposition(selection, callback)

| Argument | Meaning |
| --- | --- |
| `selection` | Selection object delivered by the composition browser; pass it through unchanged |
| `callback` | Receives a result with `success` and, on success, `compositionIds` |

For each returned entry, use `compositionId` for application lookup. The entry's `id` identifies the root internally. The example in [Import and remove](#import-and-remove) checks failure and resolves the first imported extract. For multiple entries, present the imported choices rather than silently assigning the first one.

After successful import, choose an output and call its `setComposition(composition)` with the resolved object. Import and assignment form two explicit steps in your UI. The browser integration is documented under [Forms and asset browsers](forms-and-browsers.md#asset-browser-helpers).

## Removal callbacks

`removeCompositionById(id, callback)` takes an extract ID. `removeCompositionByName(name, callback)` takes an imported name. `removeAllCompositions(callback)` affects every imported composition in this instance. The optional completion callbacks take no result argument; handle them as completion notifications rather than import-style success objects.

For example, inside a deliberate Remove action:

```javascript
app.removeCompositionById(extractId, function () {
  // Refresh the UI's composition choices and output assignments.
});
```

Removal can clear output assignments. It does not just release a JavaScript reference.

## registerWindow(window)

Pass the browser window object used for SDK UI integration. This registers a window; it does not create a form, import a composition, or initialize the app. Browser selection helpers have their own registration methods on the [forms and browsers page](forms-and-browsers.md).
