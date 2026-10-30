# Widget payloads and version compatibility

Inspect the actual widget name, ID/type, loaded version, editable fields, and current payload before scripting. Bundled references describe reusable contracts; a newer or older loaded schema can differ.

1. Select the appropriate [widget payload reference](api-reference/widget-payloads/README.md).
2. Preserve its complete font, metrics, template relationship, and unrelated fields.
3. Confirm the destination is unlinked and has no competing script/native motion writer.
4. Send the smallest intended content patch using exact field IDs and inspected value types.
5. Test initialization, later updates, clearing, resize, and relevant animation in the intended Player.

Live inspected schema is authoritative when it differs from an unversioned reference. An observed renderer fallback is not a promised catalog default. If a payload reference is missing, inspect supported fields rather than guessing them.

Text and Metric Text differ in font objects, line/overflow controls, spacing units, HTML, and bounds. Table/Grid depend on template controls and instance readiness. HTML replacement can reset playback. Ticker clearing and completion are time-dependent. Choose the appropriate contract rather than applying a generic widget recipe.

Record loaded versions with verification results. A successful getter/cache fixture is not evidence of event ordering, final rendered geometry, or actual Control App synchronization.
