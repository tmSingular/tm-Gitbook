# Transforms and visibility

These setters change stored tile/group layout. They do not modify widget-specific payload fields or author Timeline keyframes. Fragments below belong inside `init(compCurrent)` and require unlinked, script-owned destinations.

| Operation | Read | Write | Units |
| --- | --- | --- | --- |
| Position | `getPositionX()`, `getPositionY()` | `setPositionX(x)`, `setPositionY(y)` | Immediate-parent layout units |
| Size | `getSizeX()`, `getSizeY()` | `setSizeX(w)`, `setSizeY(h)` | Immediate-parent layout units |
| Rotation | `getRotateZ()` | `setRotateZ(angle)` | Degrees; use only on a target exposing the documented method |
| Visibility | `getVisibility()` | `setVisibility(value)` | Boolean |
| Opacity | `getOpacity()` | `setOpacity(value)` | Percent 0–100 |

## Move, resize, hide, and fade a tile

Use a Metric Text widget named `Title` in an ordinary percentage layout:

```javascript
const wiMatches = compCurrent.findWidget("Title");

const wiTitle = wiMatches[0];
const oldPosition = { x: wiTitle.getPositionX(), y: wiTitle.getPositionY() };
wiTitle.setPositionX(0);
wiTitle.setPositionY(0);
wiTitle.setSizeX(50);
wiTitle.setSizeY(15);
wiTitle.setVisibility(true);
wiTitle.setOpacity(80);
```

**Expected result:** a visible tile at stored position 0,0 with 50% by 15% parent-relative dimensions and 80% stored opacity. Its anchor determines placement. `setOpacity(1)` means one percent. Use `false` to hide and `0` for transparent.

## Rotate a group

```javascript
const grMatches = compCurrent.findGroup("Content");

const grGroup = grMatches[0];
const rotation = grGroup.getRotateZ();
grGroup.setRotateZ(rotation + 15);
```

**Expected result:** group rotation increases by 15 degrees. This relative update is not idempotent; do not repeat it on every payload event unless incremental rotation is intended.

## Coordinates and anchors

For ordinary percentage layouts, dimensions and positions resolve against the immediate parent, including a containing group. Before rotation/scale/animation, rendered edges are:

```text
leftEdge = left + (100 - width) * anchor.x / 100
topEdge  = top  + (100 - height) * anchor.y / 100
```

A center anchor with stored position 0,0 centers the tile. A top-left anchor with the same stored position aligns top-left. Setters preserve anchors. Do not apply these percentage calculations to pixel-unit layouts. Getters do not include ancestor transforms, clipping, visibility, or animation.

Payload `width` on Rectangle changes the internal shape, whereas `setSizeX` changes the tile. Scale, skew, perspective, and anchor mutation are not inferred from UI labels here; use only an established runtime method or explicitly configured control link.

Reference-backed; verify rendered placement and entrance frames at supported extremes. See [widget API](../api-reference/the-widget-object.md) and [group API](../api-reference/the-group-object.md).
