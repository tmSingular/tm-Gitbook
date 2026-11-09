# React to control node changes

Use this pattern when a standalone public input needs script interpretation or fan-out. For an unchanged one-to-one mapping, prefer a native link.

## Setup

- Add a standalone Text Control Node with public ID `Public Value` in the owning sub-composition.
- Add a Metric Text widget named `Output`; leave its `text` field unlinked.
- Attach the following script to that sub-composition. It owns its `payload_changed` slot; merge into an existing handler rather than replacing it.

```javascript
(function() {
  let compStored = null;
  let wiOutput = null;
  let closed = true;

  function apply() {
    if (closed) return;
    const payload = compStored.getPayload2() || {};
    const value = payload['Public Value'];
    const text = value == null ? '' : String(value);
    const current = wiOutput.getPayload() || {};
    if (current.text !== text) wiOutput.setPayload({ text: text });
  }

  return {
    init: function(compCurrent, context) {
      compStored = compCurrent;
      const wiMatches = compCurrent.findWidget('Output');
      wiOutput = wiMatches[0];
      closed = false;
      compCurrent.addListener('payload_changed', apply);
      apply();
    },
    close: function() {
      const wasActive = !closed;
      closed = true;
      if (wasActive && compStored) compStored.removeListener('payload_changed');
      compStored = null;
      wiOutput = null;
    }
  };
})();
```

The same function initializes presentation and reacts to later changes. It rereads authoritative current values, preserves `0`/`false` when converted to text, clears missing input, and compares actual widget content rather than only a last-write cache. It permits event propagation to parents and does not gate local synchronization on message identity.

## Verify

1. Set an initial input and open a fresh Player.
2. Change it twice without reloading and check the named widget.
3. Clear it and confirm the output clears.
4. Close/replace the script and check that it no longer writes.

See [listener ownership](../api-reference/event-listeners.md) before combining scripts.
