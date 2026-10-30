# Work with layout

Use dedicated position/size methods for tile or group layout. Widget payload fields such as Rectangle `width` describe content inside that tile, not the tile bounds.

Before calculating a position, inspect the immediate parent, anchors, units, links, and native motion ownership. [The widget reference](../api-reference/the-widget-object.md#position-and-anchors) gives the ordinary percentage-layout anchor formula. Preserve rendered edges when re-anchoring.

For operator-selectable side/corner placement:

1. Define stable selection IDs, inward offset directions, units, ranges, defaults, and a size pivot.
2. Prefer direct native links for one-to-one inputs. For interpreted positioning, use standalone inputs and one script-owned group.
3. Resolve descendant composition and group explicitly. Keep layout destinations unlinked and avoid competing child/native transform writers.
4. Recompute from immutable designed dimensions rather than repeatedly scaling the last result.
5. Verify each corner, supported position/size extremes, simultaneous edits, and first In frames.

A script-side snap is not a Control App slider reset. Define whether corner changes preserve offsets or snap to defaults, and do not promise that output writes update operator controls.

For opacity interpolation, use 0–100 values and timestamp-based frames. See [Animation control](../api-reference/animation-control.md) and [normalized-number mapping](../api-reference/normalized-numbers.md) before relaying slider values.
