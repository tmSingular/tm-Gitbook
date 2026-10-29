# Text ticker that restarts on the In animation

This example attaches a Text Ticker widget to a sub-composition and ensures the ticker always restarts cleanly from the beginning when the sub-composition animates In. It also updates the ticker messages whenever the operator changes the control node.

**Composition setup:**

1. Create a sub-composition called **Text Ticker** inside the root composition.
2. Inside that sub-composition, add a **Text Ticker** widget (name it `Text Ticker`), a background rectangle, and a control node called `Messages`.

```javascript
// Text Ticker Script
(function() {
  return {
    init: function(comp, context) {

      const wiTextTicker = comp.findWidget("Text Ticker")[0];

      // When the In animation starts: reset and restart the ticker
      comp.addListener('timeline_event', (event, msg, e) => {
        if (msg.compositionId !== comp.id) return;

        const m = msg.message;
        if (m.event === "start" && m.targetState === "In") {
          const p = comp.getPayload2();

          // Save current speed, stop the ticker, then restart with new content
          const speed = wiTextTicker.getPayload()["speed"];
          wiTextTicker.setPayload({ "speed": 0 });
          wiTextTicker.setPayload({
            "speed": speed,
            "text": p["Messages"]
          });
        }

        e.stopPropagation();
      });

      // Update ticker messages when the operator changes the control node
      comp.addListener('payload_changed', (event, msg, e) => {
        if (msg.compositionId !== comp.id) return;

        const p = comp.getPayload2();
        wiTextTicker.setPayload({ "text": p["Messages"] });

        e.stopPropagation();
      });

    },

    close: function(comp, context) {}
  };
})();
```

***

