# Start a ticker on animation

#### Trigger behaviour on animation events

Use `timeline_event` to react to the start or end of an animation. Check `msg.compositionId` to avoid acting on events that bubbled up from child compositions.

```javascript
comp.addListener('timeline_event', (event, msg, e) => {
  // Ignore events from child compositions
  if (msg.compositionId !== comp.id) return;

  const m = msg.message;

  if (m.event === "start" && m.targetState === "In") {
    console.log("In animation started");
    // e.g. reset and restart a ticker widget
  }

  if (m.event === "stop" && m.targetState === "Out") {
    console.log("Out animation finished");
    // e.g. clear data or reset state
  }

  e.stopPropagation();
});
```

***

