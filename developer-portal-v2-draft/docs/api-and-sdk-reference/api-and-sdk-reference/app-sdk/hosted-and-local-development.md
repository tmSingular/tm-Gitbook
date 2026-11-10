# Hosted and local development

First complete a [hosted run](getting-started.md). Then use a local connection to edit the same UI without uploading every change. Both modes can update the connected instance's shared composition and storage.

| Item | Hosted | Local |
| --- | --- | --- |
| How the app opens | Deployed Control App in Singular | Local HTTP URL |
| SDK object | Runtime calls `singularAppInit(app)` | Explicit bootstrap calls the same initializer |
| App SDK script/bootstrap credentials | Supplied through the hosted environment | Supplied through local development configuration |
| Application logic | Lookups, UI, drafts, commands | Reuse the same logic |

## Hosted initialization

Keep a global `singularAppInit(app)` in `source/app.html`. The [complete examples](examples/README.md) use this mode and contain no local connection credentials. Do not add another bootstrap to the hosted file.

## 1. Obtain the local connection values

Use a dedicated test instance. Obtain its virtual app key from the account's developer/virtual-app configuration associated with that app. The deployment key uploads code and is not the virtual app key. If your account does not expose a virtual-app key, ask the account administrator or Singular support for the supported local-development setup.

The reference bootstrap accepts a virtual app key, server URL, callback, username, and password. Authentication requirements depend on the app/account configuration; confirm them before using a local connection. See [Compatibility](compatibility.md).

## 2. Make a separate local entry page

Copy the hosted `source/app.html` to a **development directory outside `source`**. Keep its UI and `singularAppInit` logic. In its head, load the local dependencies in this order:

```html
<script src="https://app.singular.live/libs/singularapp/1.0.0/singularapp.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
<script src="local-config.js"></script>
```

Create an untracked `local-config.js` beside that local HTML:

```javascript
window.localAppConfig = {
  virtualAppKey: "YOUR_TEST_VIRTUAL_APP_KEY",
  username: "YOUR_TEST_USERNAME",
  password: "YOUR_TEST_PASSWORD"
};
```

These values are available to the browser running the page. Use test credentials and do not publish this directory. Exclude `local-config.js` from source control. The Firebase version is part of the documented bootstrap baseline; replacing it independently requires integration testing.

## 3. Connect after defining the initializer

Place this script **after** the script defining `singularAppInit`, at the end of the local HTML:

```html
<script>
  const config = window.localAppConfig;
  if (!config || !config.virtualAppKey) {
    document.getElementById("status").textContent = "Configure the test virtual app key.";
  } else {
    SingularApp.createWithAppInstanceKey(
      config.virtualAppKey,
      "https://app.singular.live/",
      function (app) {
        if (!app) {
          document.getElementById("status").textContent = "Local connection failed.";
          return;
        }
        singularAppInit(app);
      },
      config.username,
      config.password
    );
  }
</script>
```

The `status` element exists in both hosted examples. This adds only the connection step; it reuses the application logic. The Graphics SDK is unnecessary when this UI only controls the remote app and views its output URL.

## 4. Serve and open the local page

Use your editor's local HTTP server, bound to localhost, with the development directory as its document root. If Python is installed, one option from that directory is:

```sh
python -m http.server 8080 --bind 127.0.0.1
```

Open `http://127.0.0.1:8080/app.html` if your local file is named `app.html`. Use browser developer tools to check that the SDK, Firebase, and config files load successfully. Then check that initialization reaches Ready and that the selected test instance receives an Apply command.

If initialization does not run, inspect console/network errors, the instance key, and authentication. The server only serves your files; it does not supply SDK authentication or emulate Singular.

## 5. Deploy the hosted entry page

Deploy the original `source/app.html`, which receives the SDK object from the hosted runtime. Keep the local HTML, dependencies, and config outside `source`. Re-test the hosted instance after deployment.

For reinitialization, dispose subscriptions and native forms before attaching new ones. See [shared data and events](shared-data-and-events.md) and [forms](reference/forms-and-browsers.md).

Next: [Deploy and manage app versions](deployment-and-versioning.md).
