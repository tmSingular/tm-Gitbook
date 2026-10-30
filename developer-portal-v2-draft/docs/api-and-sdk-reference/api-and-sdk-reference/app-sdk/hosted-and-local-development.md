# Hosted and local development

The same UI can run in Singular's hosted app environment or locally with an explicit connection to a test app instance. Both modes can modify shared app state. A local UI does not make the underlying composition private.

## Hosted app

Define a global `singularAppInit(app)` in `source/app.html`. The hosted runtime supplies the initialized object. Do not add a second local bootstrap to this hosted page: duplicate initialization can duplicate listeners and operations.

## Local v1 bootstrap

The v1 setup uses these libraries, in order:

```html
<script src="https://app.singular.live/libs/singularapp/1.0.0/singularapp.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
```

Define `singularAppInit` before creating the connection. Supply the values at runtime from your local development configuration; the identifiers below are variables, not built-in globals:

```javascript
SingularApp.createWithAppInstanceKey(
  virtualAppKey,
  "https://app.singular.live/",
  function (app) {
    if (!app) {
      console.error("App SDK initialization failed; check access and configuration.");
      return;
    }
    singularAppInit(app);
  },
  username,
  password
);
```

Use a dedicated test instance and a local HTTP server. Do not distribute an HTML file containing credentials. The v1 bootstrap requires an app-instance connection and authentication; this page does not establish a new authentication flow or recommend replacing the bundled Firebase dependency independently. Test any dependency upgrade against your deployed runtime.

## Initialization and cleanup

Keep UI state separate from shared storage and output payloads. If initialization runs again, dispose your previous UI subscriptions before attaching new ones. Remove each storage subscription with the same key and callback identity. Destroy a native form before replacing its target. See [Storage](reference/storage.md), [composition events](reference/composition.md#events), and [fill-in forms](reference/forms-and-browsers.md).
