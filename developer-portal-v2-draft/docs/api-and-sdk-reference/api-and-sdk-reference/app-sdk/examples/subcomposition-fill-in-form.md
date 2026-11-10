# Subcomposition selection and native fill-in form

Build a selector for the composition root and its direct children, render the selected node's native form, and send changes only when the operator presses Apply. Then add cleanup that prevents an old form's draft from reaching a new selection.

<figure><img src="../../../../.gitbook/assets/appSDK-ex2-app-example.avif" alt=""><figcaption><p>Subcompositions and Fill-in Form</p></figcaption></figure>

{% file src="../../../../.gitbook/assets/app-sdk-native-form.zip" %}
Download the complete hosted app HTML.
{% endfile %}

## Before you begin

Complete [environment setup](../prepare-your-environment.md) and the [first hosted run](../getting-started.md). Assign a composition with editable controls to the test instance's `Default` output. For the selection checks, use two direct children with editable fields, labeled A and B here. A node without controls is useful for checking the empty state.

Work in `source/app.html`. The snippets explain sections of the complete source below; use that file for a runnable app. This is an App SDK form connected to the shared app instance. The [Graphics SDK dynamic-form example](../../graphics-sdk/local-preview-dynamic-form.md) controls a local Player.

## 1. Create space for selection and editing

Place these elements before the script:

```html
<label>Composition node <select id="target"></select></label>
<button id="apply" disabled>Apply to output</button>
<p id="status" role="status">Waiting for the hosted App SDK.</p>
<div id="form" style="height:480px"></div>
```

The form uses an iframe, so the container needs visible dimensions. Apply starts disabled until the selected form reports a change.

## 2. Initialize and find the root

The complete file declares a global `disposeCurrentApp` function and calls it at the start of `singularAppInit(app)`. This cleans up the previous UI before wiring a new one. Inside initialization, capture the four elements and create local state for the form handle, target, draft, generation counter, and last committed values.

Resolve the output and root:

```javascript
const output = app.getOutputByName("Default");
const main = output && output.getComposition();
if (!main) {
  status.textContent = "Assign a composition to Default first.";
  return;
}
```

**Check:** Missing output assignment produces the status message and leaves Apply disabled.

## 3. Populate the selector

After resolving `main`, create a map from IDs to objects and add the root and direct children:

```javascript
const targets = new Map([[main.id, main]]);
for (const item of main.listSubcompositions()) {
  const child = main.getSubcompositionById(item.id);
  if (child) targets.set(child.id, child);
}
for (const [id, node] of targets) {
  const option = document.createElement("option");
  option.value = id;
  option.textContent = node.name;
  select.appendChild(option);
}
```

IDs select the exact object while names label the UI. This example includes one level of children. Supporting deeper nesting requires explicit traversal and labels that distinguish repeated names.

**Check:** With the complete file deployed, the selector contains the root and its direct children.

## 4. Create a form for the selected target

The `chooseTarget()` function starts by clearing the previous form and draft. It resolves `targets.get(select.value)` and obtains that object's `getControlNode()`. If there is no control node/model, show the empty-state message and keep Apply disabled.

For a valid node, capture the target and its current payload, then create the form:

```javascript
target = chosen;
committed = Object.assign({}, controlNode.payload || {});
const ownGeneration = generation;
formHandle = app.createSingularForm(window, container, controlNode,
  function (event) {
    if (generation !== ownGeneration || target !== chosen) return;
    if (event.event === "change" && event.payload &&
        typeof event.payload === "object") {
      draft = Object.assign({}, draft || committed, event.payload);
      apply.disabled = false;
    }
  }, { refId: main.getRefId() });
```

`chosen` and `controlNode` are local variables in `chooseTarget()`. The form uses the selected node's model and payload. `refId` identifies the source composition. The callback collects only change events; load and button events are separate actions.

**Check:** Selecting an editable node displays its native form. Merely loading the form leaves Apply disabled.

## 5. Apply the draft

Assign the handler inside initialization:

```javascript
apply.onclick = function () {
  if (!target || !draft) return;
  target.setPayload(draft);
  committed = Object.assign({}, draft);
  draft = null;
  apply.disabled = true;
  status.textContent = "Payload sent; verify the output.";
};
```

Form editing updates a local draft. This button sends it to the selected composition object, remembers those values for subsequent edits, and clears the pending draft.

**Check:** Editing enables Apply without changing the output. Applying sends the values and disables the button until another edit.

## 6. Handle selection changes and late callbacks

Define `clearForm()` inside initialization:

