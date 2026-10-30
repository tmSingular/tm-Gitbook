# Script types

Scripts return a lifecycle object from an immediately invoked function expression (IIFE). Preserve the wrapper and the signature for the chosen type when editing an existing script.

| Type | Initialization | Responsibility |
|---|---|---|
| Global | `init(context)` | Shared variables and small library functions via `context.global` |
| Root | `init(comp, context)` | Root inputs and intentional coordination of descendants |
| Sub-composition | `init(comp, context)` | Local controls, widgets, and behavior |
| Overlay | `init(graphics, overlay)` | Advanced host/video integration; `overlay` may be absent |

`init()` is required. The runtime permits omitting `close()`, but implement cleanup whenever the script owns listeners, streams, requests, timers, or frames. Root and sub-composition lifecycle functions can receive `(comp, context)`; a closure also lets `close()` release stored handles.

Global context belongs to that loaded output instance; it is not a cross-client database or persistent Control App state. An Overlay script is not a root script, and its SDK objects do not expose the in-script widget API.

- [Boilerplate Reference](../examples/boilerplate-reference.md)
- [Initialization order](initialization-order.md)
- [Lifecycle](lifecycle.md)
- [Host boundaries](host-boundaries.md)
