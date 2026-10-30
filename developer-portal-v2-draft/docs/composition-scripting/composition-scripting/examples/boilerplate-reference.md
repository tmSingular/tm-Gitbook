# Boilerplate Reference

Use one IIFE for the chosen script type. These are independent templates, not blocks to combine verbatim. `init` is required; include `close` whenever resources need cleanup. Use ES2017-compatible source unless a newer engine is guaranteed.

## Global script

```javascript
(function() {
  return {
    init: function(context) {
      // Merge shared helpers into an intentional versioned namespace.
    },
    close: function() {
      // Release resources this Global Script owns.
    }
  };
})();
```

## Root or sub-composition script

```javascript
(function() {
  return {
    init: function(comp, context) {
      // Resolve targets and apply the initial presentation.
    },
    close: function(comp, context) {
      // Release only owned listeners, streams, requests, timers, and frames.
    }
  };
})();
```

## Overlay script

```javascript
(function() {
  return {
    init: function(graphics, overlay) {
      // SDK objects for the advanced host/video integration.
      // overlay can be absent; check it before use.
    },
    close: function() {
      // Use that SDK's documented cleanup contract for owned resources.
    }
  };
})();
```

Boilerplates deliberately register no no-op listeners: those would consume event slots and could replace existing behavior. [The reactive example](../how-to-guides/react-to-control-node-changes.md) shows an owned listener and cleanup. In-script `removeListener(eventType)` differs from host SDK removal; do not interchange them.
