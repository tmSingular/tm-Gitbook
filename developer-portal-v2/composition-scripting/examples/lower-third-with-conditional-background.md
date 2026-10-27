# Lower-third with conditional background

Extends the previous example by adding a coloured background behind the name. The background colour is itself a control node (a colour picker), so the operator can change it live. The Singular colour object is converted to CSS `rgba()` before being injected into the HTML string.

```javascript
// Lower Script
(function() {

  const HTML_TEMPLATE =
    '<html><span style="background:{{bg-color}}; padding: 0px {{pad-right}}px 0px {{pad-left}}px">' +
    '{{firstname}} <b>{{lastname}}</b></span></html>';

  // Convert Singular's colour JSON { r, g, b, a } to a CSS rgba() string
  function parseColor(color) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  }

  return {
    init: function(comp, context) {

      const wiText = comp.findWidget("lowerText")[0];

      function updateComposition() {
        const p = comp.getPayload2();

        let html = HTML_TEMPLATE
          .replace(/{{bg-color}}/gi,   parseColor(p["Background Color"]))
          .replace(/{{pad-right}}/gi,  p["Padding Right"])
          .replace(/{{pad-left}}/gi,   p["Padding Left"])
          .replace(/{{firstname}}/gi,  p["Firstname"])
          .replace(/{{lastname}}/gi,   p["Lastname"]);

        wiText.setPayload({ "text": html });
      }

      comp.addListener('payload_changed', (event, msg, e) => {
        updateComposition();
        e.stopPropagation();
      });

      updateComposition();
    },

    close: function(comp, context) {}
  };
})();
```

***

