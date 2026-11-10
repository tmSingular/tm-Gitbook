# Interrupted opacity fade

## Setup

Add standalone Number inputs `Opacity` (0–100) and `Fade duration` (milliseconds, zero or positive). Add a group `Content`. Its opacity must be unlinked and free of native opacity effects or another script writer. This script owns the local `payload_changed` slot.

Each new target starts from current stored opacity, cancels the previous frame handle, and invalidates stale callbacks. Missing inputs default to 100% and 300 ms. This is a script-owned interpolation example, not a replacement for native authored motion.

```javascript
(function() {
  return {
    init: function(compCurrent) {
      let frame = null;
      let generation = 0;
      let closed = false;
      let lastTarget = null;
      let lastDuration = null;

      const grGroup = compCurrent.findGroup('Content')[0];

      function numeric(value) {
        if (typeof value === 'number') return Number.isFinite(value) ? value : NaN;
        if (typeof value !== 'string' ||
            !/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(value.trim())) return NaN;
        return Number(value);
      }

      function apply() {
        if (closed) return;
        const p = compCurrent.getPayload2() || {};
        const target = p.Opacity == null ? 100 : numeric(p.Opacity);
        const duration = p['Fade duration'] == null ? 300 : numeric(p['Fade duration']);
        if (!Number.isFinite(target) || target < 0 || target > 100 ||
            !Number.isFinite(duration) || duration < 0) {
          return;
        }
        if (frame !== null && target === lastTarget && duration === lastDuration) return;
        const from = grGroup.getOpacity();
        if (typeof from !== 'number' || !Number.isFinite(from)) {
          return;
        }
        generation += 1;
        const ownGeneration = generation;
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        lastTarget = target;
        lastDuration = duration;
        if (duration === 0 || from === target) {
          grGroup.setOpacity(target);
          return;
        }
        let start = null;
        function tick(timestamp) {
          if (closed || ownGeneration !== generation) return;
          frame = null;
          if (start === null) start = timestamp;
          const progress = Math.min(1, (timestamp - start) / duration);
          grGroup.setOpacity(progress === 1 ? target : from + (target - from) * progress);
          if (!closed && ownGeneration === generation && progress < 1) {
            frame = requestAnimationFrame(tick);
          }
        }
        frame = requestAnimationFrame(tick);
      }

      compCurrent.addListener('payload_changed', apply);
      apply();

      compCurrent.releaseResources = function() {
        const wasActive = !closed;
        closed = true;
        generation += 1;
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        if (wasActive && compCurrent) compCurrent.removeListener('payload_changed');
      };
    },
    close: function(compCurrent) {
      compCurrent.releaseResources();
    }
  };
})();
```

## Verify

Test endpoint 100→0, interrupt at an intermediate value with a new target, zero-duration changes, invalid input, and closure while a frame is queued. Check that stale callbacks cannot write or reschedule. In a real Player, observe intermediate motion and intended background-resume behavior; a mock timestamp fixture does not prove visual smoothness.

### Resource cleanup structure

This resource-owning example keeps its state and helper functions inside `init`. Its application-defined `compCurrent.releaseResources` function closes over those local values; the lifecycle `close(compCurrent)` invokes it. `releaseResources` is a custom function owned by this example, not a built-in Singular method. Reserve that name for the script’s cleanup and merge resource cleanup when combining examples.
