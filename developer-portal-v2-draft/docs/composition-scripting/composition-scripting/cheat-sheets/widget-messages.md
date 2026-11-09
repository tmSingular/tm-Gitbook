# Widget events and custom messages

Widget messages arrive at a composition script’s `message` listener. Register the listener before enabling messages or sending initial content. Registering another listener for the same composition/event replaces the current handler: merge routes rather than stacking listeners.

## Activation and message index

| Widget | Activation | Messages / data selector |
| --- | --- | --- |
| Metric Text, ML, Animation, Style | `wiWidget.setPayload({ emitEvents: true })` | `data.event === "bounds"` |
| Metric Text Ticker | `wiWidget.setPayload({ emitEvents: true })` | `tickerPause`, `tickerResume`, `tickerComplete`, `messageStart`; inspect the loaded message discriminator before routing these names |
| Text Ticker | Activation flag not established | `tickerPause`, `tickerResume`, `messageStart`; no `tickerComplete` contract |
| Timer widget | No activation flag documented in reviewed contract | `data.type === "timeChanged"`; elapsed seconds and repeatable limit state |
| Date / Time Countdown | No activation flag documented in reviewed contract | `data.type === "timeChanged"`; duration seconds and clamp state |
| Current Date and Time | No activation flag documented in reviewed contract | `data.type === "timeChanged"`; Unix milliseconds |
| Video Clip / with Audio | Activation flag not established | `loadedmetadata`, `error`, `canplay`, `playing`, `pause`, `ended` |
| Video Animation | Activation flag not established | Media events, with clip type In/Out/loop |
| Whirligig | Not yet verified | Names, payload, activation, and loaded type/version remain to be documented |

“Not established” is a documentation gap, not a recommendation to send an assumed flag. The known flags can be set from composition scripts; an equivalent Composer UI toggle has not been verified here.

## Widget envelope

For the documented widget-message channel, `msg.event` is `custom`, and `msg.params` contains:

| Field | Meaning |
| --- | --- |
| `type` | `widget` |
| `id` | Originating widget tile ID; compare with the resolved widget’s `id` |
| `widgetId` | Widget type ID, not instance ID |
| `compId` | Source composition ID |
| `name` | Widget name; names need not be unique |
| `data` | Widget-specific payload; its discriminator can differ by widget |

## Activate and receive Metric Text bounds

Complete root/sub-composition script. Setup: exactly one Metric Text-family widget named Label. Its `text` and `emitEvents` fields are unlinked and script-owned. This script owns the local message slot; merge with an existing handler before use.

```javascript
(function() {
  let compStored = null;
  let wiLabel = null;
  let active = false;
  return {
    init: function(compCurrent) {
      const wiMatches = compCurrent.findWidget("Label");
      compStored = compCurrent;
      wiLabel = wiMatches[0];
      active = true;
      compCurrent.addListener("message", function(event, msg) {
        if (!active || event !== "message" || !msg || msg.event !== "custom") return;
        const p = msg.params;
        const data = p && p.data;
        if (!p || p.type !== "widget" || p.compId !== compCurrent.id || p.id !== wiLabel.id ||
            !data || data.event !== "bounds" ||
            typeof data.widthPx !== "number" || !Number.isFinite(data.widthPx)) return;
        console.log("Label width in logical pixels:", data.widthPx);
      });
      wiLabel.setPayload({ emitEvents: true });
      wiLabel.setPayload({ text: "Hello" });
    },
    close: function() {
      const owned = active;
      active = false;
      if (owned && compStored) compStored.removeListener("message");
      compStored = null;
      wiLabel = null;
    }
  };
})();
```

**Expected result:** rendered nonempty text produces bounds messages that pass the Label filter. Logical pixel coordinates are widget-local, not screen coordinates. The handler intentionally allows propagation to parents.

The bounds payload contains `event`, `leftPx`, `topPx`, `widthPx`, `heightPx`, and percentage `left`, `top`, `width`, `height`. Bounds change with content, font readiness, fitting, and size. Metric Text Style measures transformed glyph bounds; other Metric Text variants can include metric padding. Empty text may emit nothing: clear dependent presentation explicitly. Moving a widget alone does not promise fresh bounds. Do not toggle events or poll DOM to solicit an initial message.

## Enable Metric Text Ticker messages

Fragment inside `init(compCurrent)`, after registering the shared message handler. Requires exactly one Metric Text Ticker named News crawl and script-owned unlinked fields:

```javascript
const wiMatches = compCurrent.findWidget("News crawl");

const wiTicker = wiMatches[0];
wiTicker.setPayload({ emitEvents: true });
wiTicker.setPayload({ text: "First headline\nSecond headline", loopActive: false });
```

`messageStart` carries `messageIndex`, `messageTotal`, `width`, `text`, and `duration` in seconds. `tickerComplete` indicates scheduler exhaustion; the last message can remain visible. Establish the exact discriminator shape for your loaded version before adding a name-specific route. Do not repeatedly reset the queue in response to its own messages.

## Lifecycle and verification

Reference-backed; no live Player session was used for this update. Check activation, initial/later content, wrong-source rejection, font/media readiness, clearing, repeated terminal states, and cleanup. Rich messages are not guaranteed to replay when a listener is added. Coalesce expensive layout work if many messages arrive in one frame.

Native Timer Control Node events use `params.type === "controlNode"` and a stable Control Node key, not a tile ID. Use the separate [Timer reference](controls/date-time-and-timers.md). See the [complete dependent-layout example](../how-to-guides/react-to-widget-bounds.md) and [event API](../api-reference/event-listeners.md).
