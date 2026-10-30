# Tickers

Legacy Text Ticker (1216) and Metric Text Ticker (4672) are separate renderers. Both use newline-separated `text` and a numeric `speed`; preserve the complete inspected font. Metric Ticker requires Font 2.0 metrics before it can scroll.

| Behavior | Metric Text Ticker | Legacy Text Ticker |
|---|---|---|
| Basic fields | `text`, `speed`, `font`, `color`, `direction`, `messagePadding` | Similar names; confirm actual schema and units |
| In/Out | In resumes timelines; other states pause | In resumes; other states pause |
| Queue changes | New text resets next-message index; existing messages may finish | Active messages can also continue |
| Empty text | Empties queue; active messages need time to leave | Verify eventual clearing in its renderer |
| Completion | `tickerComplete` with events enabled; queue exhaustion is not last-pixel exit | No `tickerComplete`; continuously looping legacy contract |

Metric Ticker `speed` is percentage of widget width per second; positive values scroll. Direction options include `RightToLeft` / `LeftToRight`. `messagePadding` is percentage of width; spacing is percentage of height. Preserve valid fonts and inspect optional separator/shadow fields.

Metric Ticker's `loopActive` and `separatorText` can be runtime-only in some catalog versions. Do not assume changing `loopActive` restarts an exhausted queue. Its separator vertical offset is pixels in the documented renderer despite a catalog percentage label. Image loading, resize, font changes, and appearance/speed changes can rebuild or restart the crawl.

With `emitEvents`, Metric Ticker sends `tickerPause`, `tickerResume`, `tickerComplete`, and `messageStart`. `messageStart` can include text, message index/total, width, and duration in seconds. Omit message text from sanitized diagnostics. It has no Metric Text bounds contract or generic restart button command.

Avoid redundant payload delivery: repeated merged text can reset queue iteration. Trusted message HTML is unsanitized; escape operator/feed strings as appropriate. Test moving positions over time, direction, replacement, clearing, pause/resume, and separators. Timed samples are appropriate because a looping crawl never becomes still.

The [legacy restart example](../../examples/text-ticker-that-restarts-on-the-in-animation.md) is explicitly version-dependent; do not promise the same behavior for Metric Ticker or every loaded version.
