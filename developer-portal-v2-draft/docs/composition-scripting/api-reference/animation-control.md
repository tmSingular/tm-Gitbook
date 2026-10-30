# Animation control

Use `comp.playTo("In")` / `comp.playTo("Out")` to run the composition's authored Timeline, or `jumpTo(...)` for immediate state changes. These control composition-level In/Out motion, not individual tile keyframes.

| Operation | Observable events |
|---|---|
| `playTo(state)` | `timeline_event` start, then settled state and timeline stop |
| `jumpTo(state)` with a changed state | Timeline jump; state change |
| `jumpTo(state)` already at that state | Timeline jump; no `state_changed` |

`playTo()` returns before completion. An immediate `getState()` can still report the previous logical state. `getState()` returns `In`/`Out`; messages may report internal Out variants. Match `timeline_event` by source composition and inspect `msg.message.event` plus `targetState`.

Fragment inside an existing composition-owned timeline handler:

```javascript
if (msg && msg.compositionId === comp.id && msg.message) {
  if (msg.message.event === "stop" && msg.message.targetState === "In") {
    // The owning composition reached its In endpoint.
  }
}
```

## Continuous interpolation

Prefer native Timeline/Update motion when it expresses the design. For script-owned continuous interpolation, use timestamp-based `requestAnimationFrame`:

```javascript
// Fragment inside an animation-frame callback; durationMs must be positive.
const progress = Math.min(1, (timestamp - startTimestamp) / durationMs);
const opacity = fromOpacity + (toOpacity - fromOpacity) * progress;
target.setOpacity(opacity);
```

Use the frame callback's monotonic timestamp consistently. Keep one frame chain per destination; cancel its handle and invalidate stale callbacks when replacing it or closing the script. Set the exact endpoint, then stop scheduling. Do not layer it onto a linked or native-animated property.

Use timers for discrete clock changes, polling, and retries; those are not continuous visual interpolation. Browsers can suspend animation frames in background documents. Define catch-up/pause/restart behavior explicitly and test recovery separately.

[Verification](../debugging-verification-and-deployment/verification.md) must include temporal evidence. Endpoint screenshots do not establish smoothness, continuity, or correct intermediate frames.
