# App SDK composition object

A composition object represents one imported extract in an app instance. Obtain it from `app.getCompositionById(extractId)` or `output.getComposition()`. Its `id` and `compExtractId` identify that extract; `name` is its display name. `getRefId()` returns the source composition reference ID.

## Control data

| Method                | Result / behavior                                                            |
| --------------------- | ---------------------------------------------------------------------------- |
| `getControlNode()`    | Control node object containing `model` and `payload`, or `undefined`.        |
| `getModel()`          | Array of field descriptor objects, or `undefined` when no data is available. |
| `getModelGroups()`    | Model group data; empty array when unavailable.                              |
| `getPayload()`        | Array of `{key, value}` pairs, or `undefined`.                               |
| `getPayload2()`       | Payload object keyed by field ID, or `undefined`.                            |
| `setPayload(payload)` | Send field updates keyed by control ID; no synchronous result.               |
| `resetPayload()`      | Reset this node's fields to model defaults.                                  |
| `resetAllPayloads()`  | Reset payloads throughout the imported composition.                          |
| `getLogicLayer()`     | Read the node's logic-layer data.                                            |
| `getProp(prop)`       | Read the named composition property.                                         |

The payload getters have different shapes:

```json
[{ "key": "Name", "value": "Alex Morgan" }]
```

```json
{ "Name": "Alex Morgan" }
```

Use field **IDs** from the model, preserve each field's value type, and handle missing control nodes. A field title may differ from its ID. These are App SDK payload methods; composition scripting's `getControlNode().getPayload()` chain belongs to a different API.

## Children and animation

`listSubcompositions()` returns direct children as `{name, id}` records. `getSubcompositionById(id)` and `getSubcompositionByName(name)` look up a direct child; traverse the hierarchy one parent at a time. Check the list before looking up an ID. Use explicit hierarchy traversal for predictable lookup; see [Compatibility](../compatibility.md) for legacy/search interfaces.

`playTo("In")` / `playTo("Out")` animate to the requested state. `jumpTo("In")` / `jumpTo("Out")` change state without playing the transition. These commands do not return the animation state. `getState()` returns `"In"`, `"Out"`, or `undefined` when unavailable; internally stored `Out1` and `Out2` are reported as `Out` by this getter.

## Events

`composition.on(event, callback)` assigns one callback slot per event on this composition object. Registering another callback for the same event replaces it. `composition.off(event)` clears that slot. A subcomposition object has no equivalent `on` / `off` export in the reference baseline; observe its parent composition and filter by ID.

| Event             | Callback data                                                                        |
| ----------------- | ------------------------------------------------------------------------------------ |
| `payload_changed` | `{compId, compositionId, compName, compositionName, payload}`                        |
| `state_changed`   | `{compId, compositionId, compName, compositionName, state}`                          |
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

See [Compatibility](../compatibility.md) for legacy interfaces and sequencer availability. Internal `_setOutput` / `_removeOutput` helpers are not application integration points.

## getControlNode() and getModel()

Both methods take no arguments. `getControlNode()` returns the native form's combined model/payload description, or `undefined`. `getModel()` returns an array of field descriptors, or `undefined`. Do not assume the nested model inside the control-node object is itself that descriptor array.

This shortened illustrative control node shows the distinction between the internal field-record key, control ID, and display title:

```json
{
  "id": "controlNode",
  "model": {
    "fields": {
      "FIELD_RECORD_KEY": {
        "id": "Name",
        "title": "Presenter name",
        "type": "text",
        "defaultValue": ""
      }
    }
  },
  "payload": { "Name": "Alex Morgan" }
}
```

The corresponding field descriptor in `getModel()` is:

```json
[
  { "id": "Name", "title": "Presenter name", "type": "text", "defaultValue": "" }
]
```

Use `Name` as the payload key. Preserve other field types when building a custom UI. The [native-form tutorial](../examples/subcomposition-fill-in-form.md) uses the complete control-node object to render the built-in field editors.

## getPayload(), getPayload2(), and setPayload(payload)

The getters take no arguments. `getPayload()` returns key/value pairs; `getPayload2()` returns an object keyed by field ID. Both can be unavailable. `setPayload(payload)` accepts a field-update object and has no synchronous result or completion Promise.

```javascript
const values = composition.getPayload2() || {};
const currentName = values.Name == null ? "" : String(values.Name);
// Inside an explicit Apply action:
composition.setPayload({ Name: currentName });
```

Read operations and payload events can update your UI. Sending a command does not prove that a viewer has rendered it. Inspect the same instance's output when verifying a change.

## Reset scope

`resetPayload()` resets the current node to its model defaults. Root-only `resetAllPayloads()` resets payloads throughout the imported composition. Neither is a way to clear an unsent UI draft. Put reset commands behind explicit operator actions and make their scope visible in the UI.

## Event callback contracts

For `payload_changed`, `event.payload` is the changed node's payload data. For `state_changed`, `event.state` is the runtime state. Both include the node and composition identifiers shown in the event table. Filter by `compId` before updating a selected child's UI.

There is one callback slot per event on a composition object. `on` replaces that slot; `off(event)` clears it. It does not take the storage API's `(key, callback)` arguments. The reference does not establish a fixed schema for `animation_state`; validate it against your actual runtime before depending on additional fields.

For draft handling, see [Working with shared data and events](../shared-data-and-events.md).
