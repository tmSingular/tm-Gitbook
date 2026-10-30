# App SDK

Build a custom Singular Control App that manages compositions, edits control fields, animates graphics, and shares application data between operators. The App SDK operates on an app instance and its outputs. Changes to its composition payloads and animation states can affect every output using that composition.

Use the [Graphics SDK](graphics-sdk.md) to embed and control a Player in your own web page, [REST](rest/README.md) to control an existing app remotely, or [composition scripting](../composition-scripting/README.md) for logic that runs inside a composition. These APIs have different objects and lifecycle rules.

## Learn and build

1. [Prepare your environment](app-sdk/prepare-your-environment.md): permissions, CLI, and project files.
2. [Get started](app-sdk/getting-started.md): create a hosted app with a lower-third control.
3. [Hosted and local development](app-sdk/hosted-and-local-development.md): choose the correct bootstrap.
4. [Deploy and manage versions](app-sdk/deployment-and-versioning.md): test development builds before publishing.

Use the [API reference](app-sdk/reference/README.md) for object ownership, return values, storage, forms, and events. Try the [lower-third](app-sdk/examples/lower-third-app.md) and [native fill-in form](app-sdk/examples/subcomposition-fill-in-form.md) examples.

## Access and compatibility

This guide improves the repository's App SDK v1 material and checks method signatures against the public App SDK **1.0.0** JavaScript library. It is not a declaration of a new SDK release or a current browser/Node support matrix. Developer permissions and App Manager access are required for the hosted workflow. For account eligibility, use the [published App SDK access page](https://developer.singular.live/software-development-kits/app-sdk).