```javascript
function clearForm() {
  generation++;
  apply.disabled = true;
  target = null;
  draft = null;
  if (formHandle) formHandle.destroy();
  formHandle = null;
}
```

Each selection calls this function before creating the next form. Switching nodes discards unsent edits. Destroying the old form removes its UI; incrementing `generation` also invalidates any delayed callback it may deliver.

The callback in step 4 captures `chosen` and `ownGeneration`. Both must still match before its payload can update the current draft. This is why A's delayed change cannot enable Apply or replace B's draft.

**Check:** Edit A, switch to B, and confirm Apply is disabled until B is edited. A's values must not appear in B's output payload.

## 7. Dispose and start the first selection

The complete source assigns `disposeCurrentApp` to clear the form and detach UI handlers. A new initialization calls that disposer; `beforeunload` also invokes it when leaving the page.

Finish initialization by assigning `select.onchange = chooseTarget` and calling `chooseTarget()` once to show the initially selected node.

## 8. Deploy and verify

Save the complete file, [deploy](../deployment-and-versioning.md), and open the development instance. Check the initial form, edit/apply behavior, selection changes, a node without controls, and reinitialization. Only one form should remain after replacing the UI.

To exercise the delayed-callback guard, use the repository's mock checks described in the maintainer report, or instrument a local test harness to retain A's callback and invoke it after selecting B. Normal manual selection checks do not establish that this timing case was tested.

The app does not synchronize other operators' changes, implement custom button actions, or handle standalone image/audio browser callbacks. See [shared data](../shared-data-and-events.md) and [forms and asset browsers](../reference/forms-and-browsers.md) before extending those features.

## Complete hosted source

Save this file as `source/app.html`. It is the same source included in the ZIP.

<details>

<summary>Complete app.html</summary>

```html
<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>App SDK: native form</title>
<label>Composition node <select id="target"></select></label>
<button id="apply" disabled>Apply to output</button>
<p id="status" role="status">Waiting for the hosted App SDK.</p>
<div id="form" style="height:480px"></div>
<script>
let disposeCurrentApp = function () {};
function singularAppInit(app) {
  disposeCurrentApp();
  const select = document.getElementById("target");
  const apply = document.getElementById("apply");
  const status = document.getElementById("status");
  const container = document.getElementById("form");
  let formHandle = null, target = null, draft = null, generation = 0;
  let committed = {};
  function clearForm() {
    generation++;
    apply.disabled = true;
    target = null;
    draft = null;
    if (formHandle) formHandle.destroy();
    formHandle = null;
  }
  disposeCurrentApp = function () {
    clearForm();
    select.onchange = apply.onclick = null;
  };
  select.replaceChildren();
  apply.onclick = null;
  apply.disabled = true;
  const output = app.getOutputByName("Default");
  const main = output && output.getComposition();
  if (!main) {
    status.textContent = "Assign a composition to Default first.";
    return;
  }
  // Root and direct children only. IDs are resolved on their parent.
  const targets = new Map([[main.id, main]]);
  for (const item of main.listSubcompositions()) {
    const child = main.getSubcompositionById(item.id);
    if (child) targets.set(child.id, child);
  }
  for (const [id, node] of targets) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = node.name;
    select.appendChild(option);
  }
  function chooseTarget() {
    clearForm();
    const chosen = targets.get(select.value);
    const controlNode = chosen && chosen.getControlNode();
    if (!controlNode || !controlNode.model) {
      status.textContent = "This node has no editable control node.";
      return;
    }
    target = chosen;
    committed = Object.assign({}, controlNode.payload || {});
    const ownGeneration = generation;
    formHandle = app.createSingularForm(window, container, controlNode,
      function (event) {
        if (generation !== ownGeneration || target !== chosen) return;
        if (event.event === "change" && event.payload &&
            typeof event.payload === "object") {
          draft = Object.assign({}, draft || committed, event.payload);
          apply.disabled = false;
        }
      }, { refId: main.getRefId() });
    status.textContent = "Edit fields, then Apply. Switching nodes discards pending edits.";
  }
  select.onchange = chooseTarget;
  apply.onclick = function () {
    if (!target || !draft) return;
    target.setPayload(draft);
    committed = Object.assign({}, draft);
    draft = null;
    apply.disabled = true;
    status.textContent = "Payload sent; verify the output.";
  };
  chooseTarget();
}
window.addEventListener("beforeunload", function () { disposeCurrentApp(); });
</script>
</html>
```

</details>

Next: [Working with shared data and events](../shared-data-and-events.md).
