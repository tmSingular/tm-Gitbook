# Lifecycle

Initialize owned state in `init()` and release resources in `close()`. A script that owns a stream, timer, interval, animation frame, or request needs a deliberate cleanup path.

Apply initial presentation during initialization; waiting only for a later event can leave the first output incomplete. Prevent late asynchronous callbacks from writing after the script has closed.

- [Initialization order](initialization-order.md)
- [Script types and signatures](script-types.md)
- [Connect to a data stream](../how-to-guides/connect-to-a-data-stream.md)
- [Verification](../debugging-verification-and-deployment/verification.md)
