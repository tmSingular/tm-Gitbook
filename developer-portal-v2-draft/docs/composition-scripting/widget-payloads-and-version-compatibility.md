# Widget payloads and version compatibility

A widget's payload is specific to its type and version. Inspect the widget in the script editor's Widget Explorer and use its field IDs and supported values.

1. Identify the widget name, type, and installed version.
2. Inspect its current payload and editable fields.
3. Check links and property ownership before writing.
4. Use layout methods for tile bounds rather than assuming payload fields change tile dimensions.
5. Verify the change in the supported Player environment before upgrading other compositions.

- [Script editor reference](script-editor-reference.md)
- [The widget object](api-reference/the-widget-object.md)
- [Set widget properties](how-to-guides/set-widget-properties.md)
- [Supported environments](../releases-and-compatibility/supported-environments.md)
