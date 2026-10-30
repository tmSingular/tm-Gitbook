# Interrupted opacity fade

## Setup

Add standalone Number inputs `Opacity` (0–100) and `Fade duration` (milliseconds, zero or positive). Add a group `Content`. Its opacity must be unlinked and free of native opacity effects or another script writer. This script owns the local `payload_changed` slot.

Each new target starts from current stored opacity, cancels the previous frame handle, and invalidates stale callbacks. Missing inputs default to 100% and 300 ms. This is a script-owned interpolation example, not a replacement for native authored motion.

```javascript
(function() {
  var composition = null;
  var group = null;
  var frame = null;
  var generation = 0;
  var closed = true;
  var lastTarget = null;
  var lastDuration = null;
  function numeric(value) {
    if (typeof value === 'number') return Number.isFinite(value) ? value : NaN;
    if (typeof value !== 'string' ||
        !/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(value.trim())) return NaN;
    return Number(value);
  }
  function apply() {
    if (closed) return;
    var p = composition.getPayload2() || {};
    var target = p.Opacity == null ? 100 : numeric(p.Opacity);
    var duration = p['Fade duration'] == null ? 300 : numeric(p['Fade duration']);
    if (!Number.isFinite(target) || target < 0 || target > 100 ||
        !Number.isFinite(duration) || duration < 0) {
      console.warn('Invalid fade input');
      return;
    }
    if (frame !== null && target === lastTarget && duration === lastDuration) return;
    var from = group.getOpacity();
    if (typeof from !== 'number' || !Number.isFinite(from)) {
      console.warn('Invalid stored opacity');
      return;
    }
    generation += 1;
    var ownGeneration = generation;
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    lastTarget = target;
    lastDuration = duration;
    if (duration === 0 || from === target) {
      group.setOpacity(target);
      return;
    }
    var start = null;
    function tick(timestamp) {
      if (closed || ownGeneration !== generation) return;
      frame = null;
      if (start === null) start = timestamp;
      var progress = Math.min(1, (timestamp - start) / duration);
      group.setOpacity(progress === 1 ? target : from + (target - from) * progress);
      if (!closed && ownGeneration === generation && progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }
    frame = requestAnimationFrame(tick);
  }
  return {
    init: function(comp) {
      composition = comp;
      group = comp.findGroup('Content')[0];
      if (!group) throw new Error('Content group was not found');
      closed = false;
      comp.addListener('payload_changed', apply);
      apply();
    },
    close: function() {
      var wasActive = !closed;
      closed = true;
      generation += 1;
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      if (wasActive && composition) composition.removeListener('payload_changed');
      composition = null;
      group = null;
    }
  };
})();
```

## Verify

Test endpoint 100→0, interrupt at an intermediate value with a new target, zero-duration changes, invalid input, and closure while a frame is queued. Check that stale callbacks cannot write or reschedule. In a real Player, observe intermediate motion and intended background-resume behavior; a mock timestamp fixture does not prove visual smoothness.
