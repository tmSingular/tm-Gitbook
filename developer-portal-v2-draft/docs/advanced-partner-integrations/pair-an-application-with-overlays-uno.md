---
description: "Connect an application to overlays.uno using partner pairing, then retrieve and embed the user's overlays."
---

# Pair an application with overlays.uno

When a user chooses **Connect to overlays.uno** in your application, open the assigned pairing page in a webview. overlays.uno handles sign-in and returns a single-use pairing code to your application. Exchange the code for tokens, then use the access token to list the user's overlays.

## Before you start

Ask Singular to enable the integration and supply its configuration for each environment. Do not derive a new endpoint by replacing another application's name in a URL.

| Configuration | Purpose |
| --- | --- |
| Pairing launch URL | The complete URL to open from your application, including any required partner or source query parameters. |
| Token exchange URL | The complete URL for redeeming pairing codes, including any required partner or source query parameters. |
| API base URL | The API origin for overlay listing and token refresh in that environment. |
| Registered HTTPS callback | The exact origin and path to intercept when the pairing page returns a code. |
| Connection identity | The application name and connection card shown to the user on overlays.uno. |

Pairing pages and API endpoints can use different origins. Use each assigned URL for its purpose, and keep the launch URL, token exchange URL, and API base in the same environment. Beta pairing codes must not be exchanged against production.

{% hint style="info" %}
The URLs and identifiers for an individual integration are supplied during onboarding. Placeholder values in this guide are not usable endpoints. Confirm the response format and token policy for your assigned integration before release.
{% endhint %}

## 1. Start pairing

### From your application

Open the complete pairing launch URL in your webview. Preserve its required query parameters on the initial navigation. They identify the integration and can enable the automatic return to your application.

The user signs in with a verified overlays.uno account. Once the code is ready, the page redirects to the registered HTTPS callback. An existing signed-in session can complete this flow without another sign-in prompt.

Your application receives the code directly, so this flow does not require QR scanning or polling. If automatic navigation is blocked, the pairing page can offer a return action for the configured application.

### From the overlays.uno website

For integrations enabled on the **Connections** page:

1. The user signs in to overlays.uno and opens **Connections** in the matching environment.
2. On your application's connection card, the user selects **Connect**. The page displays a pairing code and a QR code. An existing pairing shows the connected device.
3. The user enters the displayed code in your application or follows the QR pairing flow. Your application redeems the code using the same exchange described below.

## 2. Handle the HTTPS callback

The callback is configured for your integration. Do not pass an arbitrary callback URL in the launch link.

The return navigation has this shape; the domain and path below are illustrative:

```text
https://partner.example/auth/overlays?pair_code=K7M4QF
```

In your webview navigation handler:

1. Parse the URL and match the **exact registered HTTPS origin and path**. Do not use substring or domain-suffix matching.
2. Read the decoded `pair_code` query parameter. Reject a missing or empty value.
3. Send its entire value as `code` in the token exchange. Treat it as an opaque string.
4. Handle each callback once to avoid duplicate exchanges.

The current pairing flow uses six uppercase letters or digits. The displayed code, copied code, and QR callback carry the same value. A code expires after **10 minutes**, can be exchanged **once**, and is replaced if the user generates a new one.

## 3. Exchange the code for tokens

POST JSON to the assigned token exchange URL for the environment where pairing started. Preserve any required source parameters on this URL as well as on the launch URL. Do not send a Bearer header for this exchange.

Set `deviceName` to a useful device label that the user will recognize on the Connections page.

In the shell examples, set `TOKEN_EXCHANGE_URL` to the complete assigned exchange URL and `API_BASE_URL` to the assigned API base without a trailing slash. Set `PAIR_CODE` to the received code. These variables are local example configuration, not additional API fields.

```sh
curl "$TOKEN_EXCHANGE_URL" \
  -H 'Content-Type: application/json' \
  --data "{\"code\":\"$PAIR_CODE\",\"deviceName\":\"My application on this device\"}"
```

In application code, serialize the request with a JSON library rather than interpolating untrusted input into JSON text.

A successful exchange returns:

```json
{
  "success": true,
  "accessToken": "<accessToken>",
  "refreshToken": "<refreshToken>"
}
```

Store both tokens in your application's secure storage. Keep pairing codes and tokens out of logs and analytics.

If the API reports `400 Pairing code expired` or `404 Invalid pairing code`, reopen the pairing launch URL to get a fresh code. A used or replaced code cannot be redeemed again. If an exchange response is lost, do not assume the code remains usable.

## 4. List and open overlays

Set `ACCESS_TOKEN` to the returned access token. The following request lists overlays in the user's root folder:

```sh
curl "$API_BASE_URL/apiv2/unooverlays/folder/root/items" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

For a picker that includes overlays across folders, use `/apiv2/unooverlays/folder/all/items` instead.

Read overlays from the response's `data` array. For the selected overlay:

* Load `outputUrl` as the graphics layer in your application's scene.
* Open `publicControlUrl` when the user wants to operate the overlay.

Both fields are public links. Open the returned URLs directly, without forwarding the API's Bearer header. Treat shared overlay URLs as sensitive links when storing or sharing them.

## 5. Renew access

In the current pairing flow, the initial access token and refresh token each expire **14 days after pairing**. Renew access by posting the refresh token **before the refresh token expires**:

```sh
curl "$API_BASE_URL/apiv2/users/refreshtoken" \
  -H 'Content-Type: application/json' \
  --data '{"refreshToken":"<refreshToken>"}'
```

A successful refresh returns:

```json
{"success": true, "accessToken": "<newAccessToken>"}
```

Replace the stored access token and keep the original refresh token. The refresh token's expiry does not change. After the refresh token expires, the current access token can still be used until its own expiry; the next time your application needs a new access token, start pairing again.

## 6. Disconnect

Users can disconnect your application from **overlays.uno → Connections**. This clears that application's pairing and any pending code, independently of other integrations.

{% hint style="warning" %}
Disconnecting the connection does not revoke tokens already issued. If your application offers sign-out or disconnect, clear its locally stored access and refresh tokens and stop using them.
{% endhint %}

## Verify before release

Check both application-initiated and manual pairing, signed-in and signed-out sessions, callback interception, duplicate callbacks, expired and reused codes, and environment matching. Verify overlay listing, graphics output, control links, refresh before expiry, re-pairing after refresh expiry, and local token cleanup on disconnect.
