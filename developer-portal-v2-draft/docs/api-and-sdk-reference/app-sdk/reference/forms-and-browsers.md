# Forms and asset browsers

Use the native fill-in form when you need the UI for Singular control field types. A hand-built HTML form must implement the relevant types itself.

## Create and destroy a form

`app.createSingularForm(window, dom, controlNode, callback, options)` renders a form inside the supplied DOM container. Pass the object returned by the selected composition's `getControlNode()`. Give the container a visible size. `options.refId` can associate the form with a source composition reference.

The returned handle provides `destroy()`, `setPayload(payload)`, and `updatePayload(payload)`. Use `app.destroySingularForm(dom)` or the handle's `destroy()` before replacing a form or disposing the UI. The handle's payload methods update the form UI; explicitly call the target composition's `setPayload` to send an operator-approved draft to output.

| Callback event | Additional fields |
| --- | --- |
| `load` | Form loaded. |
| `change` | `payload`, `changedProperty`, `refId` |
| `button_clicked` | `buttonId`, `refId` |
| `imagebrowser_clicked`, `audiobrowser_clicked` | `payloadKey`, `refId` |

Do not assume every event contains a payload. Capture the target object when creating a form, clear pending edits when selection changes, and reject callbacks from an old form generation. See the complete [selection-safe form example](../examples/subcomposition-fill-in-form.md).

`renderSingularForm()` and `removeSingularForm()` are unsupported stubs in the inspected 1.0.0 library. Use create/destroy instead.

## Asset browser helpers

| URL helper | Selection callback registration |
| --- | --- |
| `getCompositionBrowserUrl()` | `compositionBrowserEventCallback(windowParent, callback)` |
| `getImageBrowserUrl()` | `imageBrowserEventCallback(windowParent, callback)` |
| `getAudioBrowserUrl()` | `audioBrowserEventCallback(windowParent, callback)` |

Use the URL in your browser window/iframe integration and register the corresponding selection callback on its parent window. The composition selection can be passed to `importComposition(selection, callback)`. Do not substitute a composition extract ID for that selection object. Register browser handlers once per UI lifetime; the v1 helpers do not provide a documented matching unregister API.

Image/audio selection payloads depend on the browser integration; inspect the returned selection before mapping it to a control ID. Do not invent a universal `{url: ...}` callback contract. Native form media-browser events and standalone browser callbacks are different entry points.
