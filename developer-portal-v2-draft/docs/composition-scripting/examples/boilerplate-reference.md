# Boilerplate Reference

Quick-copy templates for each script type.

## Global script

```javascript
(function() {
  return {
    init: function(context) {
      // context.global — shared storage
      // context.utils  — utility functions
    },
    close: function() {
      // Clean up timers, intervals, open requests
    }
  };
})();
```

## Root / sub-composition script

```javascript
(function() {
  return {
    init: function(comp, context) {
      // comp    — this composition object
      // context — context.global and context.utils

      comp.addListener('payload_changed', (event, msg, e) => {
        e.stopPropagation();
      });

      comp.addListener('state_changed', (event, msg, e) => {
        e.stopPropagation();
      });

      comp.addListener('timeline_event', (event, msg, e) => {
        e.stopPropagation();
      });

      comp.addListener('datanode_payload_changed', (event, msg, e) => {
        e.stopPropagation();
      });

      comp.addListener('message', (event, msg, e) => {
        e.stopPropagation();
      });
    },
    close: function(comp, context) {
      // Clean up timers, intervals, open requests, data streams
    }
  };
})();
```

## Overlay script

```javascript
(function() {
  return {
    init: function(graphics, overlay) {
      graphics.addListener('message',                    (event, msg) => {});
      graphics.addListener('state_changed',              (event, msg) => {});
      graphics.addListener('payload_changed',            (event, msg) => {});
      graphics.addListener('datanode_payload_changed',   (event, msg) => {});
      graphics.addListener('error',                      (event, msg) => {});

      if (overlay) {
        overlay.addListener((event, msg) => {});
      }
    },
    close: function() {}
  };
```
