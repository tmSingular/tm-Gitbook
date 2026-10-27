# Preparing your environment

### Prerequisites <a href="#prerequisite" id="prerequisite"></a>

The Singular Widget SDK requires a local installation of Node.js. Download it from [https://nodejs.org/en/](https://nodejs.org/en/).

{% hint style="info" %}
This document describes how to install singular-cli. For details about Singular's other CLIs, singularwidget-cli and singularapp-cli, see [https://github.com/singularlive/](https://github.com/singularlive/) and [https://www.npmjs.com/\~singularlive](https://www.npmjs.com/~singularlive).
{% endhint %}

### Installing the Singular CLI <a href="#install-singular-cli" id="install-singular-cli"></a>

After installing Node.js, open a console and install `singular-cli` by running this command:

```bash
npm install singular-cli -g
```

After the installing the CLI, console commands to create and deploy Singular widgets and apps will become available.

The `create` commands serve to clone the Singular boilerplates into a specified folder.

The `deploy` commands check, package, and upload your widget or app code to Singular.live. Every widget and app is identified by a unique deploy key. Generating a deploy key is covered [here](getting-started.md#deploying-an-app).

**Create Singular widget boilerplate**

```bash
singular createwidget <folder name>
```

**Deploy a Singular widget**

```bash
singular deploywidget <folder name>
```

For more information about the Singlar.live CLI see [https://github.com/singularlive/singular-cli](https://github.com/singularlive/singular-cli).
