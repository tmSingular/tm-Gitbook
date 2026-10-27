# Read and update control nodes

Control nodes are the operator-facing fields on a sub-composition. Read them with `getPayload2()` (returns a plain object) and write them with `setPayload()`.

```javascript
// Lower Script
(function() {
  return {
    init: function(comp, context) {

      // Read as a plain JSON object (preferred)
      const p = comp.getPayload2();
      console.log(p);
      // > { "Title": "Breaking News", "Subtitle": "...", "Station Logo": "https://..." }

      // Update control nodes
      comp.setPayload({
        "Title": "New Title",
        "Subtitle": "Line 1\nLine 2",
        "Station Logo": "https://example.com/logo.png"
      });

    },
    close: function(comp, context) {}
  };
})();
```

> `getPayload()` returns an array of `{ key, value }` pairs. `getPayload2()` returns a plain object and is almost always preferable.
