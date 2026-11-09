# Clock with cleanup

Add an unlinked Metric Text widget named `Clock`. This example displays wall-clock time in an explicit zone; it is not a native duration Timer. Choose the locale/zone for your deployment and ensure the browser supports the requested `Intl` options.

```javascript
(function() {
  let timer = null;
  let wiClock = null;
  let closed = true;
  function update() {
    if (closed) return;
    const text = new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Europe/Berlin', hour12: false,
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    if ((wiClock.getPayload() || {}).text !== text) wiClock.setPayload({ text: text });
    if (!closed) timer = setTimeout(update, Math.max(25, 1000 - Date.now() % 1000));
  }
  return {
    init: function(compCurrent) {
      wiClock = compCurrent.findWidget('Clock')[0];
      closed = false;
      update();
    },
    close: function() {
      closed = true;
      if (timer !== null) clearTimeout(timer);
      timer = null;
      wiClock = null;
    }
  };
})();
```

This timer schedules discrete text updates, so it does not use animation frames. Verify at least five visible changes in the Player, the intended timezone, and cleanup. Font/asset readiness and captured appearance are separate checks; an updated DOM value alone does not prove every captured frame is complete.
