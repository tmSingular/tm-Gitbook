# Metric Text Ticker

Widget type **4672**. Use an existing Metric Text Ticker widget named `Metric Text Ticker` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Payload | Type | Behavior |
| --- | --- | --- |
| `text` | string | Newline-separated messages. Blank lines are skipped; use `""` to empty the queue. Trusted `<html>...</html>` messages are unsanitized display markup. |
| `font` | object | Metric font object; see Metric Text font object. |
| `color` | string/object | Solid text color using the native color formats. |
| `speed` | number | Percentage of widget width per second; positive values scroll. Renderer fallback 10, catalog v2 default 20. |
| `messagePadding` | number | Gap as percentage of widget width; initial fallback 10. |
| `direction` | string | `LeftToRight` reverses the initial `RightToLeft` direction. |
| `loopActive` | boolean | Initially true. False stops scheduling after the queue is exhausted. Runtime-only in catalog v2. |
| `letterSpacing`, `wordSpacing` | number | Percentage of widget height. |
| `transform` | string | `uppercase`, `lowercase`, `capitalize`, `small-caps`, or `none`; runtime-only in catalog v2. |
| `separatorActive` | boolean | Enable separators after the first message. |
| `separatorText` | string | Text separator takes precedence over an image. Runtime-only in catalog v2. |
| `separatorImage` | string | Image URL; local renderer accepts HTTP(S), protocol-relative and `data:image/` values. Use trusted assets. |
| `separatorHeight` | number | Image height as percentage of widget height. |
| `separatorVerticalOffset` | number | Image vertical offset in pixels in the local renderer, despite the catalog `%` label. |
| `shadowActive` | boolean | Enable inherited text shadow. |
| `shadowDirection` | number | Degrees. |
| `shadowDistance`, `shadowBlur` | number | Percentage of widget height. |
| `shadowColor` | string/object | Native solid color value. |
| `emitEvents` | boolean | Enable the custom messages below. |


Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Metric Text Ticker");
if (wiMatches.length !== 1) throw new Error("Expected exactly one Metric Text Ticker");
const wiTicker = wiMatches[0];
const current = wiTicker.getPayload() || {};
wiTicker.setPayload({ text: "First headline\nSecond headline", speed: 20, loopActive: false });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

Speed is percentage of widget width per second. Clearing empties the queue but active messages can remain until their travel ends. Repeated payloads can reset scheduling; avoid redundant writes. `tickerComplete` means a nonlooping scheduler exhausted its queue, not that the final message has left the screen. Preserve Font 2.0 metrics.

## Events and messages

Messages: **tickerPause, tickerResume, tickerComplete, messageStart**. Activation: `emitEvents: true`. See [message envelopes and listeners](../widget-messages.md).

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
