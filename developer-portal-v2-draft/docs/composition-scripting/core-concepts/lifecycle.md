# Lifecycle

Use ES2017-compatible source unless your target engine explicitly supports more. Avoid optional chaining and nullish coalescing under that baseline. Browser facilities such as `fetch`, `AbortController`, or `Intl` options have their own support requirements; JavaScript syntax compatibility does not guarantee those APIs exist.

## Initialize and update

Resolve and validate the intended objects in `init()`. Register owned handlers before forwarding initial changes when messages can be emitted synchronously. Apply initial inputs through the same update function used for later changes.

## Release resources

| Owned resource | Cleanup |
|---|---|
| Composition event slot | Remove only the slot you own; removal is not callback-specific |
| `setTimeout` / `setInterval` | Clear the handle and prevent late work from rescheduling |
| Animation frames | Cancel the handle and invalidate the active generation |
| Data Stream | Close the handle and ignore late callbacks |
| Fetch/XHR | Abort when supported; still guard against late completion |
| Function exposed on a composition | Remove only if it still refers to your function |

A `closed` flag protects ordinary late callbacks. When operations overlap or a callback can survive replacement, use a generation ID as well. Never retry an uncertain non-idempotent action simply because a response was lost.

Scripts are unloaded/replaced during more than browser shutdown. Do not assume cleanup is optional because a graphic normally stays open. Preserve unrelated cleanup when merging examples.

- [Listener ownership](../api-reference/event-listeners.md)
- [Reactive input example](../how-to-guides/react-to-control-node-changes.md)
- [External requests](../how-to-guides/fetch-external-data.md)
- [Animation control](../api-reference/animation-control.md)
