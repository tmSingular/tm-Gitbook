# The composition object

Root and sub-composition scripts receive `comp` in `init(comp, context)`. Its identity and lookup scope belong to the composition carrying that script.

## Navigation and identity

| Member | Meaning |
|---|---|
| `comp.id`, `comp.name` | Runtime composition ID and name; an ID is not necessarily a UUID |
| `comp.find(name)` | Array of matching descendant composition objects |
| `comp.findWidget(name)` | Array of matching widgets in this composition |
| `comp.findWidget(groupName, widgetName)` | Array of matching widgets scoped to a group |
| `comp.findGroup(name)` | Array of matching groups in this composition |
| `comp.getSubcompositionById(id)` | Look up a sub-composition by its actual ID |
| `comp.listSubcompositions()` | List child composition identities as `{ id, name }` objects |
| `comp.parent()` | Parent composition; root has no parent composition |

`findWidget()` and `findGroup()` do not search the widgets/groups inside child compositions. Resolve the child with `find()` first. Names used by scripts are dependencies: rename the target and its script together while preserving template contracts.

Fragment inside `init(comp, context)`:

```javascript
const matches = comp.find("Lower");
if (matches.length !== 1) {
  throw new Error('Expected exactly one sub-composition named "Lower"');
}
const titles = matches[0].findWidget("Title");
if (titles.length !== 1) throw new Error('Expected one "Title" widget');
titles[0].setPayload({ text: "Updated title" });
```

### Regular-expression lookups

The current lookup family also includes `findRegExp(...names)`, `findWidgetRegExp(name)` / `findWidgetRegExp(groupName, name)`, and `findGroupRegExp(name)`. These take JavaScript `RegExp` values or exact case-sensitive strings. A string is not interpreted as a regex. All return arrays, including `[]` when nothing matches.

`findRegExp` searches descendants for the first name, then direct children of each match for subsequent names. No arguments return `[]`. Widget/group regex searches stay within the current composition. Use `^` and `$` for full-name matching and `i` for case-insensitive matching. Regex tests start from index zero and preserve the caller's `lastIndex`, including `g`/`y` flags. Invalid name types throw `TypeError`; `findWidgetRegExp` accepts one or two arguments.

```javascript
const teams = comp.findRegExp(/^Team /);
const names = comp.findWidgetRegExp(/^Team /, /^Name$/);
```

## Control Node values and model metadata

| Method | Read/write contract |
|---|---|
| `getPayload()` | Control values as `{ key, value }` pairs |
| `getPayload2()` | Control values keyed by their public payload IDs |
| `getModel()` | Array of Control Node field definitions, including current `low`/`high` where applicable |
| `getControlNode()` | Control Node model and payload; `undefined` when absent |
| `setPayload(patch)` | Write Control Node values or supported action commands |

Read public IDs from the model; display titles and internal stable keys are different identities. Do not modify returned models to configure controls. Use `getControlNode().model.fields` only after checking it exists; that structure uses internal keys.

For reactive behavior, reread `comp.getPayload2()` in the handler rather than assuming an event carries a complete payload. [Normalized Number getters return raw 0–100 percentages](normalized-numbers.md). Native [Timer getters return formatted strings](timer-controls.md).

`comp.setPayload()` is available for an intentional runtime consumer, such as a native Timer command or a documented composition-to-composition control path. It is not a way to update the Control App UI from output code. Prefer direct native links for simple operator inputs and direct unlinked widget writes for fetched/derived presentation. Avoid writing controls from an unguarded `payload_changed` handler that can trigger itself.

## States and animation

| Method | Behavior |
|---|---|
| `getState()` | Logical state, `"In"` or `"Out"`; internal Out variants are normalized |
| `playTo(state)` | Start the composition's native transition asynchronously |
| `jumpTo(state)` | Move immediately to a state |

Event messages can report internal states such as `Out1`. Do not infer animation completion from an immediate `getState()` after `playTo()`. Use [Animation control](animation-control.md) and the owning composition's `timeline_event` stop message.

See [Event listeners](event-listeners.md) for `addListener` / `removeListener` and [Data ownership](../core-concepts/data-ownership.md) before combining writers.
