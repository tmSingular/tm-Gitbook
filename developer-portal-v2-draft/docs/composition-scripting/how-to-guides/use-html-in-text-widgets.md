# Use HTML in text widgets

Text, Metric Text, and Metric Text ML accept trusted display markup wrapped with `<html>...</html>`. That path inserts unsanitized HTML, so escape operator/feed text before including it. Metric Text Style renders SVG text and does not provide the same HTML styling behavior.

Use the complete [dynamic-name example](../examples/lower-third-with-dynamic-html-text.md). Its helper escapes `&`, `<`, `>`, quotes, and apostrophes before adding the intended bold markup. Empty and missing input are handled deliberately.

For a colored background, [the conditional-background example](../examples/lower-third-with-conditional-background.md) keeps native text and a separate Rectangle, with validated Color input and single property ownership.

Absolute CSS units in embedded markup, such as `px`, `pt`, or `cm`, can reduce responsiveness. Prefer percentage-based styling when appropriate; verify at intended resolutions. Do not confuse this markup guidance with documented native widget fields whose contract explicitly uses pixels.

Changing an [HTML widget's `source`](../api-reference/widget-payloads/html.md) is a different API and can replace child DOM/playback state. Never use script-tag injection as a substitute for composition scripting.

Test names such as `A&B`, `<Test>`, empty strings, and non-ASCII text. Confirm both literal content and visible styling in the Player.
