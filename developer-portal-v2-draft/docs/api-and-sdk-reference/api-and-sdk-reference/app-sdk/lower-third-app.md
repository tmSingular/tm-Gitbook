# Lower-third Control App

Build an operator UI that reads the existing text, lets you edit a local draft, applies it on command, and animates the graphic independently. This tutorial explains the complete app used in [Getting started](getting-started.md).

<figure><img src="../../../.gitbook/assets/appSDK-ex1-app-example.avif" alt="Lower Third App"><figcaption><p>Lower Third App</p></figcaption></figure>

{% file src="../../../.gitbook/assets/app-sdk-lower-third.zip" %}
Download the complete hosted app HTML.
{% endfile %}

## Before you begin

Complete [environment setup](prepare-your-environment.md). The test instance needs output `Default`, an assigned composition, a direct child `Lower Third`, and a text control with ID `Name` bound to its text widget. Configure the child's entrance and exit animations.

Work in `source/app.html`. Follow the snippets below against the complete source at the end. Open the deployed output beside the UI for visual checks; this app does not embed a preview.

## 1. Create the operator UI

Inside the HTML body, add a text input, three disabled command buttons, and a status element:

```html
<label>Name <input id="name" value=""></label>
<button id="apply" disabled>Apply</button>
<button id="in" disabled>In</button>
<button id="out" disabled>Out</button>
<p id="status" role="status">Waiting for the hosted App SDK.</p>
```

Buttons start disabled because the target has not been validated. The input is the operator's draft; it has no automatic write handler.

**Check:** The page has a Name input and disabled buttons. Before initialization, the status says it is waiting.

## 2. Receive the application object

Add a global `function singularAppInit(app)` inside a script after the UI. The hosted runtime calls this function. At its start, capture the elements:

```javascript
const status = document.getElementById("status");
const input = document.getElementById("name");
const apply = document.getElementById("apply");
const inButton = document.getElementById("in");
const outButton = document.getElementById("out");
apply.disabled = inButton.disabled = outButton.disabled = true;
apply.onclick = inButton.onclick = outButton.onclick = null;
```

Clearing handlers and disabling buttons also makes another initialization replace the previous UI bindings. Do not add a local bootstrap to this hosted file.

## 3. Find and validate the lower third

Continue inside `singularAppInit`, after capturing the elements:

```javascript
const output = app.getOutputByName("Default");
const main = output && output.getComposition();
const child = main && main.getSubcompositionByName("Lower Third");
if (!child) {
  status.textContent = "Assign Default and add a Lower Third child.";
  return;
}
const model = child.getModel() || [];
if (!model.some(field => field.id === "Name" && field.type === "text")) {
  status.textContent = "Lower Third requires a text control with ID Name.";
  return;
}
```

Each lookup depends on the preceding object. `Lower Third` must be a direct child of the root. The model check uses the control ID and type, rather than its display title.

**Check:** In the deployed test instance, missing configuration produces the corresponding message and leaves all command buttons disabled. Restore the required configuration before continuing.

## 4. Read the current text

After validation, read the child's payload into the input:

```javascript
const payload = child.getPayload2() || {};
input.value = payload.Name == null ? "" : String(payload.Name);
```

This reads existing state without sending a command. The empty-object fallback handles absent data, and the null check preserves a meaningful value such as an empty string.

**Check:** Opening the app shows the existing `Name` value. Opening or reloading it does not replace the output text.

## 5. Apply the draft

Still inside initialization, assign the Apply handler:

```javascript
apply.onclick = function () {
  child.setPayload({ Name: input.value });
  status.textContent = "Payload sent; verify the output.";
};
```

The handler reads the current input when pressed and sends only the `Name` field. Typing alone has no effect on the composition. A command being sent does not establish that the output has finished rendering it.

**Check:** After completing step 6 and deploying, typing changes only the input. Apply updates the child's payload and its bound text widget.

## 6. Add animation and enable the UI

Finish initialization with:

```javascript
inButton.onclick = function () { child.playTo("In"); };
outButton.onclick = function () { child.playTo("Out"); };
apply.disabled = inButton.disabled = outButton.disabled = false;
status.textContent = "Ready. Apply changes the shared app composition.";
```

The animation commands target the same child and leave the draft untouched. The example uses In/Out behavior configured on the tutorial composition. See [animation methods](reference/composition.md#children-and-animation) for state details.

## 7. Deploy and verify

Save `source/app.html`, [deploy the development version](deployment-and-versioning.md), and open its development instance. Check: existing text loads; typing does not write; Apply updates text; In/Out animate; reload preserves the applied value. Reinitializing the UI should replace handlers rather than send a command twice.

The app reads the current payload on initialization. It does not subscribe to later changes from other operators. Add that behavior using [shared data and events](shared-data-and-events.md) and an explicit draft-conflict policy.

## Complete hosted source

Save this file as `source/app.html`. It is the same source included in the ZIP.

<details>

<summary>Complete app.html</summary>

```html
<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>App SDK: lower third</title>
<label>Name <input id="name" value=""></label>
<button id="apply" disabled>Apply</button>
<button id="in" disabled>In</button>
<button id="out" disabled>Out</button>
<p id="status" role="status">Waiting for the hosted App SDK.</p>
<script>
function singularAppInit(app) {
  const status = document.getElementById("status");
  const input = document.getElementById("name");
  const apply = document.getElementById("apply");
  const inButton = document.getElementById("in");
  const outButton = document.getElementById("out");
  apply.disabled = inButton.disabled = outButton.disabled = true;
  apply.onclick = inButton.onclick = outButton.onclick = null;
  const output = app.getOutputByName("Default");
  const main = output && output.getComposition();
  const child = main && main.getSubcompositionByName("Lower Third");
  if (!child) {
    status.textContent = "Assign Default and add a Lower Third child.";
    return;
  }
  const model = child.getModel() || [];
  if (!model.some(field => field.id === "Name" && field.type === "text")) {
    status.textContent = "Lower Third requires a text control with ID Name.";
    return;
  }
  const payload = child.getPayload2() || {};
  input.value = payload.Name == null ? "" : String(payload.Name);
  apply.onclick = function () {
    child.setPayload({ Name: input.value });
    status.textContent = "Payload sent; verify the output.";
  };
  inButton.onclick = function () { child.playTo("In"); };
  outButton.onclick = function () { child.playTo("Out"); };
  apply.disabled = inButton.disabled = outButton.disabled = false;
  status.textContent = "Ready. Apply changes the shared app composition.";
}
</script>
</html>
```

</details>

Next: [Subcomposition selection and native fill-in form](subcomposition-fill-in-form.md).
