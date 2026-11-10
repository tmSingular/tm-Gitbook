---
description: Embed a Uno control app and customize its carousel, preview, and theme.
---

# Integrate and embed Uno Apps

Uno Apps provide control interfaces for specific use cases, including soccer, tennis, lower thirds, and tickers. They are HTML web pages that can be embedded in a host application or website.

## Choose an integration approach

| Approach | Use when |
| --- | --- |
| Copy the Uno App URL into an iframe | You already have the app URL and want to embed its controls. |
| Use the Uno token to retrieve metadata | Your integration needs to retrieve the control and graphics output URLs programmatically. |

## Get the URL or token

Copy the app URL from the open Uno app. To copy its token, click the **key** icon in the app. The November 2024 guide documents these shared control URL formats:

```text
https://app.overlays.uno/control/UNO_TOKEN
https://app.singular.live/control/UNO_TOKEN
```

Use the app URL supplied for your workflow. Treat the token and shared URL as access credentials; see [Tokens and access](../../../operate-and-troubleshoot/operate-and-troubleshoot/tokens-and-access.md).

## Embed the app

Replace `UNO_TOKEN` with your token:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Embedded Uno App</title>
  </head>
  <body>
    <iframe
      title="Uno App controls"
      src="https://app.overlays.uno/control/UNO_TOKEN"
      width="500"
      height="600"
      style="max-width: 100%; border: 1px solid black;">
    </iframe>
  </body>
</html>
```

This embeds the control interface. For graphics output, use the returned output URL in the appropriate [graphics or video integration](../embed-graphics-and-integrate-video.md).

## Retrieve app metadata

The documented metadata request uses the Singular API host:

```http
GET https://app.singular.live/apiv2/controlapps/UNO_TOKEN
```

| Response field | Use |
| --- | --- |
| `publicControlUrl` | Embed or open the operator interface. |
| `publicControlApiUrl` | Address the REST control API. |
| `publicCommandApiUrl` | Address the command API. |
| `publicModelApiUrl` | Retrieve the control model. |
| `outputUrl` | Load the app's graphics output. |
| `broadcastOutputUrl` | Use the returned broadcast output URL for the intended output workflow. |
| `appTemplateId`, `appTemplateVersion` | Identify the template and version under test. |
| `compositionId`, `compositionJson` | Identify and locate the associated composition. |

The response also includes app identity, name, thumbnail, ownership, timestamps, Dashboard organization, and `datastoreId`. Use the response URLs instead of assuming control and output URLs have interchangeable tokens. See the [REST reference](../../../api-and-sdk-reference/api-and-sdk-reference/rest/README.md) for endpoint contracts.

## Customize the interface

Append these parameters to the control URL. Parameters without values are presence flags, such as `?c_nopreview`.

| Parameter | Effect |
| --- | --- |
| `c_mini` | Show only the carousel. |
| `c_nopreview` | Hide the preview window. |
| `c_onetile` | Show a single tile in the carousel. |
| `c_nosettings` | Hide the Settings panel. |
| `c_theme=dark` | Select the dark theme. |
| `c_theme=light` | Select the light theme. |
| `c_nonavigation` | Hide the navigation bar and arrows. |
| `c_numtiles=auto` | Adjust the number of panels to the available width. |
| `c_numtiles=3` | Show three panels; the documented numeric range is 1–5. |
| `c_tile=2` | Select the second panel by default. |

Parameters can be combined with `&`. In HTML attributes, use `&amp;`.

Hide Settings and navigation:

```html
<iframe
  title="Uno App compact controls"
  src="https://app.overlays.uno/control/UNO_TOKEN?c_nosettings&amp;c_nonavigation"
  width="500"
  height="600"
  style="max-width: 100%; border: 1px solid black;">
</iframe>
```

Hide the preview and use the light theme:

```text
https://app.overlays.uno/control/UNO_TOKEN?c_theme=light&c_nopreview
```

## Verify and troubleshoot

Check each selected parameter with the target Uno template. Test narrow and wide host layouts, edit a test control, and confirm the change reaches the intended output. If the app loads but live updates fail, check [Firewall and network requirements](../../../operate-and-troubleshoot/operate-and-troubleshoot/firewall-and-network-requirements.md).

Source: [Integrate with UNO Overlays, November 2024](https://docs.google.com/document/d/1iIK3eCaPz0gCysSZ7Hwai1ri05yNRAWaEJmsaTcykq4/edit). The source's `/conrol/` typo is corrected to `/control/`, and its sample tokens are replaced with placeholders. Parameter behavior should be checked with the deployed app template and version.
