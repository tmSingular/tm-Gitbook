# App SDK subcomposition object

Look up a child on its parent composition or subcomposition. Application-level `app.getSubcompositionByName(...)` is not part of this API.

```javascript
const output = app.getOutputByName("Default");
const main = output && output.getComposition();
const lowerThird = main && main.getSubcompositionByName("Lower Third");
if (lowerThird) {
  lowerThird.setPayload({ Name: "Alex Morgan" });
  lowerThird.playTo("In");
}
```

Each object has `id` and `name`. Its `listSubcompositions()` lists direct children; use the returned IDs with `getSubcompositionById(id)` on the same parent. A nested path requires a lookup at each level. Names may be repeated in different branches.

The child exposes these [composition data and animation methods](composition.md): `getControlNode`, `getModel`, `getModelGroups`, `getPayload`, `getPayload2`, `getLogicLayer`, `getProp`, `getState`, `setPayload`, `resetPayload`, `playTo`, and `jumpTo`. It also exports `find`, `listSubcompositions`, `getSubcompositionById`, and `getSubcompositionByName`.

The child does not expose the root's `resetAllPayloads`, `remove`, `getRefId`, `getCompositionInfo`, `on`, or `off` methods in the inspected 1.0.0 library. To observe a child, subscribe to the parent composition and filter `event.compId` against `child.id`. Do not apply an event received for one child to whichever child the operator happens to have selected later.
