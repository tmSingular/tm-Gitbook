# Output object

An output connects an app instance's composition to an output URL. Look it up with `app.getOutputById(id)` or `app.getOutputByName(name)` and check the result. The name `Default` is an example configuration, not a guarantee that every app has such an output.

| Member | Result / behavior |
| --- | --- |
| `id`, `name` | Output identifiers. |
| `getComposition()` | Assigned composition; can be absent. |
| `getUrl()` | Output URL string. |
| `setComposition(composition)` | Assign a composition object; no synchronous result. |
| `setComposition(null)` | Clear the assignment. |

```javascript
const output = app.getOutputByName("Default");
const choices = app.listCompositions();
if (output && choices.length > 0) {
  const composition = app.getCompositionById(choices[0].id);
  if (composition) output.setComposition(composition);
}
```

A real UI should let an operator choose the composition instead of silently taking the first record. Pass the composition object to `setComposition`, not an ID or name. An iframe using `output.getUrl()` displays that output; it does not detach the composition from other viewers or create an independent local preview.
