---
description: Network access for Singular interfaces, output, and real-time connections.
---

# Firewall and network requirements

Use this guide to configure outbound firewall and web-proxy access for Dashboard, Composer, Overlays.uno, control apps, and browser outputs. Apply the relevant rules on each operator, authoring, and rendering machine. A control workstation and a separate output renderer each need access to their own dependencies.

**`app.singular.live` is the primary Singular hostname for production use.** Allow it for Dashboard, Composer, Singular control apps, outputs, and hosted libraries used by the selected workflow. Production URL patterns include `https://app.singular.live/dashboard`, `https://app.singular.live/compositions/<composition-id>/edit`, `https://app.singular.live/control/<app-token>`, and `https://app.singular.live/output/<output-token>/<output-name>`.

The baseline below was assessed on **10 November 2026**, using authenticated Dashboard and Composer sessions, Studio and Uno control apps, an output, and the public Overlays.uno portal. The original Singular inspection used a development environment; the rules below name the production hostname. Confirm backend, asset, and integration destinations in the production workflow. Account settings, storage backends, widgets, media, and application releases can change the destinations required.

## Ports and network policy

| Setting | Configuration |
| --- | --- |
| Direction | Outbound from the machines that use the selected workflow, with established return traffic. |
| TCP 443 HTTPS | Pages, authentication, APIs, assets, and uploads. |
| TCP 443 WSS | Persistent bidirectional secure WebSockets for the selected state backend and optional live services. |
| DNS | Use the organization's approved resolver and FQDN rules that track address changes. No permanent IP allowlist is established here. |
| Inbound access | No unsolicited inbound rule, public listener, or port forwarding is required by the inspected core web workflows. |
| Other ports | No additional TCP or UDP ports were established for core operation. Assess media integrations separately. HTTP 80 is conditional for legacy content or redirects, rather than a baseline requirement for the inspected HTTPS URLs. |

Opening a page successfully does not establish that authentication renewal, live updates, saving, or media playback works. Test those operations separately.

## Connection summary

All connections in this table use outbound TCP 443. Replace placeholders with the values used by the deployed app or composition.

| Service | Domains and URL paths | WebSocket endpoint | Database or store identifier |
| --- | --- | --- | --- |
| Firebase database | Logical host such as `fiery-torch-2122.firebaseio.com`, plus routed backend hosts under `*.firebaseio.com`. HTTPS long-poll fallback uses `/.lp`. | `wss://<database-host>/.ws?v=5&ns=<namespace>`; the backend host can change. | `ns=<namespace>`, such as `fiery-torch-2122`. A data path such as `/accounts/<account-id>/appinstances/<app-id>` selects application data, not a separate network socket. |
| Datastore app state | `datastore.singular.live`; HTTPS initial state at `/v1/<app-datastore-id>`. | `wss://datastore.singular.live/socket.io/?EIO=4&transport=websocket&ds=<app-datastore-id>` | `ds` is the app's Datastore identifier. Use the value assigned to that app. |
| Datastore composition state | `datastore.singular.live`; HTTPS initial state at `/v1/<composition-datastore-id>`. | `wss://datastore.singular.live/socket.io/?EIO=4&transport=websocket&ds=<composition-datastore-id>` | `ds` is the composition's Datastore identifier. It can differ from the control app's identifier. |
| Firebase authentication | `identitytoolkit.googleapis.com`, including `/v1/accounts:signInWithCustomToken` and `/v1/accounts:lookup`; `securetoken.googleapis.com` for refresh at `/v1/token`. | These authentication requests use HTTPS rather than WebSockets. | No database or socket ID applies. The refresh endpoint is defined in the SDK; refresh was not observed during the short inspection. |
| Composer AI when enabled | The Composer page origin, `app.singular.live` for production. | `wss://app.singular.live/<returned-socket-path>` | The pairing API returns the path/session. No permanent path or session ID was established. |
| Overlays.uno portal and SDKs | `https://overlays.uno/`, `https://app.overlays.uno/`, and API routes under `/apiv2/`. | No independent portal WebSocket endpoint was established. A launched control app uses its selected backend. | Use the launched app's database or Datastore identifier. |

### Database identifiers and socket session IDs

For an FQDN firewall, allow the destination hostname and TCP 443. The Firebase namespace and Datastore `ds` values are application identifiers, not ports, IP addresses, or hostnames. A URL-aware proxy must preserve endpoint paths and query strings. If it filters `ns` or `ds`, validate initial-state requests and reconnects as well as the first connection.

Socket.IO/Engine.IO `sid` values and Firebase session identifiers are temporary connection values. Do not hardcode them into firewall rules. Database/store identifiers can also change when an app or composition is copied or migrated.

Independent WSS handshakes succeeded for Firebase and Datastore. The Firebase hello returned a backend hostname different from the logical database host, so an exact rule for only the logical host may be insufficient. `*.firebaseio.com` is the broad operational pattern used here; a narrower policy must account for backend routing changes.

## Destination groups

Use these groups as implementation building blocks. Within the content and embedded-library groups, select the hosts required by the deployment case.

