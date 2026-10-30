# API reference

These are **in-script runtime APIs**. A host-page SDK composition instance is a different object; see [Host boundaries](../core-concepts/host-boundaries.md).

| Reference | Use it for |
|---|---|
| [Composition object](the-composition-object.md) | Lookup, Control Node payloads, model metadata, states |
| [Widget object](the-widget-object.md) | Widget content, layout, visibility, opacity, DOM access |
| [Group object](the-group-object.md) | Group layout, visibility, opacity, effects |
| [Event listeners](event-listeners.md) | Registration slots, ownership, bubbling, message envelopes |
| [Animation control](animation-control.md) | In/Out transitions, completion, interpolation |
| [Normalized numbers](normalized-numbers.md) | Raw percentages versus mapped numeric values |
| [Native Timer controls](timer-controls.md) | Commands, seconds, formatted values, `timerChanged` messages |
| [Context & utilities](context-and-utilities.md) | Shared helpers, streams, colors, dates, display variants |
| [Widget payloads](widget-payloads/README.md) | Type-specific content and version-dependent behavior |

Methods return runtime objects or snapshots; they are not editor commands for creating or restructuring a composition. Treat models and returned metadata as read-only.
