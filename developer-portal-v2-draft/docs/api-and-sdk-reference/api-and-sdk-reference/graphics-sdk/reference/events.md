# Events and messages

Host SDK listeners receive `(event, message)`. They do not receive a third propagation object. Register listeners on the SDK instance, not on a host composition wrapper:

```javascript
// Host-page fragment; update the page only for the selected composition.
function onStateChanged(event, message) {
  if (event === "state_changed" && message.compositionId === compLowerThird.id) {
    document.getElementById("status").textContent = "State: " + message.state;
  }
}
graphics.addListener("state_changed", onStateChanged);
window.addEventListener("pagehide", function() {
  graphics.removeListener("state_changed", onStateChanged);
});
```

This fragment assumes `graphics`, `compLowerThird`, and the status element already exist. It uses native state messages; no composition-script handler is replaced. State messages can contain internal names such as Out1, while `getState()` normalizes those to Out.

## Accepted event names

The inspected distribution’s public registration allowlist contains these names:

| Event | Data / use |
| --- | --- |
| `payload_changed` | `compId`, payload patch, and composition names; use the ID to route local input changes |
| `datanode_payload_changed` | Data-node `id`, `name`, and `payload` |
| `state_changed` | `compositionId`, `compositionName`, and `state` |
| `message` | Widget or interaction-specific data; inspect its envelope |
| `error` | Bridge/Player diagnostic data; no single universal error schema |
| `adaptation_globals_changed` | Adaptation values supplied through the bridge |
| `composition_script_event` | Script-related bridge data; exact payload depends on the emitted event |
| `download_start` | Download notification data |
| `download_complete` | Download completion notification data |

The bridge has internal dispatch paths for other names, including timeline_event and button_clicked, but its inspected registration allowlist does not accept those names. Do not copy composition-script event names into host `addListener` merely because the Player can emit them. Registering an unsupported name throws within the SDK itself.

## Payload changes

A representative payload event uses this shape. Some environments include additional composition identity aliases; route by the field established for that event rather than assuming all events use the same source key.

```json
{
  "compId": "lower-third-id",
  "compName": "Lower Third",
  "payload": { "Title": "Updated" }
}
```

```javascript
// Host-page fragment; this reads a complete local snapshot after a payload event.
function onPayloadChanged(event, message) {
  if (event !== "payload_changed" || message.compId !== compLowerThird.id) return;
  const values = compLowerThird.getPayload2() || {};
  document.getElementById("titleReadout").textContent = values.Title == null ? "" : String(values.Title);
}
graphics.addListener("payload_changed", onPayloadChanged);
```

The event payload can be partial. Reading the current wrapper payload is different from assuming every event contains every field. An input form should preserve unsent edits when refreshing other values; the [dynamic preview](../local-preview-dynamic-form.md) demonstrates that policy.

## Data-node and custom messages

Data-node notifications expose data-node identity, not a composition/widget envelope:

```json
{
  "id": "data-node-id",
  "name": "Results",
  "payload": { "score": 2 }
}
```

One documented custom widget envelope is:

```json
{
  "event": "custom",
  "params": {
    "type": "widget",
    "compId": "lower-third-id",
    "id": "widget-tile-id",
    "name": "Label",
    "widgetId": 4662,
    "data": { "event": "bounds", "widthPx": 120 }
  }
}
```

That is a representative message, not a guarantee that every renderer or internal Control Node event is forwarded to the host. Use the in-graphic listener when that is the supported consumer, especially for native Timer Control Node events. Widget message activation still belongs to the widget’s contract; adding a host listener does not enable it.

## Multiple callbacks and cleanup

Host `addListener` appends callbacks. It does not replace the existing handler as the composition-script one-slot API does. Keep a reference to each owned function and remove it with `removeListener(event, callback)` when the host view is disposed. Avoid duplicate registration during rerendering.

`removeListener(event)` clears that event’s callbacks and `removeAllListener()` clears all callbacks on the SDK instance. Those broad operations can remove another component’s listeners if the instance is shared.

For optional diagnostics, use styled `console.log` with the local [reportOnce pattern](../../../../composition-scripting/composition-scripting/examples/report-once.md). Focused examples omit repeated diagnostic branches.
