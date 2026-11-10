---
description: Network access for Singular interfaces, output, and real-time connections.
---

# Firewall and network requirements

Singular's Dashboard, Composer, script editor, control apps, and output run as HTML5 web applications. They need access to the services used by the selected workflow, including secure WebSocket connections for real-time updates.

## Scope and source date

The matrices below reproduce the requirements in **Singular and Firewalls, version 1.5, May 2024**. They are a dated baseline, not a newly verified inventory of every current service. The source explicitly states that required URLs may change with future releases. Confirm the domains needed by your deployed workflow with Singular Support before using this list as a production allowlist.

`X` means the source lists the domain for that interface. A dash means the source does not mark it; it does not establish that the domain can always be blocked. The source does not classify entries as essential, optional, analytics, or support-only.

## Port and protocols

| Port | Protocol | Use |
| --- | --- | --- |
| 443 | HTTPS | Secure web requests. |
| 443 | WSS | Secure WebSocket connections listed below. |

Ensure the network path and any proxy support the WebSocket connections used by the app and output. A successfully loaded HTML page alone does not prove that real-time connections can be established.

## Domain matrix

| Domain | Dashboard | Uno App | Studio App | Output URL |
| --- | --- | --- | --- | --- |
| `*.bootstrapcdn.com` | X | X | X | - |
| `*.cloudflare.com` | X | X | X | X |
| `*.cloudfunctions.net` | - | X | X | X |
| `*.createjs.com` | - | X | X | X |
| `*.doubleclick.net` | X | X | X | X |
| `*.firebaseio.com` | - | X | X | - |
| `*.google-analytics.com` | X | X | X | X |
| `*.google.com` | - | X | X | X |
| `*.googleapis.com` | X | X | X | X |
| `*.googletagmanager.com` | X | X | X | X |
| `*.gstatic.com` | X | X | X | X |
| `*.jsdelivr.net` | - | X | X | X |
| `*.overlays.uno` | - | X | X | - |
| `*.rawgit.com` | - | X | X | X |
| `*.singular.live` | X | X | X | X |
| `*.stripe.com` | X | - | - | - |
| `*.stripe.network` | X | - | - | - |
| `*.youtube.com` | - | X | X | X |
| `*.zdassets.com` | X | X | X | - |
| `*.zendesk.com` | X | X | X | - |

## WebSocket matrix

| Connection | Dashboard | Uno App | Studio App | Output URL |
| --- | --- | --- | --- | --- |
| `wss://*.firebaseio.com` | X | X | X | X |
| `wss://datastore.singular.live` | - | X | X | X |

The WebSocket matrix is separate from the HTTPS domain matrix. Check both the app's storage backend and the connections used by its output; see [Migrate Apps from Firebase to Datastore](../../releases-and-compatibility/releases-and-compatibility/migrate-apps-from-firebase-to-datastore.md).

## Additional domains in your integration

The standard matrices do not cover every project dependency:

- Custom widgets, control apps, and composition scripts can load external libraries, fetch data, and establish their own WebSocket connections.
- Control app payloads and REST requests can refer to images, JSON, media, and other assets on external web servers. The browser that loads those assets needs access to their hosts.
- SSO sign-in also needs access to the organization's identity provider. Use the identity provider's requirements alongside [Configure Singular SSO](configure-singular-sso.md).

Inventory these dependencies for the actual composition, control app, and rendering environment.

## Validate from the target network

1. Open the Dashboard and the relevant control app, then open its output on the intended rendering device.
2. Inspect the browser's Network panel for failed HTTPS requests and WebSocket connection failures. Record the blocked host and request type.
3. Change a test control and confirm that the rendered output updates.
4. Exercise external assets, data feeds, and custom widgets used by the project.
5. Recheck connectivity after a storage migration or a change to the network policy.

For unresolved failures, provide the affected interface, blocked domains, reproduction steps, and relevant versions through [Support and service status](support-and-service-status.md). Remove app tokens and credentials from diagnostics.

Source: [Singular and Firewalls, May 2024](https://docs.google.com/document/d/1xntrhmpLKViC1lkoCqY2689Y15dwG4sxpJRZ9aKM8Es/edit), version 1.5. The Dashboard/Uno/Studio/Output markings were checked against the PDF's table layout.
