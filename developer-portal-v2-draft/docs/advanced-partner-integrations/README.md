---
description: "Advanced integration patterns for partners embedding Singular APIs, SDKs, and overlays into their applications."
---

# Advanced partner integrations

Build deeper integrations between your application and Singular services. These guides cover workflows that combine account connection, APIs, embedded graphics, and control interfaces.

Some workflows require partner onboarding. Singular supplies the enabled endpoints, identifiers, and callback configuration for each integration. Request these details before implementing or testing a partner connection; the examples use placeholders rather than endpoints assigned to a particular application.

## Integration guides

* [Pair an application with overlays.uno](pair-an-application-with-overlays-uno.md) — connect a user's account, exchange a single-use code for tokens, and load the user's overlays into your application.
* [Optimize CEF integration](optimize-cef-integration.md) — render graphics off-screen, handle transparency, and synchronize with a host video pipeline.
* [Integrating with CEF version 103](integrating-with-cef-103.md) — historical Windows and OBS-patched CEF findings, shared textures, audio, and rendering tests.
* [Singular Broadcast Output](broadcast-output.md) — prepare graphics separately from on-air output and copy state through REST commands.
* [Configure Singular SSO](configure-singular-sso.md) — enable SAML account authentication and provision SSO users.
* [Select control apps and load a local preview](control-app-selection-and-preview.md) — browse a production folder and load the selected app without account-wide composition requests.
* [Integrate Singular Sign-In](singular-sign-in.md) — understand the historical callback and code-exchange flow separately from tenant authorization.
* [Render image sequences with Singular Reframe](singular-reframe.md) — define sequence jobs, pin composition revisions, and configure image output.
* [Render poster frames](poster-frame-rendering.md) — request a single frame and retain the render page between jobs, with a downloadable JSON template.
* [Migrate Apps from Firebase to Datastore](migrate-apps-from-firebase-to-datastore.md) — coordinate app and shared data-node storage changes, account defaults, and output reconnection.

## Plan your integration

Agree with Singular on the environments, application identity, callback handling, and APIs or SDKs your application needs. Keep the assigned configuration separate from your application logic so you can test against the appropriate environment.

The CEF 103, Sign-In, and Reframe sequence guides record historical implementations. Validate version-specific APIs and the capabilities of your selected environment before release.

Partner-specific endpoint assignments and setup details are supplied separately. This section documents the reusable integration behavior.
