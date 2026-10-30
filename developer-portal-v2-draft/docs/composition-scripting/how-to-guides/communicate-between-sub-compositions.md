# Communicate between sub-compositions

In this setup root owns standalone `Title` input; child `Lower` owns an unlinked Metric Text widget named `Title`. The child exposes a custom function; root forwards initial and later values. These are two separate scripts, not two blocks pasted into one script.

## Child script: Lower

```javascript
(function() {
  var composition = null;
  var title = null;
  var update = null;
  var closed = true;
  return {
    init: function(comp) {
      composition = comp;
      title = comp.findWidget('Title')[0];
      if (!title) throw new Error('Title was not found');
      closed = false;
      update = function(value) {
        if (closed) return;
        title.setPayload({ text: value == null ? '' : String(value) });
      };
      comp.updateContent = update;
    },
    close: function() {
      closed = true;
      if (composition && composition.updateContent === update) {
        delete composition.updateContent;
      }
      composition = null;
      title = null;
      update = null;
    }
  };
})();
```

## Root script

This example owns root's `payload_changed` slot; merge it into any existing coordinator.

```javascript
(function() {
  var composition = null;
  var lower = null;
  var closed = true;
  function apply() {
    if (!closed) lower.updateContent((composition.getPayload2() || {}).Title);
  }
  return {
    init: function(comp) {
      composition = comp;
      var matches = comp.find('Lower');
      if (matches.length !== 1 || typeof matches[0].updateContent !== 'function') {
        throw new Error('Lower updateContent is unavailable');
      }
      lower = matches[0];
      closed = false;
      comp.addListener('payload_changed', apply);
      apply();
    },
    close: function() {
      var wasActive = !closed;
      closed = true;
      if (wasActive && composition) composition.removeListener('payload_changed');
      composition = null;
      lower = null;
    }
  };
})();
```

Children initialize before root, but still validate the exposed function. `updateContent` is application code, not a built-in API. The child removes it only if it still owns that exact function.

For helpers used across scripts, merge a small versioned namespace into the existing Global Script. For example, a custom `context.global.nameFormatting = { version: 1, ... }` can hold deterministic formatting functions; do not overwrite another library or treat that illustrative namespace as a built-in feature.

Verify initial forwarding, later root updates without reload, child visibility, and cleanup. Parent coordination cannot rely on events a descendant deliberately stops.
