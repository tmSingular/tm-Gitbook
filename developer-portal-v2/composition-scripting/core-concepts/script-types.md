# Script types

There are four script types. You will typically work with the global and root/sub-composition scripts; the overlay script is only needed for advanced player integrations.

## **Global script**

Runs once and exposes shared variables and helper functions to all other scripts via the `context.global` object.

```javascript
(function() {
  return {

    // Called after the script is evaluated.
    // context.global: shared storage across all scripts
    // context.utils: Singular utility functions
    init: function(context) {
      context.global.myLookupTable = {
        "NYC": "New York",
        "LAX": "Los Angeles"
      };
    },

    // Called when the script is unloaded (e.g. tab closed).
    // Clean up timers, intervals, and open connections here.
    close: function() {}
  };
})();
```

## **Root and sub-composition scripts**

The most commonly used script type. The root script orchestrates the composition — fetching data, interpreting it, and distributing it to sub-compositions. Sub-composition scripts handle their own local scope.

```javascript
(function() {
  return {

    // comp: the composition object this script is attached to
    // context: access to context.global and context.utils
    init: function(comp, context) {
      console.log("Initialising:", comp.name);
    },

    close: function(comp, context) {
      // Clean up timers, intervals, open fetch/XHR requests
    }
  };
})();
```

## **Overlay script**

Provides the interface for communicating with a parent web page, a video player embed, or a native iOS/Android app. Only needed for specific expert integrations.

```javascript
(function() {
  return {

    // graphics: Graphics SDK object
    // overlay: Overlay SDK object (only present when using the Overlay SDK)
    init: function(graphics, overlay) {

      graphics.addListener('message', (event, msg) => {
        console.log("Graphics SDK message", event, msg);
      });

      graphics.addListener('error', (event, msg) => {
        console.error("Graphics SDK error", event, msg);
      });

      if (overlay) {
        overlay.addListener((event, msg) => {
          console.log("Overlay SDK message", event, msg);
        });
      }
    },

    close: function() {}
  };
})();
```

