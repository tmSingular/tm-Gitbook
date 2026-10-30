# Scope

Keep input handling and presentation local unless cross-composition coordination is intentional. A root script may find descendants, but a widget/group lookup on root does not search inside those descendants.

1. Resolve the owning composition.
2. Resolve its widget or group.
3. Require the intended number of matches.
4. Check field ownership before writing.

Names used in `find`, `findWidget`, or `findGroup`, and field IDs addressed in payloads, are dependencies. Preserve contract-required names and public IDs. An unused group name is not automatically a runtime dependency.

For repeated Table/Grid templates, author the template relationship in Composer. Do not guess or persist a session-scoped template edit ID. Verify the rendered owner rather than treating a template editor identity as a standalone output.

- [Object lookups](../how-to-guides/find-sub-compositions-and-widgets.md)
- [Composition API](../api-reference/the-composition-object.md)
- [Table and Grid payloads](../api-reference/widget-payloads/table-and-grid.md)
