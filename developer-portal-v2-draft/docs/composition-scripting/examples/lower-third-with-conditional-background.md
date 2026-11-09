# Lower-third with conditional background

## Setup

Add standalone inputs `Firstname`, `Lastname`, `Show Background` (Checkbox), and `Background Color` (Color). Add a Metric Text widget named `Full name` and a Rectangle named `Background`. Leave text, Rectangle fill, and Rectangle visibility unlinked; the script owns them. Native links can still own unrelated properties.

This example uses a separate native Rectangle rather than embedding pixel padding in HTML. Color input uses native RGBA/CSS formats; the Rectangle receives a complete solid-gradient object.

```javascript
(function() {
  let compStored = null;
  let wiOutput = null;
  let wiBackground = null;
  let tinyColor = null;
  let closed = true;
  function apply() {
    if (closed) return;
    const p = compStored.getPayload2() || {};
    const first = p.Firstname == null ? '' : String(p.Firstname);
    const last = p.Lastname == null ? '' : String(p.Lastname);
    const text = (first + ' ' + last).trim();
    if ((wiOutput.getPayload() || {}).text !== text) wiOutput.setPayload({ text: text });
    wiBackground.setVisibility(p['Show Background'] === true && text.length > 0);
    const color = tinyColor(p['Background Color']);
    if (!color.isValid()) {
      return;
    }
    wiBackground.setPayload({ fillGradient: { type: 'solid', solidColor: color.toRgb() } });
  }
  return {
    init: function(compCurrent, context) {
      compStored = compCurrent;
      wiOutput = compCurrent.findWidget('Full name')[0];
      wiBackground = compCurrent.findWidget('Background')[0];
      tinyColor = context.utils.createTinyColor;
      closed = false;
      compCurrent.addListener('payload_changed', apply);
      apply();
    },
    close: function() {
      const wasActive = !closed;
      closed = true;
      if (wasActive && compStored) compStored.removeListener('payload_changed');
      compStored = null;
      wiOutput = null;
      wiBackground = null;
      tinyColor = null;
    }
  };
})();
```

## Verify

Check initial text, live name/color changes, background on/off, empty text hiding the background, and alpha preservation. Invalid colors should leave the last good fill. Verify each named state positively in the same running Player; test actual Control App delivery separately.

This example does not size the background from glyph bounds. Use [bounds messages](../how-to-guides/react-to-widget-bounds.md) when the design requires a text-dependent width.
