---
description: Configure SAML single sign-on and provision Singular SSO users.
---

# Configure Singular SSO

Singular SSO uses SAML to delegate user authentication to an external identity provider. Account administrators configure the connection and add users to the Singular account.

## Prerequisites

- An Enterprise subscription with SSO enabled for the account. Request activation through your Singular representative or [Singular Support](https://support.singular.live/hc/en-us/requests/new).
- A Singular user with **Administrator** permissions.
- An identity provider configuration, including its sign-in entry point, issuer value, and public signing certificate.

Once activated, **Single sign-on** and **Add SSO User** become available to administrators. Keep at least one standard Singular user with Administrator permissions so the account remains accessible if the identity provider or SSO configuration fails.

## Configure the identity provider

Set the SAML callback URL to:

```text
https://app.singular.live/users/login/saml/callback
```

Obtain the entry point, issuer value, and public signing certificate from the identity-provider configuration. The supplied material does not define provider-specific mappings or a complete set of assertion requirements; resolve those details with Singular Support and your identity-provider administrator.

## Configure the Singular account

1. Sign in to the Singular account as an administrator.
2. Open **Settings → Single sign-on**.
3. Enter the SAML configuration as JSON.
4. Click **Save**.

```json
{
  "entryPoint": "IDENTITY_PROVIDER_SIGN_IN_URL",
  "issuer": "ISSUER_VALUE_FROM_YOUR_SAML_CONFIGURATION",
  "cert": "PUBLIC_SIGNING_CERTIFICATE_BODY_ON_ONE_LINE"
}
```

| Field | Value |
| --- | --- |
| `entryPoint` | Identity provider's sign-in entry point. |
| `issuer` | Issuer string supplied to the identity provider, as agreed in the SAML configuration. |
| `cert` | Public signing certificate used to validate incoming SAML response signatures. |

For `cert`, use the public certificate body with its BEGIN/END certificate lines removed and its remaining lines joined into one line. Do not enter a private key. The July 2024 document and the support article describe this field as a public signing certificate but also contain a contradictory reference to a “private key”; this guide uses the public certificate required for signature validation.

## Add and activate SSO users

1. Open **User Administration**.
2. Select **Add SSO User**.
3. Enter the user's email address, first name, and last name.
4. Click **Add User**.
5. Ask the user to follow the validation link in the email sent by Singular to activate the login.

Standard Singular users and SSO users can coexist in one account. The documented conversion procedure for an existing user is to delete that user and add them again as an SSO user. Before doing so, record their existing permissions and confirm any ownership or access implications with Singular Support; the source does not define what deleting and recreating a user preserves. Keep the standard administrator available throughout the transition.

## Test sign-in

1. Open the Singular login page in a separate browser session.
2. Select **Login with Single sign-on**.
3. Enter the activated SSO user's email address.
4. Complete authentication at the identity provider.
5. Confirm the user returns to the Singular Dashboard and has the intended account access.

Singular's support documentation states that multi-factor authentication is handled by the SSO provider. Configure and test that behavior through your provider.

## Troubleshoot

| Symptom | Check |
| --- | --- |
| Single sign-on settings are missing | SSO activation for the account and the current user's Administrator permissions. |
| SAML response is rejected | Entry point, issuer, public signing certificate, and the exact callback URL. |
| A user cannot complete login | The user's SSO registration, validation email, and identity-provider access. |
| The identity provider cannot be reached | Identity-provider endpoint connectivity and the network access required by your deployment. |
| SSO configuration prevents access | Sign in with the retained standard administrator and contact [Singular Support](https://support.singular.live/hc/en-us/requests/new). |

Shared app-token URLs and REST authorization are separate from account SSO. For application pairing and its tokens, see [Pair an application with overlays.uno](pair-an-application-with-overlays-uno.md).

Sources: *Singular SSO-202407*, supplied PDF, version 1.10, July 2024, and the [Singular SSO support article](https://support.singular.live/hc/en-us/articles/4404845855501-Singular-SSO-Single-Sign-on), updated November 21, 2025. The supplied PDF's screenshots are expressed as setup steps above. Provider-specific configuration has not been tested by this guide.
