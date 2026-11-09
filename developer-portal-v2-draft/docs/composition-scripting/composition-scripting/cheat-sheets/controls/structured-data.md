# Structured data

Structured controls need exact value shapes. A label such as JSON or Data does not tell you whether a particular runtime read is JSON text, a decoded object, or a file reference.

| Type | Read example | Update policy |
| --- | --- | --- |
| Data | `values.Data` | Inspect schema and consumer before constructing a write |
| JSON | `values.Settings` | Establish string/object shape and nested replacement behavior first |
| JSON File | `values.SettingsFile` | Do not replace a file reference with parsed JSON without a verified contract |
| Location | `values.Location` | Establish coordinate field names, ordering, units, and allowed range |

## Read and decode JSON for your script

Fragment inside `init(compCurrent)`; Settings is an existing input whose consumer expects an object:

```javascript
const values = compCurrent.getPayload2() || {};
const raw = values.Settings;
const settings = typeof raw === "string" ? JSON.parse(raw) : raw;
```

**Expected result:** with valid JSON object input, `settings` is a usable object. This snippet assumes the documented input contract. Parsing for local use does not establish a supported Control Node write shape.

## Update boundaries

The reviewed material does not establish universal composition-script write literals for these four types. Read the loaded model and exact consumer contract before adding a type-specific update example. Do not replay command/state objects merely because they were readable, mutate read-only metadata, or silently treat malformed JSON as an empty successful dataset.

For data-driven graphics with established widget contracts, see [Table](../widgets/table.md), [Grid](../widgets/grid.md), and [AI Graphics](../widgets/aigraphics.md). Their JSON payload contracts are widget-specific and must not be generalized to all native structured controls.

Coverage status: read pattern supplied; type-specific writes and clearing remain unverified.
