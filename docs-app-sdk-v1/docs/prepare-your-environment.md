# Prepare your environment

## Prerequisites <a href="#prerequisite" id="prerequisite"></a>

The Singular app SDK requires a local installation of node.js. Download it from [https://nodejs.org/en/](https://nodejs.org/en/).

## Install the Singular CLI <a href="#install-singular-cli" id="install-singular-cli"></a>

After installing node.js, open a console and enter this command:

```
npm install singular-cli -g
```

After the installing the CLI, console commands to create and deploy Singular widgets and apps will become available.

The `create` commands clone Singular boilerplates into the specified folder.

The `deploy` commands check, package, and upload your widget or app code to Singular.live. Every widget and app is identified by a unique deploy key. Generating a deploy key is covered in the **Getting started guide** [here](get-started.md).

## Singular CLI commands

After the installation of the cli, console commands to create and deploy Singular Widgets, and Apps will be available.

The create commands serve to clone the Singular boilerplates into the specified folder.

The deploy commands check, package and upload the Widget or App Code to the Singular.live platform. Every Widget and App is identified by a unique `deploy key`. Please refer to the [Singular Knowledge Base](https://singularlive.zendesk.com/hc/en-us/search?utf8=%E2%9C%93\&query=deploy+key) for details on how to generate a `deploy key`.

```
C:\Users\tmold>singular help
Available commands from singular-cli v0.4.0
singular createwidget <widget-name> - Init Singular Widget boiler plate
singular deploywidget <widget-folder-name> - Deploy Singular Widget
singular createapp <app-name> - Init Singular App boiler plate
singular deployapp <app-folder-name> - Deploy Singular App
```

### Create Singular App

```
singular createapp <app name>
```

### Deploy Singular App

```
singular deployapp <app folder name>
```

## Singlar  CLI on GitHub

* [https://github.com/singularlive/singular-cli](https://github.com/singularlive/singular-cli)
