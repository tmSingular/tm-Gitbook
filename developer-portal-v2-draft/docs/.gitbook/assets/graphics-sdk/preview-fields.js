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
