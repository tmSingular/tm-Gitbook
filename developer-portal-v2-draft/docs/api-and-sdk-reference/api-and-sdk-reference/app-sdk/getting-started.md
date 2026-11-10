# Build your first Control App

Deploy a hosted app that reads lower-third text, applies an edit on command, and plays In/Out animations. Complete [environment setup](prepare-your-environment.md), including the tutorial composition, first.

## 1. Add the complete application

Download the [lower-third example](examples/lower-third-app.md), extract its HTML, and save it as `mySingularApp/source/app.html`, replacing the generated boilerplate. The tutorial also shows the complete source inline.

This is a hosted application. Opening the HTML directly does not initialize the SDK. Its global `singularAppInit(app)` receives the connected application object from Singular when you open the deployed app.

The application follows this order:

1. Disable its command buttons while checking configuration.
2. Find `Default`, its assigned composition, and the direct child `Lower Third`.
3. Confirm the child has a text control with ID `Name`.
4. Read the current payload into the input without writing to the composition.
5. Connect Apply, In, and Out, then enable the buttons.

Apply sends the input's draft to the child with `setPayload`. In and Out call `playTo` separately. Initialization and typing leave the output unchanged.

## 2. Deploy the code

From the project folder's **parent directory**, run:

```sh
singular deployapp mySingularApp
```

Check the terminal for a successful upload. If it fails, verify the project path, `source/app.html`, and `deploykey.json`.

## 3. Open a development instance

In Dashboard, use the **New → Control App** workflow. In the App Browser, enable **Show Dev Versions**, choose your app, and create/open its development instance. If your account presents different labels, select the development version associated with the upload you just made.

Open that instance's output alongside the app so you can observe the graphics. The output and the UI must belong to the same test instance.

## 4. Verify the result

| Action          | Expected result                                                    |
| --------------- | ------------------------------------------------------------------ |
| Open the app    | Status reports ready; input reads the child's current `Name` value |
| Type a new name | Input changes; output keeps its existing text                      |
| Press Apply     | The child's `Name` payload changes; the bound text widget updates  |
| Press In        | The lower third plays its entrance animation                       |
| Press Out       | The lower third plays its exit animation                           |
| Reload the app  | Input reads the applied value without resetting the output         |

If a checkpoint fails, use [Troubleshooting](troubleshooting.md). For missing output, child, or control configuration, the complete app keeps its command buttons disabled and shows a status message.

Next: [Build the lower-third app step by step](examples/lower-third-app.md), or continue to the [native-form tutorial](examples/subcomposition-fill-in-form.md).
