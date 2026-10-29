# Getting started

Follow these steps to create a Singular widget:

1. [Download the widget boilerplate](getting-started.md#download-the-app-boilerplate)
2. [Create a widget in your Singular account](getting-started.md#creating-an-app-template-in-your-account)
3. [Deploy your widget code](getting-started.md#deploying-an-app)
4. [Test and debug your widget](getting-started.md#testing-and-debugging-an-app)
5. [Publish your widget](getting-started.md#publishing-an-app)
6. Share your widget

### 1. Download the widget boilerplate <a href="#download-the-app-boilerplate" id="download-the-app-boilerplate"></a>

Open a console and enter following commands:

```bash
C:\Users\tm\Singular Widgets>singular createwidget myWidget
Singular Widget – myWidget has been created
C:\Users\tm\Singular Widgets>dir /S /B
C:\Users\tm\Singular Widgets\myWidget
C:\Users\tm\Singular Widgets\myWidget\deploykey.json
C:\Users\tm\Singular Widgets\myWidget\source
C:\Users\tm\Singular Widgets\myWidget\source\icon.png
C:\Users\tm\Singular Widgets\myWidget\source\output.html
```

This set of commands creates a folder called **myWidget** on your local disk and clones the widget boilerplate into it. We recommend adding this folder to your source code management tool.

**Description of default files**

<table><thead><tr><th width="284">File</th><th>Description</th></tr></thead><tbody><tr><td><code>deploykey.json</code></td><td>A file containing the widget deploy key.</td></tr><tr><td><code>source\output.html</code></td><td>The widget's source code.</td></tr><tr><td><code>source\icon.png</code></td><td>The widget icon in the .png format.</td></tr></tbody></table>

#### output.html boiler plate <a href="#apphtml-example-for-deployed-use" id="apphtml-example-for-deployed-use"></a>

```html
<!DOCTYPE html>
<html>

<head>
    <style>
        /* The default widget style to make output match the bounding box */
        html,
        body {
            background: none;
            margin: 0;
            padding: 0;
            height: 100%;
        }

        /* Add your custom styles here */
    </style>
</head>

<body style="margin: 0;	background:none; overflow: hidden;">
    <div id='container' style="position: absolute; left:0%; top:0%; width: 100%; height: 100%"></div>

    <!-- Your custom html goes here -->

    <!-- Singular widget library -->
    <script src="https://app.singular.live/libs/singularwidget/1.0.4/singularwidget.js"></script>
    <script>
        let windowWidth = 0;
        let windowHeight = 0;
        let compositionInstance = null;

        /**
         * Initialize a Singular widget object and define its callback functions
         */
        SingularWidget.init({
            onInit: onSingularInit,
            onValue: onSingularValue,
            onButtonClicked: onSingularButtonClicked,
            onEditComp: onSingularEditComp,
            onAnimation: onSingularAnimation
        });

        /**
         * addEventListener for window resizing
         * Relevant when your widget displays HTML content or uses widget compositions
         */
        window.addEventListener("resize", function() {
            if (windowWidth != window.innerWidth || windowHeight != window.innerHeight) {
                windowWidth = window.innerWidth;
                windowHeight = window.innerHeight;
                if (compositionInstance) {
                    compositionInstance.resize(windowWidth, windowHeight);
                }
            }
        });

        /**
         * onSingularInit()
         * Called when the widget instance is created
         */
        function onSingularInit(params) {
            console.log("onSingularInit() - params =", params);
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        }

        /**
         * onSingularValue()
         * Called when the widget instance is created or the instance data has changed
         */
        function onSingularValue(json) {
            console.log("onSingularValue() - json =", json);
        }

        /**
         * onSingularButtonClicked()
         * Called when a push button of the widget is clicked
         */
        function onSingularButtonClicked(button) {
            console.log("onSingularButtonClicked() - button =", button);
        }

        /**
         * onSingularAnimation()
         * Called when the animation state of the widget changes
         */
        function onSingularAnimation(anim) {
            console.log("onSingularAnimation() - anim =", anim);
            if (!compositionInstance) return;
            switch (anim.event) {
                case "start":
                    break;
                case "stop":
                    break;
                case "jump":
                    break;
                case "seek":
                    break;
                case "init":
                    break;
            }
        }

        /**
         * onSingularEditComp()
         * Called when the subcomposition of a widget is edited
         */
        function onSingularEditComp(composition) {
            console.log("onSingularEditComp() - composition =", composition);
        }
    </script>
</body>

</html>
```

### 2. Create a widget template in your Singular account <a href="#creating-an-app-template-in-your-account" id="creating-an-app-template-in-your-account"></a>

#### 1. Log into Singular.live and check your permissions <a href="#log-into-singularlive" id="log-into-singularlive"></a>

To create a Singular.live widget, you need an account that has developer permissions. Check your permissions by navigating to the Singular Dashboard, selecting the **User Menu** > **Settings,** and checking your **User Settings**.

**User Administration** and **Developer Tools** should be switched on.

<figure><img src="../../.gitbook/assets/Checking permissions.gif" alt=""><figcaption><p>Checking your account's developer permissions</p></figcaption></figure>

#### 2. Create a new widget <a href="#create-app" id="create-app"></a>

Also on the Singular Dashboard:

1\. Select the **User Menu** > **Widget Manager,** and then **New Widget** to create a new widget.

<figure><img src="../../.gitbook/assets/Creating a new widget.gif" alt=""><figcaption><p>Creating a new widget</p></figcaption></figure>

2\. Enter a name and category for your widget.&#x20;

The widget name doesn't need to match the name of the folder used in the `singular createwidget` command in [step one](getting-started.md#download-the-app-boilerplate). Nevertheless, we recommend using the same name.

### 3. Deploy your widget code <a href="#deploying-an-app" id="deploying-an-app"></a>

Continuing in the Widget Manager:

1\. Copy the **Deploy Key** from the Widget Details and paste it into the `deploykey.json` file from [step one](getting-started.md#download-the-app-boilerplate).&#x20;

<figure><img src="../../.gitbook/assets/Copying the deploy key.png" alt=""><figcaption><p>Copying the deploy key</p></figcaption></figure>

The file should look like this:

{% code title="deploykey.json" %}
```javascript
{
  "deploykey": "uS3bDUabcDnYlAZMO87OL2nBckvSIdmE"
}
```
{% endcode %}

2\. Upload the widget code to Singular using following command in the Node.js console:

```log
C:\Users\tm\Singular Widgets> singular deploywidget myWidget
-----------------------------------------------
Singular.Live widget deploy
Validating files in directory "source"
Creating zip file
Deploying widget to Singular.Live
Widget ID: 4215 successfully deployed

C:\Users\tm\Singular Widgets>
```

The deploy script will read the deploy.json file, extract the deploy key, create a zip-file of the widget sources, and upload it to the Singular.live Cloud. Your widget then will be visible in the **Widget Browser** when you create a new widget instance.

{% hint style="info" %}
Activate the `Show Dev Versions` checkbox in the **Widget Browser** to access the development version of your widget.
{% endhint %}

The status of the `Development` version of your widget gets updated every time you deploy new sources for your widget. Refresh the **Widget Manager** and select your widget to see to see its updated status.

### 4. Define your widget UI

Define the widget UI in the **UI Definition** field.

<figure><img src="../../.gitbook/assets/image (2).png" alt=""><figcaption><p>Copy your widget UI definition</p></figcaption></figure>

### 5. Test and debug your widget <a href="#testing-and-debugging-an-app" id="testing-and-debugging-an-app"></a>

Before you publish your widget, use Chrome's developer tools to debug and optimize it.

### 6. Publish your widget <a href="#publishing-an-app" id="publishing-an-app"></a>

When you're done testing your widget, use the `publish` function to make it available for other users.

The `publish` function creates an identical copy of the development version of your widget and tags it as `published`. When you do this, the development version gets increased by one.

Widgets never get deleted from the Singular.live platform. They are always in one of the following states:

* **development**: Every new widget defaults to the `development` status. Widgets under development and can only be accessed by users with development permissions. Once your widget has been fully developed and tested, you can `publish` it to make it available to other users. Widgets with `development` status can be `published`.
* **published**: A published widget is available to all members of your account. Only one `published` version of a widget can exist at the same time. By default, the latest published version will be used when creating an instance of a widget. Widgets with `published` status can be `un-published`.
* **archived**: Widgets automatically get archived when a new version is published. Existing widget instances that use an older widget version will stay on the older version. A standard user can manually update the widget in the widget instance by selecting the **Update** button. Users with developer permissions can also use any archived version of an widget. Widgets with `archived` status can be `published` and `depreciated`.
* **depreciated**: Set a widget to `depreciated` status when you want or need to force a widget instance to upgrade to the latest published version of an widget. A widget with `depreciated` status can be `archived`.

#### Overview of widget statuses <a href="#overview-of-app-statuses" id="overview-of-app-statuses"></a>

|    Status   |   Action   |  New status |
| :---------: | :--------: | :---------: |
| development |   Publish  |  Published  |
|  published  | Un-publish |   Archived  |
|   archived  |   Publish  |  Published  |
|             | Depreciate | Depreciated |
| depreciated |   Archive  |   Archived  |

### 7. Share your widget (optional) <a href="#publishing-an-app" id="publishing-an-app"></a>

If you'd like to share your widget with another Singular user, enter their Singular account name in the **Share with** field in the Widget Manager.

<figure><img src="../../.gitbook/assets/Sharing a widget.png" alt=""><figcaption><p>Sharing a widget</p></figcaption></figure>
