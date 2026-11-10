# Boilerplate Reference

Use one IIFE for the chosen script type. These are independent templates, not blocks to combine verbatim. Every complete example returns `init` and `close`; leave `close` empty when no explicit resource cleanup is needed. Use ES2017-compatible source unless a newer engine is guaranteed.

## Global script

```javascript
(function() {
  return {
    init: function(context) {
      // Merge shared helpers into an intentional versioned namespace.
    },
    close: function() {}
  };
})();
```

## Root or sub-composition script

```javascript
(function() {
  return {
    init: function(compCurrent) {
      // Resolve targets and apply the initial presentation.
    },
    close: function() {}
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
    close: function() {}
  };
})();
```

Boilerplates deliberately register no no-op listeners: those would consume event slots and could replace existing behavior. [The reactive example](../how-to-guides/react-to-control-node-changes.md) shows an owned listener and cleanup. In-script `removeListener(eventType)` differs from host SDK removal; do not interchange them.
