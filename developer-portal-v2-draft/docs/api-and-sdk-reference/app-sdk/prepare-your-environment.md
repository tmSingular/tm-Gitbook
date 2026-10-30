# Prepare your environment

You need a Singular account with developer permissions, access to App Manager, a disposable test app instance, a composition, a code editor, and Node.js with npm available. Ask your account administrator to enable the developer features if App Manager or Developer Tools is missing. Do not use a production instance for the first exercises.

## Create the project

Install the CLI and create an app folder from its parent directory:

```sh
npm install --global singular-cli
singular createapp mySingularApp
```

The v1 workflow uses this structure:

```text
mySingularApp/
  deploykey.json
  source/
    app.html
    icon.png
```

`source/app.html` is your application UI. `source/icon.png` is its icon. `deploykey.json` connects deployment to the app registered in App Manager. The original guide used CLI 0.4.0; check the installed CLI's help before relying on version-specific options. No Node compatibility range is established by that guide.

## Register a test app

1. Open App Manager from the developer tools and create a new app.
2. Configure its name, icon, and initial composition. Select the intended composition revision.
3. Use the output name **Default** for these examples. Give the composition a direct child named **Lower Third** with a text control whose ID is **Name**.
4. Obtain the app's deployment key and put it in `deploykey.json`:

```json
{ "deploykey": "YOUR_DEPLOY_KEY" }
```

The file is `deploykey.json`, not `deploy.json`. Keep real deployment keys, passwords, and virtual app keys out of source control, screenshots, and shared HTML downloads. A deployment key identifies the deployment target; it is not interchangeable with a REST app token or virtual app key.

If you select **Composition managed by Singular** / **Use specific composition** in App Manager, let that setting provide the initial composition. Import and output assignment are separate SDK operations for apps that manage compositions themselves.

Continue with [Getting started](getting-started.md).
