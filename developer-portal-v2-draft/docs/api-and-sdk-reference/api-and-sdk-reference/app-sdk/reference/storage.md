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
