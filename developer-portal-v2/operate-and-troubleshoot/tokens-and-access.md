# Tokens and access

Use credentials only for their intended role and destination.

| Credential | Purpose |
|---|---|
| Shared app token | Documented access to one Control App instance |
| Private Data Stream token | Publish data to that stream |
| Public Data Stream token | Subscribe to that stream |

- [REST authorization](../api-and-sdk-reference/rest/authorization.md)
- [Data Stream authorization](https://developer.singular.live/data-stream-api/authorization)
- [Locate shared app tokens](https://developer.singular.live/singular-basics/managing-overlays-in-the-dashboard/how-to-find-an-apps-shared-app-token-and-shared-api-url)

Keep private write credentials out of client-side scripts, logs, and shared examples. Use the product's supported access-management workflow when a token must be replaced.
