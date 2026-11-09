# Find sub-compositions and widgets

Inspect the owning composition, names, and IDs first. Lookup methods return arrays. This example assumes the documented composition/widget names exist and resolve uniquely.

Fragment inside root `init(compCurrent)`:

```javascript
const compLowers = compCurrent.find('Lower');

const compLower = compLowers[0];
const wiTitles = compLower.findWidget('Team 1', 'Name');

wiTitles[0].setPayload({ text: 'Home' });
```

The group's `Name.text` destination must be script-owned and unlinked. Root widget/group lookup does not descend into child compositions. Names referenced in scripts are dependencies; preserve them or update all callers together.

Use `getSubcompositionById()` when the ID is already known, then validate the returned object before using it. IDs need not be UUID-shaped.

For pattern matching, use `findRegExp`, `findWidgetRegExp`, or `findGroupRegExp`. String arguments are exact names; only `RegExp` values are patterns. See [the full lookup contract](../api-reference/the-composition-object.md#regular-expression-lookups).

Verify the selected object identity, owning composition, and rendered result. Successful lookup alone does not prove the intended duplicate-name target was selected.
