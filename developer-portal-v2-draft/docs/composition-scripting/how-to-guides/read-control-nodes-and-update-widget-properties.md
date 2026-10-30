# Read control nodes and update widget properties

Use standalone controls for inputs that must be combined, such as `Firstname` and `Lastname`, and leave the derived widget's `text` field unlinked.

For a one-time transformation inside `init(comp)`:

```javascript
const matches = comp.findWidget('Full name');
if (matches.length !== 1) throw new Error('Expected one Full name widget');
const payload = comp.getPayload2() || {};
const first = payload.Firstname == null ? '' : String(payload.Firstname);
const last = payload.Lastname == null ? '' : String(payload.Lastname);
matches[0].setPayload({ text: (first + ' ' + last.toUpperCase()).trim() });
```

This fragment only applies initial values. For operator or host changes after initialization, put the transformation into the update function in [the complete reactive pattern](react-to-control-node-changes.md).

Validate input types before operations such as `toUpperCase()`. For styled output, escape names before inserting HTML; see [Use HTML in text widgets](use-html-in-text-widgets.md).
