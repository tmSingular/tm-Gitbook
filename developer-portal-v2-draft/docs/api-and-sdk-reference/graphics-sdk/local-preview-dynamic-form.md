# Local preview with a dynamic control form

Load an extracted composition into a local Player, inspect every nested composition’s model, edit supported input types, and send only changed fields. This standalone example replaces the CodePen iframe and external source link.

## Run the example

Download these three files into one directory and serve it over HTTP:

- [dynamic-preview.html](../../.gitbook/assets/graphics-sdk/dynamic-preview.html)
- [dynamic-preview.js](../../.gitbook/assets/graphics-sdk/dynamic-preview.js)
- [preview-fields.js](../../.gitbook/assets/graphics-sdk/preview-fields.js)

Open dynamic-preview.html. Enter an extracted JSON URL, or expand the Control App option and provide a matching API origin and REST token. Read app and load uses the app’s `compositionJson`; it does not load a continuously synchronized remote operator interface.

After loading, select root or any nested composition. Edit fields and click Send changed fields. In/Out target the selected node. Discard selected drafts explicitly replaces unsent edits with current SDK values.

## Behavior and ownership

The host uses `getModel()` and `getPayload2()` from the loaded SDK wrapper, so no second REST model request or mixed-host token assumption is needed. It recursively traverses `listSubcompositions()` and resolves each child by ID. Labels and option titles use textContent, not interpreted HTML.

Drafts are kept separately for each composition and field ID. A local payload event refreshes nondirty fields but preserves unsent editor values. Sending validates all changed editable fields before sending one patch; unchanged and unsupported fields are omitted. No remote REST write is made.

Loads are serialized by disabling the loading controls until the SDK callback completes. A generation guard and AbortController protect the REST read and teardown; they do not claim to cancel an SDK load. The load callback uses `result.success`, not the truthiness of the result object. Simple status text provides feedback without repeated console errors.

## Supported editors

| Type | Editor and conversion |
| --- | --- |
| text, textarea | String input; empty string remains empty |
| checkbox | Boolean checkbox |
| number | Finite complete decimal input with configured min/max; empty does not become zero |
| counter | Finite integer with bounds |
| normalizednumber | Raw input 0–100, independent of output low/high |
| selection with inline options | HTML option indices map back to the original typed IDs, including numeric IDs and empty strings |
| color with a string/RGBA current value | CSS color text, including rgba alpha; existing RGBA values display as rgba strings |
| datetime | Integer Unix milliseconds; no browser-local datetime conversion or current-time substitution |
| Structured/unsupported, hidden, or read-only fields | Hidden fields omitted; other unsupported/read-only fields shown as read-only values and never sent |

Color strings accepted by the browser editor are a subset of the SDK’s broader color parser. Structured gradients are not coerced into a solid editor. URL-backed Selection options without resolved inline choices remain read-only. Table, JSON objects, Location, fonts, native Timer, Time Control, and buttons require dedicated editors and are intentionally not treated as generic strings.

The sample preserves semantic color/Selection values, not necessarily their original serialized representation. It does not apply a timezone interpretation to dates. Model field IDs are the outgoing payload keys; titles are only labels.

For a hosted operator UI requiring native complex-control editors, use the local [App SDK form reference](../app-sdk/reference/forms-and-browsers.md). That is a different environment from this standalone Graphics SDK preview.

