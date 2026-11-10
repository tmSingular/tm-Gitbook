# Load by URL

Use an extracted composition JSON URL for a standalone integration. Host inputs and animation commands target this local Player. They do not write to a remote Control App form.

Prepare the Lower Third/Title input described in [Getting started](../getting-started.md). The [complete quick-start webpage](../getting-started.md#complete-host-webpage) includes all HTML and JavaScript; [download it here](../../../.gitbook/assets/graphics-sdk/quick-start.html).

The relevant host loading call is:

```javascript
// Host-page fragment after creating the graphics instance and iframe.
graphics.loadComposition(compositionUrl, function(result) {
  if (result.success) {
    const compMain = graphics.getMainComposition();
    const compLowerThird = compMain.find("Lower Third")[0];
    compLowerThird.jumpTo("Out");
  }
});
```

The URL identifies an extraction, not a request to keep it synchronized with every later Composer/app edit. Save and update the intended extraction when the source composition changes, then load the intended URL/version again. Asset reachability and font readiness remain separate from bridge load success.
