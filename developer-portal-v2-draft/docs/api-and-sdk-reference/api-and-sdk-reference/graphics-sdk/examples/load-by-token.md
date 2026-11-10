# Load by token

Use the composition token supported by your Player environment during design/development. The original workflow recommends an extracted composition URL for a published integration. A composition token is not a Control App REST token or a Data Stream token.

Use [loading-methods.html](../../../../.gitbook/assets/graphics-sdk/loading-methods.html), select Composition token, and enter your test token. Its complete source is included on the [loading-methods page](../loading-methods.md#complete-loading-method-sample).

```javascript
// Host-page fragment after constructing graphics against the iframe.
const compositionToken = "YOUR_COMPOSITION_TOKEN";
graphics.loadComposition(compositionToken, function(result) {
  if (result.success) {
    const compMain = graphics.getMainComposition();
    const compChildren = compMain.listSubcompositions();
  }
});
```

Use two arguments. The old three-argument token example does not match the inspected distribution. Token loading does not create a remote Control App input path; local SDK setters and in-graphic Data Stream subscriptions are separate integration mechanisms.
