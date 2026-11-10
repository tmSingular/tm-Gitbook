# Render app output

Use the app-output loading mode when the integration should render a connected app output rather than an independent extraction preview.

```javascript
// Host-page fragment after constructing graphics against the iframe.
const appOutputReference = "YOUR_SHARED_APP_TOKEN";
graphics.renderAppOutput(appOutputReference, null, function(result) {
  if (result.success) {
    const compMain = graphics.getMainComposition();
  }
});
```

The original guide uses a shared app token for this workflow. The inspected SDK accepts the app-reference argument and forwards it as appId, along with the output selector and configuration. The Player/service defines accepted identifiers and access; do not replace the shared reference with an arbitrary numeric ID or unrelated deployment key.

The explicit null is the legacy/default-output choice used by these examples. It belongs to `renderAppOutput` and must not be copied into `loadComposition` or `renderComposition`.

Use [loading-methods.html](../../../.gitbook/assets/graphics-sdk/loading-methods.html), choose App output, and enter your own supported shared reference. Full source is included on the [loading-methods page](../loading-methods.md#complete-loading-method-sample).

Verify an actual app-driven update in the running output, the intended app/output identity, and local host changes separately. This loading mode does not turn every local SDK setter into a remote REST write or guarantee operator-form synchronization.
