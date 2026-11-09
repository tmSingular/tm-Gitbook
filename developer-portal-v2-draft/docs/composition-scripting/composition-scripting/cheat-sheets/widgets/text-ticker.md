# Text Ticker

Widget type **1216**. Use an existing Text Ticker widget named `Text Ticker` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Field | Type | Contract |
| --- | --- | --- |
| `text` | string | Newline-separated queue; HTML content is unsanitized |
| `font` | object | Complete existing legacy font |
| `height` | number | Inspect loaded schema units |
| `color` | color value | Preserve supported representation |
| `speed` | number | Inspect loaded runtime units/range |
| `direction` | selection | Inspect exact selection IDs |
| `messagePadding` | number | Inspect loaded units/range |
| `letterSpacing, wordSpacing` | number | Inspect loaded units/range |
| `separator and shadow fields` | version-specific | Inspect exact field IDs before use |

Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Text Ticker");
if (wiMatches.length !== 1) throw new Error("Expected exactly one Text Ticker");
const wiTicker = wiMatches[0];
const current = wiTicker.getPayload() || {};
wiTicker.setPayload({ text: "First headline\nSecond headline", speed: 20 });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

Legacy-font ticker loops continuously; it does not emit `tickerComplete`. Changes to text, spacing, speed, font, or dimensions can restart the crawl. Preserve its complete legacy font. HTML content is unsanitized.

## Events and messages

Messages: **tickerPause, tickerResume, messageStart**. Activation: Activation flag not established. See [message envelopes and listeners](../widget-messages.md).

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
