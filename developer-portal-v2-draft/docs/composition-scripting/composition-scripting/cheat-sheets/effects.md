# Effects

Separate native tile/group filters from visual features implemented inside a widget. A Text shadow, Rectangle stroke, or Metric Text Style glow is a widget payload setting; it is not a native group filter.

## Native group filters

The [group API](../api-reference/the-group-object.md) documents these accessors. Confirm each property’s units/range in the loaded environment; do not treat all filter numbers as interchangeable percentages.

| Effect | Getter | Setter |
| --- | --- | --- |
| Brightness | `getBrightness()` | `setBrightness(value)` |
| Blur | `getBlur()` | `setBlur(value)` |
| Contrast | `getContrast()` | `setContrast(value)` |
| Grayscale | `getGrayscale()` | `setGrayscale(value)` |
| Hue | `getHue()` | `setHue(value)` |
| Invert | `getInvert()` | `setInvert(value)` |
| Saturation | `getSaturate()` | `setSaturate(value)` |
| Sepia | `getSepia()` | `setSepia(value)` |

Fragment inside `init(compCurrent)`. Create groups `Reference Style` and `Content` in the same composition; Content’s filters must be script-owned and unlinked. This copies already-configured values without guessing units:

```javascript
const grMatches = compCurrent.findGroup("Reference Style");
if (grMatches.length !== 1) throw new Error("Expected exactly one Reference Style");
const grReference = grMatches[0];
const grTargetMatches = compCurrent.findGroup("Content");
if (grTargetMatches.length !== 1) throw new Error("Expected exactly one Content");
const grTarget = grTargetMatches[0];
["Brightness", "Blur", "Contrast", "Grayscale", "Hue", "Invert", "Saturate", "Sepia"].forEach(function(name) {
  grTarget["set" + name](grReference["get" + name]());
});
```

**Expected result:** Content receives the reference group’s stored filters. Rendered appearance can still differ because of content and ancestor effects. This is reference-backed, not a live Player test. Do not assume every widget exposes the group filter methods.

## Control Node links to effects

When an effect is intentionally controlled through a Number Control Node, set the defining control’s public payload ID instead of the destination. Supported authoring link identifiers include `filterBrightness`, `filterBlur`, `filterContrast`, `filterGrayscale`, `filterHueRotate`, `filterInvert`, `filterSaturate`, and `filterSepia`. These are link property identifiers, not widget payload keys or method names.

Configure and inspect the link in Composer first. For a Number control named `Blur` already configured for a blur target, a fragment inside `init(compCurrent)` can remove blur:

```javascript
compCurrent.setPayload({ Blur: 0 });
```

The runtime value change does not create a link or edit its metadata. Use only values within the inspected destination range.

## Widget-specific visual effects

| Feature | Reference |
| --- | --- |
| Legacy text shadow and spacing | [Text](widgets/text.md) |
| Metric text shadow and inset | [Metric Text](widgets/metrictext.md) |
| Gradient text, outline, glow, sheen | [Metric Text Style](widgets/metrictextstyle.md) |
| Character/word animation | [Metric Text Animation](widgets/metrictextanim.md) |
| Fill, stroke, corners, rings | [Rectangle](widgets/rectangle.md), [Circle](widgets/circle.md) |

Avoid competing script and native animation writers. Check [ownership](../core-concepts/data-ownership.md) before combining effects.
