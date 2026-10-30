# React to widget bounds

Add Metric Text widgets `Label` and `Width Readout` to one sub-composition. Add standalone Text input `Label`. Leave both text properties unlinked. This example enables bounds on `Label`, routes only that tile's messages, and shows its logical pixel width in the second widget.

The script owns local `message` and `payload_changed` slots; merge existing handlers before use.

```javascript
(function() {
  var composition = null;
  var label = null;
  var readout = null;
  var closed = true;
  function apply() {
    if (closed) return;
    var value = (composition.getPayload2() || {}).Label;
    var text = value == null ? '' : String(value);
    if (!text.trim()) readout.setPayload({ text: '' });
    if ((label.getPayload() || {}).text !== text) label.setPayload({ text: text });
  }
  return {
    init: function(comp) {
      composition = comp;
      label = comp.findWidget('Label')[0];
      readout = comp.findWidget('Width Readout')[0];
      if (!label || !readout) throw new Error('Bounds example widgets are missing');
      closed = false;
      comp.addListener('message', function(event, msg) {
        if (closed || event !== 'message') return;
        var p = msg && msg.params;
        var data = p && p.data;
        if (!p || p.id !== label.id || !data || data.event !== 'bounds' ||
            typeof data.widthPx !== 'number' || !Number.isFinite(data.widthPx)) return;
        var currentText = (label.getPayload() || {}).text || '';
        if (!String(currentText).trim()) return;
        readout.setPayload({ text: data.widthPx.toFixed(1) });
      });
      comp.addListener('payload_changed', apply);
      label.setPayload({ emitEvents: true });
      apply();
    },
    close: function() {
      var wasActive = !closed;
      closed = true;
      if (wasActive && composition) {
        composition.removeListener('message');
        composition.removeListener('payload_changed');
      }
      composition = null;
      label = null;
      readout = null;
    }
  };
})();
```

Bounds are local layout measurements, not absolute screen geometry or glyph ink. Clearing text may emit no bounds event; the example clears the dependent readout explicitly. It does not toggle events repeatedly or poll DOM for readiness.

Verify initial font readiness, input changes, clearing, resize, and wrong-tile rejection. See [Metric Text contracts](../api-reference/widget-payloads/text-and-metric-text.md#html-and-bounds).
