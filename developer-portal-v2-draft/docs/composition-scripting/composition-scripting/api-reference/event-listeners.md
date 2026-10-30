# Event listeners

Register an in-script handler with `comp.addListener(eventType, callback)`.

## Registration and ownership

There is **one handler slot per target composition and event type**. Registering again for the same pair replaces the previous handler. Combine related behavior in the existing callback; registering on a child from root can replace that child's handler too.

`comp.removeListener(eventType)` removes that target's entire event slot. It is not callback-specific removal. Do not pass a second callback argument as though it protects another owner's handler. Only remove a slot your script owns.

Uninstalling a composition script clears slots keyed to that composition before `close()`; it does not automatically remove listeners it registered on other compositions. Prefer local ownership and explicit coordination rather than cross-composition registrations. For shared root coordination, extend the root's existing handler.

## Callback and propagation

```javascript
comp.addListener("message", function(event, msg, propagationEvent) {
  // event is the event-name string; msg contains that event's data.
  // Stop propagation only if parents must not receive this message.
});
```

Composition-script callbacks receive three arguments. Host-page Player SDK callbacks receive `(event, msg)`, without a propagation object. Descendant events normally bubble to parent compositions until a handler calls `propagationEvent.stopPropagation()`.

Filter source identity according to each event's envelope. A root listener cannot assume all events arrive: descendants can stop them. Avoid applying a `msg.compositionId === comp.id` filter to local theme/payload synchronization; it can suppress live editor updates. Instead, reread the owning composition's authoritative payload and apply it initially and after changes.

## Event reference

| Event | Relevant message data | Notes |
|---|---|---|
| `payload_changed` | Composition identity and partial/new payload information | Read complete values through `comp.getPayload2()` |
| `timeline_event` | `compositionId`, `message.event`, `message.targetState` | `start`, `stop`, or `jump`; use for animation timing |
| `state_changed` | `compositionId`, `state` | Settled internal state; may include `Out1` |
| `button_clicked` | `buttonId`; composition identity fields depend on the event | Match the actual public button ID; do not infer it from its display title |
| `datanode_payload_changed` | Composition identity and data-node payload | Separate from ordinary Control Node values |
| `message` | Event-specific envelope, often `params` | Interactive, widget, host, and Timer messages differ |

Interactive messages use `msg.type` for the interaction type and `msg.params` for source identity, including `id`, `name`, `compId`, and `type`. Metric Text bounds use `msg.params.data.event === "bounds"` and route by the originating tile ID. [Timer messages](timer-controls.md) use a stable Control Node key and `data.type === "timerChanged"`.

## Reactive local input

The complete [reactive-control example](../how-to-guides/react-to-control-node-changes.md) registers one handler, initializes once, rereads current values on updates, and releases only its owned slot. It deliberately permits parent propagation.

See [Animation control](animation-control.md) for the full start/stop/jump behavior. Never infer a single universal source envelope from one event example.