| Group | Domains | Protocol and purpose |
| --- | --- | --- |
| A Shared interface | `app.singular.live`, `cdnjs.cloudflare.com`, `stackpath.bootstrapcdn.com`, `fonts.googleapis.com`, `fonts.gstatic.com` | HTTPS for production pages, APIs, hosted libraries, styles, and fonts. Add WSS on `app.singular.live` for optional Composer AI. |
| B Singular content | `assets.singular.live`, `image.singular.live`, `apptemplates.singular.live`, `widgets.singular.live`, `libs.singular.live`, `preview.singular.live` | HTTPS for composition assets, thumbnails, app-template/widget catalogs, renderer SDKs, and preview inventory. Hosted resources on `app.singular.live` are covered by group A. |
| C Firebase authentication | `identitytoolkit.googleapis.com`, `securetoken.googleapis.com` | HTTPS for sign-in, account lookup, and token renewal. |
| D Firebase database | `*.firebaseio.com` | HTTPS and WSS for logical database and routed backend hosts. |
| E Singular Datastore | `datastore.singular.live` | HTTPS initial-state requests and WSS live synchronization. The inspected client explicitly requires WebSockets. |
| F Composer storage | `s3.us-west-1.amazonaws.com` | HTTPS direct storage/save traffic observed for the inspected composition. Preserve signed URLs and required upload methods. Check other accounts and upload workflows for additional signed storage destinations. |
| G Uno portal and SDKs | `overlays.uno`, `app.overlays.uno` | HTTPS portal, API base, and SDKs. The app root redirected to `overlays.uno`, while code and embedded SDKs still referenced `app.overlays.uno`. |
| H Embedded libraries | `maxcdn.bootstrapcdn.com`, `www.gstatic.com` | HTTPS Studio icon stylesheet, Uno embedded Firebase SDK, and Google Charts widget libraries, as applicable. |

For simpler maintenance, `*.singular.live` can replace individual Singular subdomain objects. It is broader than the exact-host list and does not cover Firebase, S3, Google, CDNs, or Overlays.uno. The corresponding broader Uno option is `overlays.uno` plus `*.overlays.uno`. Check wildcard/apex matching on your firewall.

## Rules by deployment case

| Case | Source machines | Destination groups |
| --- | --- | --- |
| Dashboard | Dashboard operator workstations. | A and C; B thumbnails/catalogs/assets as used; D where Firebase data is required. |
| Composer | Authoring workstations. | A, B, C, and F; D or E for composition state; external widget/script destinations. |
| Overlays.uno portal | Portal operator workstations. | G and B asset/image hosts; add the control-app or output case when launching it. |
| Studio control app using Firebase | Control workstations or browser docks. | A, C, D, B preview/renderer hosts, and the Studio stylesheet host from H. |
| Uno control app using Datastore | Control workstations or browser docks. | A, E, G, B preview/renderer hosts, and `www.gstatic.com` from H. |
| Output URL | Every machine that actually renders the output. | A, B renderer/asset hosts, D and/or E according to app and composition state, and external content destinations. |

### Dashboard

Allow `app.singular.live` and its normal HTTPS APIs, Firebase authentication, thumbnails from `image.singular.live`, and template icons from `apptemplates.singular.live`. Include `assets.singular.live` when browsing or opening assets. An exact minimum database policy was not proven for all Dashboard workflows.

Preserve sessions, cookies, and authorization headers. If single sign-on is used, add the actual identity-provider hosts in the organization's redirect chain; see [Configure Singular SSO](configure-singular-sso.md).

### Composer and saving

Composer needs its composition assets, widget/template catalogs, state backend, and any services loaded by the composition's render area. The inspected composition used Datastore while the inspected Studio app used Firebase for app state. Do not assume they share one backend.

The editor requested `/apiv1/directtoS3/sign` and `/apiv1/directtoS3/compositionupdate` on the page origin and direct storage traffic to `s3.us-west-1.amazonaws.com/assets.singular.live/...`. Preserve signed query strings and upload headers. Permit required upload methods, including `PUT` where used, and appropriate upload size/time limits. Opening the editor does not prove changes will persist.

Add HTTPS access to `script.singular.live` when using the script example library. Optional Composer AI uses same-origin WSS with a socket path returned during pairing. Add WSS to `datastream.singular.live` when Singular Data Streams are configured.

### Overlays.uno and control apps

The public portal loaded its own scripts, local font, and `/api/home` from `overlays.uno`, JSON from `assets.singular.live`, and images from `image.singular.live`. Published code uses `app.overlays.uno` for APIs, including login and payment routes. The signed-in portal, Google sign-in, and billing workflows were not exercised; add their actual destinations when those workflows are required.

For Firebase-backed Studio, keep authentication, token renewal, and database WSS reachable. The configured auth domain `fiery-torch-2122.firebaseapp.com` is a conditional authentication-flow dependency; no request to it was observed.

For Datastore-backed Uno, HTTPS state retrieval alone is insufficient: the inspected client sets `transports: ["websocket"]`. Shared Firebase configuration or libraries do not prove that Uno uses Firebase for primary app state. Its embedded preview or composition may still require Firebase independently.

