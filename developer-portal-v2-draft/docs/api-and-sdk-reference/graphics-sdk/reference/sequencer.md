# Sequencer

Use the host sequencer to assign timed payloads to composition IDs and coordinate graphics with a media timeline. Times and durations in the original sequence contract use **seconds**.

```javascript
// Host-page fragment after a successful composition load.
const sequencer = graphics.getSequencer();
```

## Methods

| Member | Contract / inspected behavior |
| --- | --- |
| `seqId` | Sequencer/root identifier |
| `setDuration(seconds)` | Sends the sequence duration |
| `setPayload(sequence)` | Sends ID-keyed timed payload data; the bridge also jumps affected compositions Out before sending |
| `start()` | Sends a start command |
| `stop()` | Sends a stop command |
| `seek(seconds)` | Sends an explicit sequence time |
| `play()` | Sends a play command; the inspected implementation does not forward its declared time argument |

Older documentation describes `play(time)`. In the inspected source, the parameter is ignored. Use `seek(time)` followed by `play()` when the integration needs to resume at an explicit media position. This correction concerns the inspected transport; verify final playback timing in your Player.

## Sequence data

Resolve the actual composition ID rather than copying a demo ID:

```javascript
// Host-page fragment; Lower Third exposes a Text Control Node with public ID Title.
const compMain = graphics.getMainComposition();
const compLowerThird = compMain.find("Lower Third")[0];
const sequence = {};
sequence[compLowerThird.id] = [
  { beginTime: 2, endTime: 5, controlNode: { payload: { Title: "First headline" } } },
  { beginTime: 7, endTime: 10, controlNode: { payload: { Title: "Second headline" } } }
];
const sequencer = graphics.getSequencer();
sequencer.setDuration(120);
sequencer.setPayload(sequence);
```

The outer keys are loaded composition IDs. Each value is an array of timed entries. `controlNode.payload` uses that target’s public field IDs. Author the composition’s effective In/Out motion in Composer; sequence data does not invent the visual animation.

## Coordinate with video

When video begins or resumes, seek the sequencer to the video’s current seconds and then play it. On pause, waiting, seeking, or ending, stop it and align its position. After a seek, resume only if the video is playing. Update duration when video metadata is available.

The [complete VOD example](../examples/sequencer-vod.md) implements these bindings and releases its own video listeners on page teardown. It uses normal-speed playback for the running sequencer; other rates use timeupdate-driven seek updates rather than claiming a nonexistent sequencer speed setter.

Verify intermediate playback, pause/resume, buffered waiting, forward/backward seeks, ending, and different positions. Successful command dispatch or matching endpoint screenshots do not establish frame-accurate synchronization.
