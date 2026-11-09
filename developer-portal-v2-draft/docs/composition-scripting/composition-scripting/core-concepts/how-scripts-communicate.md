# How scripts communicate

Use `context.global` for shared deterministic helpers and lookup data. Use a function exposed by a sub-composition when root needs to distribute shared styling while each child owns its own content.

## Use case

Root owns the shared visual style. Each sub-composition owns its content:

- **Lower Third** manages a person's name and role through its own local controls.
- **Headline** manages its headline through its own local control.
- Root manages shared text, background, and accent colors used by both graphics.

Root distributes its current style payload. Each child maps those shared style values onto its own widgets. Root does not need to know widget names, content fields, or internal group structure.

This pattern is useful when several independently designed graphics share an input contract and need transformations rather than direct one-to-one links. If ordinary native Control Node links already express the required delivery, use those instead of adding a script coordinator.

## Setup

Create these standalone **Color** Control Nodes at root, using the exact public IDs below. Initial values are native RGBA objects; alpha uses 0–1:

| Public ID | Initial value | Used by |
| --- | --- | --- |
| Text Color | `{r: 255, g: 255, b: 255, a: 1}` | Both children’s text widgets |
| Background Color | `{r: 18, g: 52, b: 86, a: 1}` | Both children’s background Rectangles |
| Accent Color | `{r: 255, g: 170, b: 0, a: 1}` | Lower Third’s accent Rectangle |

Create uniquely named sub-compositions:

| Composition | Local content controls and native links | Widgets styled by the script |
| --- | --- | --- |
| Lower Third | Text `Full Name` → Full Name widget’s `text`; Text `Role` → Role widget’s `text` | Text/Metric Text widgets Full Name and Role; Rectangles Background and Accent |
| Headline | Text `Headline` → Headline widget’s `text` | Text/Metric Text widget Headline; Rectangle Background |

Set the local initial content to Ada Lovelace / Analyst and Election results. Leave the widgets’ `color` and Rectangles’ `fillGradient` fields unlinked and script-owned. The text fields remain owned by their local native links. There are no root name, role, or headline controls.

Install the scripts below on their respective compositions. The examples assume the documented setup exists. `updateStyle` is an application-defined function, not a built-in Singular method.

## 1. Lower Third exposes its update function

Complete sub-composition script:

```javascript
// Example: lower-third-receiver
(function() {
  return {
    init: function(compCurrent) {
      const wiFullName = compCurrent.findWidget("Full Name")[0];
      const wiRole = compCurrent.findWidget("Role")[0];
      const wiBackground = compCurrent.findWidget("Background")[0];
      const wiAccent = compCurrent.findWidget("Accent")[0];

      compCurrent.updateStyle = function(rootPayload) {
        wiFullName.setPayload({ color: rootPayload["Text Color"] });
        wiRole.setPayload({ color: rootPayload["Text Color"] });
        wiBackground.setPayload({ fillGradient: rootPayload["Background Color"] });
        wiAccent.setPayload({ fillGradient: rootPayload["Accent Color"] });
      };
    },
    close: function() {}
  };
})();
```

Lower Third consumes all three shared colors. It updates only styling fields. The local Full Name and Role controls continue to supply text through native links; this script neither reads nor overwrites their content.

## 2. Headline exposes the same interface

Complete sub-composition script:

```javascript
// Example: headline-receiver
(function() {
  return {
    init: function(compCurrent) {
      const wiHeadline = compCurrent.findWidget("Headline")[0];
      const wiBackground = compCurrent.findWidget("Background")[0];

      compCurrent.updateStyle = function(rootPayload) {
        wiHeadline.setPayload({ color: rootPayload["Text Color"] });
        wiBackground.setPayload({ fillGradient: rootPayload["Background Color"] });
      };
    },
    close: function() {}
  };
})();
```

