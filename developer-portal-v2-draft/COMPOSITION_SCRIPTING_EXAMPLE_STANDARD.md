# Composition scripting example standard

Planning draft · 2026-11-09

Use this standard for the Developer Portal v2 scripting reference and cheat sheets. Short entries explain one operation. Widget reference pages collect related entries; complete applications belong in Examples. Remove inapplicable optional sections rather than filling them with boilerplate.

## Object naming

Use camelCase object variables with a type prefix and a descriptive name:

| Object | Pattern | Examples |
| --- | --- | --- |
| Composition | `compName` | `compCurrent`, `compLowerThird` |
| Widget | `wiName` | `wiTitle`, `wiHomeScore` |
| Group | `grName` | `grContent`, `grBackground` |

Use the same convention for parameters and retained references. Collections keep the prefix, for example `wiTitles` or `grMatches`. Keep distinct references named distinctly, such as `compCurrent` for the init parameter and `compStored` for the retained composition. These are JavaScript variable names; preserve Composer object names, public Control Node IDs, payload keys, and API method names.

## Variable declarations

Use `const` when a binding is not reassigned, and `let` when it is reassigned. Do not use `var` in script examples. This rule applies to all future examples, including callbacks and lifecycle cleanup.

Object/array mutation does not reassign the binding: a `const` widget reference can call setters, and a `const` array can receive items. A reference initialized to `null`, assigned in `init()`, and cleared in `close()` requires `let`. Use `const` for callback-local payloads, lookup results, fixed settings, and cleanup snapshots. Prefer a single initialized `const` when a value can be calculated directly; use `let` for counters, changing state, handles, and branch-assigned values.

## Required conventions

- State whether the code is a fragment inside `init(compCurrent)`, a listener body, or a complete script. Never present placeholders as runnable code.
- Use the composition-script API. Keep Composer AI authoring commands and host SDK APIs in separately labeled material.
- Identify the target composition, widget name/type, loaded version, and required Composer setup.
- State required target names, IDs, types, and uniqueness as setup preconditions. Keep ordinary examples focused: omit thrown setup errors, try/catch wrappers, and console warning/error branches. Link to the optional reportOnce best-practice example for application diagnostics.
- Identify the write owner: script, linked Control Node, or native animation. Explain setup needed to avoid competing writers.
- Document exact keys and value shapes. Distinguish tile transforms, widget payload fields, native effects, and widget-specific visual effects.
- Give units and ranges explicitly. Do not infer defaults from a renderer fallback.
- Use small payload patches. For nested objects, explain replacement/merge semantics and preserve required inspected fields.
- Include the expected visible or data result and at least one relevant boundary case.
- State runtime/persistence scope, and whether operator UI synchronization is supported.
- Label evidence accurately: reference-backed, source-inspected, or Player-verified. Do not claim runtime verification from payload readback alone.

## Copyable entry template

````markdown
### <Verb + concrete outcome>

<One sentence describing the operation.>

| Requirement | Value |
| --- | --- |
| Target | <widget display name, type ID, owning composition> |
| Compatibility | <loaded version(s) checked; otherwise “Not yet verified”> |
| Placement | <inside init(comp), callback, or complete script> |
| Composer setup | <required fields, assets, links, anchors, or template setup> |
| Write owner | <script / linked Control Node / native behavior> |
| Scope | <runtime effect and persistence/operator UI behavior> |

#### Values

| Composer label | API key or method | Type / shape | Units / allowed values | Notes |
| --- | --- | --- | --- | --- |
| <label> | <exact identifier> | <type> | <units/range> | <default only if verified; nested update rules> |

#### Code

```javascript
// <Placement and setup assumptions.>
// Replace this placeholder with a verified, minimal example.
```

**Expected result:** <Observable result, including where to observe it.>

**Boundary behavior:** <Relevant empty, zero, false, invalid, or repeated input behavior.>

#### Notes

<Only relevant ownership, units, asynchronous readiness, or compatibility details.>

#### Evidence

- Contract: <source link and precise section>
- Checked version: <version or not yet verified>
- Validation: <what was inspected or exercised; expected versus observed>
- Pending: <remaining uncertainty, or none>

Related: <API reference>, <complete example>, <relevant widget/control page>.
````

## Optional feature entry

Use for HTML text, fitting, templates, media playback, and other widget-specific capabilities. Add:

1. How to activate the feature, with exact Composer setting if available.
2. Script activation key and value, if supported; otherwise say configuration is editor-only or unverified.
3. Minimal usage example and expected result.
4. Supported inputs, limitations, clearing/reset behavior, and version differences.

For HTML, distinguish activation from markup format, list supported markup only when verified, and demonstrate escaping dynamic plain text.

## Optional message entry

Document activation separately from consumption. Add this table before the listener:

| Message | Trigger | Activation | Envelope / payload | Timing and repetition |
| --- | --- | --- | --- | --- |
| <exact name> | <condition> | <required flag, automatic, or unknown> | <exact shape> | <initial event, cadence, repeat behavior, guarantees> |

Show listener registration before activation and initial content updates where required. Include sender filtering, a representative payload, cleanup using the documented lifecycle, and protection from recursive writes or repeated completion actions. Do not fabricate an initial event or promise replay.

Keep widget messages and native Timer Control Node events in separate entries.

## Optional Control Node entry

Add public ID and exact type, raw read shape, accepted write shape, metadata access, mapped output if applicable, and direct-link versus script-consumer behavior. Separate ordinary values, action/command payloads, and editor-only configuration. Use different input/output columns where shapes differ.

## Filled short-entry example: update text

### Update a Metric Text widget’s text

Fragment inside `init(compCurrent)`. The owning composition contains exactly one Metric Text widget named `Title`. Its `text` property is unlinked and owned by this script.

```javascript
const wiMatches = compCurrent.findWidget("Title");

const wiTitle = wiMatches[0];
wiTitle.setPayload({ text: "Hello" });
```

**Expected result:** the running widget displays “Hello”. This snippet changes runtime widget content; it does not demonstrate saving the Composer document or updating a Control App form.

**Boundary behavior:** an empty string clears the text; do not rely on a zero-bounds message when clearing Metric Text.

**Evidence:** reference-backed by the installed Composer AI `composition-scripting/widget-metrictext.md` and the portal widget-object reference. No loaded widget version or Player behavior was tested for this planning draft. Preserve the widget’s existing font and metrics.

## Publication checks

- The snippet matches its stated placement and uses exact documented identifiers.
- Setup, ownership, units, and version are clear.
- Source inspection establishes supported operations; meaningful runtime behavior is checked in Player before labeling it verified.
- Message examples test activation, source routing, relevant triggers, and cleanup.
- Unknown behavior is visible; unsupported behavior has evidence rather than an assumption.
- Navigation and related links point to the canonical page, without copying the same contract into multiple pages.
