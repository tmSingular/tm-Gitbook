# Load a composition with its token

Use this code to load a composition by its token for on-device use cases during the design process only.&#x20;

For best performance and quickest loading times, we recommend using the [composition URL when publishing an integration](load-a-composition-with-its-url.md).

### **Supported data integrations**

<table><thead><tr><th width="215">Type</th><th width="138.33333333333331" align="center">Support</th><th>Description</th></tr></thead><tbody><tr><td>Control node</td><td align="center">No</td><td>No support for <a href="https://app.gitbook.com/s/3cdPul5g3lHEzkm2UkSf/rest-api">REST API </a>calls.</td></tr><tr><td>Data node</td><td align="center">Yes</td><td>Update data nodes via the <a href="https://app.gitbook.com/s/3cdPul5g3lHEzkm2UkSf/rest-api">REST API</a>.</td></tr><tr><td>Composition scripting</td><td align="center">Yes</td><td>Manage <a href="/broken/pages/mPWqVwivCXdnax9p1F8i">user interactions</a> and read data from third-party APIs.</td></tr><tr><td>Data stream</td><td align="center">Yes</td><td>Connect <a href="https://app.gitbook.com/s/3cdPul5g3lHEzkm2UkSf/data-stream-api">data streams</a> via <a href="https://app.gitbook.com/s/3cdPul5g3lHEzkm2UkSf/composition-scripting">composition scripting</a>.</td></tr></tbody></table>

```html
<!DOCTYPE html>
<html>

<head>
  <!-- Include the Singular Graphic JavaSrcipt library -->
  <script src="https://app.singular.live/libs/singulargraphics/1.0.0/singulargraphics.js"></script>
</head>

<body>
  <!-- define iFrame for a non-interactive Singular Player Instance -->
  <iframe id="SingularOverlay" style="width:720px; height: 400px;"
    src="https://app.singular.live/singularplayer/client"></iframe>

  <script>
    // Composition token
    const COMPOSITION_TOKEN = "08EBsfeF4yoYLejOXM51Rk";

    // create graphic object from iframe 'SingularOverlay'
    const overlay = SingularGraphics("SingularOverlay");

    // render composition instance specified by COMPOSITION_TOKEN,
    // the second param is output name, passing undefined to select the first output
    overlay.loadComposition(COMPOSITION_TOKEN, function (isSuccess) {
      if (isSuccess) {
        console.log("Composition loaded");
      } else {
        console.warn("Couldn't load composition");
      }
    });
  </script>
</body>
</html>
```

{% embed url="https://codepen.io/Singular/pen/abYaNme" %}

View on [codepen.io](https://codepen.io/Singular/pen/abYaNme).
