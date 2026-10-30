# Native Timer controls

Native `timer` Control Nodes represent server-synchronized durations. They are different from legacy `timecontrol`, a Timer widget, and wall-clock date/time widgets. Use a native link from formatted Timer output to Text/Text Area for a straightforward display; no script interval is required.

## Units and reads

Timer durations, begin/end values, and command values are **seconds**, including fractional and signed values where the command supports them. Timestamps and scheduling intervals are milliseconds. Do not reuse legacy Time Control's elapsed-millisecond contract.

Composition-script `getPayload()`, `getPayload2()`, and `getControlNode()` payloads expose **formatted Timer strings**. REST/server app reads can expose richer state; they are not the same interface. A stored running anchor is not proof of current effective state at an endpoint.

## Public action commands

Send one intentional action through `comp.setPayload()` using the Timer's **public payload ID**. These are alternatives, not an initialization sequence:

| Command object | Effect |
|---|---|
| `{ command: "play" }` | Resume; does nothing at a stopping endpoint |
| `{ command: "pause" }` | Freeze the effective duration |
| `{ command: "reset" }` | Stop at configured begin |
| `{ command: "start" }` | Reset to begin and run |
| `{ command: "set", value: 170.5 }` | Replace current duration in seconds |
| `{ command: "adjust", value: -1.5 }` | Add seconds, independently of count direction |

Fragment inside an explicitly triggered action:

```javascript
comp.setPayload({ "Game Clock": { command: "pause" } });
```

`set` and `adjust` preserve effective running/paused state subject to endpoint stopping. Never replay a raw anchor or read-state object as a command. `adjust` and `start` are not idempotent: after an uncertain acknowledgement, inspect authoritative state before retrying.

## Configuration relevant to scripts

Configure the Timer in Composer before attaching a consumer. Key fields are `direction` (`up`/`down`), `beginValue`, `endValue`, `endEnabled`, `stopAtEnd`, `format`, `frequency`, and `emitEvents`. New Timers start at zero, stopped, with End disabled. Set a valid begin/end order, enable End explicitly for a bounded timer, and issue reset when you intend to move current duration to a new begin value.

`frequency` is `"1000"` for seconds or `"100"` for tenths. Formats are `s`, `m`, `m:ss`, `mm:ss`, `h:mm:ss`, `hh:mm:ss`, and their supported tenths forms (`s.S`, `m:ss.S`, `mm:ss.S`, `h:mm:ss.S`, `hh:mm:ss.S`). `.S` requires tenths frequency. Minute-only formats do not wrap at 60 minutes, and hours do not wrap at 24. Display rounding is down for count up and up for count down; numeric event seconds retain finer precision.

End-disabled timers do not stop at an endpoint; `atOrPastEnd` and `overtime` are false. With End enabled, `stopAtEnd` selects stopping versus continued overtime. Direction changes can swap omitted begin/end values and reset the timer; configure them deliberately rather than patching metadata from script.

## `timerChanged` messages

With `emitEvents: true`, the composition's `message` handler receives:

```json
{
  "event": "custom",
  "params": {
    "type": "controlNode",
    "name": "Game Clock",
    "id": "stable-timer-key",
    "compId": "source-composition-id",
    "data": {
      "type": "timerChanged",
      "value": "02:15.3",
      "seconds": 135.3,
      "isRunning": true,
      "atOrPastEnd": false,
      "overtime": false,
      "overtimeSeconds": 0
    }
  }
}
```

`params.id` is the stable model **keyId**, not the public payload ID or a widget ID. `params.name` is the title (falling back to public ID), so do not rely on it for unique identity. Filter source `compId`, `params.type`, stable key, and `data.type`.

`seconds` is signed duration; `isRunning` is effective running state; `atOrPastEnd` is a state, not a one-shot completion; `overtime` means strictly beyond end; `overtimeSeconds` is nonnegative. Use a false-to-true transition guard for one-shot completion, and define rearming after reset/restart.

Registering a listener does not guarantee replay of a rich initial event. Initialize text from the formatted payload and consume numeric state when events arrive. `payload_changed` can deliver partial formatted text changes even with `emitEvents` false. Do not restart a running timer to obtain an event or command the same timer unconditionally from its message callback.

Ticks derive from corrected time, not accumulated interval counts. Delayed callbacks report current state rather than replaying missed ticks; this is not a real-time delivery guarantee.

See [React to native Timer events](../how-to-guides/react-to-timer-events.md) for a complete consumer and [Verification](../debugging-verification-and-deployment/verification.md) for ticking, pause/resume, endpoint, overtime, and filter tests.
