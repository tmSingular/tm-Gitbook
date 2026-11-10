# Deploy and manage app versions

Deployment uploads application code. Publication makes a selected code version available through the normal app distribution workflow. Selecting a Composer revision is a separate configuration decision.

## Deploy and open a development version

1. Confirm `deploykey.json` belongs to the intended app in App Manager.
2. Save `source/app.html` and its supporting assets. Keep local connection files outside `source`.
3. From the project folder's parent, run:

```sh
singular deployapp mySingularApp
```

4. Confirm the terminal reports a successful upload.
5. In Dashboard, create/open a Control App instance. Enable **Show Dev Versions** in the App Browser and select your app's development version.
6. Open that instance's output alongside the UI. Check configuration messages, read/edit/apply behavior, animation, refresh, and any shared-data features you added.

If old code appears, confirm the app definition, instance version, and deployment key before uploading again. See [Troubleshooting](troubleshooting.md).

## Understand what each action changes

| Action | What to expect | What to verify |
| --- | --- | --- |
| Deploy app files | Uploads a development build | Open the development version and identify the new UI |
| Publish a selected version | Makes that version available for normal app distribution | Publication selection and which version a new instance uses |
| Open an existing instance | Uses that instance's configured app/version | Whether an explicit instance update is offered or required |
| Select a different composition revision | Changes the composition selected for the relevant workflow | Required controls, bindings, and animations in the resulting instance |
| Retire an older version | Depends on the lifecycle actions available in App Manager | Effects on existing instances before using the action |

Existing and new instances can use different app versions. Check the version on each instance you intend to update. Detailed archive/retirement transitions require confirmation against the current App Manager UI; see [Compatibility](compatibility.md).

## App version and composition revision are independent

Suppose app code version A expects a text field ID `Name` in composition revision R. Changing the UI label and deploying code version B does not create a new Composer revision. Conversely, renaming the field in Composer and selecting revision S does not update B's JavaScript to use the new field ID.

Record the app version and composition revision separately. Test that exact pair before distribution. For composition lifecycle details, see [Save, extract, publish, and output behavior](../../../operate-and-troubleshoot/operate-and-troubleshoot/save-extract-publish-and-output-behavior.md).

## Publish after verification

In App Manager, review the intended app version, name, icon, initial composition, and revision before publishing. Then create a test instance through the normal app browser and verify its behavior. Check an existing instance separately rather than assuming it has adopted the new version.

Keep a working version available until the upgrade is verified. If the UI offers archive or retirement operations, confirm their impact on existing instances before using them.

## Release checklist

- Required output, child, field IDs, and animation states match the chosen composition revision.
- Initialization reads state without applying an unsolicited edit.
- Draft/apply, form replacement, subscription cleanup, and multi-operator behavior work as intended.
- Local credentials and development configuration are absent from distributed files.
- App version and composition revision are recorded together for reproducing failures.

Next: [API reference](reference/README.md), or [Troubleshooting](troubleshooting.md).
