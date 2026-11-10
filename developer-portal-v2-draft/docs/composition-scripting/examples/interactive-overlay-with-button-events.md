# Interactive overlay with button events

## Setup

Create a native Button Control Node with public ID `Toggle`, plus an unlinked Metric Text widget named `Readout` in the same sub-composition. This example owns the local `button_clicked` slot. It toggles an on-output status; it does not write status back to the Control App UI.

```javascript
(function() {
  return {
    init: function(compCurrent) {
      let enabled = false;

      const wiOutput = compCurrent.findWidget('Readout')[0];

      function apply() {
        wiOutput.setPayload({ text: enabled ? 'Enabled' : 'Disabled' });
      }

      compCurrent.addListener('button_clicked', function(event, msg) {
        if (event !== 'button_clicked' || !msg || msg.buttonId !== 'Toggle') return;
        const source = msg.compId || msg.compositionId;
        if (source !== compCurrent.id) return;
        enabled = !enabled;
        apply();
      });
      apply();
    },
    close: function() {}
  };
})();
```

## Verify

Check initial Disabled, two clicks producing Enabled then Disabled, rejection of wrong button/source, and cleanup. In-memory state resets with a fresh script instance; use an explicit public input if the operator needs persistent externally controlled state.

A widget/group pointer interaction instead arrives through `message` with its own `params` envelope. Configure that route in Composer and inspect its real ID/type before adapting [Handle interactive events](../how-to-guides/handle-interactive-events.md).
