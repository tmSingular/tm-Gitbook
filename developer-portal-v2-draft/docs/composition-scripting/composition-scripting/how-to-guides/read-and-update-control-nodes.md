# Read and update control nodes

Use public Control Node IDs when reading or writing a payload; the UI title, internal stable key, and widget tile ID are not interchangeable.

Fragment inside `init(comp)`:

```javascript
const values = comp.getPayload2() || {};
const title = values['Title'];
const fields = comp.getModel() || [];
const titleField = fields.filter(function(field) { return field.id === 'Title'; })[0];
if (!titleField) throw new Error('Title control was not found');
```

`getPayload()` provides key/value pairs; `getPayload2()` is convenient for named inputs. Model getters are read-only. Normalized Number reads are raw percentages; Timer reads are formatted strings. See [normalized numbers](../api-reference/normalized-numbers.md) and [Timer controls](../api-reference/timer-controls.md).

`comp.setPayload({ Title: 'Updated' })` writes a runtime Control Node value when the integration intentionally requires that consumer. It does not write the widget directly or synchronize output-side changes into the Control App operator UI.

For fetched or derived presentation, prefer [unlinked widget writes](set-widget-properties.md). For reactive transformations, use [React to control node changes](react-to-control-node-changes.md). Native Timer command objects are a distinct justified use of `setPayload`.

Avoid changing operator values in `init()` without an explicit design requirement, and avoid writing the same control unconditionally from its own change handler.
