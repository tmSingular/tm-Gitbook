# Prepare your environment

Create a local project and register a test app in Singular. At the end you will have `source/app.html`, a deployment key, and an app configured with an initial composition.

You need a code editor, Node.js with npm, a Singular account with developer permissions, and a test composition. See [Compatibility](compatibility.md) for environment verification notes.

{% stepper %}
{% step %}
## Check developer access

Open Dashboard's user menu and look for **App Manager** and developer tools. If they are missing, ask your account administrator to enable the developer permissions needed for your account.

**Check:** You can open App Manager and create an app. Menu names can vary by account and platform version.
{% endstep %}
{% step %}
## Install and verify the CLI

Run these commands in a terminal:

```sh
node --version
npm --version
npm install --global singular-cli
singular help
```

**Check:** Help lists `createapp` and `deployapp`. If the command is unavailable after installation, reopen the terminal and check npm's global executable path. The [Singular CLI repository](https://github.com/singularlive/singular-cli) documents the command interface.
{% endstep %}
{% step %}
## Create the project

From the directory where you keep projects, run:

```sh
singular createapp mySingularApp
```

Open the generated folder in your editor:

```text
mySingularApp/
  deploykey.json
  source/
    app.html
    icon.png
```

`app.html` contains the UI and JavaScript. Files inside `source` are deployed as application assets. `deploykey.json` connects the upload to the app registered in App Manager.

**Check:** `source/app.html` exists. Keep using the same project folder throughout the first-app guide.
{% endstep %}
{% step %}
## Register the app

In App Manager, create a new app and set its name, category, and icon as required by the UI. Using `mySingularApp` for both the folder and display name makes the exercise easier to follow; matching names are not an SDK requirement.

Select the initial composition and intended revision. Configure its output name as **Default** for the tutorials. Where App Manager offers **Composition managed by Singular** / **Use specific composition**, use the workflow that supplies your selected initial composition. Apps that import and assign compositions themselves are covered in the [application reference](reference/application.md#import-and-remove).

**Check:** The app configuration identifies the intended composition, revision, and output. This registration is an app definition; you will create/open a running instance after deployment.
{% endstep %}
{% step %}
## Add the deployment key

Copy the app's deployment key from App Manager into the project's `deploykey.json`:

```json
{ "deploykey": "YOUR_DEPLOY_KEY" }
```

Keep that file outside the deployed `source` directory. Exclude real key files from source control, for example with this project-level `.gitignore` entry:

```text
deploykey.json
source/local-config.js
```

**Check:** The filename is `deploykey.json`, and its key belongs to the test app you just registered.
{% endstep %}
{% endstepper %}

## Prepare the first tutorial's composition

The lower-third tutorials use a specific composition structure:

| Item | Required configuration |
| --- | --- |
| App output | Named `Default`, with the test composition assigned |
| Direct child of the root | Named `Lower Third` |
| Child control field | Text field with control **ID** `Name` |
| Widget binding | The text widget reads the `Name` control |
| Animation | In and Out behavior configured for the child |

In Composer, create or choose the child, add its text control, and bind the intended widget to that control. Save the composition and select the corresponding revision in your app configuration. Use the field ID, even if its visible title differs.

Next: [Build your first Control App](getting-started.md).
