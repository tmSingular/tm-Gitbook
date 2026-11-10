# Compatibility

This documentation targets the public App SDK **1.0.0** interface. Developer Portal v2 is a documentation edition and does not declare an SDK 2.0 release.

## Reference baseline

| Component                  | Documentation baseline                                                                        |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| App SDK                    | Public `singularapp/1.0.0/singularapp.js` interface                                           |
| Hosted examples            | Runtime supplies `singularAppInit(app)`                                                       |
| Local connection           | App SDK 1.0.0 with the documented Firebase 4.9.0 dependency                                   |
| CLI                        | `singular createapp` and `singular deployapp`; verify installed commands with `singular help` |
| Node.js / browser versions | No current supported range established by this documentation                                  |

The [public SDK distribution](https://app.singular.live/libs/singularapp/1.0.0/singularapp.js) and [official CLI repository](https://github.com/singularlive/singular-cli) are the primary technical sources. The earlier source review is recorded in the repository's `APP_SDK_REVIEW.md`. It established method signatures and local mock behavior, rather than live service acceptance.

## Runtime details requiring confirmation

Before distributing a production integration, confirm account eligibility, supported Node/browser versions, local authentication requirements, and App Manager version transitions with Singular. Asset-browser selection payloads need validation in the actual browser integration. These details are not inferred from the documentation's age or a dependency's version number.

The hosted examples can be checked without adding local authentication. Follow their manual checkpoints against your test account. Local syntax and mock tests cannot establish network authentication, rendering, or current App Manager behavior.

## Legacy names and unsupported interfaces

Use explicit `ById` / `ByName` lookups. Older application aliases such as `getComposition(id)` and `getOutput(id)` are marked for deprecation in the reviewed source. `output.getComposition()` remains the assigned-composition getter.

Use `createSingularForm` / `destroySingularForm`; the old render/remove form methods are stubs in the baseline. The composition and subcomposition exports do not provide `getSequencer()`. `find(...)` exists, but this guide uses explicit hierarchy traversal because its positional contract is not established here.

Earlier App Manager documentation used the lifecycle label **depreciated**. Treat that as a historical UI label, rather than an SDK enum or a verified current transition.

## Storage backend migration

For an existing app or data-node backend, see [Migrate Apps from Firebase to Datastore](../../../releases-and-compatibility/releases-and-compatibility/deprecations-and-migrations/migrate-apps-from-firebase-to-datastore.md). A storage migration does not by itself replace the local bootstrap or establish compatible dependency upgrades.

Return to [App SDK](./).
