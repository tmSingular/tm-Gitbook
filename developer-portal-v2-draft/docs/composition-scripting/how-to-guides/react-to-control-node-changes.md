# React to control node changes

Rather than running logic only on `init`, listen for `payload_changed` to keep the overlay updated whenever an operator changes a control node value.

```javascript
// Lower Script
(function() {
  return {
    init: function(comp, context) {

      const wiFullname = comp.findWidget("lowerFullname")[0];

      function updateComposition() {
        const p = comp.getPayload2();
        const fullname = `${p["Firstname"]} ${p["Lastname"].toUpperCase()}`;
        wiFullname.setPayload({ "text": fullname });
      }

      // Update whenever control nodes change
      comp.addListener('payload_changed', (event, msg, e) => {
        if (msg.compositionId === comp.id) {
          updateComposition();
        }
        e.stopPropagation();
      });

      // Also update on initial load
      updateComposition();

    },
    close: function(comp, context) {}
  };
})();
```

***

####
