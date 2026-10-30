# How scripts communicate

Use `context.global` for shared deterministic functions and lookup data. Use a composition-owned function when root intentionally sends derived content to a child that owns the final widgets.

Child scripts initialize before root. A child can expose `comp.updateContent` during `init`; root can then resolve that child and call it. Validate targets and function existence, forward initial content as well as later changes, and remove exposed functions only if still owned by the closing script.

Avoid registering root callbacks into a child's listener slots just to coordinate updates; that can replace the child's handler. Preserve existing root handlers too.

- [Complete communication example](../how-to-guides/communicate-between-sub-compositions.md)
- [Context & utilities](../api-reference/context-and-utilities.md)
- [Listener ownership](../api-reference/event-listeners.md)
