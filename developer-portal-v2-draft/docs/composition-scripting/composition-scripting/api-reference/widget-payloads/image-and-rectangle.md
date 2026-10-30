# Image and Rectangle

Inspect the loaded type and schema, then update only intended fields. Content changes do not replace tile geometry methods.

## Image (642)

| Field | Meaning |
|---|---|
| `image` | Image URL |
| `objectFit` | `contain` or `cover` |
| `shift` | Alignment shift, -100 to 100 |
| `flipX`, `flipY` | Boolean flips |

Use trusted accessible image assets. Loading is asynchronous; a stored URL does not prove successful rendering. Eligible `image.singular.live` URLs can select a bounded resolution automatically; other URLs do not gain that behavior. Failed loads can leave the image hidden, so inspect failures separately from script correctness.

## Rectangle (1022)

| Field | Meaning |
|---|---|
| `fillGradient`, `strokeGradient` | Color/gradient value |
| `strokeWidth` | Pixel stroke width |
| `renderStyle` | Inspected `filled` or `outline` |
| `width`, `height` | Internal shape percentages, not tile layout bounds |
| `bevelSize`, `bevelSizeUnit`, `bevelStyle` | Inspected corner treatment |
| `outlineWidth`, `outlineWidthUnit` | Inspected outline-ring width and units |

For a script-owned solid fill, send the complete solid-gradient structure:

```javascript
// Fragment inside init(comp), with an unlinked Rectangle named Background.
const background = comp.findWidget("Background")[0];
if (!background) throw new Error("Background was not found");
background.setPayload({
  fillGradient: { type: "solid", solidColor: { r: 20, g: 30, b: 40, a: 1 } }
});
```

This wrapper belongs to the Rectangle renderer. A native Color Control Node instead takes a supported native color, such as `{ r: 20, g: 30, b: 40, a: 1 }`. Prefer a direct Color link when it should propagate unchanged.

Preserve inspected linear/radial gradient structure when modifying it. Do not add payload `width`/`height` when the intention is changing tile bounds: use `setSizeX/Y()` and the [layout contract](../the-widget-object.md).
