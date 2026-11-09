# Communicate between sub-compositions

In this setup root owns standalone `Title` input; child `Lower` owns an unlinked Metric Text widget named `Title`. The child exposes a custom function; root forwards initial and later values. These are two separate scripts, not two blocks pasted into one script.

## Child script: Lower

```javascript
(function() {
  let compStored = null;
  let wiTitle = null;
  let update = null;
  let closed = true;
  return {
    init: function(compCurrent) {
      compStored = compCurrent;
      wiTitle = compCurrent.findWidget('Title')[0];
      if (!wiTitle) throw new Error('Title was not found');
      closed = false;
      update = function(value) {
        if (closed) return;
        wiTitle.setPayload({ text: value == null ? '' : String(value) });
      };
      compCurrent.updateContent = update;
    },
    close: function() {
      closed = true;
      if (compStored && compStored.updateContent === update) {
        delete compStored.updateContent;
      }
      compStored = null;
      wiTitle = null;
      update = null;
    }
  };
})();
```

## Root script

This example owns root's `payload_changed` slot; merge it into any existing coordinator.

```javascript
(function() {
  let compStored = null;
  let compLower = null;
  let closed = true;
  function apply() {
    if (!closed) compLower.updateContent((compStored.getPayload2() || {}).Title);
  }
  return {
    init: function(compCurrent) {
      compStored = compCurrent;
      const compMatches = compCurrent.find('Lower');
      if (compMatches.length !== 1 || typeof compMatches[0].updateContent !== 'function') {
        throw new Error('Lower updateContent is unavailable');
      }
      compLower = compMatches[0];
      closed = false;
      compCurrent.addListener('payload_changed', apply);
      apply();
    },
    close: function() {
      const wasActive = !closed;
      closed = true;
      if (wasActive && compStored) compStored.removeListener('payload_changed');
      compStored = null;
      compLower = null;
    }
  };
})();
```

Children initialize before root, but still validate the exposed function. `updateContent` is application code, not a built-in API. The child removes it only if it still owns that exact function.

For helpers used across scripts, merge a small versioned namespace into the existing Global Script. For example, a custom `context.global.nameFormatting = { version: 1, ... }` can hold deterministic formatting functions; do not overwrite another library or treat that illustrative namespace as a built-in feature.

Verify initial forwarding, later root updates without reload, child visibility, and cleanup. Parent coordination cannot rely on events a descendant deliberately stops.
