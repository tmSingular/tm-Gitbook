# Data ownership

Give each destination property one writer.

| Requirement | Ownership |
|---|---|
| Operator input maps unchanged to one property | Native Control Node link |
| Input needs interpretation, combination, or fan-out | Standalone controls; script writes unlinked destination properties |
| Script fetches or derives values | Direct widget writes, including Table/Grid content |
| Native Timeline/Update animation affects a property | Native motion owns it; do not overlay a scripted writer |

A link/model update can replace a script's value if both target the same field. Correct the competing ownership rather than adding a delayed second write. Do not add hidden backing widgets or controls just to relay script-fetched presentation.

`comp.setPayload()` remains valid for a deliberate runtime consumer, including [Timer actions](../api-reference/timer-controls.md). Explain the reason, preserve one writer, and verify that path in the intended host. Output iframe writes do not synchronize back to the Control App operator UI: a script cannot reset sliders or publish fetch status there through that method.

On each relevant update, compare against effective widget content or rewrite the complete derived state idempotently. A cache of last-attempted values can miss a later model update. Preserve current valid color/numeric representation in stored sources while checking numeric or rendered equivalence separately.

For feed failures, keep the last good output or use an agreed on-output indicator. Use sanitized diagnostic labels; operator feedback needs an explicitly supported separate channel.
