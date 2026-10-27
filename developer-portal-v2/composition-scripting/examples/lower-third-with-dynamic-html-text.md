# Lower-third with dynamic HTML text

This example reads a first name and last name from control nodes and renders the last name in bold using the text widget's HTML feature. It stays live — the composition updates instantly whenever an operator changes a control node.

```javascript
// Lower Script
(function() {

  // HTML template with mustache-style placeholders
  const HTML_TEMPLATE = "<html>{{firstname}} <b>{{lastname}}</b></html>";

  return {
    init: function(comp, context) {

      const wiFullname = comp.findWidget("lowerFullname")[0];

      function updateComposition() {
        const p = comp.getPayload2();

        let html = HTML_TEMPLATE
          .replace("{{firstname}}", p["Firstname"])
          .replace("{{lastname}}",  p["Lastname"]);

        wiFullname.setPayload({ "text": html });
      }

      // React to operator changes
      comp.addListener('payload_changed', (event, msg, e) => {
        updateComposition();
        e.stopPropagation();
      });

      // Populate on first load
      updateComposition();
    },

    close: function(comp, context) {}
  };
})();
```

***

