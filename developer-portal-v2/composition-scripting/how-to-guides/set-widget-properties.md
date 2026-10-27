# Set widget properties

## Text widget properties

```javascript
// Lower Script
(function() {
  return {
    init: function(comp, context) {

      const wiTitle    = comp.findWidget("lowerTitle")[0];
      const wiSubtitle = comp.findWidget("lowerSubtitle")[0];

      // Single-line text
      wiTitle.setPayload({ "text": "This is the new title" });

      // Multi-line text — use \n for line breaks
      wiSubtitle.setPayload({ "text": "Line 1\nLine 2" });

      // HTML-styled text — wrap in <html> tags
      wiTitle.setPayload({ "text": "<html>First <b>LAST</b></html>" });

    },
    close: function(comp, context) {}
  };
})();
```

## Image widget properties

```javascript
// Lower Script
(function() {
  return {
    init: function(comp, context) {

      const wiLogo = comp.findWidget("lowerLogo")[0];

      // Read the current image URL
      const currentUrl = wiLogo.getPayload().image;
      console.log(currentUrl);

      // Set a new image URL
      wiLogo.setPayload({
        "image": "https://example.com/new-logo.png"
      });

    },
    close: function(comp, context) {}
  };
})();
```

## **Table widget** properties

The table widget's `tableContent` property must be a **JSON-stringified** object containing a `content` array. Each item in the array is one row.

```javascript
// Standings Script
(function() {
  return {
    init: function(comp, context) {

      const wiTable = comp.findWidget("standingsTable")[0];

      const tableData = [
        { "Position": 1, "Name": "The Winner",   "Points": 987 },
        { "Position": 2, "Name": "Silver Medal",  "Points": 876 },
        { "Position": 3, "Name": "Bronze Medal",  "Points": 765 },
        { "Position": 4, "Name": "4th Place",     "Points": 654 },
        { "Position": 5, "Name": "5th Place",     "Points": 543 }
      ];

      // Must be JSON.stringify'd
      wiTable.setPayload({
        "tableContent": JSON.stringify({ "content": tableData })
      });

    },
    close: function(comp, context) {}
  };
})();
```

