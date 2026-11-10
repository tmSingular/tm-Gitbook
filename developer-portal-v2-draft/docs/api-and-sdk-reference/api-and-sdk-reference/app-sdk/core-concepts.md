# Core concepts

An App SDK application is an operator UI connected to an app instance. Its commands update that instance's composition data and animation state. Every viewer of an affected output can see those changes.

## App definition, version, and instance

The app registered in App Manager defines the application and its configuration. Deployment uploads its HTML and assets. Publication makes a selected code version available through the normal app distribution workflow. An app instance is the running, configured app you open from Dashboard.

An app code version and a Composer composition revision are separate. Changing the HTML does not automatically select a new composition revision. See [deployment and versioning](deployment-and-versioning.md).

## Outputs and compositions

```text
App instance
  Outputs
    Default -> assigned imported composition -> output URL
  Imported compositions
    Root composition
      Direct child: Lower Third
        Control field: Name
  Shared storage

Operator UI -> local draft -> Apply -> composition payload -> output
```

A source composition is authored in Composer. An imported extract is the composition data available to the app instance. An output assigns one of those imported compositions to an output URL. Looking up a composition and assigning it to an output are separate operations.

The composition root and its children expose control and animation methods. Child lookups operate on a parent’s **direct children**. To reach a nested child, walk through each parent. Different branches may contain the same child name.

```javascript
const output = app.getOutputByName("Default");
const root = output && output.getComposition();
const lowerThird = root && root.getSubcompositionByName("Lower Third");
```

Here `app` is supplied to `singularAppInit(app)`. `Default` and `Lower Third` are names chosen for the tutorials, rather than built-in objects.

## Model, payload, and draft

The **model** describes editable fields: their IDs, types, titles, and defaults. A **payload** contains field values keyed by control ID. A field's display title can differ from its ID.

```json
{ "Name": "Alex Morgan" }
```

`getPayload2()` reads a payload object in this shape. `setPayload({ Name: "Alex Morgan" })` sends a field update. Preserve the type required by the model: a number field needs a number, for example.

An input value held in your UI is a **local draft**. Typing does not need to change the composition. The tutorials send a draft when the operator presses Apply. Shared storage can persist a draft, but saving it does not apply it to the composition.

| Data | Location | Typical use |
| --- | --- | --- |
| Unsent edit | UI variables or input elements | Let an operator edit before applying |
| Saved draft or selection | `app.storage` | Share or restore app-instance UI data |
| Applied field values | Composition payload | Change the graphics used by outputs |
| Animation state | Composition state | Show or hide a graphic independently of text editing |

## Identify the right object

| Identifier | Where to obtain it | Where to use it |
| --- | --- | --- |
| Output ID | `app.listOutputs()` | `app.getOutputById(id)` |
| Composition extract ID | `app.listCompositions()` | `app.getCompositionById(id)` |
| Child ID | Parent's `listSubcompositions()` | Same parent's `getSubcompositionById(id)` |
| Source reference ID | Root's `getRefId()` | Source metadata and form integration |
| Control ID | `getModel()` field descriptor | Payload keys |
| Deployment key | App Manager | `deploykey.json` for uploading code |
| Virtual app key | Developer configuration for the test instance | Local SDK bootstrap |

A REST app token belongs to a different integration. Keep deployment keys, virtual app keys, and credentials out of shared source and screenshots.

## Runtime boundaries

The hosted runtime calls the global `singularAppInit(app)` function. Local development explicitly creates a connection first. Both can control the same shared instance. An iframe showing an output URL is a view of that output, rather than a separate editable Player.

App SDK objects differ from composition scripting's `comp` / `context` and from a Graphics SDK Player. Use the reference for the runtime you are integrating.

Next: [Prepare your environment](prepare-your-environment.md).
