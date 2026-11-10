# Lower-third with dynamic HTML text

## Setup

In one sub-composition add standalone Text inputs `Firstname` and `Lastname`, plus an unlinked Text or Metric Text widget named `Full name`. Metric Text is single-line; use Metric Text ML for an intentionally multiline design. This script owns the local `payload_changed` slot.

The example escapes input before adding bold markup, initializes from current inputs, and responds to later changes without an identity gate:

```javascript
(function() {
  return {
    init: function(compCurrent) {
      const wiOutput = compCurrent.findWidget('Full name')[0];

      function escapeText(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch) {
          return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
      }

      function apply() {
        const p = compCurrent.getPayload2() || {};
        const first = escapeText(p.Firstname);
        const last = escapeText(p.Lastname);
        const html = first || last ? '<html>' + first + ' <b>' + last + '</b></html>' : '';
        if ((wiOutput.getPayload() || {}).text !== html) wiOutput.setPayload({ text: html });
      }

      compCurrent.addListener('payload_changed', apply);
      apply();
    },
    close: function() {}
  };
})();
```

## Verify

Test initial names, later edits in the same Player, missing values, empty names, Unicode, and literal `A&B` / `<Test>`. The visible last name should be bold while those characters remain literal text. Check that a saved/model update does not leave derived text stale and that cleanup prevents late writes.

This markup is supported by the named Text families, not a generic guarantee for all styled SVG text. See [Text and Metric Text](../api-reference/widget-payloads/text-and-metric-text.md).
