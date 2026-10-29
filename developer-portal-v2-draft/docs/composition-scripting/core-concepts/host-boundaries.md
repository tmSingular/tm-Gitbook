# Host boundaries

Choose the API for the place where your code executes.

| Code location | Relevant interface |
|---|---|
| Root or sub-composition script | In-script composition object and widget/group objects |
| Global script | Global context and utilities |
| Host web page embedding a Player | Graphics SDK |
| Video integration | Overlay SDK |
| Custom widget implementation | Widget SDK |

Similar method names do not imply interchangeable objects or callback signatures. Widget access inside a composition script is not a promise that the host SDK exposes that same access.

- [Script types](script-types.md)
- [Scripting API reference](../api-reference/README.md)
- [API and SDK reference](../../api-and-sdk-reference/README.md)
