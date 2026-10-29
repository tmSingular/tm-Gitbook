# Read control nodes and update widget properties

A very common pattern: read data from control nodes, process it, and write the result directly to a widget's properties — bypassing the default control node binding.

```javascript
// Lower Script
(function() {
  return {
    init: function(comp, context) {

      const wiFullname = comp.findWidget("lowerFullname")[0];

      // Read control nodes
      const p = comp.getPayload2();

      // Process: concatenate and capitalise the surname
      const fullname = `${p["Firstname"]} ${p["Lastname"].toUpperCase()}`;

      // Write directly to the widget
      wiFullname.setPayload({ "text": fullname });

    },
    close: function(comp, context) {}
  };
})();
```

> **Best practice:** When a script will process and transform data before display, unlink the control nodes from their widget properties in Composer. Let the script be the sole writer. This avoids conflicts where both the binding and the script try to update the same widget.

***
