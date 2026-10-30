# Text ticker that restarts on the In animation

## Setup and version scope

Use a **legacy Text Ticker (1216)** named `Text Ticker` inside the owning sub-composition, with a positive inspected speed and a standalone Text Area input `Messages`. Leave ticker text/speed unlinked and preserve its font. The script owns local `payload_changed` and `timeline_event` slots.

The following recipe requests a restart through a temporary speed change at the owning composition's In start. It is a legacy renderer-dependent technique, not a generic restart API or a guarantee for every loaded ticker version. Metric Ticker has a separate contract; verify actual restart behavior before adopting this recipe.

```javascript
(function() {
  var composition = null;
  var ticker = null;
  var closed = true;
  function apply() {
    if (closed) return;
    var value = (composition.getPayload2() || {}).Messages;
    var text = value == null ? '' : String(value);
    if ((ticker.getPayload() || {}).text !== text) ticker.setPayload({ text: text });
  }
  return {
    init: function(comp) {
      composition = comp;
      ticker = comp.findWidget('Text Ticker')[0];
      if (!ticker) throw new Error('Text Ticker was not found');
      closed = false;
      comp.addListener('payload_changed', apply);
      comp.addListener('timeline_event', function(event, msg) {
        if (closed || !msg || msg.compositionId !== comp.id || !msg.message) return;
        if (msg.message.event !== 'start' || msg.message.targetState !== 'In') return;
        var speed = Number((ticker.getPayload() || {}).speed);
        if (!Number.isFinite(speed) || speed <= 0) return;
        ticker.setPayload({ speed: 0 });
        ticker.setPayload({ speed: speed });
        apply();
      });
      apply();
    },
    close: function() {
      var wasActive = !closed;
      closed = true;
      if (wasActive && composition) {
        composition.removeListener('payload_changed');
        composition.removeListener('timeline_event');
      }
      composition = null;
      ticker = null;
    }
  };
})();
```

Initial text is applied explicitly, and later text changes do not use a composition-ID gate. The timeline handler deliberately excludes child-composition events. It allows parent propagation.

## Verify

Observe movement across time, animate Out and In, and check the agreed first-message restart in the loaded legacy version. Also test subsequent text replacement, missing/empty messages and eventual clearing, repeated In transitions, wrong-child events, and cleanup. A mock speed-toggle call sequence or a settled screenshot does not prove the crawl restarted.

See [Tickers](../api-reference/widget-payloads/tickers.md) for font readiness, queue completion, clearing, and version differences.