## Complete HTML

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Graphics SDK — dynamic local preview</title>
  <script src="https://app.singular.live/libs/singulargraphics/1.0.0/singulargraphics.js"></script>
  <script src="preview-fields.js"></script>
  <style>
    body { font: 15px system-ui, sans-serif; margin: 24px; color: #172333; }
    main { display: grid; grid-template-columns: minmax(280px, 360px) minmax(0, 1fr); gap: 24px; }
    label { display: block; margin: 12px 0; }
    input:not([type=checkbox]), textarea, select { display: block; width: 100%; box-sizing: border-box; padding: 7px; }
    button { margin: 5px 5px 5px 0; padding: 7px 12px; }
    iframe { width: 100%; height: 65vh; border: 1px solid #ccd4df; }
    pre { white-space: pre-wrap; overflow-wrap: anywhere; background: #f3f5f8; padding: 8px; }
    @media(max-width: 760px) { main { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <h1>Local graphic preview</h1>
  <main>
    <section>
      <label>Composition JSON URL <input id="compositionUrl" type="url"></label>
      <button id="loadUrl" type="button">Load URL</button>
      <details><summary>Read the composition URL from a Control App</summary>
        <label>API origin <input id="apiOrigin" type="url" value="https://app.singular.live"></label>
        <label>Control App REST token <input id="appToken" type="password" autocomplete="off"></label>
        <button id="loadApp" type="button">Read app and load</button>
      </details>
      <p id="status" role="status">Choose a source.</p>
      <label>Composition <select id="composition" disabled></select></label>
      <div id="fields"></div>
      <button id="send" type="button" disabled>Send changed fields</button>
      <button id="refresh" type="button" disabled>Discard selected drafts</button>
      <button id="in" type="button" disabled>In</button>
      <button id="out" type="button" disabled>Out</button>
    </section>
    <section><iframe id="SingularOverlay" title="Local preview"
      src="https://app.singular.live/singularplayer/client?interactive=1"></iframe></section>
  </main>
  <script src="dynamic-preview.js"></script>
</body>
</html>
```

## Host controller

```javascript
(function() {
  const graphics = SingularGraphics("SingularOverlay");
  const fieldTools = GraphicsPreviewFields;
  const elSelect = document.getElementById("composition");
  const elFields = document.getElementById("fields");
  const elStatus = document.getElementById("status");
  const elLoadUrl = document.getElementById("loadUrl");
  const elLoadApp = document.getElementById("loadApp");
  const drafts = new Map();
  const compNodes = new Map();
  let compSelected = null;
  let loading = false;
  let closed = false;
  let generation = 0;
  let request = null;
  let editors = [];

  function setLoading(value) {
    loading = value;
    elLoadUrl.disabled = elLoadApp.disabled = value;
    elSelect.disabled = value || !compSelected;
    ["send", "refresh", "in", "out"].forEach(function(id) {
      document.getElementById(id).disabled = value || !compSelected;
    });
  }

  function draftFor(compId) {
    if (!drafts.has(compId)) drafts.set(compId, new Map());
    return drafts.get(compId);
  }

  function renderFields() {
    elFields.replaceChildren();
    editors = [];
    const payload = compSelected.getPayload2() || {};
    const pending = draftFor(compSelected.id);
    const fields = compSelected.getModel().slice().sort(function(a, b) { return (a.index || 0) - (b.index || 0); });
    fields.forEach(function(field) {
      if (field.hidden) return;
      const label = document.createElement("label");
      label.textContent = (field.title || field.id) + " (" + field.type + ")";
      elFields.appendChild(label);
      const value = payload[field.id];
      if (!fieldTools.editable(field, value)) {
        const readout = document.createElement("pre");
        readout.textContent = JSON.stringify(value, null, 2) || "No value";
        label.appendChild(readout);
        return;
      }
      const input = document.createElement(field.type === "textarea" ? "textarea" : field.type === "selection" ? "select" : "input");
      if (field.type === "selection") fieldTools.choices(field).forEach(function(option, index) {
        const elOption = document.createElement("option");
        elOption.value = String(index);
        elOption.textContent = option.title == null ? String(option.id) : String(option.title);
        input.appendChild(elOption);
      });
      if (input.tagName === "INPUT") input.type = field.type === "checkbox" ? "checkbox" :
        ["number", "counter", "normalizednumber", "datetime"].indexOf(field.type) !== -1 ? "number" : "text";
      if (input.type === "number") {
        const range = fieldTools.limits(field);
        if (range.min != null) input.min = String(range.min);
        if (range.max != null) input.max = String(range.max);
        input.step = field.type === "counter" || field.type === "datetime" ? "1" : "any";
      }
      if (field.type === "datetime") input.setAttribute("aria-label", (field.title || field.id) + " — Unix milliseconds");
      const initial = pending.has(field.id) ? pending.get(field.id) : fieldTools.display(field, value);
      if (field.type === "checkbox") input.checked = initial;
      else input.value = String(initial);
      input.addEventListener("input", function() {
        pending.set(field.id, field.type === "checkbox" ? input.checked : input.value);
        elStatus.textContent = "Unsent edits are preserved until Send or Discard.";
      });
      label.appendChild(input);
      editors.push({ field: field, input: input });
    });
  }

  function collectCompositions(compCurrent, prefix) {
    const name = prefix || "Root";
    compNodes.set(compCurrent.id, compCurrent);
    const option = document.createElement("option");
    option.value = compCurrent.id;
    option.textContent = name;
    elSelect.appendChild(option);
    compCurrent.listSubcompositions().forEach(function(child) {
      collectCompositions(compCurrent.getCompositionById(child.id), name + " / " + child.name);
    });
  }

  function loadComposition(compositionUrl, ownGeneration) {
    if (closed || ownGeneration !== generation) return;
    graphics.loadComposition(compositionUrl, function(result) {
      if (closed || ownGeneration !== generation) return;
      if (result.success) {
        drafts.clear();
        compNodes.clear();
        elSelect.replaceChildren();
        compSelected = graphics.getMainComposition();
        collectCompositions(compSelected, "Root");
        elSelect.value = compSelected.id;
        renderFields();
        elStatus.textContent = "Loaded local preview. Changes go to this iframe.";
      } else elStatus.textContent = "Composition did not load.";
      setLoading(false);
    });
  }

  function beginLoad() {
    generation += 1;
    if (request) request.abort();
    request = null;
    setLoading(true);
    return generation;
  }

  elLoadUrl.addEventListener("click", function() {
    if (loading) return;
    const url = document.getElementById("compositionUrl").value.trim();
    if (!url) return;
    loadComposition(url, beginLoad());
  });

  elLoadApp.addEventListener("click", function() {
    if (loading) return;
    const origin = document.getElementById("apiOrigin").value.replace(/\/$/, "");
    const token = document.getElementById("appToken").value.trim();
    if (!origin || !token) return;
    const ownGeneration = beginLoad();
    request = new AbortController();
    elStatus.textContent = "Reading the app’s extracted composition URL…";
    function unavailable() {
      if (closed || ownGeneration !== generation) return;
      elStatus.textContent = "App details are unavailable; check origin, access, and the request response.";
      setLoading(false);
    }
    fetch(origin + "/apiv2/controlapps/" + encodeURIComponent(token), { signal: request.signal })
      .then(function(response) {
        if (!response.ok) { unavailable(); return null; }
        return response.json();
      }, unavailable)
      .then(function(details) {
        if (closed || ownGeneration !== generation || !details) return;
        if (!details.compositionJson) { unavailable(); return; }
        document.getElementById("compositionUrl").value = details.compositionJson;
        loadComposition(details.compositionJson, ownGeneration);
      }, unavailable);
  });

  elSelect.addEventListener("change", function() {
    compSelected = compNodes.get(elSelect.value);
    renderFields();
  });

  document.getElementById("send").addEventListener("click", function() {
    const pending = draftFor(compSelected.id);
    const patch = {};
    for (const editor of editors) {
      if (!pending.has(editor.field.id)) continue;
      const value = fieldTools.read(editor.field, pending.get(editor.field.id), function(color) { return CSS.supports("color", color); });
      if (!value.valid) { elStatus.textContent = (editor.field.title || editor.field.id) + ": " + value.reason; return; }
      patch[editor.field.id] = value.value;
    }
    if (!Object.keys(patch).length) return;
    compSelected.setPayload(patch);
    pending.clear();
    elStatus.textContent = "Changed fields sent to the local preview.";
  });
  document.getElementById("refresh").addEventListener("click", function() { draftFor(compSelected.id).clear(); renderFields(); });
  document.getElementById("in").addEventListener("click", function() { compSelected.playTo("In"); });
  document.getElementById("out").addEventListener("click", function() { compSelected.playTo("Out"); });

  function onPayloadChanged(event, message) {
    if (closed || loading || event !== "payload_changed" || !compSelected || !message || message.compId !== compSelected.id) return;
    renderFields();
  }
  graphics.addListener("payload_changed", onPayloadChanged);
  window.addEventListener("pagehide", function() {
    closed = true;
    generation += 1;
    if (request) request.abort();
    graphics.removeListener("payload_changed", onPayloadChanged);
  });
})();
```

## Field conversion helpers

```javascript
(function(root) {
  function numeric(text) {
    if (!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(String(text).trim())) return NaN;
    return Number(text);
  }

  function limits(field) {
    if (field.type === "normalizednumber") return { min: 0, max: 100 };
    return { min: field.min, max: field.max };
  }

  function choices(field) {
    return Array.isArray(field.selections) ? field.selections :
      Array.isArray(field.options) ? field.options : [];
  }

  function editable(field, current) {
    if (field.hidden || field.readOnly || field.readonly) return false;
    if (field.type === "selection") return choices(field).length > 0;
    if (field.type === "color") return typeof current === "string" ||
      Boolean(current && typeof current.r === "number" && typeof current.g === "number" && typeof current.b === "number");
    return ["text", "textarea", "number", "counter", "normalizednumber", "checkbox", "datetime"].indexOf(field.type) !== -1;
  }

  function display(field, current) {
    if (field.type === "color" && current && typeof current === "object") {
      const alpha = current.a == null ? 1 : current.a;
      return "rgba(" + current.r + ", " + current.g + ", " + current.b + ", " + alpha + ")";
    }
    if (field.type === "selection") {
      return choices(field).findIndex(function(option) { return option.id === current; });
    }
    if (field.type === "checkbox") return current === true;
    return current == null ? "" : String(current);
  }

  function read(field, raw, supportsColor) {
    if (field.type === "checkbox") return { valid: true, value: Boolean(raw) };
    if (field.type === "selection") {
      const index = Number(raw);
      const options = choices(field);
      if (!Number.isInteger(index) || index < 0 || index >= options.length) return { valid: false, reason: "Choose an available option." };
      return { valid: true, value: options[index].id };
    }
    if (["number", "counter", "normalizednumber", "datetime"].indexOf(field.type) !== -1) {
      const value = numeric(raw);
      if (!Number.isFinite(value)) return { valid: false, reason: "Enter a finite decimal number; an empty field is not zero." };
      if ((field.type === "counter" || field.type === "datetime") && !Number.isInteger(value)) return { valid: false, reason: "Enter an integer." };
      const range = limits(field);
      if (range.min != null && value < Number(range.min) || range.max != null && value > Number(range.max)) return { valid: false, reason: "Value is outside the input range." };
      return { valid: true, value: value };
    }
    if (field.type === "color") {
      if (!supportsColor(String(raw))) return { valid: false, reason: "Use a browser-supported CSS color, including rgba() for alpha." };
      return { valid: true, value: String(raw) };
    }
    return { valid: true, value: String(raw) };
  }

  const api = { numeric: numeric, limits: limits, choices: choices, editable: editable, display: display, read: read };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.GraphicsPreviewFields = api;
})(typeof window !== "undefined" ? window : this);
```

## Verify the behavior

Use a test composition with nested children and supported fields. Check text/checkbox updates, numeric zero, rejected empty numbers, Normalized Number 0/100, numeric and empty Selection IDs, color alpha, explicit date timestamps, and read-only structured fields. Change a local Player payload while a form field has unsent edits and confirm the draft survives. Send one changed field and verify unrelated fields remain unchanged.

Test the actual API origin/token combination and output separately. A successful REST read or SDK cache change is not proof of rendered appearance or remote Control App synchronization. No live authenticated app acceptance is claimed for this documentation update.
