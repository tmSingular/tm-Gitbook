# HTML text

Text and single-line Metric Text can render trusted display markup supplied through their `text` field. Wrap markup in `<html>...</html>`; this wrapper selects HTML rendering. It is separate from message activation through `emitEvents`. No additional Composer UI toggle is asserted here.

## Update styled text

Fragment inside `init(compCurrent)`. Use an unlinked Text or Metric Text widget named Title:

```javascript
const wiMatches = compCurrent.findWidget("Title");
if (wiMatches.length !== 1) throw new Error("Expected exactly one Title");
const wiTitle = wiMatches[0];
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function(character) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
  });
}
const name = "Ada & team";
wiTitle.setPayload({ text: "<html>Hello <b>" + escapeHtml(name) + "</b></html>" });
```

**Expected result:** “Hello Ada & team” displays with the name in bold. Escape dynamic plain text; the wrapper and supported renderers do not sanitize arbitrary markup. Keep behavior in the composition script.

## Widget differences

| Widget | HTML behavior |
| --- | --- |
| Text | Wrapper selects HTML content; layout follows its legacy text settings |
| Metric Text | Wrapper selects HTML; plain text otherwise uses its first line and Font 2.0 metrics |
| Metric Text Animation | HTML uses the split builder; arbitrary markup does not guarantee plain-text character/word splitting |
| Metric Text Style | HTML is reduced to plain SVG text; use native style fields for visual effects |
| Metric Text ML | Wrapper selects HTML; verify multiline wrapping/truncation for the loaded version |
| HTML widget | Use its `source` field for a complete fragment; this is a separate widget API |

Avoid absolute CSS sizes inside responsive text markup; when a size is necessary, use percentage styling and check the actual widget. Supported tags, layout, fonts, and fitting can vary by renderer/version. Clear with `text: ""`; Metric Text may emit no zero-bounds event when cleared.

Reference-backed; verify escaping, font readiness, fitting, clearing, and resize. For a complete reactive example see [Use HTML in text widgets](../how-to-guides/use-html-in-text-widgets.md).
