---
description: "Build an efficient control-app picker and load only the selected composition and control model into a partner application."
---

# Select control apps and load a local preview

Let users choose a production folder, select a control app by name, and load that app's composition only when needed. This avoids fetching every app and composition in a large account before the user can work.

This guide describes a generic integration pattern. Configure your own account authorization and application credentials during onboarding; examples contain no assigned partner credentials or test-account details.

## Avoid account-wide discovery at startup

The older integration pattern retrieved all app instances using `GET /apiv1/appinstances`, then requested `/apiv1/appinstances/APP_INSTANCE_ID/composition` for each instance. This can generate many requests and slow down selection when an account contains thousands of apps.

The source also reports failures when an app is shared from another account but its composition remains owned by the original account. Access to an app does not imply unrestricted account-level access to its composition. Resolve the selected app through its supported shared-token interface rather than assuming ownership.

## Authenticate for account browsing

Use the account authorization configured for your integration when browsing Dashboard folders. The source uses an OAuth Bearer token obtained through:

```text
POST https://app.singular.live/oauth/token
```

The source does not specify the token request body or client-authentication encoding. Confirm those details for your assigned integration. Keep the client secret and account-level tokens on the server; do not place them in a browser-based picker.

For the older interactive login flow and the distinction from tenant-level credentials, see [Integrate Singular Sign-In](singular-sign-in.md). The app's Shared App Token is a separate credential used for app-specific reads below.

## Browse one folder at a time

Allow the user or integration administrator to select a production folder. In the Singular Dashboard, open **Inspector View**, select the parent folder in the tree, then select the target folder in the folder list to inspect its folder ID.

Request control apps from that folder:

```text
GET https://app.singular.live/apiv2/dashboard/folder/FOLDER_ID/items?type=controlapp
```

The source lists these optional query parameters:

| Parameter | Type | Purpose |
| --- | --- | --- |
| `type` | String | Use `controlapp` to exclude unrelated item types. |
| `sortby` | String | Select a supported sort field. |
| `sortdirection` | String | Select a supported sort direction. |
| `limit` | Integer | Bound the number of results returned by the request. |

Use supported values from the API reference for your environment. The source does not define a pagination cursor, offset, or server-side search parameter; do not invent one or present a limited first response as the full folder contents. Implement the documented pagination behavior if available, or make the result limit visible to the user.

An illustrative shell request, after setting `FOLDER_ID` and the account's `ACCESS_TOKEN`, is:

```sh
curl "https://app.singular.live/apiv2/dashboard/folder/$FOLDER_ID/items?type=controlapp" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

Show a recognizable app name in the picker. Provide folder navigation and filtering over the results you have loaded, and make that filtering scope clear. Defer composition loading until the user selects an app.

## Resolve the selected app

Use the selected app's **Shared App Token** to retrieve its metadata:

```text
GET https://app.singular.live/apiv2/controlapps/APP_TOKEN
```

This endpoint uses the token in the URL without an additional account Bearer header. The token-bearing URL still grants access and must be protected.

Read the selected app's composition JSON URL from `compositionJson` where supplied, and use `name` for its app label. An app name and a composition name are distinct; do not relabel one as the other. If your UI also displays the composition name, obtain it from the composition metadata or SDK.

Handle a missing composition URL or inaccessible shared app as a selection error rather than falling back to a request for every composition in the account. Do not derive a composition asset URL from an app ID, token, or composition ID.

## Read the controls and load preview

The source describes two approaches:

1. **Read the app's control model.** This is the preferred route when building a form for the selected app. Metadata can provide `publicModelApiUrl`; use the model associated with the selected app and follow its response structure.
2. **Inspect the composition through the Graphics SDK.** Load its composition JSON URL, then inspect the subcompositions and Control Nodes needed by an independent local preview.

For an SDK-based preview, initialize the Graphics SDK using the supported loading method, wait for composition loading to complete, and then build controls from the model. An extracted composition URL produces a local composition view; it does not promise continuous synchronization with subsequent control-app edits. Choose explicitly whether the host wants an independent preview or the app-connected output.

Display useful labels and thumbnails rather than long raw JSON URLs. Keep app identity, composition identity, control-model data, and preview state separate in your implementation.

## Verify with realistic accounts

Test a large account, an empty folder, a folder containing mixed item types, result limits, shared apps, missing permissions, and an app whose composition changes after selection. Confirm that selecting one app does not trigger composition requests for every item. Verify that local preview controls address the intended subcompositions and do not accidentally change production output.

Source: supplied integration enhancement notes, adapted into a partner-neutral workflow. Test accounts, credentials, subscription dates, and vendor UI screenshots were excluded. Reference: [control-app metadata](https://developer.singular.live/rest-api/api-reference/get-control-app-details/get-a-control-apps-metadata) and the [Singular REST API](https://api.singular.live/). No account browsing or token requests were executed while preparing this guide.
