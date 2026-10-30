# Subcomposition selection and native fill-in form

Render a native Singular form for the root or one of its direct children, collect a local draft, and apply it to the selected node only on command. This is an App SDK example; the [Graphics SDK dynamic form](../../graphics-sdk/examples/local-preview-dynamic-form.md) uses a different runtime and edits a local Player.

{% file src="../../../.gitbook/assets/app-sdk-native-form.html" %}
Download the complete hosted app HTML.
{% endfile %}

## Run it

Assign a composition with editable controls to the test app's `Default` output. Save the download as `source/app.html`, [deploy](../deployment-and-versioning.md), and open the development instance. Select a node, edit its native form, and press Apply to output. The form container has an explicit height so its iframe is visible.

## Selection and draft lifecycle

Each selection destroys the previous form, clears pending data, and increments a generation counter. The callback captures both the selected object and its generation. A late callback from an old selection cannot enable Apply or overwrite the new target's draft. Only `change` events with an object payload contribute to a draft; `load` and button events are not treated as payload edits.

Apply sends the draft to the captured target using `setPayload`. It does not auto-save while typing. Switching nodes discards pending edits. The app's disposer destroys the current form on reinitialization and page exit.

## Verify before adapting

1. Edit child A, select child B without applying, then press Apply: A's draft must not be sent to B.
2. Deliver an old form callback after changing the selection: Apply must remain disabled until B is edited.
3. Select a node without a control node: show a clear message and leave Apply disabled.
4. Reinitialize the app: only one native form should remain.
5. Open another UI against the same test instance and observe that Apply changes shared output state.

The example includes root and direct children only, does not synchronize drafts between operators, and does not implement custom button actions or standalone image/audio browser callbacks. Define those policies before extending it to a full operator application. See [Forms and asset browsers](../reference/forms-and-browsers.md).
