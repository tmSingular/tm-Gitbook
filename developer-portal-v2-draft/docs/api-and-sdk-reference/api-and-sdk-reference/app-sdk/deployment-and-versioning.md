# Deploy and manage app versions

Deployment uploads the app's code; publishing makes a chosen version available through the normal app distribution workflow. Neither operation updates a composition's Composer revision by itself.

## Deploy a development version

1. Confirm `deploykey.json` belongs to the intended test app in App Manager.
2. Save `source/app.html` and supporting assets.
3. From the app folder's parent, run `singular deployapp mySingularApp`.
4. Enable **Show Dev Versions** in Dashboard and open a development instance.
5. Test field editing, animation, missing configuration, refresh, and simultaneous operator UIs.

## Publish deliberately

After testing, use App Manager to publish the intended app version. Review the selected composition and revision, icon, and metadata before publishing. Existing instances and newly created instances can use different app versions; verify the version on each instance you intend to update. Do not assume a deployment or publication silently upgrades every running instance.

The v1 guide describes development, published, archived, and a terminal state spelled **depreciated**. Treat these as the historical UI terms, not SDK enum constants. Consult the current App Manager UI for the allowed transitions. Keep a working version available until you have verified an upgrade on a test instance.

## Release checklist

* Check output assignment and field IDs against the composition revision being shipped.
* Exercise subscription cleanup, form selection changes, and reinitialization.
* Remove development credentials and diagnostic payload logging from distributed assets.
* Record the app version and composition revision separately so a failure can be reproduced.

For composition lifecycle terminology, see [Save, extract, publish, and output behavior](../../../operate-and-troubleshoot/operate-and-troubleshoot/save-extract-publish-and-output-behavior.md).
