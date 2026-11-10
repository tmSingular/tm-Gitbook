# Render a JSON object

When your host has fetched a composition definition itself, pass the parsed object to `renderComposition`:

```javascript
// Host-page fragment; compositionUrl is a real extracted composition URL.
fetch(compositionUrl)
  .then(function(response) { return response.json(); })
  .then(function(compDefinition) {
    graphics.renderComposition(compDefinition, function(result) {
      if (result.success) {
        const compMain = graphics.getMainComposition();
      }
    });
  });
```

`compDefinition` is the complete extracted JSON definition, not a Graphics SDK wrapper, a public payload patch, or a fabricated minimal object. The method takes exactly the object and callback in the inspected distribution. Do not add an output-name/null argument.

Use [loading-methods.html](../../../.gitbook/assets/graphics-sdk/loading-methods.html), choose Fetch JSON and render its object, and enter the extraction URL. The [full host source](../loading-methods.md#complete-loading-method-sample) includes the iframe and startup code. Your fetch still needs normal browser access to that URL.
