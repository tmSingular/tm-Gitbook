# Text and numeric inputs

All snippets are alternatives inside `init(compCurrent)`. Create controls with the exact IDs and types listed. Writes below require an intentional runtime consumer; do not overwrite operator values during initialization by default.

| Type | Read | Update example | Important distinction |
| --- | --- | --- | --- |
| Text | `values.Title` | `{ Title: "Updated" }` | String; empty string clears |
| Textarea | `values.Description` | `{ Description: "Line 1\nLine 2" }` | Multiline string |
| Number | `values.Amount` | `{ Amount: 0 }` | Inspect bounds; zero is meaningful |
| Normalized Number | `values.Scale` | `{ Scale: 25 }` | Raw 0–100 percentage, not mapped output |
| Counter | `values.Count` | `{ Count: 3 }` | Resolved integer value; do not invent increment commands |
| Checkbox | `values.Enabled` | `{ Enabled: false }` | Boolean; false is meaningful |

## Read raw values

```javascript
const values = compCurrent.getPayload2() || {};
const title = values.Title;
const amount = values.Amount;
const enabled = values.Enabled;
```

## Update values

```javascript
compCurrent.setPayload({ Title: "Updated", Description: "Line 1\nLine 2" });
compCurrent.setPayload({ Amount: 0, Scale: 25, Count: 3, Enabled: false });
```

**Expected result:** the composition’s intended consumers receive the updated input values. Reads can preserve a stored numeric string; do not assume every numeric-looking read is already a number. Validate a complete finite decimal value before arithmetic. This does not change bounds or field types.

## Raw percentage versus mapped output

For a Normalized Number with output low 0 and high 200, raw 25 maps to 50 on a linked numeric property. Changing high to 400 maps the same raw 25 to 100. Native links round to three decimals. Read current metadata instead of hardcoding ranges; do not mutate the model or rely on cached widget reads to establish event ordering.

See the [complete normalized-number conversion example](../../api-reference/normalized-numbers.md). Reference-backed; verify zero, false, clearing, mapping, and later changes in Player.
