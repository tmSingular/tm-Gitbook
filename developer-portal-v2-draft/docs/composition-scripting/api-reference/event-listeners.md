# Event listeners

Use `comp.addListener(eventType, callback)` to react to events. Multiple listeners for the same event type are supported.

Always call `e.stopPropagation()` to prevent events from bubbling up to parent compositions unintentionally.

| Event type                 | Triggered when                                                             |
| -------------------------- | -------------------------------------------------------------------------- |
| `payload_changed`          | A control node on this comp or a child changes                             |
| `state_changed`            | The animation state reaches `In`, `Out`, `Out1`, or `Out2`                 |
| `timeline_event`           | An animation starts or stops                                               |
| `button_clicked`           | A button control node is clicked                                           |
| `datanode_payload_changed` | A data node on this comp or a child changes                                |
| `message`                  | The Graphics SDK, a widget, or an interactive event sends a custom message |

```javascript
// React to control node changes
comp.addListener('payload_changed', (event, msg, e) => {
  // Filter to only this composition's events (not bubbled from children)
  if (msg.compositionId === comp.id) {
    const p = comp.getPayload2();
    console.log("Payload changed:", p);
  }
  e.stopPropagation();
});

// React to animation state changes
comp.addListener('state_changed', (event, msg, e) => {
  if (msg.compositionId === comp.id) {
    console.log("State is now:", msg.state); // "In", "Out", "Out1", "Out2"
  }
  e.stopPropagation();
});

// React to animation start and stop
comp.addListener('timeline_event', (event, msg, e) => {
  if (msg.compositionId === comp.id) {
    const m = msg.message;
    console.log(m.event);       // "start" or "stop"
    console.log(m.targetState); // "In" or "Out"
    console.log(m.timeline);    // "In", "Out", etc.
    console.log(m.currentTime); // seconds elapsed
  }
  e.stopPropagation();
});

// React to a button control node click
comp.addListener('button_clicked', (event, msg, e) => {
  if (msg.compositionId === comp.id) {
    console.log("Button clicked:", msg.buttonId);
  }
  e.stopPropagation();
});

// React to data node changes
comp.addListener('datanode_payload_changed', (event, msg, e) => {
  console.log("Data node payload:", msg.payload);
  e.stopPropagation();
});

// React to custom messages from widgets or interactive events
comp.addListener('message', (event, msg, e) => {
  if (msg.params && msg.params.compId === comp.id) {
    console.log("Message type:", msg.type);   // "mousedown", "mouseenter", etc.
    console.log("Widget name:", msg.params.name);
  }
  e.stopPropagation();
});
```
