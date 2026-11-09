# React to native Timer events

Configure a native Timer with public ID `Game Clock` and `emitEvents: true`. Inspect its stable model `keyId`, replace the placeholder below, and add an unlinked Metric Text widget `Timer Readout` in the same sub-composition.

For a simple formatted readout, a native text link is preferable. This example is useful when you need derived overtime text. It owns the local `message` slot and never commands the Timer.

```javascript
(function() {
  let compStored = null;
  let wiReadout = null;
  let closed = true;
  const TIMER_KEY = 'replace-with-stable-timer-key';
  function write(text) {
    if (!closed && (wiReadout.getPayload() || {}).text !== text) {
      wiReadout.setPayload({ text: text });
    }
  }
  return {
    init: function(compCurrent) {
      compStored = compCurrent;
      wiReadout = compCurrent.findWidget('Timer Readout')[0];
      closed = false;
      compCurrent.addListener('message', function(event, msg) {
        if (closed) return;
        const p = msg && msg.params;
        const state = p && p.data;
        if (event !== 'message' || !msg || msg.event !== 'custom' || !p ||
            p.type !== 'controlNode' || p.compId !== compCurrent.id || p.id !== TIMER_KEY ||
            !state || state.type !== 'timerChanged' || typeof state.value !== 'string') return;
        write(state.value + (state.overtime ? ' OT' : ''));
      });
      const value = (compCurrent.getPayload2() || {})['Game Clock'];
      write(value == null ? '' : String(value));
    },
    close: function() {
      const wasActive = !closed;
      closed = true;
      if (wasActive && compStored) compStored.removeListener('message');
      compStored = null;
      wiReadout = null;
    }
  };
})();
```

Formatted initialization does not include a rich overtime snapshot; later Timer messages provide numeric/effective state. Do not restart a Timer to obtain an initial event. A parent consumer must filter the child's `compId`, not its own ID.

Verify fractional seconds, pause/resume, reset/start, endpoint and overtime display, wrong-source/key rejection, disabled events, and cleanup in the Player. See [Timer contracts](../api-reference/timer-controls.md).
