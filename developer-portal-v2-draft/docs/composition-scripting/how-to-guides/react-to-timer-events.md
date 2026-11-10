# React to native Timer events

Configure a native Timer with public ID `Game Clock` and `emitEvents: true`. Inspect its stable model `keyId`, replace the placeholder below, and add an unlinked Metric Text widget `Timer Readout` in the same sub-composition.

For a simple formatted readout, a native text link is preferable. This example is useful when you need derived overtime text. It owns the local `message` slot and never commands the Timer.

```javascript
(function() {
  return {
    init: function(compCurrent) {
      const TIMER_KEY = 'replace-with-stable-timer-key';

      const wiReadout = compCurrent.findWidget('Timer Readout')[0];

      function write(text) {
        if ((wiReadout.getPayload() || {}).text !== text) {
          wiReadout.setPayload({ text: text });
        }
      }

      compCurrent.addListener('message', function(event, msg) {
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
    close: function() {}
  };
})();
```

Formatted initialization does not include a rich overtime snapshot; later Timer messages provide numeric/effective state. Do not restart a Timer to obtain an initial event. A parent consumer must filter the child's `compId`, not its own ID.

Verify fractional seconds, pause/resume, reset/start, endpoint and overtime display, wrong-source/key rejection, disabled events, and cleanup in the Player. See [Timer contracts](../api-reference/timer-controls.md).
