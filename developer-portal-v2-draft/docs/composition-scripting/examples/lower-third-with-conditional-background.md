# Lower-third with conditional background

## Setup

Add standalone inputs `Firstname`, `Lastname`, `Show Background` (Checkbox), and `Background Color` (Color). Add a Metric Text widget named `Full name` and a Rectangle named `Background`. Leave text, Rectangle fill, and Rectangle visibility unlinked; the script owns them. Native links can still own unrelated properties.

This example uses a separate native Rectangle rather than embedding pixel padding in HTML. Color input uses native RGBA/CSS formats; the Rectangle receives a complete solid-gradient object.

```javascript
(function() {
  var composition = null;
  var output = null;
  var background = null;
  var tinyColor = null;
  var closed = true;
  function apply() {
    if (closed) return;
    var p = composition.getPayload2() || {};
    var first = p.Firstname == null ? '' : String(p.Firstname);
    var last = p.Lastname == null ? '' : String(p.Lastname);
    var text = (first + ' ' + last).trim();
    if ((output.getPayload() || {}).text !== text) output.setPayload({ text: text });
    background.setVisibility(p['Show Background'] === true && text.length > 0);
    var color = tinyColor(p['Background Color']);
    if (!color.isValid()) {
      console.warn('Background Color is invalid');
      return;
    }
    background.setPayload({ fillGradient: { type: 'solid', solidColor: color.toRgb() } });
  }
  return {
    init: function(comp, context) {
      composition = comp;
      output = comp.findWidget('Full name')[0];
      background = comp.findWidget('Background')[0];
      if (!output || !background) throw new Error('Lower-third widgets are missing');
      tinyColor = context.utils.createTinyColor;
      closed = false;
      comp.addListener('payload_changed', apply);
      apply();
    },
    close: function() {
      var wasActive = !closed;
      closed = true;
      if (wasActive && composition) composition.removeListener('payload_changed');
      composition = null;
      output = null;
      background = null;
      tinyColor = null;
    }
  };
})();
```

## Verify

Check initial text, live name/color changes, background on/off, empty text hiding the background, and alpha preservation. Invalid colors should leave the last good fill. Verify each named state positively in the same running Player; test actual Control App delivery separately.

This example does not size the background from glyph bounds. Use [bounds messages](../how-to-guides/react-to-widget-bounds.md) when the design requires a text-dependent width.
