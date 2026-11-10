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

Do not assume every event contains a payload. Capture the target object when creating a form, clear pending edits when selection changes, and reject callbacks from an old form generation. See the complete [selection-safe form example](../subcomposition-fill-in-form.md).

Use create/destroy for this workflow. Legacy interfaces are listed in [Compatibility](../compatibility.md).

## Asset browser helpers

| URL helper | Selection callback registration |
| --- | --- |
| `getCompositionBrowserUrl()` | `compositionBrowserEventCallback(windowParent, callback)` |
| `getImageBrowserUrl()` | `imageBrowserEventCallback(windowParent, callback)` |
| `getAudioBrowserUrl()` | `audioBrowserEventCallback(windowParent, callback)` |

Use the URL in your browser window/iframe integration and register the corresponding selection callback on its parent window. The composition selection can be passed to `importComposition(selection, callback)`. Do not substitute a composition extract ID for that selection object. Register browser handlers once per UI lifetime; the v1 helpers do not provide a documented matching unregister API.

Image/audio selection payloads depend on the browser integration; inspect the returned selection before mapping it to a control ID. Do not invent a universal `{url: ...}` callback contract. Native form media-browser events and standalone browser callbacks are different entry points.

## createSingularForm parameters

| Argument | Value |
| --- | --- |
| `window` | Browser window hosting the form integration |
| `dom` | Existing DOM element with visible dimensions |
| `controlNode` | Selected node's `getControlNode()` result |
| `callback` | Receives form event messages; inspect `event` before reading event-specific fields |
| `options` | Integration options; the tutorial passes `{ refId: root.getRefId() }` |

The returned form handle controls the embedded editor. Its `setPayload(payload)` and `updatePayload(payload)` update the form UI; neither replaces the target composition's `setPayload(payload)` command. Destroy the handle before changing target.

The [native-form tutorial](../subcomposition-fill-in-form.md) includes runnable creation, callback handling, selection changes, and disposal. It also shows why a late callback must be checked against the target captured when the form was created.

## Handle event messages by type

A change callback has `event: "change"` and `payload` data. Button events identify `buttonId`. Media-browser events identify `payloadKey`. Handle these branches separately rather than treating every message as a payload to apply.

For example, inside a form callback:

```javascript
if (message.event === "change" && message.payload &&
    typeof message.payload === "object") {
  // Collect a draft for the captured target.
} else if (message.event === "button_clicked") {
  // Route message.buttonId to your app's chosen action.
}
```

Define custom button behavior in your app. The basic tutorial deliberately implements only field edits and Apply.

## Composition browser to import workflow

1. Obtain the URL with `getCompositionBrowserUrl()`.
2. Integrate that URL in the browser window/iframe used by your app.
3. Register `compositionBrowserEventCallback(windowParent, callback)` with the window containing that browser integration.
4. Pass the returned selection object unchanged to `importComposition(selection, callback)`.
5. Resolve returned extract IDs and assign the chosen object to an output.

Image and audio browsers use their corresponding URL/registration pairs. Their returned selection schema is integration-dependent; verify it before mapping the selected asset to a field. This reference does not supply a runnable universal popup or media-payload adapter. Register handlers once per UI lifetime because a matching unregister API is not established here.
