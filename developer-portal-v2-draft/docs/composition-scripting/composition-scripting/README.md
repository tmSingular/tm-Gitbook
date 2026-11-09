# Composition scripting

Composition scripts run JavaScript inside the Singular Player to interpret data, update widgets, and coordinate composition behavior. They also run in the Composition Script editor's output preview. The normal Composer canvas does not install these scripts.

1. Start with [Your first script](getting-started/your-first-script.md).
2. Understand [lifecycle](core-concepts/lifecycle.md), [ownership](core-concepts/data-ownership.md), and [host boundaries](core-concepts/host-boundaries.md).
3. Use the [scripting reference & cheat sheets](cheat-sheets/README.md) for property updates, widget features, messages, and Control Node values. Choose an [API reference](api-reference/README.md), [how-to guide](how-to-guides/README.md), or [example](examples/README.md).
4. [Verify](debugging-verification-and-deployment/verification.md) live updates in the same running Player, then test the intended Control App and output URL.

Use ES2017-compatible JavaScript as the conservative authoring target unless your deployment explicitly guarantees a newer engine. This is an authoring baseline, not a browser support guarantee. Inspect the loaded widget version and field schema before writing widget payloads.

The reference separates persisted source, runtime state, rendered appearance, and app delivery. A successful save or payload call alone does not establish all four.

## Object variable names

Use camelCase with `comp` for composition objects, `wi` for widgets, and `gr` for groups: `compCurrent`, `compLowerThird`, `wiTitle`, and `grContent`. This convention applies to script parameters, retained references, and object collections. Composer names and payload IDs remain the exact names configured in the document.

## Variable declarations

Use `const` for bindings that are not reassigned and `let` for bindings that change. Do not use `var`. Mutating an object or array does not require `let`; reassigning or clearing a retained reference does. Apply this convention to all new script examples.

## Diagnostics in examples

Examples assume their documented setup and omit defensive exception handling and repeated warnings. Add optional application diagnostics using [reportOnce](examples/report-once.md) when needed. Event routing, cleanup, and topic-specific value handling remain part of the examples.
