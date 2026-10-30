# Local preview with a dynamic control form

Load a Control App's composition into an embedded Singular Player, generate HTML inputs from its control model, and try payload changes and In/Out animations in the local preview. This example is useful for exploring a composition's fields or building a preview tool outside a hosted Control App.

## Interactive preview

{% @iframe-embed/iframe-embed url="https://es-d-29450230820261101-01a085b3-1482-72b9-9c80-3ff0f81307a2.codepen.dev/" width="100%" height="900" aspectRatio="" borderWidth="1" borderColor="#cccccc" %}

[Open the preview in a new tab](https://es-d-29450230820261101-01a085b3-1482-72b9-9c80-3ff0f81307a2.codepen.dev/).

## Code example

[View and edit the code example on CodePen](https://codepen.io/editor/Singular/pen/01a085b3-1482-72b9-9c80-3ff0f81307a2).

The example uses Graphics SDK 1.0.0, REST reads, and plain browser JavaScript. It does not use the App SDK or Firebase.

## Prerequisites and running

Use a test Control App with an extracted composition, readable model, and an app token you are authorized to use. The sample's input label is **App Token**; it expects a Control App REST token, not a deployment key or virtual app key. Use a modern browser with network access to CodePen, the SDK, Player, and API services.

In the preview above, enter your test app token and click **Load Composition**. Select the root or a direct child, edit visible fields, and click **Send to Preview**. Use In and Out to test the selected node's animation. You can also open the preview in a separate tab for more space. API authentication and CORS still apply when running on CodePen.

## How it works

| Step       | API / operation                                                 | Effect                                               |
| ---------- | --------------------------------------------------------------- | ---------------------------------------------------- |
| Connect    | `SingularGraphics("SingularOverlay")`                           | Connects to the page's Player iframe.                |
| Read app   | `GET https://app.overlays.uno/apiv2/controlapps/{token}`        | Reads app details and its `compositionJson` URL.     |
| Load       | `overlay.loadComposition(compositionJson, callback)`            | Loads that extracted composition into the iframe.    |
| Initialize | `overlay.getMainComposition()`; direct children `jumpTo("Out")` | Initializes local preview state.                     |
| Read model | `GET https://app.singular.live/apiv2/controlapps/{token}/model` | Fetches control field metadata.                      |
| Select     | `main.getCompositionById(id)`                                   | Resolves the selected Graphics SDK node.             |
| Edit       | `selectedComp.setPayload(payload)`                              | Writes to the embedded Player.                       |
| Animate    | `selectedComp.playTo("In" / "Out")`                             | Animates the selected local node.                    |
| Refresh    | `payload_changed`, filtered by `compId`                         | Refreshes visible inputs from local Player payloads. |

The two REST requests are reads. Send to Preview and animation buttons control the iframe, not the remote Control App through REST. The loaded extraction is not a promise of continuous synchronization with later remote app changes. Use [REST](../rest/) for remote Control App writes or the [App SDK](../app-sdk/) for a hosted shared operator UI.

The original uses different hosts for the two REST requests. Confirm that your token and service environment work with **both** hosts; adapt both endpoints consistently for your supported environment. The example does not establish cross-host token compatibility.

## Model and payload mapping

The model index maps composition IDs to field descriptors. For an array response it starts at the first root, then recursively indexes `subcompositions`. The UI selector includes the root and its direct children only. If REST metadata is absent for a node, it tries `getControlNode().model.fields` from the loaded preview.

Field inputs use `field.id` (falling back to its title). Prefer explicit IDs when adapting the example: a display title is not guaranteed to be a payload key. Fields marked `hidden: true` do not get inputs and are omitted from sends. Display labels use `textContent`.

| Field type                              | Sample input / conversion                                                               |
| --------------------------------------- | --------------------------------------------------------------------------------------- |
| `checkbox`                              | Checkbox; Boolean value.                                                                |
| `text`, `textarea`                      | Text input or multiline textarea.                                                       |
| `number`, `counter`, `normalizednumber` | Number input; parsed numeric value.                                                     |
| `selection`                             | Select element populated from `selections` or `options`; option IDs are used as values. |
| `color`                                 | Native RGB color picker; outgoing value is a hex string.                                |
| `datetime`                              | Local datetime input; outgoing value is epoch milliseconds.                             |
| Other types                             | Plain text fallback; structured values need a dedicated editor.                         |

## Known limitations of this original example

* **Normalized numbers:** the sample uses model `low` / `high` as input limits, but these describe the mapped range; normalized payload values use 0–100. Correct the editor's limits and mapping before relying on it for these fields. See [Normalized numbers](../../../composition-scripting/composition-scripting/api-reference/normalized-numbers.md).
* **Numeric validation:** an empty field becomes zero; invalid numeric input can produce `NaN`. Validate finite numbers, ranges, and integer requirements before sending.
* **Structured controls:** timer, time control, table, font, button actions, and other structured types are not fully implemented. JSON shown in a fallback text input is not parsed back into its original object shape.
* **Color and date fidelity:** the color picker cannot preserve alpha; arbitrary incoming color strings may not map cleanly. Datetimes use the browser's timezone, and an empty date becomes the current time when sent.
* **Drafts and concurrency:** a local payload event can overwrite unsent form edits. Repeated loads can race because there is no request cancellation or load-generation guard. Wait for a load to finish before starting another.
* **Coverage:** only one root and direct children are selectable; deeply nested nodes need recursive selection. The form sends all visible fields, rather than only changed fields.

For complete Singular field editors in a hosted app, prefer the [native App SDK form](../app-sdk/reference/forms-and-browsers.md).

## Check the behavior

Start with text and checkbox controls on a test composition. Confirm loading succeeds, selecting a child rebuilds its fields, Send to Preview changes the iframe, and In/Out animate only the selected preview node. Compare the remote app separately: this sample sends no REST update requests. Inspect the browser console and Network tab if either GET fails; check token access, endpoint host, model response shape, and Player load errors without sharing the token in logs or screenshots.
