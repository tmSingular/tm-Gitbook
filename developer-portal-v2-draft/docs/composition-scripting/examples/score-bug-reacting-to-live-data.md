# Score bug reacting to live data

## Setup

In one sub-composition add unlinked Metric Text widgets `Home score` and `Away score`. Subscribe with the Data Stream's public token. The publisher sends JSON matching this schema:

```json
{ "home": 2, "away": 1 }
```

The complete script validates nonnegative integer scores, preserves the last good output on invalid messages, and never writes feed values into operator Control Nodes.

```javascript
(function() {
  var stream = null;
  var home = null;
  var away = null;
  var closed = true;
  function validScore(value) {
    return typeof value === 'number' && Number.isInteger(value) && value >= 0;
  }
  function write(widget, value) {
    var text = String(value);
    if ((widget.getPayload() || {}).text !== text) widget.setPayload({ text: text });
  }
  return {
    init: function(comp, context) {
      home = comp.findWidget('Home score')[0];
      away = comp.findWidget('Away score')[0];
      if (!home || !away) throw new Error('Score widgets are missing');
      closed = false;
      home.setPayload({ text: '--' });
      away.setPayload({ text: '--' });
      stream = context.utils.createDataStream('your-data-stream-public-token', function(status, message) {
        if (closed) return;
        if (status === 'message') {
          var data = message && message.payload;
          if (!data || !validScore(data.home) || !validScore(data.away)) {
            console.warn('Invalid score data');
            return;
          }
          write(home, data.home);
          write(away, data.away);
        } else if (status === 'error') {
          console.warn('Score stream error');
        }
      });
    },
    close: function() {
      closed = true;
      if (stream) stream.close();
      stream = null;
      home = null;
      away = null;
    }
  };
})();
```

## Verify

Send 0–0, 2–1, and a later score in one running Player. Confirm exact text, preservation after invalid/string/negative scores, and no late writes after closure. Define stale-feed presentation and provider recovery for your application separately. Add score-triggered animation only under its own explicit state/ownership contract.
