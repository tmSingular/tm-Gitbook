# Start a ticker on animation

First identify the renderer: legacy Text Ticker and Metric Text Ticker differ in queue, completion, and restart behavior. Both resume active timelines when In and pause them in other states.

Use the owning composition's `timeline_event` start message to react to native In motion. Filter its `compositionId` only for this deliberate exclusion of child timeline events. Merge with an existing timeline handler rather than registering a competing listener.

The complete [legacy restart recipe](../examples/text-ticker-that-restarts-on-the-in-animation.md) includes initial content, reactive edits, a guarded speed-toggle restart request, and cleanup. It does not establish a universal restart API.

For Metric Ticker, read [its separate contract](../api-reference/widget-payloads/tickers.md); do not invent a restart command or assume queue exhaustion means the last visible message has left. Verify movement, replacement, eventual clearing, and the actual requested restart/resume behavior over time.
