# Limits

| Limit | Value | Scope |
| --- | --- | --- |
| Maximum data package size | **60 KB** | One published package |
| Maximum simultaneous connections | **100** | One Data Stream |
| Daily or burst rate limiters | **None** | Distinct from Control App REST rate limits |

These are the published Data Stream limits checked for this draft on 2026-11-10. They do not define an unlimited throughput guarantee or a fixed end-to-end update time. The exact byte interpretation of “60 KB” is not specified here; leave room below the boundary rather than assuming 60,000 or 61,440 bytes.

## Keep packages focused

Send the data required for a coherent graphic update. Avoid repeatedly publishing images, large static documents, or unrelated records when a small set of values or asset references is sufficient. JSON byte size can differ from a JavaScript string’s character count, especially with non-ASCII text.

## Budget consumers

Account for active app outputs, additional Players, script-editor previews, development sessions, and other readers of the stream. Close subscriptions that are no longer needed. Do not infer an undocumented connection-sharing or multiplexing behavior from the number of widgets on screen.

If several modules require the same feed, a deliberate coordinator may consume it and distribute the data. That design must preserve each module’s ownership and source contract; it is not required for a single-widget integration.

## Separate rate limits

The Data Stream publishing endpoint has its own contract. Control App REST limits and access tokens are separate. A lack of daily/burst rate limiters does not remove the package-size or connection limits above. Choose an update frequency suited to the provider and graphic rather than publishing unchanged values unnecessarily.
