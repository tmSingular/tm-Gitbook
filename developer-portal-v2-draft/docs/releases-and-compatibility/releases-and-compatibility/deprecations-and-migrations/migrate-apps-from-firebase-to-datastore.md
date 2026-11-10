---
description: Identify storage backends and plan a Firebase-to-Datastore migration.
---

# Migrate Apps from Firebase to Datastore

Singular Datastore is Singular's real-time synchronization infrastructure. The supplied migration document describes moving control apps and data nodes from Google Firebase to Datastore, with particular emphasis on data-heavy projects and frequent updates.

This is a **storage migration for existing Singular objects**, not a general migration from Firebase to Google Cloud Datastore, and not an instruction to replace the Firebase library in an App SDK bootstrap.

## Understand the three settings

| Setting                 | What changes                                                                                                                           |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Control app storage     | The backend used by an individual control app.                                                                                         |
| Data node storage       | The backend used by an individual data node, which may be shared by several control apps.                                              |
| Account storage default | The backend used for newly created control apps and data nodes. The document says only the Singular R\&D team can change this default. |

The source states that new accounts created since April 2023 use Datastore. Check the actual objects and account configuration rather than inferring an existing app's backend from its age. Changing the account default does not replace the documented per-object migration steps.

## Identify the current backend

Use the Dashboard to select a control app or data node, open the **Inspector**, and check **Storage** at the bottom of the list. It indicates Firebase or Datastore.

For control apps, the document also provides these checks:

* Open the browser console for the control app or its output. A Datastore connection logs `Connected to datastore id app_<someID>`.
* Request the app instance through the account-level API:

```http
GET https://app.singular.live/apiv1/appinstances/APP_INSTANCE_ID
```

The documented storage field in this **apiv1** response is `datastore`: a null value indicates Firebase. Do not confuse it with `datastoreId` in the embedding guides' **apiv2** metadata examples.

These apiv1 operations use account-level authorization; see the [published authorization reference](https://developer.singular.live/rest-api/authorization). An app instance ID is not an app token. Use an account credential authorized for the target object, rather than inserting a shared app token into an account-level endpoint.

## Prepare and test

1. Inventory the production control apps, associated data nodes, output URLs, and Output Manager attachments.
2. Record each object's ID and current backend, and preserve working copies and current configuration.
3. Check access to the Datastore WebSocket endpoint from both operator and rendering networks; see [Firewall and network requirements](../../../operate-and-troubleshoot/operate-and-troubleshoot/firewall-and-network-requirements.md).
4. Copy one or more representative control apps and switch the copies to Datastore.
5. Test in conditions close to production: operator edits, live updates, animations, app storage, data node delivery, and all actual outputs.

Copying a control app and changing its storage does **not** automatically change its data nodes. A data node may still be shared with production apps; changing that node affects its consumers. Inventory those dependencies before testing node migration. Firebase and Datastore objects can be mixed, but the source recommends keeping their backends aligned.

## Switch storage

The source describes **Change to Datastore** and **Change to Firebase** buttons at the bottom of the Dashboard Inspector. Its note says those buttons were beta-only, with a planned release on May 6, 2024. That is a historical rollout note, not a current availability claim. Confirm the available interface and API behavior with Singular Support for your account.

The documented API operations are:

| Object      | Target backend | Method and endpoint                                                        |
| ----------- | -------------- | -------------------------------------------------------------------------- |
| Control app | Datastore      | `POST https://app.singular.live/apiv1/appinstances/APP_INSTANCE_ID/fb2nof` |
| Control app | Firebase       | `POST https://app.singular.live/apiv1/appinstances/APP_INSTANCE_ID/nof2fb` |
| Data node   | Datastore      | `POST https://app.singular.live/apiv1/datanodes/DATA_NODE_ID/fb2nof`       |
| Data node   | Firebase       | `POST https://app.singular.live/apiv1/datanodes/DATA_NODE_ID/nof2fb`       |

The source does not specify request bodies, response schemas, or error contracts for these migration operations. Confirm those details before automating a production migration. The source's final data-node endpoint is labeled “For Datastore”; its `/nof2fb` path describes the reverse direction to Firebase and is labeled accordingly here.

## Cut over production

Schedule the switch when the control app is not in use. After the representative tests pass:

1. Switch each intended production control app to Datastore.
2. **Reload the control app UI and every open output URL.** Until reloaded, an existing output will not receive server data after the switch.
3. If using Output Manager, detach and reattach the affected control apps.
4. Migrate the associated data nodes during a coordinated window. Reload every consuming control app to reconnect to a node whose storage changed.
5. Verify the backend again and confirm that test updates reach every intended output.

An app may continue running after its data node changes backend while losing the node connection. Check delivery explicitly; an open UI alone is not a successful migration.

## Validate and recover

Compare the migrated workflow with the working copy: verify current values, new edits, data node messages, output updates, reconnect behavior, and Output Manager delivery. Include any custom app storage usage in the test.

The documented reverse operations use `/nof2fb`. If recovery is needed, coordinate a return to Firebase with Singular Support and repeat the relevant reload and reconnection steps after switching. The source does not guarantee data restoration or lossless reconciliation of changes made after the switch; keep the preserved configuration available.

Once the intended apps and nodes are migrated, ask the Singular team to set the **account storage default** to Datastore for future objects. You do not have to migrate every archived backup app.

## Related guidance

* [App SDK hosted and local development](../../../api-and-sdk-reference/api-and-sdk-reference/app-sdk/hosted-and-local-development.md)
* [App SDK storage object](../../../api-and-sdk-reference/api-and-sdk-reference/app-sdk/reference/storage.md)
* [Support and service status](../../../operate-and-troubleshoot/operate-and-troubleshoot/support-and-service-status.md) — the source requests the **Developers** ticket category.

Source: [Moving to Singular Datastore](https://docs.google.com/document/d/13nwhPYB0yxtdKPWXQ4AoWJdmTIne2zKR6IiFFK91-yo/edit), supplied PDF containing the May 2024 rollout note. Migration endpoints and live account behavior have not been exercised by this guide.
