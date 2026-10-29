# The widget object

The widget object provides methods to read and update widget-specific properties, as well as transform and visibility controls.

## **Common properties and methods**

| Method / Property                            | Description                                         |
| -------------------------------------------- | --------------------------------------------------- |
| `widget.id`                                  | The widget's UUID                                   |
| `widget.getPayload()`                        | Returns widget-specific properties as a JSON object |
| `widget.setPayload(object)`                  | Sets one or more widget-specific properties         |
| `widget.getVisibility()`                     | Returns visibility as a boolean                     |
| `widget.setVisibility(bool)`                 | Shows or hides the widget                           |
| `widget.getPositionX()` / `getPositionY()`   | Returns position as a percentage                    |
| `widget.setPositionX(n)` / `setPositionY(n)` | Sets position as a percentage                       |
| `widget.getSizeX()` / `getSizeY()`           | Returns size as a percentage                        |
| `widget.setSizeX(n)` / `setSizeY(n)`         | Sets size as a percentage                           |
| `widget.getRotationZ()`                      | Returns rotation in degrees                         |
| `widget.setRotateZ(n)`                       | Sets rotation in degrees                            |
| `widget.getDomElement()`                     | Returns the underlying HTML DOM element             |

```javascript
const wiTitle = comp.findWidget("lowerTitle")[0];

// Read all properties
const props = wiTitle.getPayload();
console.log(props.text); // > "Current Title"

// Update a property
wiTitle.setPayload({ "text": "New Title" });

// Visibility, position, size
wiTitle.setVisibility(false);
wiTitle.setPositionX(25);
wiTitle.setPositionY(75);
wiTitle.setSizeX(50);
wiTitle.setSizeY(15);

// Rotate
wiTitle.setRotateZ(90);
```

## **Widget specific properties**

### **Text widget**

The `text` property accepts plain text or an HTML string wrapped in `<html>...</html>`:

```javascript
wiTitle.setPayload({ "text": "Plain text" });
wiTitle.setPayload({ "text": "<html>First Name <b>LAST NAME</b></html>" });
```

### **Image widget**

The `image` property takes a URL:

```javascript
const wiLogo = comp.findWidget("lowerLogo")[0];
wiLogo.setPayload({
  "image": "https://example.com/logo.png"
});
```

### **Table widget**

The `tableContent` property takes a JSON-stringified object with a `content` array:

```javascript
const wiTable = comp.findWidget("standingsTable")[0];

const tableData = [
  { "Position": 1, "Name": "The Winner",   "Points": 987 },
  { "Position": 2, "Name": "Silver medal", "Points": 876 },
  { "Position": 3, "Name": "Bronze medal", "Points": 765 }
];

// Important: the value must be JSON.stringify'd
wiTable.setPayload({
  "tableContent": JSON.stringify({ "content": tableData })
});
```