### Output and embedded previews

Apply output rules on the actual browser-source workstation or rendering service, independently of the control workstation. Include the page host, composition assets, fonts, renderer SDKs, app/composition state backends, and every external destination requested by the composition. A preview can load widget services even when an element is not visibly on air.

After changing an app's storage backend, recheck both operator and output networks; see [Migrate Apps from Firebase to Datastore](../../releases-and-compatibility/releases-and-compatibility/migrate-apps-from-firebase-to-datastore.md).

## Proxy and TLS configuration

- Support HTTPS `CONNECT` tunneling where a forward proxy is used, WSS handshakes, persistent bidirectional connections, heartbeats, and reconnection. Preserve required upgrade and authentication headers.
- Preserve cookies, authorization headers, signed URLs, query strings, normal CORS/preflight behavior, and the API/upload methods used by the workflow.
- Set upload size/time limits for the largest expected composition or media asset. Test saving and uploading independently from page loading.
- Keep TLS certificate validation active. Avoid rewriting scripts protected by integrity checks. If TLS inspection causes a reproduced compatibility problem, use a narrowly scoped exception approved by the network team; no universal inspection bypass was established.

The tested Datastore server advertised a **25-second ping interval** and a **20-second ping timeout**. An idle timeout of at least **120 seconds** is an initial engineering setting with headroom, not a published Singular minimum. Validate long-running sessions, token renewal, and recovery on the target network.

## Conditional services and external content

| Feature | Additional requirements |
| --- | --- |
| Script example library | HTTPS to `script.singular.live` for the inventory and example files. |
| Singular Data Streams | WSS to `datastream.singular.live` when streams are configured. |
| Location and mapping | `api.mapbox.com` for Uno location search and `maps.googleapis.com` for the Google Maps widget. Validate additional map assets. |
| Video and media | Permit the actual playback/CDN hosts and any media-specific transports for supported widgets in use. |
| Support and help | `assets.zendesk.com` and `singularlive.zendesk.com` are configured support hosts; other Zendesk/CDN destinations were not exhaustively captured. `resources.overlays.uno` serves Uno help content. |
| Billing | Add actual payment-provider destinations only for subscription/billing workflows. Stripe integration is defined in portal code; checkout was not exercised. |
| Custom assets and data | Add the exact hosts and redirects used by images, videos, fonts, sheets, feeds, custom widgets, and composition scripts. |
| Analytics and marketing | Requests to `service.singular.live`, `www.google-analytics.com`, and `www.googletagmanager.com` were observed, with additional Uno marketing destinations. These are not proven mandatory for rendering/control. `service.singular.live` also has feature APIs; assess relevant paths before blocking the whole host. |

Do not automatically permit all AWS, Google APIs, advertising networks, or every external link found in code. Apply feature-specific rules and validate any policy that blocks optional telemetry against the workflows in use.

## Validate from the target network

1. Sign in to Dashboard and confirm folders, thumbnails, icons, and catalogs load.
2. In an authorized test composition, open Composer, change a harmless value, save, reload, and verify persistence. Test an asset upload and preview separately.
3. Test the chosen Uno portal login, library, and upload workflows where required. Test billing only if it is in scope.
4. Open the control app and output on their actual deployment machines. Change a test control and confirm that the rendered output updates promptly.
5. Keep sessions open through authentication renewal, then verify reconnection after a brief network interruption.
6. Exercise each required external widget, data feed, and media source. Inspect browser, firewall, and proxy logs for failed HTTPS requests and WSS handshakes.

| Symptom | First checks |
| --- | --- |
| Blank interface or missing icons | Page/CDN requests, font/catalog hosts, content rewriting, and certificate errors. |
| Login fails or expires later | Identity-provider chain, Firebase authentication/refresh hosts, cookies, and authorization headers. |
| Page loads but live updates stop | WebSocket handshake, Firebase backend routing, Datastore `/socket.io/`, idle timeout, and reconnect attempts. |
| Composer opens but changes do not persist | State connection, signed storage requests, storage host, upload methods/limits, and save API responses. |
| One widget or video fails | Its external hosts and redirects, API credentials, payload validity, and supported media format. Application errors are not automatically firewall faults. |

Record the enabled cases, source device groups, destination rules, proxy settings, and acceptance results in the network change record. Revalidate after application releases, account/backend changes, storage migrations, or composition changes.

For unresolved failures, provide the affected interface, blocked hostnames, reproduction steps, and relevant versions through [Support and service status](support-and-service-status.md). Remove app tokens, signed URLs, authorization headers, and credentials from shared diagnostics.

## Assessment limits

The inspection confirmed HTTPS dependencies and Composer's Datastore connection through browser resource inventories and console logs. Independent probes verified Firebase and Datastore WSS handshakes. Token refresh and optional services were also identified in published code where noted.

No complete browser HAR/WebSocket-frame capture, manual save acceptance test, long-duration renewal test, authenticated Uno portal test, or full media acceptance test was completed. This is an observed deployment baseline, not an exhaustive guarantee for every account or a replacement for acceptance testing on the target network.
