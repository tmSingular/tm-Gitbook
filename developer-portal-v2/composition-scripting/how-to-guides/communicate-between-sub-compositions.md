# Communicate between sub-compositions

The recommended pattern is to add a custom function to the receiving sub-composition's `comp` object. The root script then calls that function to pass data.

```javascript
// Lower Script — exposes an updateContent() function
(function() {
  return {
    init: function(comp, context) {

      const wiFullname = comp.findWidget("lowerFullname")[0];

      // Extend the composition object with a custom function
      comp.updateContent = function(data) {
        wiFullname.setPayload({
          "text": `${data["Firstname"]} ${data["Lastname"].toUpperCase()}`
        });
      };

    },
    close: function(comp, context) {}
  };
})();
```

```javascript
// Root Script — calls updateContent() on the Lower sub-composition
(function() {
  return {
    init: function(comp, context) {

      const compLower = comp.find("Lower")[0];

      comp.addListener('payload_changed', (event, msg, e) => {
        const payload = comp.getPayload2();
        compLower.updateContent(payload);
        e.stopPropagation();
      });

    },
    close: function(comp, context) {}
  };
})();
```

***

####
