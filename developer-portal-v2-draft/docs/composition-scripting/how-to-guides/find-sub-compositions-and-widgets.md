# Find sub-compositions and widgets

Use `comp.find()` to get a sub-composition by name, and `comp.findWidget()` to get a widget within a composition.

Both return arrays — use `[0]` to get the first (usually only) match.

```javascript
// Root Script
(function() {
  return {
    init: function(comp, context) {

      // Get a reference to the "Lower" sub-composition
      const compLower = comp.find("Lower")[0];
      console.log(compLower.name); // > "Lower"
      console.log(compLower.id);   // > "ceedfea8-..."

    },
    close: function(comp, context) {}
  };
})();
```

```javascript
// Lower Script
(function() {
  return {
    init: function(comp, context) {

      // Get references to widgets by name
      const wiLowerTitle    = comp.findWidget("lowerTitle")[0];
      const wiLowerSubtitle = comp.findWidget("lowerSubtitle")[0];
      const wiLowerLogo     = comp.findWidget("lowerLogo")[0];

      console.log(wiLowerTitle);
      console.log(wiLowerSubtitle);
      console.log(wiLowerLogo);

    },
    close: function(comp, context) {}
  };
})();
```
