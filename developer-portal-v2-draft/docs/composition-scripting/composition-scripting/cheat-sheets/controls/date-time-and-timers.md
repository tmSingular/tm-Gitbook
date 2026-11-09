# Date, time, and timers

These are different contracts. Do not exchange dates, elapsed time, formatted strings, and timer commands.

| Type | Read | Update / configuration |
| --- | --- | --- |
| Date/Time | `compCurrent.getPayload2()[id]` | Exact format/timezone write shape needs loaded-contract verification |
| Time Control | Existing legacy state contract | Separate elapsed-millisecond contract; not native Timer commands |
| Native Timer | Formatted duration string | Command objects below; settings configured in Composer |
| Timer widget | Widget payload and widget messages | See [Timer widget](../widgets/timer.md), not this Control Node API |

## Read native Timer output

Fragment inside `init(compCurrent)`, with native Timer public ID Game Clock:

```javascript
const text = (compCurrent.getPayload2() || {})["Game Clock"];
// Example formatted output: "02:15.3". This is not numeric timer state.
```

Formatted payload changes can occur with script events disabled. Never replay formatted reads or raw anchor objects as commands.

## Send one Timer command

The following are separate alternatives inside `init(compCurrent)` or an intentional action handler, not an initialization sequence:

```javascript
compCurrent.setPayload({ "Game Clock": { command: "play" } });
```
```javascript
compCurrent.setPayload({ "Game Clock": { command: "pause" } });
```
```javascript
compCurrent.setPayload({ "Game Clock": { command: "reset" } });
```
```javascript
compCurrent.setPayload({ "Game Clock": { command: "start" } });
```
```javascript
compCurrent.setPayload({ "Game Clock": { command: "set", value: 170.5 } });
```
```javascript
compCurrent.setPayload({ "Game Clock": { command: "adjust", value: -1.5 } });
```

| Command | Result |
| --- | --- |
| play | Resume; no effect at a stopping endpoint |
| pause | Freeze effective duration |
| reset | Stop at configured begin |
| start | Reset to begin and run |
| set | Replace duration in seconds, preserving running/paused state subject to endpoint stopping |
| adjust | Add signed seconds independently of count direction |

Use finite numbers, including fractional seconds. Do not retry relative adjustment or start after uncertain delivery without authoritative readback. Commands affect runtime state and do not synchronize the operator form.

## Activate and consume native Timer messages

In Composer, enable the Timer’s **Emit script events** setting (metadata `emitEvents: true`). This is Control Node configuration, not a widget payload flag. A composition-script metadata mutation API is not established here; do not send the setting as a Timer command.

`msg.event` is `custom`; `msg.params.type` is `controlNode`. Route by source `compId`, inspected stable `keyId` in `params.id`, and `params.data.type === "timerChanged"`. The data contains formatted `value`, numeric `seconds`, `isRunning`, `atOrPastEnd`, `overtime`, and `overtimeSeconds`.

`atOrPastEnd` is a repeatable state, not a one-shot completion event. Guard false-to-true transitions, define rearming, and avoid unconditionally sending commands from the timer’s own message handler. Rich state is not guaranteed to replay when a listener registers.

Use the existing [complete native Timer listener](../../how-to-guides/react-to-timer-events.md) and [Timer API reference](../../api-reference/timer-controls.md). Reference-backed; verify running, paused, endpoint, reset, fractional seconds, and source filtering in Player.
