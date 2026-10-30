# Script editor reference

## Entry and modes

Composer's `</>` button opens normal scripting mode; the ambulance entry opens safe mode for recovering from faulty scripts. Both open a separate browser tab. The ordinary Composer canvas is not the script runtime.

## Menu and code editor

| Control | Purpose |
|---|---|
| Save all scripts | Evaluate/run and save the edited script set to the composition |
| Reload composition | Refresh structure/model from Composer |
| Beautify JavaScript | Reformat source |
| Script Library | Insert boilerplate for the chosen type |
| Developer resources | API/SDK and editor help |
| Editor settings | Font, tabs, wrapping, line numbers, theme |
| Interactive-zone toggle | Inspect configured interactive zones |
| Orientation / screen size | Preview representative output sizes |

The script selector can add an Overlay script, Global Script, root script, or one per sub-composition. Preserve the matching lifecycle signature. A syntax checkmark/OK indicator is not proof that all runtime branches executed successfully.

## Navigator

| Panel | Use |
|---|---|
| Composition control | Names/IDs, In/Out actions, fill-in inputs, model and payload JSON |
| Globals | Display/adaptation-related configuration |
| Widget Explorer | Widget names, tile IDs, loaded versions, editable field IDs/types |
| Overlay SDK simulator | Advanced video integration testing |

Inspect the correct composition before copying a name or ID. A public Control Node ID, model keyId, widget tile ID, widget catalog ID, and template edit-session ID have different purposes.

## Save and output boundaries

Use Reload after another author changes structure; inspect fresh targets before applying the script. Save scripts and the overall composition as required. Managed apps may use packaged extracts, so update the intended extract and test its output URL separately.

- [Editor workflow](getting-started/the-script-editor.md)
- [Debugging](debugging-verification-and-deployment/debugging.md)
- [Deployment](debugging-verification-and-deployment/deployment.md)
