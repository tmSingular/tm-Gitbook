# Score bug reacting to live data

## Setup

In one sub-composition add unlinked Metric Text widgets `Home score` and `Away score`. Subscribe with the Data Stream's public token. The publisher sends JSON matching this schema:

```json
{ "home": 2, "away": 1 }
```

The complete script validates nonnegative integer scores, preserves the last good output on invalid messages, and never writes feed values into operator Control Nodes.

```javascript
(function() {
  let stream = null;
  let wiHome = null;
  let wiAway = null;
  let closed = true;
  function validScore(value) {
    return typeof value === 'number' && Number.isInteger(value) && value >= 0;
  }
  function write(wiWidget, value) {
    const text = String(value);
    if ((wiWidget.getPayload() || {}).text !== text) wiWidget.setPayload({ text: text });
  }
  return {
    init: function(compCurrent, context) {
      wiHome = compCurrent.findWidget('Home score')[0];
      wiAway = compCurrent.findWidget('Away score')[0];
      if (!wiHome || !wiAway) throw new Error('Score widgets are missing');
      closed = false;
      wiHome.setPayload({ text: '--' });
      wiAway.setPayload({ text: '--' });
      stream = context.utils.createDataStream('your-data-stream-public-token', function(status, message) {
        if (closed) return;
        if (status === 'message') {
          const data = message && message.payload;
          if (!data || !validScore(data.home) || !validScore(data.away)) {
            console.warn('Invalid score data');
            return;
          }
          write(wiHome, data.home);
          write(wiAway, data.away);
        } else if (status === 'error') {
          console.warn('Score stream error');
        }
      });
    },
    close: function() {
      closed = true;
      if (stream) stream.close();
      stream = null;
      wiHome = null;
      wiAway = null;
    }
  };
})();
```

## Verify

Send 0–0, 2–1, and a later score in one running Player. Confirm exact text, preservation after invalid/string/negative scores, and no late writes after closure. Define stale-feed presentation and provider recovery for your application separately. Add score-triggered animation only under its own explicit state/ownership contract.
