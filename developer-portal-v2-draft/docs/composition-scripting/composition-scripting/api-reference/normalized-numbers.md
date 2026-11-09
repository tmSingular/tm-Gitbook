# Normalized numbers

A `normalizednumber` Control Node has a raw input percentage in **0–100** and separate Output Low/Output High metadata. An ordinary Number's bounds constrain input; they do not apply the same output mapping.

| Read surface | Value |
|---|---|
| `compCurrent.getPayload()` / `getPayload2()` | Raw percentage |
| A linked numeric widget property after link processing | Mapped value |
| `wiWidget.getPayload()` | Processed cached widget content; does not recalculate the link |
| A linked layout property | Layout state, not a widget content payload field |

Native numeric mapping is `low + (high - low) * percentage / 100`, rounded to three decimal places. With low 0, high 200, raw 25 maps to 50. Changing high to 400 maps that same raw 25 to 100.

Read current definitions through `compCurrent.getModel()` using public `id`, or `compCurrent.getControlNode().model.fields` using internal keys. Treat metadata as read-only. Never guess missing ranges, mutate the model, or add a hidden proxy widget by default.

Fragment for a script-owned derived destination. Setup: `Scale` is an existing Normalized Number with numeric low/high metadata and a valid 0–100 input; the snippet assumes that contract:

```javascript
const fields = compCurrent.getModel() || [];
const field = fields.filter(function(item) { return item.id === "Scale"; })[0];
const raw = (compCurrent.getPayload2() || {}).Scale;

const mapped = Math.round((field.low + (field.high - field.low) * Number(raw) / 100) * 1000) / 1000;
```

Numeric control inputs can preserve finite decimal strings, such as `"25.0"`. Input validation must reject units, trailing text, booleans, null, arrays, nonfinite values, and hexadecimal syntax. Preserve existing valid representation; numeric equality does not imply identical stored source.

Getter/cache checks do not establish link processing order during initialization or `payload_changed`. Verify freshness in the Player before relying on a linked read. A retained proxy remains link-owned/read-only; scripts write only their unlinked destinations.
