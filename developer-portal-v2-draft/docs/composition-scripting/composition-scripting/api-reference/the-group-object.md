# The group object

Groups provide shared layout, visibility, and effects for their contents. `comp.findGroup(name)` searches the current composition; find the owning child composition first when needed.

| Member | Contract |
|---|---|
| `id`, `getDomElement()` | Group identity and runtime DOM element |
| `getPositionX/Y()`, `setPositionX/Y(value)` | Stored `left` / `top`; setters retain anchors |
| `getSizeX/Y()`, `setSizeX/Y(value)` | Stored layout dimensions; ordinary percentage geometry resolves in the parent coordinate space |
| `getRotateZ()`, `setRotateZ(degrees)` | Rotation |
| `getVisibility()`, `setVisibility(boolean)` | Stored visibility |
| `getOpacity()`, `setOpacity(percent)` | Stored opacity, 0–100 |
| `getBrightness/Blur/Contrast/Grayscale/Hue/Invert/Saturate/Sepia()` | Stored filter values |
| `setBrightness/Blur/Contrast/Grayscale/Hue/Invert/Saturate/Sepia(value)` | Set the matching filter; inspect its supported units and range |
| `getBorderRadius()`, `setBorderRadius(value)` | Object with `active`, `tl`, `tr`, `bl`, and `br` |

Slash-separated method names in the table denote separate methods, for example `getPositionX()` and `getPositionY()`.

Fragment inside a root script's `init(comp)`:

```javascript
const children = comp.find("Lower");
if (children.length !== 1) throw new Error('Expected one "Lower"');
const groups = children[0].findGroup("Content");
if (groups.length !== 1) throw new Error('Expected one "Content" group');
groups[0].setOpacity(80);
```

Anchor semantics and stored-versus-rendered geometry follow [The widget object](the-widget-object.md#position-and-anchors). Do not treat 100% of a group as 100% of the root canvas. Check the inspected parent and layout units, particularly with nested geometry.

Preserve one writer per affected property. Verify directional Timeline entrance frames at supported position/size extremes; a settled screenshot alone does not prove a correct entry envelope.
