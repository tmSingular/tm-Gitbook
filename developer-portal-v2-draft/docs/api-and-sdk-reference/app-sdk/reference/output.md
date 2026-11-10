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

## Assignment and display

`getComposition()` and `getUrl()` take no arguments. The first returns the assigned composition when available; the second returns the output URL. Check the assignment before attempting composition operations.

```javascript
const output = app.getOutputByName("Default");
const composition = output && output.getComposition();
if (output && composition) {
  document.getElementById("preview").src = output.getUrl();
}
```

This fragment assumes an existing iframe with ID `preview`. Give it dimensions appropriate to your output. Viewing the output does not create a separate composition or isolate subsequent edits.

`setComposition(composition)` accepts an imported composition object, and `setComposition(null)` clears the assignment. The command has no synchronous completion result. Verify the assignment/output rather than treating its return value as confirmation. See [import and assignment](application.md#import-and-remove).
