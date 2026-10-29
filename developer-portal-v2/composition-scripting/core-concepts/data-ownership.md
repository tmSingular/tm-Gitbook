# Data ownership

Give each destination property one writer.

| Input or behavior | Preferred approach |
|---|---|
| A direct operator-input to widget mapping | Native Control Node link |
| Input requiring formatting, interpretation, or fan-out | A script reads the input and writes the intended unlinked destinations |
| Data fetched or received from a feed | A script writes feed-owned widget content directly |
| Native Timeline or Update animation | Let the native animation own its affected properties |

Do not assume that a value written inside the output updates the Control App's operator UI. Confirm the required host behavior separately.

- [Read control nodes and update widget properties](../how-to-guides/read-control-nodes-and-update-widget-properties.md)
- [React to control node changes](../how-to-guides/react-to-control-node-changes.md)
- [Host boundaries](host-boundaries.md)
