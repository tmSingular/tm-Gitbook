# Host boundaries

| Execution surface | Available contract |
|---|---|
| Normal Composer canvas | Graphic authoring/model; does not install composition scripts |
| Composition Script editor preview | Player runtime for script execution and testing |
| Root/sub-composition script inside Player | In-script `comp`, widget/group methods, context |
| Global script | Shared runtime context |
| Overlay script | Graphics SDK and optional Overlay SDK arguments |
| Host page using Player SDK | Public composition-input/message/state surface |
| Control App and output URL | Delivered app/extract behavior; verify separately |

The host Player SDK composition object supports its documented composition controls; it does not expose `findWidget()` or direct widget payload writes. External inputs reach public Control Nodes, then links or composition scripts apply presentation.

| Listener location | Callback |
|---|---|
| In-script composition listener | `(event, msg, propagationEvent)` |
| Host Player SDK listener | `(event, msg)` |

Neither a private Player capture nor a successful host `setPayload()` proves the Control App's form changed or its actual output received the same delivery. A managed app may render an older packaged composition extract until that extract is updated.

- [API reference](../api-reference/README.md)
- [Verification](../debugging-verification-and-deployment/verification.md)
- [Deployment](../debugging-verification-and-deployment/deployment.md)
