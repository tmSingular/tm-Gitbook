# The composition object

The composition object (`comp`) is the primary way to navigate the composition tree, read and write content, and control animation.

## **Navigation**

| Method                                                              | Returns                        | Description                                        |
| ------------------------------------------------------------------- | ------------------------------ | -------------------------------------------------- |
| `comp.find(name)`                                                   | `Array` of composition objects | Find sub-compositions by name                      |
| `comp.findGroup(name)`                                              | `Array` of group objects       | Find groups by name                                |
| `comp.findWidget(name)` or `comp.findWidget(groupName, widgetName)` | `Array` of widget objects      | Find widgets by name, optionally scoped to a group |
| `comp.getSubcompositionById(id)`                                    | Composition object             | Find a sub-composition by its UUID                 |
| `comp.listSubcompositions()`                                        | `Array` of `{ id, name }`      | List all direct children                           |
| `comp.parent()`                                                     | Composition object             | Return the parent composition                      |
| `comp.id`                                                           | `string`                       | The composition's UUID                             |
| `comp.name`                                                         | `string`                       | The composition's name                             |

```javascript
// Find a sub-composition
const compLower = comp.find("Lower")[0];

// Find a widget anywhere in this composition
const wiTitle = comp.findWidget("lowerTitle")[0];

// Find a widget scoped to a specific group
const wiTeam1Name = comp.findWidget("Team1 Group", "teamName")[0];
const wiTeam2Name = comp.findWidget("Team2 Group", "teamName")[0];

// List all sub-compositions (useful for debugging)
console.log(comp.listSubcompositions());
// > [{ "id": "-NHTgDrKFKdlaexZeerp", "name": "Lower" }, ...]
```

## **Reading and writing control nodes**

Control nodes are the editable fields on a sub-composition (text, image URL, etc.).

| Method                    | Returns                     | Description                                             |
| ------------------------- | --------------------------- | ------------------------------------------------------- |
| `comp.getPayload()`       | `Array` of `{ key, value }` | Control node content as key-value pairs                 |
| `comp.getPayload2()`      | `Object`                    | Control node content as a plain JSON object (preferred) |
| `comp.setPayload(object)` | —                           | Update one or more control nodes                        |

```javascript
// Preferred: read as a plain object
const p = comp.getPayload2();
console.log(p);
// > { "Title": "Breaking News", "Subtitle": "Details here", "Station Logo": "https://..." }

// Write new values
comp.setPayload({
  "Title": "Updated Title",
  "Subtitle": "New subtitle line 1\nNew subtitle line 2",
  "Station Logo": "https://example.com/logo.png"
});
```

## **Animation control**

| Method              | Description                                                              |
| ------------------- | ------------------------------------------------------------------------ |
| `comp.getState()`   | Returns the current animation state: `"In"`, `"Out"`, `"Out1"`, `"Out2"` |
| `comp.jumpTo("In")` | Jump immediately to a state, no animation                                |
| `comp.playTo("In")` | Animate to a state                                                       |

```javascript
const state = comp.getState();
console.log(state); // > "In"

comp.playTo("Out");
```

