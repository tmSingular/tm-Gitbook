# Event listeners

Register an in-script handler with `compCurrent.addListener(eventType, callback)`.

## Registration and ownership

There is **one handler slot per target composition and event type**. Registering again for the same pair replaces the previous handler. Combine related behavior in the existing callback; registering on a child from root can replace that child's handler too.

`compCurrent.removeListener(eventType)` removes that target's entire event slot. It is not callback-specific removal. Do not pass a second callback argument as though it protects another owner's handler. Only remove a slot your script owns.

Uninstalling a composition script clears slots keyed to that composition before `close()`; it does not automatically remove listeners it registered on other compositions. Prefer local ownership and explicit coordination rather than cross-composition registrations. For shared root coordination, extend the root's existing handler.

## Callback and propagation

The callback signature is `function(event, msg, propagationEvent)`. The complete examples below show how to use each argument.

Composition-script callbacks receive three arguments. Host-page Player SDK callbacks receive `(event, msg)`, without a propagation object. Descendant events normally bubble to parent compositions until a handler calls `propagationEvent.stopPropagation()`.

Filter source identity according to each event's envelope. A root listener cannot assume all events arrive: descendants can stop them. Avoid applying a `msg.compositionId === compCurrent.id` filter to local theme/payload synchronization; it can suppress live editor updates. Instead, reread the owning composition's authoritative payload and apply it initially and after changes.

## Event reference

| Event | Relevant message data | Notes |
|---|---|---|
| `payload_changed` | Composition identity and partial/new payload information | Read complete values through `compCurrent.getPayload2()` |
| `timeline_event` | `compositionId`, `message.event`, `message.targetState` | `start`, `stop`, or `jump`; use for animation timing |
| `state_changed` | `compositionId`, `state` | Settled internal state; may include `Out1` |
| `button_clicked` | `buttonId`; composition identity fields depend on the event | Match the actual public button ID; do not infer it from its display title |
| `datanode_payload_changed` | Composition identity and data-node payload | Separate from ordinary Control Node values |
| `message` | Event-specific envelope, often `params` | Interactive, widget, host, and Timer messages differ |

Interactive messages use `msg.type` for the interaction type and `msg.params` for source identity, including `id`, `name`, `compId`, and `type`. Metric Text bounds use `msg.params.data.event === "bounds"` and route by the originating tile ID. [Timer messages](timer-controls.md) use a stable Control Node key and `data.type === "timerChanged"`.

## Example: initialize and react to local inputs

**Setup:** add standalone Text controls `Firstname` and `Lastname`, and one unlinked Text or Metric Text widget named `Full Name`. Install this complete script on their owning composition. It owns the local `payload_changed` slot; merge any existing handler before use.

```javascript
// Example: local-inputs
(function() {
  let compStored = null;
  let wiFullName = null;
  let active = false;

  function applyName() {
    if (!active) return;
    const values = compStored.getPayload2() || {};
    const first = values.Firstname == null ? "" : String(values.Firstname);
    const last = values.Lastname == null ? "" : String(values.Lastname);
    const fullName = (first.trim() + " " + last.trim()).trim();
    if ((wiFullName.getPayload() || {}).text !== fullName) {
      wiFullName.setPayload({ text: fullName });
    }
  }

  return {
    init: function(compCurrent) {
      const wiMatches = compCurrent.findWidget("Full Name");
      if (wiMatches.length !== 1) throw new Error("Expected one Full Name widget");
      compStored = compCurrent;
      wiFullName = wiMatches[0];
      active = true;
      compCurrent.addListener("payload_changed", applyName);
      applyName();
    },
    close: function() {
      const owned = active;
      active = false;
      if (owned && compStored) compStored.removeListener("payload_changed");
      wiFullName = null;
      compStored = null;
    }
  };
})();
```

**Try it:** start with Ada / Lovelace, change the last name, then clear both controls. The output initializes immediately, updates without restarting the Player, and finally clears. The handler rereads complete current inputs instead of assuming the event contains a full payload. Null checks preserve zero/false if an integration supplies them; production inputs should still match their declared types.

This example permits parent propagation. It does not filter local synchronization by `msg.compositionId`, which can suppress editor updates, and it never writes back to the controls that triggered it. Closing disables late callbacks and removes only the slot this script installed.

## Example: animation start, completion, jump, and settled state

**Setup:** add unlinked Text/Metric Text widgets `Animation Status` and `Settled State`. Author an In/Out Timeline on this composition. This complete script owns its `timeline_event` and `state_changed` slots. Use the normal playback controls to trigger it; installing the script does not start an animation.

