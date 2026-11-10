# Working with shared data and events

Use local state for an unsent edit, storage for app-instance UI data, and composition payloads for applied graphics values. Start with [Core concepts](core-concepts.md) if those locations are unfamiliar.

## Choose where a value belongs

| Need                                                             | Mechanism                                    | Changes the composition? |
| ---------------------------------------------------------------- | -------------------------------------------- | ------------------------ |
| Edit text before applying it                                     | Input element / local variable               | No                       |
| Restore a draft or share it with another UI of the same instance | `app.storage`                                | No                       |
| Change a graphic's text or other fields                          | Target's `setPayload()`                      | Yes                      |
| Display current composition values                               | Initial payload read plus composition events | Reading does not write   |

Storage is scoped to the app instance. Two UIs connected to that instance can see its shared data; do not assume separate instances share the same storage. An input populated from a storage listener should not automatically write back on every received value.

## Recipe: save a shared draft and apply it separately

Adapt the [lower-third app](examples/lower-third-app.md). Add these elements beside its input:

```html
<button id="save-draft" disabled>Save shared draft</button>
<p id="draft-status" role="status"></p>
```

Add `let disposeDraft = function () {};` at script scope, before `singularAppInit`. Call `disposeDraft()` at the **start** of initialization, before any configuration checks. At the **end** of successful initialization, after the original example assigns handlers and enables buttons, call `disposeDraft = connectSharedDraft(app, child);`. Put the following function at script scope:

```javascript
function connectSharedDraft(app, child) {
  const input = document.getElementById("name");
  const save = document.getElementById("save-draft");
  const apply = document.getElementById("apply");
  const status = document.getElementById("draft-status");
  const key = "lowerThirdDraft";
  let dirty = false;
  let active = true;
  input.oninput = function () { dirty = true; };
  save.disabled = false;
  function onShared(value) {
    if (!active) return;
    if (!value || typeof value.Name !== "string") {
      status.textContent = "No shared draft is available.";
      return;
    }
    if (dirty) {
      status.textContent = "Shared draft changed; your unsaved edit is kept.";
      return;
    }
    input.value = value.Name;
    status.textContent = "Shared draft loaded. Apply sends it to the composition.";
  }
  app.storage.on(key, onShared);
  save.onclick = function () {
    const name = input.value;
    app.storage.set(key, { Name: name }, function () {
      if (!active) return;
      if (input.value === name) dirty = false;
      status.textContent = "Draft saved; composition was not changed.";
    });
  };
  apply.onclick = function () {
    child.setPayload({ Name: input.value });
    status.textContent = "Payload sent; shared draft was not changed.";
  };
  return function dispose() {
    active = false;
    app.storage.off(key, onShared);
    input.oninput = save.onclick = apply.onclick = null;
    save.disabled = true;
  };
}
```

Also register one script-level exit handler:

```javascript
window.addEventListener("beforeunload", function () { disposeDraft(); });
```

This recipe replaces the lower-third app's Apply handler. Save writes storage; Apply writes the composition. A storage notification updates the input only when it has no unsaved edit. Saving clears that unsaved marker when the input still matches the saved value. It does not replay a remote value skipped while editing, and it does not provide transactional conflict resolution.

**Check with two UIs of the same test instance:** Save a draft in A; B receives it if B has no unsaved edit. Type in B, then save a different draft in A; B keeps its edit and displays the conflict message. Reload B to restore the shared draft. Neither saving nor receiving it should alter the output. Apply does.

For a larger app, add an explicit choice to load a newer shared value or keep the local draft. Storage `update()` merges data but does not decide which operator should win a conflicting edit.

## Observe applied payloads

Reading a value and subscribing to later events are separate steps. Composition payload/state subscriptions suppress their initial snapshot in the reference baseline, so populate the UI from `getPayload2()` first.

Use the [composition event example](reference/composition.md#events) to listen on the root and filter `event.compId` for your target child. Preserve unsent edits using a policy like the one above. Do not call `setPayload()` merely because a payload event arrived; that can create a write loop.

## Own and clean up subscriptions

Storage subscriptions use `off(key, callback)` with the original function identity. Composition events use one callback slot per event on an object; `off(event)` clears that slot. Give one component ownership of each slot, and dispose it before replacing that component.

A subcomposition has no equivalent event registration in the reference baseline. Observe its root composition and filter by child ID. See [Storage](reference/storage.md) and [Composition events](reference/composition.md#events).

Next: [Hosted and local development](hosted-and-local-development.md).
