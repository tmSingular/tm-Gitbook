---
description: Embed a Studio control app, retrieve its metadata, and customize its layout.
---

# Integrate and embed Singular Studio

Singular Studio is a control application for managing overlays, including multiple playlists, looping items, and item durations. Embed its operator interface with an iframe, or retrieve app URLs through REST for use in your integration.

## Get the app URL and token

Open the Studio app and copy its URL from the browser. To obtain a shared app URL, use the **App Tools** menu. A shared control URL has this form:

```text
https://app.singular.live/control/APP_TOKEN
```

You can also select the control app in the Singular Dashboard, open the **Inspector** with the **i** icon, and copy **Public API URL**. That URL is for REST requests. Use the token it contains in the shared control URL above when embedding the operator interface.

Treat the shared URL and token as access credentials. See [Tokens and access](../../../operate-and-troubleshoot/operate-and-troubleshoot/tokens-and-access.md).

## Embed Studio

Replace `APP_TOKEN` with your app's token. This example uses the standard layout with the header visible:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Embedded Singular Studio</title>
  </head>
  <body>
    <iframe
      title="Singular Studio controls"
      src="https://app.singular.live/control/APP_TOKEN"
      width="1024"
      height="600"
      style="max-width: 100%; border: 1px solid black;">
    </iframe>
  </body>
</html>
```

The iframe displays Studio controls. To embed the rendered graphics instead, use [Embed graphics and integrate video](../embed-graphics-and-integrate-video.md).

## Customize the layout

Append parameters with `?`, then combine additional parameters with `&`. In HTML attributes, write the separator as `&amp;`.

| Parameter | Effect |
| --- | --- |
| `noHeader=1` | Hide the Singular header and menu bar. |
| `uiLayout=horizontal` | Use the horizontal layout. |
| `uiLayout=vertical` | Use the vertical layout. |
| `theme=dark` | Use the dark interface theme. |
| `theme=light` | Use the light interface theme. |

| Example | URL suffix | Starting size |
| --- | --- | --- |
| Standard, with header | No parameters | 1024 × 600 |
| Standard, without header | `?noHeader=1` | 1024 × 600 |
| Horizontal, with header | `?uiLayout=horizontal` | 1024 × 250 |
| Horizontal, without header | `?uiLayout=horizontal&noHeader=1` | 1024 × 250 |
| Vertical, with header | `?uiLayout=vertical` | 250 × 720 |
| Vertical, without header | `?uiLayout=vertical&noHeader=1` | 250 × 720 |

For example, use a compact horizontal interface with a dark theme:

```html
<iframe
  title="Singular Studio horizontal controls"
  src="https://app.singular.live/control/APP_TOKEN?uiLayout=horizontal&amp;noHeader=1&amp;theme=dark"
  width="1024"
  height="250"
  style="max-width: 100%; border: 1px solid black;">
</iframe>
```

## Retrieve metadata and API URLs

Request app metadata with:

```http
GET https://app.singular.live/apiv2/controlapps/APP_TOKEN
```

Useful response fields include:

| Field | Meaning |
| --- | --- |
| `id`, `name`, `type` | App instance identity and type. |
| `userId`, `accountId`, `folderId`, `favorite` | Ownership and Dashboard organization. |
| `thumbnail`, `createdAt`, `updatedAt` | Thumbnail and timestamps. |
| `outputUrl`, `broadcastOutputUrl` | Graphics output URLs. |
| `publicControlUrl` | Shared operator interface URL. |
| `publicControlApiUrl` | Control endpoint URL. |
| `publicCommandApiUrl` | Command endpoint URL. |
| `publicModelApiUrl` | Control model endpoint URL. |
| `appTemplateId`, `appTemplateVersion` | App template identity and version. |
| `compositionId`, `compositionJson` | Associated composition and its JSON URL. |
| `datastoreId` | Storage-related metadata; see the migration guide for its documented storage check. |

The token-based endpoint family is:

```text
https://app.singular.live/apiv2/controlapps/APP_TOKEN
https://app.singular.live/apiv2/controlapps/APP_TOKEN/control
https://app.singular.live/apiv2/controlapps/APP_TOKEN/command
https://app.singular.live/apiv2/controlapps/APP_TOKEN/model
```

Use the URLs returned by the app metadata response when connecting the control, command, model, and output parts of your integration. See the [REST reference](../../../api-and-sdk-reference/api-and-sdk-reference/rest/README.md) for request methods and schemas.

## Verify and troubleshoot

Test the shared URL directly, then test it inside your host page. Check playlist selection, a test content change, In/Out behavior, the selected layout, and the actual graphics output. If controls load but updates stop, inspect network requests and WebSocket connections using [Firewall and network requirements](../../../operate-and-troubleshoot/operate-and-troubleshoot/firewall-and-network-requirements.md).

Source: [Integration with Singular Studio, November 2024](https://docs.google.com/document/d/1ZdBDoOl8v16w6ZqI-PgQt4UCzNaKBMGknkw-iC4qL_8/edit). Examples use placeholder tokens. Parameter behavior should be checked with the deployed Studio version.
