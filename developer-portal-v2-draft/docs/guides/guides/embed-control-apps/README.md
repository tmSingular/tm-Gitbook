---
description: Embed Studio or Uno operator interfaces and retrieve app metadata.
---

# Embed control apps

Embed a Singular Studio or Uno control interface in your application with an HTML iframe. Operators can use the existing app interface while your application provides the surrounding workflow.

## Choose a control interface

| Task | Guide |
| --- | --- |
| Embed Studio, including its playlists, item durations, and looping controls | [Integrate and embed Singular Studio](singular-studio.md) |
| Embed a use-case-specific Uno app, such as a scorebug, lower third, or ticker | [Integrate and embed Uno Apps](uno-apps.md) |
| Display rendered graphics or integrate graphics with video | [Embed graphics and integrate video](../embed-graphics-and-integrate-video.md) |
| Build your own operator interface | [App SDK](../../../api-and-sdk-reference/api-and-sdk-reference/app-sdk/README.md) |
| Send remote content changes and animation commands | [Control overlays through REST](../control-overlays-through-rest.md) |

## Understand the URLs

| URL or response field | Purpose |
| --- | --- |
| App URL / `publicControlUrl` | Open or embed the operator interface. Shared URLs include an app token. |
| App metadata endpoint | Retrieve app details and URLs with `GET /apiv2/controlapps/APP_TOKEN`. |
| `publicControlApiUrl` | Send REST control requests. This is an API endpoint, not an iframe source. |
| `publicCommandApiUrl` | Address the app's command API. |
| `publicModelApiUrl` | Read the app's control model. |
| `outputUrl` / `broadcastOutputUrl` | Load graphics output in the intended rendering workflow. |

App metadata and the control model are different resources. The base endpoint returns app metadata; the `/model` endpoint returns the control model.

## Before embedding

1. Create or select an app instance and confirm that it works directly in a browser.
2. Obtain its shared app URL or token using the product-specific guide.
3. Use an app intended for integration testing while checking controls and output.
4. Give the iframe enough width and height for the chosen layout. The dimensions in the guides are starting points.
5. Verify the app and its output from the network where operators and renderers will run. See [Firewall and network requirements](../../../operate-and-troubleshoot/operate-and-troubleshoot/firewall-and-network-requirements.md).

Shared control URLs grant access through their tokens. Restrict access to the host page accordingly and keep real tokens out of public examples and logs. See [Tokens and access](../../../operate-and-troubleshoot/operate-and-troubleshoot/tokens-and-access.md).

For account sign-in through an identity provider, see [Configure Singular SSO](../../../operate-and-troubleshoot/operate-and-troubleshoot/configure-singular-sso.md). SSO configuration and shared app tokens serve different access paths; configuring SSO does not make a shared token URL an SSO login URL.

## Verify the integration

Open the host page, edit a test control, and confirm the change reaches the intended output. Check resizing and each selected URL parameter. If the iframe fails, first open its URL directly, then inspect the browser console and Network panel for blocked requests or embedding restrictions. An iframe loading successfully does not establish that live output updates are working.

The product guides document the URL options in the November 2024 integration documents. Verify the chosen options with the app template and version you deploy.
