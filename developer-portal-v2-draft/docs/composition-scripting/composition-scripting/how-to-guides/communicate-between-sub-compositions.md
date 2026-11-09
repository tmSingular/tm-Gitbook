# Communicate between sub-compositions

Use a root-owned coordinator to distribute shared styling to sub-compositions. Each child exposes an application-defined `updateStyle(rootPayload)` function and maps the relevant colors onto its own widgets.

Keep editorial content local: names, roles, titles, and headlines belong to their owning sub-compositions. Local native Control Node links can continue updating text while the script owns separate color and fill fields.

## Complete worked example

The [How scripts communicate](../core-concepts/how-scripts-communicate.md) page contains the setup and all three simplified scripts:

1. [Lower Third receiver](../core-concepts/how-scripts-communicate.md#1-lower-third-exposes-its-update-function) applies text, background, and accent colors.
2. [Headline receiver](../core-concepts/how-scripts-communicate.md#2-headline-exposes-the-same-interface) applies text and background colors.
3. [Root distributor](../core-concepts/how-scripts-communicate.md#3-root-distributes-initial-and-later-shared-styles) reads root payload once per dispatch, calls both receivers, and forwards initial as well as later style values.

## Integration notes

- Child scripts initialize before root. Expose the shared interface during each child’s `init`.
- Register only root’s own `payload_changed` handler. Registering on a child can replace that child’s handler. Merge routing into any existing root handler.
- Treat the supplied root payload as read-only, including nested color objects. Receivers should not change shared inputs or write them back into Control Nodes.
- These snippets assume the documented setup and normal Player lifecycle. The intentionally empty `close` functions keep the communication mechanism visible; explicit module replacement or externally retained callbacks need an application lifecycle design.
- For direct one-to-one delivery, prefer native links when they already express the required ownership. Use script coordination for deliberate module interfaces and derived styling.

Verify initial theme application, live root color changes, unchanged local text, local content edits/clearing, and independent animation behavior in the target Player. Static or mocked checks do not establish native-link or actual app-output delivery.
