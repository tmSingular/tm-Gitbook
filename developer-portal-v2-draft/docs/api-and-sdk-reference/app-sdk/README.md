# App SDK

Build a custom Singular Control App that edits graphics, triggers animations, manages compositions, and shares operator data. The App SDK connects your application UI to a Singular app instance and its outputs.

Start with a hosted app: Singular supplies the initialized SDK object when the app opens. You can add a local development connection after the hosted workflow is working.

## Choose the right integration

| Your goal | Use |
| --- | --- |
| Build a custom Control App inside Singular | App SDK |
| Embed and control a Player in your own webpage | [Graphics SDK](../graphics-sdk/README.md) |
| Send remote commands to an existing app | [REST API](../rest/README.md) |
| Run logic inside a composition | [Composition scripting](../../composition-scripting/README.md) |

## Learn and build

1. [Core concepts](core-concepts.md): understand instances, outputs, composition objects, and payloads.
2. [Prepare your environment](prepare-your-environment.md): create the project and register a test app.
3. [Build your first Control App](getting-started.md): deploy a working hosted app and verify its behavior.
4. [Tutorials and examples](examples/README.md): build the lower-third and native-form apps step by step.
5. [Working with shared data and events](shared-data-and-events.md): save drafts and observe other operators' changes.
6. [Hosted and local development](hosted-and-local-development.md): reuse your application logic with a local connection.
7. [Deploy and manage app versions](deployment-and-versioning.md): distinguish code deployment, publication, and composition revision.

Use the [API reference](reference/README.md) while implementing a feature, or [Troubleshooting](troubleshooting.md) when a checkpoint fails.

## Access and compatibility

You need a Singular account with developer permissions and App Manager access. This documentation targets App SDK **1.0.0**; “Developer Portal v2” identifies the documentation edition. See [Compatibility](compatibility.md) for the reference baseline and verification limits.
