# Troubleshooting

Use the test instance and output from [Getting started](getting-started.md). Check browser developer tools and the CLI's terminal output alongside the UI status message.

## Initialization never runs

**Check:** Did you open the deployed hosted app or an HTML file directly? Does the page define a global `singularAppInit(app)`? Look for JavaScript errors before that function can be defined.

**Fix:** Open the development instance for the hosted examples. For local HTML, complete the [local bootstrap](hosted-and-local-development.md), verify dependency loading and connection values, and inspect authentication/network errors.

## Deployment succeeds but old code appears

**Check:** Does `deploykey.json` target the intended app? Is the browser showing that app's development version or an older published instance? Does the deployed `source/app.html` contain your saved edit?

**Fix:** Open the intended development version using Show Dev Versions, reload the UI, and verify the instance's version. Publication and updating existing instances are separate steps; see [versioning](deployment-and-versioning.md).

## The app is missing from the App Browser

**Check:** Did the upload succeed? Are you in the correct account with developer access and Show Dev Versions enabled?

**Fix:** Confirm the deployment key and app registration in App Manager. Enable the development-version filter and refresh the browser. Ask your account administrator if developer features are unavailable.

## An output, composition, or child lookup returns nothing

**Check:** Inspect `app.listOutputs()`, the selected output's assignment, and the parent's `listSubcompositions()`. Compare exact names and use IDs returned by the same parent.

**Fix:** Assign the composition to the intended output. For the tutorials, use `Default` and direct child `Lower Third`. For nested children, traverse through each parent. See [identifier types](core-concepts.md#identify-the-right-object).

## Apply sends data but visible text does not change

**Check:** Does `child.getModel()` contain a text field with ID `Name`? Does `child.getPayload2()` reflect the applied value? Is the widget bound to that control, and are you viewing the same instance's output?

**Fix:** Correct the control ID, widget binding, output assignment, or composition revision. If the child is out, press In to show it. “Payload sent” reports the command, rather than rendering confirmation.

## In or Out does not animate

**Check:** Confirm the selected child, its configured animation behavior, and whether it is already in the requested state. A root command and a child command can target different graphics.

**Fix:** Configure the tutorial child's entrance/exit behavior and call `playTo` on that child. Use `jumpTo` only when you want an immediate state change. See [animation methods](reference/composition.md#children-and-animation).

## The native form is blank

**Check:** Does the selected object have a control node and model? Does the container have nonzero height/width? Are there iframe-loading errors in browser developer tools?

**Fix:** Select a node with editable controls, pass its `getControlNode()` result, and give the container a visible size. Destroy the old form when changing targets. The [native-form tutorial](subcomposition-fill-in-form.md) demonstrates these checks.

## Another operator's changes do not appear

**Check:** The lower-third tutorial reads payloads on initialization and has no live subscription. Are both UIs connected to the same instance? Are you observing composition payloads or shared drafts?

**Fix:** Add the appropriate storage or composition listener and decide how incoming data interacts with unsent edits. Read initial composition values explicitly. See [shared data and events](shared-data-and-events.md).

## Events repeat or a previous target receives an edit

**Check:** Does reinitialization attach additional listeners? Does form selection retain the previous draft or accept a delayed callback from an old form?

**Fix:** Dispose old subscriptions, destroy forms, clear drafts, and reject stale callbacks. Storage cleanup needs the same key and function; composition cleanup clears an event slot. Use the [native-form lifecycle](subcomposition-fill-in-form.md#6-handle-selection-changes-and-late-callbacks).

## Gather useful diagnostics

Record app version, composition revision, output name, target IDs, runtime mode, reproduction steps, and the relevant console/network error. Remove keys, credentials, and private payload values before sharing logs. See [Compatibility](compatibility.md) for what local checks establish.
