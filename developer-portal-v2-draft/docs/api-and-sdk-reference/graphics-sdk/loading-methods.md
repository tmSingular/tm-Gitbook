# Choose a loading method

The same SDK can load standalone graphics and connected app outputs. The loading mode determines how the Player relates to an app; the SDK’s local Control Node setters are not remote REST writes.

| Source | Call | Intended use |
| --- | --- | --- |
| Extracted composition JSON URL | `graphics.loadComposition(url, callback)` | An integration using a saved/extracted composition |
| Composition token | `graphics.loadComposition(token, callback)` | Design and development workflows supported by that token |
| Parsed composition JSON object | `graphics.renderComposition(object, callback)` | An application that already fetched the composition definition |
| Shared app-output reference | `graphics.renderAppOutput(appReference, null, callback)` | A Player connected to an app output |
| A Control App’s extraction URL | REST read, then `loadComposition(details.compositionJson, callback)` | An independent preview of the app’s extracted graphic |

The two-argument signatures above are verified in the inspected SDK distribution. Do not insert a deprecated output-name/null argument into `loadComposition` or `renderComposition`. `renderAppOutput` has a separate three-argument signature and retains an output argument; the examples use `null` for its legacy/default-output path.

## Credentials and references

| Value | Purpose |
| --- | --- |
| Composition token | Identifies a composition for the loading path supported by the Player |
| Extracted JSON URL | Identifies a saved composition definition and its asset references |
| Control App REST token | Reads app details, including `compositionJson`, through the app API |
| Shared app-output reference | Identifies the app output to render; the original app-output workflow uses a shared app token |
| Data Stream public/private token | Separate feed subscription/publishing credentials; not a Graphics SDK loading reference |

The SDK forwards the app reference to its Player. Accepted references and authorization remain a Player/service contract; do not assume that an arbitrary numeric app ID, REST token, deployment key, and shared app token are interchangeable. Use the shared app-output reference supported by your deployment.

## Understand data integration

In a standalone composition Player, host `setPayload` writes can update its exposed Control Nodes. A remote Control App REST write does not automatically target that independent Player. Composition scripts and their Data Stream subscriptions can still run inside it.

Rendering an app output selects the app-connected path. Reading an app’s `compositionJson` and loading that URL is a snapshot/extraction workflow, not a promise of continuous synchronization with the app. Saving a new composition, updating a managed extract, and reloading a local Player are distinct steps.

## Complete loading-method sample

[Download loading-methods.html](../../.gitbook/assets/graphics-sdk/loading-methods.html). Choose a mode and enter your own reference. The REST option includes an API origin so the token and endpoint can use one supported environment.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Graphics SDK — loading methods</title>
  <script src="https://app.singular.live/libs/singulargraphics/1.0.0/singulargraphics.js"></script>
</head>
<body>
  <h1>Choose a loading method</h1>
  <label>Method <select id="method">
    <option value="url">Extracted composition JSON URL</option>
    <option value="token">Composition token</option>
    <option value="appComposition">Composition URL read from Control App REST</option>
    <option value="appOutput">App output using a shared app reference</option>
    <option value="object">Fetch JSON and render its object</option>
  </select></label>
  <label>Reference / token / URL <input id="reference" type="text" size="70" autocomplete="off"></label>
  <label>API origin for the REST option <input id="apiOrigin" value="https://app.singular.live"></label>
  <button id="load" type="button">Load</button>
  <p id="status" role="status">Enter the reference for your selected method.</p>
  <iframe id="SingularOverlay" title="Graphic preview" style="width:100%;height:450px;border:0"
    src="https://app.singular.live/singularplayer/client"></iframe>
  <script>
    (function() {
      const graphics = SingularGraphics("SingularOverlay");
      const elLoad = document.getElementById("load");
      const elStatus = document.getElementById("status");

      function onLoaded(result) {
        elLoad.disabled = false;
        elStatus.textContent = result.success ? "Loaded. Root ID: " + graphics.getMainComposition().id : "Load did not complete.";
      }

      function requestUnavailable() {
        elLoad.disabled = false;
        elStatus.textContent = "The read request did not complete; check origin, access, and the response.";
      }

      elLoad.addEventListener("click", function() {
        const method = document.getElementById("method").value;
        const reference = document.getElementById("reference").value.trim();
        if (!reference || elLoad.disabled) return;
        elLoad.disabled = true;
        if (method === "url" || method === "token") graphics.loadComposition(reference, onLoaded);
        else if (method === "appOutput") graphics.renderAppOutput(reference, null, onLoaded);
        else {
          const origin = document.getElementById("apiOrigin").value.replace(/\/$/, "");
          const url = method === "appComposition" ? origin + "/apiv2/controlapps/" + encodeURIComponent(reference) : reference;
          fetch(url).then(function(response) {
            if (!response.ok) { requestUnavailable(); return null; }
            return response.json();
          }, requestUnavailable).then(function(data) {
            if (!data) return;
            if (method === "appComposition") graphics.loadComposition(data.compositionJson, onLoaded);
            else graphics.renderComposition(data, onLoaded);
          }, requestUnavailable);
        }
      });
    })();
  </script>
</body>
</html>
```

See [URL loading](examples/load-by-url.md), [token loading](examples/load-by-token.md), [reading an app extraction](examples/load-app-composition.md), [app output](examples/render-app-output.md), and [rendering a JSON object](examples/render-composition-object.md).
