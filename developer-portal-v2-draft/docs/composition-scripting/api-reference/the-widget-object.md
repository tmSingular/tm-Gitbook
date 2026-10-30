# The widget object

Resolve a widget through its owning in-script composition. Read the loaded type/version and inspect the live field schema before selecting payload keys.

## Content and layout methods

| Member | Contract |
|---|---|
| `id` | Originating widget tile ID; useful for routing custom messages |
| `getPayload()` | Processed, cached widget-specific content |
| `setPayload(patch)` | Merge intended widget content fields with the existing payload |
| `getVisibility()` / `setVisibility(boolean)` | Stored visibility |
| `getPositionX/Y()` / `setPositionX/Y(number)` | Stored layout `left` / `top` |
| `getSizeX/Y()` / `setSizeX/Y(number)` | Stored tile width / height |
| `getRotateZ()` / `setRotateZ(number)` | Rotation in degrees |
| `getOpacity()` / `setOpacity(number)` | Stored layout opacity on a 0–100 scale |
| `getDomElement()` | Widget's runtime DOM element; readiness and geometry still require verification |

In ordinary percentage layouts, position and size use the immediate parent: a containing group for a grouped tile, otherwise the composition. Pixel-unit layouts need their own inspected units. Getter values describe stored layout, not final bounds after ancestor transforms, clipping, visibility, and animation.

Fragment inside `init(comp)`; `Title` is an unlinked Metric Text or Text widget:

```javascript
const matches = comp.findWidget("Title");
if (matches.length !== 1) throw new Error('Expected one "Title" widget');
const title = matches[0];
title.setPayload({ text: "Hello" });
title.setSizeX(50);
title.setSizeY(15);
title.setOpacity(100);
```

`setSizeX(50)` changes tile layout width. `setPayload({ width: 50 })` is not equivalent: Rectangle uses payload width for the shape inside the tile; another widget may not support that field.

## Position and anchors

Setters write stored positions without changing anchors, converting center coordinates, or clamping to a presumed range. Before rotation, scale, or animation, the rendered left edge in ordinary percentage layout is:

```text
leftEdge = left + (100 - width) * anchor.x / 100
topEdge  = top  + (100 - height) * anchor.y / 100
```

With center anchors (`50,50`), stored position `0,0` centers the box. With top-left anchors (`0,0`), `0,0` aligns the box to the parent's top-left. Changing anchors without compensating positions moves the graphic. Inspect current geometry and verify layout at supported size/position extremes.

## Opacity and color alpha

`setOpacity(1)` means **one percent**, not fully opaque. Convert a 0–1 interpolation value with `setOpacity(progress * 100)`. Color alpha is separately 0–1. Do not infer the unit by inspecting whether a current opacity happens to exceed one.

The getter does not include opacity inherited from ancestors or native effects. Keep the destination unlinked and free of competing Timeline/Update opacity writers before scripting a fade.

## Effective state and content

Preserve complete inspected font/gradient objects when changing them; send small content patches when only text changes. Compare desired content with the widget's current payload when reliable readback is available, or reapply the complete derived state idempotently. A cache of the last attempted write cannot detect a later model update replacing that state.

Use [Widget payloads](widget-payloads/README.md) for Text/Metric Text, Image, Rectangle, Table/Grid, HTML, and ticker differences. DOM access does not authorize injecting diagnostic nodes outside the widget's owned root.
