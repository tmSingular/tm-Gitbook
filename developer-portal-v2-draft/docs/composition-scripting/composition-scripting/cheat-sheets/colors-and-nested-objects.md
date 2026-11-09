# Colors and nested objects

Patch a top-level content field without resending unrelated fields. A nested font or gradient is a complete value: preserve its required members instead of assuming recursive merging. These fragments belong inside `init(compCurrent)`.

## Preserve an existing font

Requires one legacy Text widget named `Title`, with its font unlinked:

```javascript
const wiMatches = compCurrent.findWidget("Title");

const wiTitle = wiMatches[0];
const current = wiTitle.getPayload() || {};

const font = Object.assign({}, current.font, { alignment: "center" });
wiTitle.setPayload({ font: font });
```

**Expected result:** legacy Text alignment changes while its font data remains intact. Metric Text uses a separate top-level `alignment` field and requires complete Font 2.0 metrics. Do not fabricate `mg` metrics or substitute a legacy font object.

## Solid color and alpha

```javascript
const wiMatches = compCurrent.findWidget("Background");

const wiBackground = wiMatches[0];
wiBackground.setPayload({ fillGradient: { r: 18, g: 52, b: 86, a: 0.5 } });
```

Requires an unlinked Rectangle named Background. Color alpha is 0–1; tile opacity is separately 0–100. Native Color Control Nodes use their own color value contract, not a renderer gradient wrapper.

## Complete linear gradient

After resolving the same Background widget:

```javascript
wiBackground.setPayload({
  fillGradient: {
    type: "linear",
    stops: [
      { offset: 0, color: "#ff0000", opacity: 1 },
      { offset: 1, color: "#0000ff", opacity: 1 }
    ],
    angle: 90, scale: 100, offset: 0,
    keepAspect: false, spreadMethod: "pad"
  }
});
```

**Expected result:** the Rectangle uses a red-to-blue linear fill. Metric Text’s solid-color field does not render gradient stops; use Metric Text Style for gradient text. Verify the loaded renderer and gradient field shape before reuse.

Reference-backed; check font readiness, rendered gradients, and later unrelated updates in Player.
