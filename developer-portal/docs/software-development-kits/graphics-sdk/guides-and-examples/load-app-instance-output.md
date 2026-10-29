# Load app instance output

## Load app instance output <a href="#load-app-instance-output" id="load-app-instance-output"></a>

Load the app instance output to update content in an overlay and trigger animations using an app or the REST API.

### **Supported data integrations**

<table><thead><tr><th width="215">Type</th><th width="138.33333333333331" align="center">Support</th><th>Description</th></tr></thead><tbody><tr><td>Control node</td><td align="center">Yes</td><td>Update control nodes and trigger animations via apps and the <a href="https://app.gitbook.com/s/3cdPul5g3lHEzkm2UkSf/rest-api">REST API</a>.</td></tr><tr><td>Data node</td><td align="center">Yes</td><td>Update data nodes via the <a href="https://app.gitbook.com/s/3cdPul5g3lHEzkm2UkSf/rest-api">REST API</a>.</td></tr><tr><td>Composition scripting</td><td align="center">Yes</td><td>Manage <a href="/broken/pages/mPWqVwivCXdnax9p1F8i">user interactions</a> and read data from third-party APIs.</td></tr><tr><td>Data stream</td><td align="center">Yes</td><td>Connect <a href="https://app.gitbook.com/s/3cdPul5g3lHEzkm2UkSf/data-stream-api">data streams</a> via <a href="https://app.gitbook.com/s/3cdPul5g3lHEzkm2UkSf/composition-scripting">composition scripting</a>.</td></tr></tbody></table>

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
    // Singular App Instance 
    const SHARED_APP_TOKEN = "2B50lCTxWNYfoYadq1I2K9";

    // create graphic object from iframe 'SingularOverlay'
    const overlay = SingularGraphics("SingularOverlay");

    // render app instance specified by SHARED_APP_TOKEN,
    // the second param is output name, passing undefined to select the first output
    overlay.renderAppOutput(SHARED_APP_TOKEN, function (isSuccess) {
      if (isSuccess) {
        console.log("App output loaded");
      } else {
        console.warn("Couldn't load app output");
      }
    });
  </script>
</body>
</html>
```

{% embed url="https://codepen.io/Singular/pen/QWmBzgv" %}

View on [codepen.io](https://codepen.io/Singular/pen/QWmBzgv).

[Open the control app](https://app.singular.live/control/2B50lCTxWNYfoYadq1I2K9?noHeader=true).
