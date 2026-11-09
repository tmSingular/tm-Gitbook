# React to widget bounds

Add Metric Text widgets `Label` and `Width Readout` to one sub-composition. Add standalone Text input `Label`. Leave both text properties unlinked. This example enables bounds on `Label`, routes only that tile's messages, and shows its logical pixel width in the second widget.

The script owns local `message` and `payload_changed` slots; merge existing handlers before use.

```javascript
(function() {
  let compStored = null;
  let wiLabel = null;
  let wiReadout = null;
  let closed = true;
  function apply() {
    if (closed) return;
    const value = (compStored.getPayload2() || {}).Label;
    const text = value == null ? '' : String(value);
    if (!text.trim()) wiReadout.setPayload({ text: '' });
    if ((wiLabel.getPayload() || {}).text !== text) wiLabel.setPayload({ text: text });
  }
  return {
    init: function(compCurrent) {
      compStored = compCurrent;
      wiLabel = compCurrent.findWidget('Label')[0];
      wiReadout = compCurrent.findWidget('Width Readout')[0];
      if (!wiLabel || !wiReadout) throw new Error('Bounds example widgets are missing');
      closed = false;
      compCurrent.addListener('message', function(event, msg) {
        if (closed || event !== 'message') return;
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
    close: function() {
      const wasActive = !closed;
      closed = true;
      if (wasActive && compStored) {
        compStored.removeListener('message');
        compStored.removeListener('payload_changed');
      }
      compStored = null;
      wiLabel = null;
      wiReadout = null;
    }
  };
})();
```

Bounds are local layout measurements, not absolute screen geometry or glyph ink. Clearing text may emit no bounds event; the example clears the dependent readout explicitly. It does not toggle events repeatedly or poll DOM for readiness.

Verify initial font readiness, input changes, clearing, resize, and wrong-tile rejection. See [Metric Text contracts](../api-reference/widget-payloads/text-and-metric-text.md#html-and-bounds).
