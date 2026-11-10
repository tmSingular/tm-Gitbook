# Composition object

These are host Graphics SDK wrappers, not composition-script widget/group objects. Resolve them after a successful load:

```javascript
// Host-page fragment inside a successful loading callback.
const compMain = graphics.getMainComposition();
const compLowerThird = compMain.find("Lower Third")[0];
```

## Navigation and identity

| Member | Contract |
| --- | --- |
| `id` | Loaded composition ID; do not assume a UUID format |
| `find(name, ...path)` | Array of matching descendant wrappers; subsequent path names follow children from each match |
| `getCompositionById(id)` | Wrapper for a loaded ID; the bridge resolves through the SDK instance |
| `getSubcompositionById(id)` | Alias of the host wrapper’s ID lookup |
| `listSubcompositions()` | Direct-child array of `{id, name}` objects |

Use unique names, or explicit IDs/path names when disambiguation matters. `find` returns an array and `[0]` selects the first match. Neither ID lookup should be replaced by `find(id)`: name lookup and ID lookup are different operations.

```javascript
// Host-page fragment after loading; Lower Third contains a child named Badge.
const compMain = graphics.getMainComposition();
const compBadge = compMain.find("Lower Third", "Badge")[0];
const compById = graphics.getCompositionById(compBadge.id);
```

## Inputs, models, and data

| Method | Return or effect |
| --- | --- |
| `getControlNode()` | Existing Control Node model and payload; may be undefined |
| `getModel()` | Array of field descriptors, or an empty array |
| `getPayload()` | Array of `{key, value}` pairs, or an empty array |
| `getPayload2()` | Public-ID-keyed payload object when present; may be undefined |
| `setPayload(patch)` | Updates supplied Control Node values in the local Player through the SDK bridge |
| `getDataNodes()` | Map of referenced data nodes available in loaded SDK data |
| `getLogicLayer()` | Existing logic-layer description, or undefined |

Example field and payload shapes:

```json
{
  "field": { "id": "Title", "title": "Display title", "type": "text", "index": 0 },
  "payload": { "Title": "Hello" },
  "payloadPairs": [{ "key": "Title", "value": "Hello" }]
}
```

```javascript
// Host-page fragment; Title and Enabled are existing public input IDs.
compLowerThird.setPayload({ Title: "Updated", Enabled: false });
const fields = compLowerThird.getModel();
const values = compLowerThird.getPayload2() || {};
```

The model’s `id` is the payload key; its title is a display label, and internal field-map keys are separate. Use patches for intended input changes rather than resending unrelated values. Zero, false, and empty strings must not be replaced with truthiness fallbacks.

The inspected bridge normalizes some types, including colors and checkbox values, and can report its own validation warnings. It is not a universal validator for every current Control Node type. JSON inputs use JSON text; complex font, Table, Timer, Time Control, and Location contracts need their own versioned definitions. A Time Control is not a native Timer. The generic preview deliberately leaves unsupported structured types read-only.

Normalized Number inputs use a raw 0–100 payload; output low/high describe mapping rather than editor input bounds. See the local [normalized-number reference](../../../composition-scripting/api-reference/normalized-numbers.md).

## Animation and messages

| Method | Behavior |
| --- | --- |
| `getState()` | Logical In/Out in the inspected wrapper; Out1/Out2 normalize to Out |
| `playTo(state)` | Request authored animation toward a state; returns before completion |
| `jumpTo(state)` | Request an immediate state change |
| `seek(to)` | Forwards a composition seek target; the old reference does not establish a portable unit/shape contract |
| `sendMessage(object)` | Sends custom application data to the composition’s message path |

```javascript
// Host-page fragments; the graphic defines its own In/Out Timeline.
compLowerThird.playTo("In");
```

```javascript
// An independent alternative to playback.
compLowerThird.jumpTo("Out");
```

```javascript
// The receiver defines how this application-specific command is interpreted.
compLowerThird.sendMessage({ action: "highlight", enabled: true });
```

`sendMessage` does not define a universal application command schema or guarantee an identical envelope for widget and host-origin messages. Implement its receiver through the local [composition-script event reference](../../../composition-scripting/api-reference/event-listeners.md), confirming the actual receiving envelope.

Host setters control this Player. They do not automatically save Composer content or synchronize a remote Control App’s operator form. Native links and scripts inside the graphic still own their destination widget fields.
