# Your first script

Create a Text widget named **Title** inside a sub-composition, then open the composition script editor and select that sub-composition's script. Keep the widget's text property unlinked while this script owns it.

```javascript
(function() {
  return {
    init: function(comp, context) {
      const title = comp.findWidget("Title")[0];
      if (!title) {
        throw new Error('Text widget "Title" was not found');
      }
      title.setPayload({ text: "Hello from Singular" });
    },
    close: function() {}
  };
})();
```

Save the script, take the sub-composition In, and confirm that the script editor's output preview displays **Hello from Singular**. This example applies its value during initialization.

For updates after initialization, continue with [React to control node changes](../how-to-guides/react-to-control-node-changes.md). Use [Verification](../debugging-verification-and-deployment/verification.md) to test the intended output host.
