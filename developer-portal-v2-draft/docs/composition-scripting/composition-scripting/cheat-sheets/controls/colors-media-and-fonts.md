# Colors, media, and fonts

Read each current value through `compCurrent.getPayload2()[publicId]`. These fragments belong inside `init(compCurrent)` and require existing controls of the declared types and deliberate runtime ownership.

| Type | Example public ID | Contract / remaining check |
| --- | --- | --- |
| Color | Brand Color | Native color value; use plain RGBA, not a renderer gradient wrapper |
| Image | Logo | Inspect the exact media reference; widget Image payload uses a URL but that does not establish every control representation |
| Audio | Sting | Inspect exact asset reference shape; a source value is not a playback command |
| Video | Clip | Inspect exact asset reference shape; playback remains consumer-specific |
| Metric Font | Heading Font | Preserve the complete resolved font and metrics; do not fabricate a minimal replacement |

## Read a color and update it

```javascript
const values = compCurrent.getPayload2() || {};
const previousColor = values["Brand Color"];
compCurrent.setPayload({ "Brand Color": { r: 18, g: 52, b: 86, a: 0.5 } });
```

**Expected result:** the Color input receives a half-transparent color. RGB channels use 0–255 and alpha 0–1. A wrapper such as `{type: "solid", solidColor: ...}` belongs to compatible renderer gradient fields, not native Color inputs. Verify linked target rendering separately.

## Transfer a compatible inspected value

Use this pattern for a media or font value only after checking that Source Asset and Destination Asset have the same exact type and compatible metadata, and that the loaded runtime accepts the source shape as an ordinary write. Do not use it for action or command types.

```javascript
const fields = compCurrent.getModel() || [];
function field(id) {
  const matches = fields.filter(function(item) { return item.id === id; });
  return matches[0];
}
const from = field("Source Asset");
const to = field("Destination Asset");

const values = compCurrent.getPayload2() || {};

const patch = {};
patch[to.id] = values[from.id];
compCurrent.setPayload(patch);
```

This preserves the inspected representation; matching type alone does not validate metadata compatibility. Exact media/font write and clearing contracts remain pending per loaded version. Do not publish a guessed literal or claim universal acceptance from this transfer pattern. For direct widget examples use [Image](../widgets/image.md), [Sound](../widgets/sound.md), and [Video Clip](../widgets/videoclip.md).

Reference-backed color guidance; no live control delivery was verified for this update.
