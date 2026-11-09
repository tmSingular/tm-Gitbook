# Best practice: report an issue once

Keep reference examples focused on their main operation. They assume the documented objects, IDs, and input contracts are in place. When an application needs diagnostics, add this reporting pattern deliberately instead of repeating console messages inside every update.

## Styled, optional diagnostics

This complete composition script demonstrates a missing-target warning and a sample error-level report. The second message is a demonstration of severity styling, not a thrown JavaScript exception. It uses `console.log()` for both levels.

```javascript
// Example: report-once
(function() {
  const diagnosticsEnabled = true;
  const colorWarn = "#b36b00";
  const colorError = "#c62828";
  const reportedIssues = new Set();

  function reportOnce(key, message, level = "warn") {
    if (!diagnosticsEnabled || reportedIssues.has(key)) return;
    reportedIssues.add(key);
    const color = level === "error" ? colorError : colorWarn;
    console.log("%c[Title example] " + message, "color: " + color);
  }

  return {
    init: function(compCurrent) {
      const wiTitles = compCurrent.findWidget("Title");
      if (wiTitles.length !== 1) {
        reportOnce("titleLookup", "Expected one Title widget; update skipped.");
        return;
      }
      const wiTitle = wiTitles[0];
      wiTitle.setPayload({ text: "Ready" });

      // Demonstrate styling and deduplication; remove these calls in an application.
      reportOnce("sampleError", "Example error-level diagnostic.", "error");
      reportOnce("sampleError", "This duplicate is suppressed.", "error");
    },
    close: function() {}
  };
})();
```

**Try it:** with a single Text/Metric Text widget named Title, the widget displays Ready and one error-colored demonstration message appears. Without that widget, one warning-colored message appears and initialization exits. Set `diagnosticsEnabled` to false to disable these reports.

The `%c` marker applies the following CSS argument to the message in browser consoles that support styled logging. Both severities use `console.log`, so browser console filters classify them as log messages rather than native warnings/errors. The text remains readable when styling is unavailable.

## Choose a stable issue key

Use a key such as `titleLookup` or `feedSchema`, rather than a timestamp, changing payload, or the entire error text. Repeated calls with the same key are suppressed even if their message text or severity differs. Use distinct keys if two severities describe separate issues.

Keep this helper in the script closure so updates share the same Set. Creating a Set inside a callback resets deduplication on every event. This example reports once **per script instance**, not once across reloads, reinitializations, or separate Players. The bounded set of application-defined keys avoids accumulating a new entry for every feed value.

The helper does not catch exceptions, retry operations, or alter global console behavior. Decide which conditions deserve a diagnostic in your application. Keep messages short and omit tokens, full payloads, and raw private data.

## Use with the other examples

The other reference examples omit setup exception checks and console warning/error branches. Their setup instructions are preconditions, rather than validation code repeated in each snippet. Source filters, lifecycle cleanup, and data transformations remain where they are the subject of an example.

For production diagnostics, copy the helper into the owning script and call it at a deliberate reporting point. Use the existing `comp…`, `wi…`, and `gr…` naming convention; use `const` for fixed bindings and `let` only for reassigned state.

See [Debugging](../debugging-verification-and-deployment/debugging.md) and [Event listeners](../api-reference/event-listeners.md) for lifecycle and handler ownership. This example has static and mocked checks; browser styling and Player delivery need verification in the target environment.
