# The script editor

Open the Composition Script editor from Composer's `</>` button above the property panel. It opens in a separate browser tab with code editing and a Player output preview.

Use the ambulance/safe-mode entry when a script prevents normal editing, such as an infinite loop. Repair the script before resuming normal execution.

## Workflow

1. Select the intended script type and owning root/sub-composition.
2. Inspect the navigator's model, payload, widget names, versions, and field IDs.
3. Read the existing script before editing and preserve its wrapper, signature, and unrelated behavior.
4. Save scripts, then check initialization and visible output.
5. Change inputs in the same running preview to verify reactive behavior.
6. Save the complete composition and test actual app output as required.

Reload composition brings structural edits made in Composer into the script editor; it is not a substitute for updating a managed Control App extract. After reload, recheck identities and target names.

The editor's syntax/error indicator is useful but does not establish absence of caught runtime errors, correct links, rendered appearance, or app delivery. See [Script editor reference](../script-editor-reference.md) and [Debugging](../debugging-verification-and-deployment/debugging.md).
