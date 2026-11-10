# Getting started

This first example loads an extracted composition, updates a sub-composition’s Title input, and plays its authored In/Out animation.

## Prepare the composition

1. Create a uniquely named sub-composition `Lower Third`.
2. Inside it, create a Text Control Node with public ID `Title` and link it to a Text/Metric Text widget’s text property.
3. Author the sub-composition’s In/Out animation and save the composition.
4. Obtain its extracted composition JSON URL. If your source is a Control App, use the [local app-composition workflow](examples/load-app-composition.md).

The host writes the Control Node, so its native text link should remain in place. This differs from a composition script directly owning an unlinked widget field.

## Complete host webpage

Save the following as `quick-start.html`, serve it from a local HTTP development server or your web application, and open it in a modern browser. A project with Python installed can run `python -m http.server 8000` in the sample directory. Open the resulting local page in your browser. Network access to the SDK, Player, composition, and required assets is still needed.

[Download quick-start.html](../../../.gitbook/assets/graphics-sdk/quick-start.html).

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Graphics SDK — first graphic</title>
  <script src="https://app.singular.live/libs/singulargraphics/1.0.0/singulargraphics.js"></script>
</head>
<body>
  <label>Extracted composition JSON URL <input id="compositionUrl" type="url" size="70"></label>
  <button id="load" type="button">Load</button>
  <label>Title <input id="title" value="Hello from the Graphics SDK"></label>
  <button id="send" type="button" disabled>Send</button>
  <button id="in" type="button" disabled>In</button>
  <button id="out" type="button" disabled>Out</button>
  <p id="status" role="status">Choose a composition URL.</p>
  <iframe id="SingularOverlay" title="Graphic preview" style="width:100%;height:450px;border:0"
    src="https://app.singular.live/singularplayer/client"></iframe>
  <script>
    (function() {
      const graphics = SingularGraphics("SingularOverlay");
      const elLoad = document.getElementById("load");
      const elSend = document.getElementById("send");
      const elIn = document.getElementById("in");
      const elOut = document.getElementById("out");
      const elStatus = document.getElementById("status");
      let compLowerThird = null;
  
      elLoad.addEventListener("click", function() {
        elLoad.disabled = true;
        elSend.disabled = elIn.disabled = elOut.disabled = true;
        const compositionUrl = document.getElementById("compositionUrl").value.trim();
        graphics.loadComposition(compositionUrl, function(result) {
          elLoad.disabled = false;
          elStatus.textContent = result.success ? "Composition loaded." : "Composition did not load.";
          if (!result.success) return;
          const compMain = graphics.getMainComposition();
          compLowerThird = compMain.find("Lower Third")[0];
          elSend.disabled = elIn.disabled = elOut.disabled = false;
        });
      });
      elSend.addEventListener("click", function() {
        compLowerThird.setPayload({ Title: document.getElementById("title").value });
      });
      elIn.addEventListener("click", function() { compLowerThird.playTo("In"); });
      elOut.addEventListener("click", function() { compLowerThird.playTo("Out"); });
    })();
  </script>
</body>
</html>
```

## Run it

1. Enter the extracted composition JSON URL and click Load.
2. Wait for Composition loaded. The callback receives an object with a `success` property; it is not a Boolean result.
3. Enter a Title and click Send. Take Lower Third In to make it visible.
4. Send another value in the same Player. Then test Out and In.

`getMainComposition()` returns the root wrapper after loading. `compMain.find("Lower Third")` returns an array; `[0]` selects the first match. Unique composition names make that choice unambiguous. `setPayload()` uses public Control Node IDs, not display labels or internal model keys.

The script waits for the SDK load callback before resolving composition objects. That callback does not establish completion of every font/media download or all asynchronous composition-script work. The Send button is a separate user action; integrations that require a script-specific readiness handshake should define one explicitly.

## Interactive Player

The basic iframe uses the non-interactive Player URL. To enable Player interaction, use `https://app.singular.live/singularplayer/client?interactive=1` as the iframe’s `src`. Create the iframe before calling `SingularGraphics("SingularOverlay")`; the argument identifies that existing iframe, not a div to replace.

Continue with [loading methods](loading-methods.md) or [the composition API](reference/composition-object.md).
