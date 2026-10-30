# Your first script

## Setup

1. Add a sub-composition with a Metric Text widget named `Title`.
2. Leave `Title.text` unlinked while this script owns it.
3. Open the Composition Script editor and select that sub-composition's script.

```javascript
(function() {
  return {
    init: function(comp, context) {
      var matches = comp.findWidget('Title');
      if (matches.length !== 1) throw new Error('Expected one Title widget');
      matches[0].setPayload({ text: 'Hello from Singular' });
    },
    close: function() {}
  };
})();
```

Save the script, take the sub-composition In, and check `Hello from Singular` in the output preview. Its font should remain the inspected native font. This example has no ongoing resources; its empty cleanup function is intentional.

## Add live input

The script above applies content only during initialization. For a live operator value, add a standalone Text Control Node named `Public Value`, rename the widget to `Output`, and use the complete [reactive-control pattern](../how-to-guides/react-to-control-node-changes.md). Change the input twice without reloading; that verifies behavior an initial screenshot cannot show.

For actual deployment, follow [save/extract/output verification](../debugging-verification-and-deployment/deployment.md).
