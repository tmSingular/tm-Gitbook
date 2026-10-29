# Debugging

When a scripted change is missing, check the execution path before changing the design.

1. Confirm that the script initializes in the intended preview or Player.
2. Confirm that the expected event or callback runs.
3. Check target lookup results, input types, and property ownership.
4. Inspect a simple visible value before diagnosing a subtle transform.
5. Check for stale saved content or a managed extract that needs updating.

Use safe mode when a faulty script prevents normal editing. See the [script editor reference](../script-editor-reference.md) and [Chrome DevTools guide](../how-to-guides/debugging-with-chrome-devtools.md). Do not log private credentials or entire sensitive payloads.
