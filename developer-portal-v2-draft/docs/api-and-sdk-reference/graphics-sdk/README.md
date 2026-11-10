# Graphics SDK

Embed a Singular Player in a webpage and control that local Player from host-page JavaScript. Load a composition or app output, update exposed Control Node values, play animations, receive events, and coordinate a sequence with video.

## Choose the programming environment

| Environment | Where code runs | What it controls |
| --- | --- | --- |
| Graphics SDK | Your host webpage, outside the Player iframe | The embedded Player and its exposed composition inputs |
| Composition script | Inside the running graphic | Widgets, groups, and composition behavior within its scope |
| App SDK | A hosted Control App | The application’s operator interface and app workflow |

Graphics SDK composition objects do not expose `findWidget()` or direct widget payload setters. Use `compLowerThird.setPayload({ Title: "Updated" })` to address an existing public Control Node ID. Native links or composition scripts determine how that input changes the graphic.

Host examples are ordinary HTML pages with startup code and DOM event handlers. They do not use the composition-script `init(compCurrent)` wrapper: the host SDK does not call that function. Composition objects still use `comp…` variable names, with `const` for fixed bindings and `let` for reassigned state.

## Start here

- [Getting started](getting-started.md): load a graphic, update a Title input, and play In/Out.
- [Choose a loading method](loading-methods.md): composition token, extraction URL, composition object, or app output.
- [SDK instance](reference/sdk-instance.md), [Composition object](reference/composition-object.md), and [Events and messages](reference/events.md).
- [Configuration and adaptation](reference/configuration-and-adaptation.md) and [Sequencer](reference/sequencer.md).
- [Examples](examples/README.md), [Local preview with a dynamic control form](local-preview-dynamic-form.md), and [Troubleshooting](troubleshooting.md).
- [Compatibility](compatibility.md): the exact inspected distribution, corrected signatures, and known differences from older examples.

All explanations and example source are included in this portal. Downloadable HTML files still load the SDK and Player from their service URLs; self-contained documentation does not mean offline rendering.

## Local preview versus app output

Loading an extracted composition into an independent Player creates a local preview. Host payload edits and animation commands affect that Player; they are not REST writes to a remote Control App form. Rendering a connected app output is a different loading mode. Choose that mode deliberately rather than assuming an extracted preview stays synchronized with later app changes.
