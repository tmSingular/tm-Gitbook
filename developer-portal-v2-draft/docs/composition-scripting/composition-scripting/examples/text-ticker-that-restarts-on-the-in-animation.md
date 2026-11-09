# Text ticker that restarts on the In animation

## Setup and version scope

Use a **legacy Text Ticker (1216)** named `Text Ticker` inside the owning sub-composition, with a positive inspected speed and a standalone Text Area input `Messages`. Leave ticker text/speed unlinked and preserve its font. The script owns local `payload_changed` and `timeline_event` slots.

The following recipe requests a restart through a temporary speed change at the owning composition's In start. It is a legacy renderer-dependent technique, not a generic restart API or a guarantee for every loaded ticker version. Metric Ticker has a separate contract; verify actual restart behavior before adopting this recipe.

```javascript
(function() {
  let compStored = null;
  let wiTicker = null;
  let closed = true;
  function apply() {
    if (closed) return;
    const value = (compStored.getPayload2() || {}).Messages;
    const text = value == null ? '' : String(value);
    if ((wiTicker.getPayload() || {}).text !== text) wiTicker.setPayload({ text: text });
  }
  return {
    init: function(compCurrent) {
      compStored = compCurrent;
      wiTicker = compCurrent.findWidget('Text Ticker')[0];
      if (!wiTicker) throw new Error('Text Ticker was not found');
      closed = false;
      compCurrent.addListener('payload_changed', apply);
      compCurrent.addListener('timeline_event', function(event, msg) {
        if (closed || !msg || msg.compositionId !== compCurrent.id || !msg.message) return;
        if (msg.message.event !== 'start' || msg.message.targetState !== 'In') return;
        const speed = Number((wiTicker.getPayload() || {}).speed);
        if (!Number.isFinite(speed) || speed <= 0) return;
        wiTicker.setPayload({ speed: 0 });
        wiTicker.setPayload({ speed: speed });
        apply();
      });
      apply();
    },
    close: function() {
      const wasActive = !closed;
      closed = true;
      if (wasActive && compStored) {
        compStored.removeListener('payload_changed');
        compStored.removeListener('timeline_event');
      }
      compStored = null;
      wiTicker = null;
    }
  };
})();
```

Initial text is applied explicitly, and later text changes do not use a composition-ID gate. The timeline handler deliberately excludes child-composition events. It allows parent propagation.

## Verify

Observe movement across time, animate Out and In, and check the agreed first-message restart in the loaded legacy version. Also test subsequent text replacement, missing/empty messages and eventual clearing, repeated In transitions, wrong-child events, and cleanup. A mock speed-toggle call sequence or a settled screenshot does not prove the crawl restarted.

See [Tickers](../api-reference/widget-payloads/tickers.md) for font readiness, queue completion, clearing, and version differences.