```javascript
// Example: animation-events
(function() {
  let compStored = null;
  let wiStatus = null;
  let wiState = null;
  let active = false;

  return {
    init: function(compCurrent) {
      const wiStatuses = compCurrent.findWidget("Animation Status");
      const wiStates = compCurrent.findWidget("Settled State");
      if (wiStatuses.length !== 1 || wiStates.length !== 1) {
        throw new Error("Expected Animation Status and Settled State widgets");
      }
      compStored = compCurrent;
      wiStatus = wiStatuses[0];
      wiState = wiStates[0];
      active = true;
      wiStatus.setPayload({ text: "Waiting for a timeline action" });
      wiState.setPayload({ text: compCurrent.getState() });

      compCurrent.addListener("timeline_event", function(event, msg) {
        if (!active || event !== "timeline_event" || !msg ||
            msg.compositionId !== compCurrent.id || !msg.message) return;
        const action = msg.message.event;
        const targetState = msg.message.targetState;
        if (action !== "start" && action !== "stop" && action !== "jump") return;
        wiStatus.setPayload({ text: action + ": " + targetState });
      });

      compCurrent.addListener("state_changed", function(event, msg) {
        if (!active || event !== "state_changed" || !msg ||
            msg.compositionId !== compCurrent.id || typeof msg.state !== "string") return;
        wiState.setPayload({ text: msg.state });
      });
    },
    close: function() {
      const owned = active;
      active = false;
      if (owned && compStored) {
        compStored.removeListener("timeline_event");
        compStored.removeListener("state_changed");
      }
      wiStatus = null;
      wiState = null;
      compStored = null;
    }
  };
})();
```

**Try it:** play to In, play to Out, then jump to the current state. Timeline status shows `start`/`stop` for playback and `jump` for a jump. Settled State changes when the state actually changes; a no-op jump need not emit `state_changed`. Child-composition timeline/state messages are ignored here.

The initial `getState()` returns the logical state, such as `Out`; later state messages can contain internal names such as `Out1`. `playTo()` returns before completion. Do not immediately read `getState()` as proof that playback finished. These two handlers intentionally update different widgets, so one event cannot overwrite the other’s readout.

## Example: a button action and propagation to root

**Setup:** a sub-composition contains a Button Control Node with public ID `Toggle Details` and a group named `Details`. Leave group visibility unlinked and script-owned. This complete child script owns its local `button_clicked` slot:

```javascript
// Example: child-button
(function() {
  let compStored = null;
  let grDetails = null;
  let active = false;
  // Choose true only when this child must consume the action exclusively.
  const consumeLocally = false;

  return {
    init: function(compCurrent) {
      const grMatches = compCurrent.findGroup("Details");
      if (grMatches.length !== 1) throw new Error("Expected one Details group");
      compStored = compCurrent;
      grDetails = grMatches[0];
      active = true;
      compCurrent.addListener("button_clicked", function(event, msg, propagationEvent) {
        if (!active || event !== "button_clicked" || !msg ||
            msg.compId !== compCurrent.id || msg.buttonId !== "Toggle Details") return;
        grDetails.setVisibility(!grDetails.getVisibility());
        if (consumeLocally) propagationEvent.stopPropagation();
      });
    },
    close: function() {
      const owned = active;
      active = false;
      if (owned && compStored) compStored.removeListener("button_clicked");
      grDetails = null;
      compStored = null;
    }
  };
})();
```

**Expected result:** each matching local action toggles Details. Unrelated buttons and bubbled actions from deeper children do not toggle it. The message uses the public button ID, not a widget ID or display title.

To observe the same action at root, use this **complete root script**. It owns the root button slot; merge with any existing root button handler:

```javascript
// Example: root-button-route
(function() {
  let compRoot = null;
  let compLowerThird = null;
  let active = false;
  return {
    init: function(compCurrent) {
      const compMatches = compCurrent.find("Lower Third");
      if (compMatches.length !== 1) throw new Error("Expected one Lower Third composition");
      compRoot = compCurrent;
      compLowerThird = compMatches[0];
      active = true;
      compRoot.addListener("button_clicked", function(event, msg) {
        if (active && event === "button_clicked" && msg &&
            msg.compId === compLowerThird.id && msg.buttonId === "Toggle Details") {
          console.log("Root observed the Lower Third action");
        }
      });
    },
    close: function() {
      const owned = active;
      active = false;
      if (owned && compRoot) compRoot.removeListener("button_clicked");
      compRoot = null;
      compLowerThird = null;
    }
  };
})();
```

