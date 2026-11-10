# Selection and buttons

Selections store option IDs; buttons produce actions. Do not assume their display titles or timestamps are interchangeable with values.

## Read and update a Selection

Fragment inside `init(compCurrent)`. Setup: a Selection with public ID Team and verified inline option IDs `home` and `away`:

```javascript
const values = compCurrent.getPayload2() || {};
const currentTeam = values.Team;
compCurrent.setPayload({ Team: "away" });
```

**Expected result:** the runtime Selection consumer receives the Away option’s ID. A label such as “Away team” is not necessarily its ID. Preserve exact string/number ID types, including zero and fractions. An empty string is valid only if explicitly declared as an option. URL-backed options load asynchronously; verify membership rather than assuming it.

This does not alter available options or synchronize a Control App form. Configure options and metadata in Composer.

## Receive a Button action

Complete root/sub-composition script. Setup: an existing Button with public ID Toggle and one unlinked Text/Metric Text widget named Readout. This script owns the local button event slot:

```javascript
(function() {
  return {
    init: function(compCurrent) {
      let enabled = false;

      const wiReadout = compCurrent.findWidget("Readout")[0];

      wiReadout.setPayload({ text: "Disabled" });
      compCurrent.addListener("button_clicked", function(event, msg) {
        if (event !== "button_clicked" || !msg ||
            msg.buttonId !== "Toggle" || msg.compId !== compCurrent.id) return;
        enabled = !enabled;
        wiReadout.setPayload({ text: enabled ? "Enabled" : "Disabled" });
      });
    },
    close: function() {}
  };
})();
```

**Expected result:** each local Toggle action changes the readout once. Filter source composition to avoid child/other buttons toggling it. Merge existing handler logic before use. A public native Button trigger write is not established here; do not invent one with `setPayload({Toggle: true})`. Widget-specific buttons such as Video Clip use their separate `wiWidget.click(actionId)` contract.

Reference-backed; verify exact event source fields in the loaded environment and repeated actions in Player. See the [interactive example](../../examples/interactive-overlay-with-button-events.md).
