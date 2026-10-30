# App SDK composition object

A composition object represents one imported extract in an app instance. Obtain it from `app.getCompositionById(extractId)` or `output.getComposition()`. Its `id` and `compExtractId` identify that extract; `name` is its display name. `getRefId()` returns the source composition reference ID.

## Control data

| Method | Result / behavior |
| --- | --- |
| `getControlNode()` | Control node object containing `model` and `payload`, or `undefined`. |
| `getModel()` | Array of field descriptor objects, or `undefined` when no data is available. |
| `getModelGroups()` | Model group data; empty array when unavailable. |
| `getPayload()` | Array of `{key, value}` pairs, or `undefined`. |
| `getPayload2()` | Payload object keyed by field ID, or `undefined`. |
| `setPayload(payload)` | Send field updates keyed by control ID; no synchronous result. |
| `resetPayload()` | Reset this node's fields to model defaults. |
| `resetAllPayloads()` | Reset payloads throughout the imported composition. |
| `getLogicLayer()` | Read the node's logic-layer data. |
| `getProp(prop)` | Read the named composition property. |

The payload getters have different shapes:

```json
[{ "key": "Name", "value": "Alex Morgan" }]
```

```json
{ "Name": "Alex Morgan" }
```

Use field **IDs** from the model, preserve each field's value type, and handle missing control nodes. A field title may differ from its ID. These are App SDK payload methods; composition scripting's `getControlNode().getPayload()` chain belongs to a different API.

## Children and animation

`listSubcompositions()` returns direct children as `{name, id}` records. `getSubcompositionById(id)` and `getSubcompositionByName(name)` look up a direct child; traverse the hierarchy one parent at a time. Check the list before looking up an ID. `find(...)` is also exported in 1.0.0, but its positional search contract is not specified here; use explicit traversal for predictable lookup.

`playTo("In")` / `playTo("Out")` animate to the requested state. `jumpTo("In")` / `jumpTo("Out")` change state without playing the transition. These commands do not return the animation state. `getState()` returns `"In"`, `"Out"`, or `undefined` when unavailable; internally stored `Out1` and `Out2` are reported as `Out` by this getter.

## Events

`composition.on(event, callback)` assigns one callback slot per event on this composition object. Registering another callback for the same event replaces it. `composition.off(event)` clears that slot. A subcomposition object has no equivalent `on` / `off` export in the inspected library; observe its parent composition and filter by ID.

| Event | Callback data |
| --- | --- |
| `payload_changed` | `{compId, compositionId, compName, compositionName, payload}` |
| `state_changed` | `{compId, compositionId, compName, compositionName, state}` |
| `animation_state` | Composition animation-state data from the runtime; no fixed schema established here. |

For the root node, the event's `compId` is the extract ID; for a child it is the child ID. Payload/state change subscriptions suppress their initial database snapshot in 1.0.0: read initial values explicitly before waiting for changes. Treat subsequent event `state` as runtime data; it is not normalized through `getState()`.

```javascript
function observeChild(composition, child, render) {
  render(child.getPayload2() || {});
  composition.on("payload_changed", function (event) {
    if (event.compId === child.id) render(event.payload);
  });
  return function dispose() {
    composition.off("payload_changed");
  };
}
```

Give a single UI component ownership of each event slot so its cleanup does not remove another component's callback.

## Metadata and removal

`getCompositionInfo(callback)` asynchronously requests source metadata. `getUISettings()` and `getDisplayVariants()` expose extract metadata in 1.0.0. `remove(callback)` removes this imported composition and clears its associated output assignments; it is not a UI cleanup method. Its completion callback has no result argument.

`getSequencer()` is commented out of the 1.0.0 exported composition and subcomposition objects. Do not use it as an App SDK method merely because another Singular SDK exposes a sequencer. Internal `_setOutput` / `_removeOutput` helpers are not application integration points.
