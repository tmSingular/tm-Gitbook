# Text and Metric Text

Prefer the matching Metric Text family for newly authored independent labels, values, scores, and clocks. Preserve legacy Text where extending an existing composition. All examples assume an unlinked text destination.

## Shared content

`setPayload({ text: value })` changes text through the normal merged payload path and preserves the inspected font. Use strings and handle missing values explicitly. Retain the complete Font 2.0 `font.fontData` and valid metrics for Metric Text; never invent metrics or replace them with a legacy font object.

| Widget | Important differences |
|---|---|
| Text (1032) | Legacy font; `text` and `color`; newline/HTML support; `minimumOfLines` / `maximumOfLines`; legacy spacing units |
| Metric Text (4662) | Single line before the first newline; blank text hides it; `alignment`; `overflow`: `none`, `clip`, `fitScale`, `fitWidth` |
| Metric Text ML (4671) | Multiline; `minLines`, `maxLines`, numeric `lineHeight`, `ellipsis`, vertical alignment |
| Metric Text Animation (4706) | Metric Text content plus native per-unit effects and text Update behavior |
| Metric Text Style (4758) | Single-line SVG styled/gradient text; HTML becomes plain SVG text |

Metric Text spacing, shadow distances/blur, and many style widths are percentages of widget height; insets use the corresponding widget dimension. Legacy Text `letterSpacing`/`wordSpacing` are pixel values. Do not copy units between families.

Metric Text/ML use solid text color; gradient stops are not rendered. Use Metric Text Style for gradient text. Native Color input values and widget-gradient objects remain separate contracts.

## Multiline and animation

For ML, keep positive integer line limits with `minLines <= maxLines` and `lineHeight > 0`. Wrapped/truncated display does not rewrite the saved payload. For example, an inspected ML widget can receive `{ text: "First\nSecond", minLines: 1, maxLines: 2, lineHeight: 120 }`.

Metric Text Animation needs the authored Composer Widget Timeline effect and a positive duration. Discover active effect fields from the live schema rather than guessing IDs from effect names. Supported composition `playTo` / `jumpTo` drive it; do not call renderer internals. Text updates, clearing, non-text changes, and interrupted motion can follow different rebuild/animation paths. Verify the sequence you actually use.

## HTML and bounds

Text, Metric Text, and ML support trusted `<html>...</html>` display markup, but it is unsanitized. Escape operator/feed text before inserting it. Style's SVG renderer does not provide equivalent HTML styling. Use [Use HTML in text widgets](../../how-to-guides/use-html-in-text-widgets.md) for a complete escaped example.

With `emitEvents: true`, Metric Text family widgets can send bounds through the composition `message` listener. Read `msg.params.data.event === "bounds"`, and route by the originating tile ID in `msg.params.id`.

Bounds fields include `leftPx`, `topPx`, `widthPx`, `heightPx` and percentage `left`, `top`, `width`, `height`. Pixel coordinates are widget-local logical coordinates; percentages are relative to the widget. Bounds describe rendered text layout, not glyph ink, final screen coordinates, or transient animation envelopes.

For ordinary single-line Metric Text, `none`/`clip` retain natural width; fit modes report the fitted box when needed. ML width describes the union of rendered wrapped/truncated line fragments. Clearing text does not promise a zero-bounds event: clear dependent visuals explicitly.

Register the message listener before forwarding initial content. Metric Text Style can cache payload before its SVG mounts and emit naturally after mount; do not poll DOM or toggle `emitEvents` just to solicit initial bounds. Use frames only to coalesce received layout work.

See [Widget bounds messages](../../how-to-guides/react-to-widget-bounds.md). Verify font readiness, text replacement, clearing, wrapping/overflow, and resize in the Player.