The interface is identical, but Headline uses only text and background colors. Accent Color is irrelevant to its design. Its headline remains locally managed. The function closes over the widget references created in init, so no additional stored composition or widget variables are needed.

## 3. Root distributes initial and later shared styles

Complete root script. It owns the root `payload_changed` slot; merge this routing into an existing root handler rather than registering a second handler for the same event.

```javascript
// Example: root-payload-distributor
(function() {
  return {
    init: function(compCurrent) {
      const compLowerThird = compCurrent.find("Lower Third")[0];
      const compHeadline = compCurrent.find("Headline")[0];
      const compReceivers = [compLowerThird, compHeadline];

      function deployRootPayload() {
        const rootPayload = compCurrent.getPayload2();
        compReceivers.forEach(function(compReceiver) {
          compReceiver.updateStyle(rootPayload);
        });
      }

      compCurrent.addListener("payload_changed", deployRootPayload);
      deployRootPayload();
    },
    close: function() {}
  };
})();
```

Child composition scripts initialize before root, so their functions are available when root first distributes styles. Registering the listener is not enough: the explicit initial call applies the shared theme without waiting for the first operator edit. Local content links operate independently.

On later `payload_changed` events, root rereads its complete current payload instead of treating the event message as a complete input object. All receivers get the same object for that dispatch and must treat it as read-only, including nested members.

The coordinator deliberately rereads root style values when any payload event reaches it, including bubbled child events. It does not apply a composition-ID gate that could suppress local editor updates. A local content edit can therefore reapply the same style; it never becomes a root content value. Child methods write only widget styling, so this example does not write a Control Node back into the triggering path.

## Expected sequence

1. Lower Third and Headline initialize and publish their update methods.
2. Root initializes, resolves both receivers, and reads the root inputs once.
3. Local content shows Ada Lovelace / Analyst and Election results, with the shared white text and blue background. Lower Third also uses the shared amber accent.
4. Changing root Text Color recolors both graphics. Their names, role, and headline remain unchanged.
5. Changing root Accent Color changes only Lower Third’s accent. Editing or clearing a local headline affects only that child’s text. Background Color can change both backgrounds without resetting any local content.
6. Local content updates continue independently of root styling.

Calling `updateStyle` updates running widget style fields. It does not copy root values into child Control Nodes, modify locally managed content, save Composer document content, change visibility/animation state, or synchronize a Control App form.

## Design notes

### Payload scope

This first example passes the complete root style payload because it makes the distribution mechanism easy to see. Children use the shared style fields relevant to their design. As the theme contract grows, root can instead construct explicit style objects. Local editorial content stays in its owning sub-composition in either approach.

### Shared interface

Using `updateStyle(rootPayload)` gives every receiver the same small interface and describes its responsibility. Widget names and local content remain internal to each child. Reserve that application-defined method name for this purpose; do not overwrite another script’s established interface.

### Update frequency

Start with a direct dispatch on initialization and each payload event. For expensive rendering or widgets with update animations, compare the effective style fields before writing unchanged styles. Keep this separate from local content updates. Do not add a last-attempted-write cache as proof of effective widget state.

### Animation

This example distributes styling only. Root can separately coordinate `playTo("In")` or `playTo("Out")` when that is an explicit integration requirement. Updating colors should not implicitly show, hide, or restart every receiving composition.

### Diagnostics and lifecycle

The examples omit setup exceptions, warning logs, and manual teardown scaffolding so the communication pattern stays clear. Optional application diagnostics can use the [reportOnce pattern](../examples/report-once.md). Keep one owner for the root listener and each exposed updateStyle function. These examples assume the compositions share the normal Player lifecycle; explicit module replacement and externally retained callbacks require their own lifecycle design.

## Related references

- [Communication guide](../how-to-guides/communicate-between-sub-compositions.md)
- [Context & utilities](../api-reference/context-and-utilities.md)
- [Listener ownership](../api-reference/event-listeners.md)
- [Data ownership](data-ownership.md)
