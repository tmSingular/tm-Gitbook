# Get started with the App SDK

Create a hosted Control App that edits one text field and animates a lower third. Complete [environment setup](prepare-your-environment.md) first: the test instance must have an output named `Default`, an assigned composition, and a direct child named `Lower Third` with a text field ID `Name`.

## Add the application UI

Use the complete [lower-third example](lower-third-app.md) as `source/app.html`. The hosted runtime supplies an SDK instance to the global function `singularAppInit(app)`. Resolve objects in this order:

```javascript
function singularAppInit(app) {
  const output = app.getOutputByName("Default");
  const composition = output && output.getComposition();
  const lowerThird = composition &&
    composition.getSubcompositionByName("Lower Third");
  if (!lowerThird) {
    console.error("Configure Default and its Lower Third child first.");
    return;
  }
  // Use the control ID from the model, not its display title.
  lowerThird.setPayload({ Name: "Alex Morgan" });
  lowerThird.playTo("In");
}
```

This short snippet writes immediately on initialization. The complete example waits for an operator to press Apply or In. These writes affect the app instance's assigned composition; an output iframe is a view of that output, not an isolated sandbox.

## Deploy and verify

From the project folder's parent, run:

```sh
singular deployapp mySingularApp
```

Enable development versions in Dashboard, create/open the development app instance, and check:

1. The UI reports an explicit configuration error when the output or child is missing.
2. Editing the input alone does not alter the composition.
3. Apply updates the `Name` field; In and Out animate the selected child.
4. Reopening the app reads the current payload instead of resetting it.

If initialization never runs, verify you opened the deployed hosted app. Opening the HTML directly needs the separate [local bootstrap](hosted-and-local-development.md).
