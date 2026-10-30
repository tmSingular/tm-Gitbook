# Initialization order

The runtime initializes scripts in this order:

1. Overlay script.
2. Global script.
3. Sub-composition scripts, from deepest child toward parent.
4. Root script.

Widgets are loaded and initialized before their composition scripts run. Children can consume global helpers; root initialization can call functions exposed by child scripts.

Initialization is not a guarantee that every asynchronous asset, metric font, repeated template instance, or layout measurement is ready. Use the widget's documented messages and verify its actual rendered state.

Apply the first presentation explicitly in `init()` and handle later input changes. Reloading a preview to see a new value does not test reactive behavior in the same running instance.

- [Lifecycle](lifecycle.md)
- [How scripts communicate](how-scripts-communicate.md)
- [Verification](../debugging-verification-and-deployment/verification.md)
