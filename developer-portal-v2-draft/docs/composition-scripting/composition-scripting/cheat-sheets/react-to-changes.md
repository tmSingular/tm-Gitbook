# React to changes

Apply once during initialization and again after input changes. Read current payload inside the handler, preserve zero/false, and avoid writing a control unconditionally from its own change handler.

Complete root/sub-composition script. Setup: standalone Text control Title and exactly one unlinked Text/Metric Text widget named Title Output. The script owns its text and the local payload_changed slot:

```javascript
(function() {
  let compStored = null;
  let wiOutput = null;
  let active = false;
  function apply() {
    if (!active) return;
    const values = compStored.getPayload2() || {};
    const value = values.Title;
    const text = value == null ? "" : String(value);
    if ((wiOutput.getPayload() || {}).text !== text) wiOutput.setPayload({ text: text });
  }
  return {
    init: function(compCurrent) {
      const wiMatches = compCurrent.findWidget("Title Output");
      compStored = compCurrent;
      wiOutput = wiMatches[0];
      active = true;
      compCurrent.addListener("payload_changed", apply);
      apply();
    },
    close: function() {
      const owned = active;
      active = false;
      if (owned && compStored) compStored.removeListener("payload_changed");
      compStored = null;
      wiOutput = null;
    }
  };
})();
```

**Expected result:** Title Output reflects the initial Title value and later updates, including clearing. The guard compares effective widget content rather than only the last attempted write. An initial apply is necessary because event replay is not promised.

This handler recomputes local presentation even if a child event bubbles up; it intentionally does not gate on `msg.compositionId`, which can suppress same-composition editor updates. Preserve propagation unless the integration explicitly owns and needs to stop it. For cross-composition aggregation, design source routing separately.

One handler exists per composition/event pair. Registering on another composition can replace its owner’s handler; cleanup deletes a slot, not one callback subscription. Remove only registrations owned by this script. A failed widget lookup installs no handler.

Reference-backed; verify initial/live/empty/zero values, unrelated updates, and teardown in Player. See [lifecycle](../core-concepts/lifecycle.md), [event API](../api-reference/event-listeners.md), and the [existing reactive how-to](../how-to-guides/react-to-control-node-changes.md).
