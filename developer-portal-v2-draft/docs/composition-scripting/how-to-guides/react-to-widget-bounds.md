# React to widget bounds

Add Metric Text widgets `Label` and `Width Readout` to one sub-composition. Add standalone Text input `Label`. Leave both text properties unlinked. This example enables bounds on `Label`, routes only that tile's messages, and shows its logical pixel width in the second widget.

The script owns local `message` and `payload_changed` slots; merge existing handlers before use.

```javascript
(function() {
  return {
    init: function(compCurrent) {
      const wiLabel = compCurrent.findWidget('Label')[0];
      const wiReadout = compCurrent.findWidget('Width Readout')[0];

      function apply() {
        const value = (compCurrent.getPayload2() || {}).Label;
        const text = value == null ? '' : String(value);
        if (!text.trim()) wiReadout.setPayload({ text: '' });
        if ((wiLabel.getPayload() || {}).text !== text) wiLabel.setPayload({ text: text });
      }

      compCurrent.addListener('message', function(event, msg) {
        if (event !== 'message') return;
        const p = msg && msg.params;
        const data = p && p.data;
        if (!p || p.id !== wiLabel.id || !data || data.event !== 'bounds' ||
            typeof data.widthPx !== 'number' || !Number.isFinite(data.widthPx)) return;
        const currentText = (wiLabel.getPayload() || {}).text || '';
        if (!String(currentText).trim()) return;
        wiReadout.setPayload({ text: data.widthPx.toFixed(1) });
      });
      compCurrent.addListener('payload_changed', apply);
      wiLabel.setPayload({ emitEvents: true });
      apply();
    },
    close: function() {}
  };
})();
```

Bounds are local layout measurements, not absolute screen geometry or glyph ink. Clearing text may emit no bounds event; the example clears the dependent readout explicitly. It does not toggle events repeatedly or poll DOM for readiness.

Verify initial font readiness, input changes, clearing, resize, and wrong-tile rejection. See [Metric Text contracts](../api-reference/widget-payloads/text-and-metric-text.md#html-and-bounds).
