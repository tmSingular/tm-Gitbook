# App SDK reference

The App SDK instance passed to `singularAppInit(app)` owns outputs, imported compositions, shared storage, forms, browsers, and server time. These objects are distinct from the `comp` and `context` objects used inside composition scripts.

| Object | Obtain it | Purpose |
| --- | --- | --- |
| [Application](application.md) | `singularAppInit(app)` | Find outputs/compositions and manage imports. |
| [Storage](storage.md) | `app.storage` | Share app-instance data between UIs. |
| [Output](output.md) | `app.getOutputByName(name)` | Assign a composition and get its output URL. |
| [Composition](composition.md) | `app.getCompositionById(id)` or `output.getComposition()` | Read controls, set payloads, animate, and observe changes. |
| [Subcomposition](subcomposition.md) | `composition.getSubcompositionById(id)` | Control a child and traverse its children. |
| [ServerDate](server-date.md) | `app.ServerDate()` | Read clock offset and corrected epoch time. |

See [Forms and asset browsers](forms-and-browsers.md) for the native UI integrations.

## Conventions

This reference targets the public 1.0.0 library. Synchronous lookups can return `undefined`; check before calling methods. APIs documented with callbacks are asynchronous and do not become promises when used with `await`. A command returning no value does not prove that an output has rendered the change.

IDs returned by `app.listCompositions()` identify imported composition extracts. IDs returned by `composition.listSubcompositions()` identify children within that extract. Field payload keys are control IDs. Output IDs, composition extract IDs, child IDs, field IDs, and composition reference IDs are not interchangeable.

Use explicit `ById` / `ByName` methods. Older aliases such as application `getComposition(id)`, `getOutput(id)`, and composition `getSubcomposition(id)` remain in the inspected source but are marked for deprecation there. `output.getComposition()` remains the correct getter for an output's assigned composition.
