# Storage object

`app.storage` stores shared data for an app instance. Use it for operator UI data such as a saved draft or selection. Saving a draft does not automatically apply it to a composition; call `setPayload` separately when the operator chooses Apply.

| Method | Behavior |
| --- | --- |
| `get(key, callback)` | Read once; callback receives the stored value, which can be `null`. |
| `set(key, data, callback)` | Replace data at the key; optional completion callback has no result argument. |
| `update(key, data, callback)` | Merge an object update at the key; optional completion callback. |
| `remove(key, callback)` | Delete the key; optional completion callback. |
| `on(key, callback)` | Subscribe; callback receives the current value and later changes. |
| `off(key, callback)` | Unsubscribe using the same key and function identity. |

Do not assume a merge resolves concurrent operator edits. Decide whether to preserve an unsent local draft, prompt about conflict, or accept the newest shared value.

```javascript
function watchDraft(app, render) {
  const key = "lowerThirdDraft";
  function onDraft(value) {
    render(value == null ? { Name: "" } : value);
  }
  app.storage.on(key, onDraft);
  return function dispose() {
    app.storage.off(key, onDraft);
  };
}
```

Keep the returned disposer and call it when replacing the UI or reinitializing the app. A new arrow function passed to `off` will not remove the original callback. This signature differs from [composition.off(event)](composition.md#events), which clears an event slot without a callback argument.

For changing an existing app or data node backend, see [Migrate Apps from Firebase to Datastore](../../../releases-and-compatibility/releases-and-compatibility/migrate-apps-from-firebase-to-datastore.md). A storage migration does not by itself replace the SDK bootstrap or its bundled dependencies.

## Read once or subscribe

`get(key, callback)` reads once. `on(key, callback)` delivers the current value and later changes. In both cases, `key` is your app-defined storage key and the callback receives the stored value; an absent value can be `null`.

```javascript
app.storage.get("lowerThirdDraft", function (value) {
  const draft = value && typeof value.Name === "string" ? value : { Name: "" };
  // Display draft in the UI without applying it to the composition.
});
```

## Replace, merge, or remove

| Call | Effect at the key |
| --- | --- |
| `set("lowerThirdDraft", { Name: "Alex Morgan" }, callback)` | Replaces the stored data |
| `update("lowerThirdDraft", { Name: "Jamie Lee" }, callback)` | Merges the supplied object update |
| `remove("lowerThirdDraft", callback)` | Deletes the stored data |

These completion callbacks are optional and take no result argument. The methods are callback-based, rather than Promise-based. A merge does not provide a conflict policy between operators.

## Unsubscribe

`off(key, callback)` needs the exact callback registered with `on`. Keep that reference or retain a disposer such as `watchDraft` above. Call it before replacing a UI or creating another subscription for the same component.

For a complete integration with Save shared draft, Apply, reinitialization, and unsent-edit preservation, see [Working with shared data and events](../shared-data-and-events.md).
