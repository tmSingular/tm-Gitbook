# Your first script

## Setup

1. Add a sub-composition with a Metric Text widget named `Title`.
2. Leave the text property of the `Title` widget unlinked while this script owns it.
3. Open the Composition Script editor and select that sub-composition's script.

```javascript
(function() {
  return {
    init: function(compCurrent, context) {
      const wiTitle = compCurrent.findWidget('Title')[0];
      wiTitle.setPayload({ text: 'Hello from Singular' });
    },
    close: function() {}
  };
})();
```

`compCurrent.findWidget('Title')` returns an array of matching widgets. JavaScript arrays start at index `0`, so `[0]` selects the first matching widget and stores that widget object in `wiTitle`. The next line updates its text.

Use unique, descriptive widget names within each composition and unique composition names within the scope you search. This helps avoid errors and confusion about which object a script targets. For this example, use exactly one widget named `Title` in the selected sub-composition.

Save the script, take the sub-composition In, and check `Hello from Singular` in the output preview. Its font should remain the inspected native font. This example has no ongoing resources; its empty cleanup function is intentional.

## Add live input

The script above applies content only during initialization. For a live operator value, add a standalone Text Control Node named `Public Value`, rename the widget to `Output`, and use the complete [reactive-control pattern](../how-to-guides/react-to-control-node-changes.md). Change the input twice without reloading; that verifies behavior an initial screenshot cannot show.

For actual deployment, follow [save/extract/output verification](../debugging-verification-and-deployment/deployment.md).
