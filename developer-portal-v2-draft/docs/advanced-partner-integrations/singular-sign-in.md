---
description: "Historical Singular Sign-In integration using a registered callback and server-side code exchange, with tenant authorization kept separate."
---

# Integrate Singular Sign-In

Singular Sign-In lets a user authenticate with Singular and lets your server obtain an access token to call Singular APIs on that user's behalf. Your application opens the Singular login dialog; the registered callback receives a code, and your server exchanges that code for a token.

{% hint style="info" %}
This guide adapts version 1.0 of the February 5, 2020 Sign-In document. Confirm endpoint availability, callback requirements, token policy, and the supported client-authentication format with Singular before implementing a new integration. The source's terminology mixes interactive login with tenant-level client credentials; these are described separately below.
{% endhint %}

Account SAML authentication is covered by [Configure Singular SSO](configure-singular-sso.md). Application pairing with overlays.uno is a different flow; see [Pair an application with overlays.uno](pair-an-application-with-overlays-uno.md).

## Configure the OAuth client

The historical UI exposes **Settings → OAuth Client** to users with **Developer Permissions**. Copy the Client ID, generate a Client Secret, and register your server's callback URL. Use the configuration assigned to your integration and environment.

Keep the client secret on the server. Users enter their Singular credentials in the Singular login dialog; do not collect their password in your own form.

## Open the login dialog

Navigate to:

```text
https://app.singular.live/oauth/logindialog?client_id=CLIENT_ID
```

Replace `CLIENT_ID` with the registered value and encode it as a query parameter. The callback is configured on the OAuth client, rather than supplied as an arbitrary URL in this example.

## Receive the callback code

On successful login, the source documents a redirect shaped like:

```text
https://partner.example/singular/callback?code=RETURNED_CODE
```

Implement the exact callback registered for your application. Treat the code as opaque, associate the callback with the initiating user's session, and handle missing codes or failed/canceled login without creating a connected session. The source says callbacks can also occur on failure but does not specify the error payload.

Confirm the supported request-correlation mechanism with Singular. The source does not establish `state`, PKCE, scope, refresh, or code-expiry parameters, so this page does not invent them or claim they are supported.

## Exchange the code on your server

The historical exchange is:

```text
POST https://app.singular.live/oauth/accesstoken
```

| Request field | Value |
| --- | --- |
| `code` | Code received by the registered callback. |
| `client_id` | Registered Client ID. |
| `client_secret` | Registered Client Secret, retrieved from server-side storage. |

The source specifies these fields but does not establish their content type or the exact response JSON field names. Confirm the wire format for your enabled integration before writing an executable request. The callback carries the **code**; the token comes from this server-side exchange, despite an inconsistent introductory sentence in the original document.

Store the returned access token securely and exclude codes, secrets, and tokens from logs and analytics. The 2020 document states a six-month access-token lifetime. Treat that as a historical policy to confirm, not an unconditional guarantee for new integrations. No refresh-token contract is supplied by this source.

## Call the user-authorized API

The source demonstrates Bearer authorization against API v1. After setting `ACCESS_TOKEN` to the returned access token:

```sh
curl 'https://app.singular.live/apiv1/compositions' \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

Handle expired or rejected authorization by following the supported reconnection policy. Do not infer access to every API or account merely from possession of a token.

## Keep tenant authorization separate

The source also describes a tenant-level client-credentials flow: a server requests an access token using its Client ID and Client Secret without an interactive user callback. The enhancement notes identify `POST https://app.singular.live/oauth/token` for that token request.

Use the flow and account permissions enabled for your integration. Do not send an interactive callback code to the tenant endpoint or assume the callback flow uses the client-credentials grant. The older `simple-oauth2` snippet is implementation history; this guide does not prescribe that outdated library API or infer an undocumented request body from it.

## Verify before release

Test successful login, canceled login, a missing callback code, a callback associated with the wrong session, token exchange failure, and rejected API access. Confirm the current token lifetime and reconnection process with Singular. Verify that browser-visible code and logs contain no client secret or access token.

Source: *Singular Sign-In*, version 1.0, February 5, 2020, with the tenant endpoint from the supplied enhancement notes. The original labels “basic authentication” and “client credentials grant” do not describe every step of the documented callback flow. No login or token exchange was performed during documentation integration.