Name the child `Lower Third` for this example. With `consumeLocally = false`, the root can observe the action. With it set to true, the child still toggles but root does not receive that action. The root registers on itself, so it does not replace the child’s handler. Source field names are event-specific: this button example uses `compId`, while timeline events use `compositionId`.

## Example: route two widget messages through one handler

**Setup:** add a Metric Text-family widget named `Label` and a Timer widget named `Clock`. Label’s `text` and `emitEvents` fields are unlinked and script-owned. Configure Clock’s existing Time Control and template in Composer. This complete script owns the local `message` slot; it enables Label messages but leaves the clock’s input and playback untouched.

```javascript
// Example: widget-message-router
(function() {
  let compStored = null;
  let wiLabel = null;
  let wiClock = null;
  let active = false;

  function handleBounds(source, data) {
    if (source.id !== wiLabel.id || !data || data.event !== "bounds" ||
        typeof data.widthPx !== "number" || !Number.isFinite(data.widthPx)) return;
    console.log("Label width:", data.widthPx);
  }

  function handleClock(source, data) {
    if (source.id !== wiClock.id || !data || data.type !== "timeChanged" ||
        typeof data.time !== "number" || !Number.isFinite(data.time)) return;
    console.log("Clock elapsed seconds:", data.time);
  }

  return {
    init: function(compCurrent) {
      const wiLabels = compCurrent.findWidget("Label");
      const wiClocks = compCurrent.findWidget("Clock");
      if (wiLabels.length !== 1 || wiClocks.length !== 1) {
        throw new Error("Expected one Label and one Clock widget");
      }
      compStored = compCurrent;
      wiLabel = wiLabels[0];
      wiClock = wiClocks[0];
      active = true;
      compCurrent.addListener("message", function(event, msg) {
        if (!active || event !== "message" || !msg || msg.event !== "custom") return;
        const source = msg.params;
        if (!source || source.type !== "widget" || source.compId !== compCurrent.id) return;
        handleBounds(source, source.data);
        handleClock(source, source.data);
      });
      wiLabel.setPayload({ emitEvents: true });
      wiLabel.setPayload({ text: "Hello" });
    },
    close: function() {
      const owned = active;
      active = false;
      if (owned && compStored) compStored.removeListener("message");
      wiLabel = null;
      wiClock = null;
      compStored = null;
    }
  };
})();
```

**Try it:** change Label text and run Clock. Each route consumes only its originating tile’s messages. Bounds use `data.event`; Timer widget updates use `data.type`. The listener is installed before enabling bounds, so synchronously delivered updates are not missed. Clearing Metric Text can emit no zero-bounds event; clear dependent presentation explicitly if you extend this example.

Do not register `handleBounds` and `handleClock` separately with `addListener("message", ...)`: the second registration replaces the first. The router keeps one registration and dispatches to independent functions. Do not write a widget unconditionally from its own message handler, which can cause repeated events.

The Timer **widget** above is distinct from native Timer **Control Node** `timerChanged` events. See [native Timer messages](timer-controls.md) and [widget message activation](../cheat-sheets/widget-messages.md).

## Example: inspect data-node event availability

The reviewed contract names `datanode_payload_changed` but does not establish a stable payload/source envelope for a specific data-node implementation. Do not invent `msg.data`, assume it is a Control Node payload, or use a widget envelope to route it.

For a temporary diagnostic, add this **fragment inside `init(compCurrent)`**, only when the script owns that event slot. Remove the same slot in the owning script’s `close()`:

```javascript
// Example: data-node-diagnostic (init fragment)
compCurrent.addListener("datanode_payload_changed", function(event, msg) {
  if (event !== "datanode_payload_changed") return;
  const fieldNames = msg && typeof msg === "object" ? Object.keys(msg) : [];
  console.log("Observed data-node event; envelope fields:", fieldNames.join(", "));
});
```

**Try it:** change a data node and check whether this listener observes an event. It logs field names rather than application values. Descendant events may also arrive. Confirm the source identity and payload against the exact loaded implementation before replacing this diagnostic with a data-driven widget update. This example establishes neither a universal envelope nor automatic delivery to root.

## Verification checklist

These examples are reference-backed. Syntax and mocked logic checks do not establish live Player delivery. Test initialization, later actions, wrong-source rejection, clearing where relevant, propagation, and closure in the same running Player. No rich event is assumed to replay at registration. Preserve existing handler ownership when combining these examples.
