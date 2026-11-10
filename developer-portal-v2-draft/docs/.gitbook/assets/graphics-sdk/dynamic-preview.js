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
