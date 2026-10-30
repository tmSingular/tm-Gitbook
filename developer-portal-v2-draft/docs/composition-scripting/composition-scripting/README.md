# Composition scripting

Composition scripts run JavaScript inside the Singular Player to interpret data, update widgets, and coordinate composition behavior. They also run in the Composition Script editor's output preview. The normal Composer canvas does not install these scripts.

1. Start with [Your first script](getting-started/your-first-script.md).
2. Understand [lifecycle](core-concepts/lifecycle.md), [ownership](core-concepts/data-ownership.md), and [host boundaries](core-concepts/host-boundaries.md).
3. Choose an [API reference](api-reference/README.md), [how-to guide](how-to-guides/README.md), or [example](examples/README.md).
4. [Verify](debugging-verification-and-deployment/verification.md) live updates in the same running Player, then test the intended Control App and output URL.

Use ES2017-compatible JavaScript as the conservative authoring target unless your deployment explicitly guarantees a newer engine. This is an authoring baseline, not a browser support guarantee. Inspect the loaded widget version and field schema before writing widget payloads.

The reference separates persisted source, runtime state, rendered appearance, and app delivery. A successful save or payload call alone does not establish all four.
