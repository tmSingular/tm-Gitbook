# Read an app’s composition URL

Read the app details, take the `compositionJson` field, and load that URL into an independent Player. This is useful for a local preview of an app’s extracted composition.

## Request and result

```http
GET https://app.singular.live/apiv2/controlapps/{appToken}
```

Use the Control App REST token accepted by the chosen API environment. A relevant part of the response is:

```json
{ "compositionJson": "https://assets.singular.live/YOUR_ACCOUNT/jsons/YOUR_EXTRACTION.json" }
```

The URL is illustrative; the app must actually have an accessible extraction. This page does not establish a full response schema or cross-host token compatibility.

```javascript
// Host-page fragment. The successful-response path is shown without repeated diagnostics.
const apiOrigin = "https://app.singular.live";
const appToken = "YOUR_CONTROL_APP_REST_TOKEN";
fetch(apiOrigin + "/apiv2/controlapps/" + encodeURIComponent(appToken))
  .then(function(response) { return response.json(); })
  .then(function(details) {
    graphics.loadComposition(details.compositionJson, function(result) {
      if (result.success) {
        const compMain = graphics.getMainComposition();
      }
    });
  });
```

The host fetch and the Graphics SDK load are separate operations. The SDK does not authenticate or fix CORS on that fetch. Use one consistent API origin for your authorized environment instead of copying the older example’s mixed service hosts.

For the complete webpage, use [loading-methods.html](../../../../.gitbook/assets/graphics-sdk/loading-methods.html) and choose Composition URL read from Control App REST. The [dynamic preview](../local-preview-dynamic-form.md) supports the same workflow and reads its model from the loaded SDK rather than making a second cross-host REST model request.

This loads the extraction named by the app details. It does not promise continuous propagation of later remote app payloads. For the connected path, use [Render app output](render-app-output.md).
