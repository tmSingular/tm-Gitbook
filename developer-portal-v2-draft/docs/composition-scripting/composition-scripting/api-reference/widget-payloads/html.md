# HTML

HTML widget 1212 uses `source` for a complete HTML fragment. It is different from a Text widget's `<html>...</html>` text value.

Fragment inside `init(comp)`; `HTML Panel.source` must be script-owned and unlinked:

```javascript
const panel = comp.findWidget("HTML Panel")[0];
if (!panel) throw new Error("HTML Panel was not found");
panel.setPayload({ source: '<div style="color:white;background:#123456">Updated panel</div>' });
```

Changed source replaces the widget's child DOM and discards child state/playback. The documented renderer avoids rebuilding for an identical string. Empty source clears it. A normal `widget.setPayload` patch is the supported path; do not invoke companion renderer callbacks as an alternate partial-update API.

HTML is unsanitized. Escape untrusted text, generate only the intended display markup, and implement runtime behavior in composition scripts rather than treating injected script tags or event handlers as a scripting API.

Keep Composer geometry for the outer tile and responsive inner layout. When continuity matters, define which changes restart playback and which should preserve it before choosing an HTML replacement design. This widget has no documented custom playback, template, or Widget Node output API.

Verify appearance, replacement, clearing, resize, and any required continuity in the Player. Stored source is not rendering evidence.
