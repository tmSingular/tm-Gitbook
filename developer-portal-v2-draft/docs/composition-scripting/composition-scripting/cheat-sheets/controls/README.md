# Control Node values

Use a Control Node’s public payload ID for reads and writes. Its display title, internal stable key, widget tile ID, and field type are different identifiers. These examples address an existing model; they do not create controls or edit field metadata.

| Types | Reference |
| --- | --- |
| Text, Textarea, Number, Normalized Number, Counter, Checkbox | [Text and numeric inputs](text-and-numeric.md) |
| Color, Image, Audio, Video, Metric Font | [Colors, media, and fonts](colors-media-and-fonts.md) |
| Data, JSON, JSON File, Location | [Structured data](structured-data.md) |
| Selection, Button | [Selection and buttons](selection-and-buttons.md) |
| Date/Time, Time Control, Timer | [Date, time, and timers](date-time-and-timers.md) |
| Info Text and additional catalog types | [Other types and read-only fields](other-types.md) |

## Read any existing type

Fragment inside `init(compCurrent)`; replace Public Value with the exact public ID:

```javascript
const id = "Public Value";
const fields = compCurrent.getModel() || [];
const field = fields.filter(function(item) { return item.id === id; })[0];

const values = compCurrent.getPayload2() || {};
const present = Object.prototype.hasOwnProperty.call(values, id);
const value = present ? values[id] : undefined;
// Inspect field.type and consume value according to that type's contract.
```

**Expected result:** `field` describes the input and `value` holds its current raw composition payload value. Model getters are read-only. Presence checking preserves false, zero, and an empty string; do not replace these through `value || fallback`.

## Write an ordinary value

```javascript
// Existing Text control, deliberately owned by this runtime workflow:
compCurrent.setPayload({ Title: "Updated" });
```

This updates a runtime input, not the editor model or Control App operator form. Prefer a direct native link for one-to-one delivery. Derived/fetched presentation usually belongs on an unlinked widget rather than overwriting operator inputs. Commands, buttons, and complex value types have distinct contracts below.

## Contract boundaries

Native Timer reads are formatted text but writes are command objects. Normalized Number reads are raw percentages but links map output. JSON File references and JSON text are different concepts. Authoring-tool acceptance does not prove the composition-script runtime accepts the same shape. Coverage gaps are marked explicitly on each page.

Reference-backed; verify the loaded control type and intended consumer in Player before claiming delivery. See [read/update how-to](../../how-to-guides/read-and-update-control-nodes.md) and [ownership](../../core-concepts/data-ownership.md).
