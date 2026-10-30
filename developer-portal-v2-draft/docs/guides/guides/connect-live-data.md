# Connect live data

Choose the update path before writing a feed integration. REST is appropriate for Control App updates; Data Streams provide a separate path for frequent feed values consumed by a running graphic.

* [Data Stream publishing](../../api-and-sdk-reference/api-and-sdk-reference/data-streams/publish.md)
* [Subscribe from a composition script](../../api-and-sdk-reference/api-and-sdk-reference/data-streams/subscribe.md)
* [Connection lifecycle and cleanup](../../api-and-sdk-reference/api-and-sdk-reference/data-streams/lifecycle.md)
* [Scripting data ownership](../../composition-scripting/composition-scripting/core-concepts/data-ownership.md)

Verify with deterministic sample data before connecting the production feed. Test a second update in the same running Player, and define what the graphic should display when input is missing or stale.
