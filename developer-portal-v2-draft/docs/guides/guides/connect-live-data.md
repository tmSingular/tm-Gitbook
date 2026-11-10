# Connect live data

Choose the update path before writing a feed integration. Control App REST updates exposed operator inputs. Data Streams deliver frequent feed values for a running graphic’s composition script to interpret.

Start with the self-contained [Data Streams quick start](../../api-and-sdk-reference/api-and-sdk-reference/data-streams/quick-start.md): create a stream, subscribe in a sub-composition, publish two JSON values, and verify both changes without reloading.

| Task | Local reference |
| --- | --- |
| Create the stream and understand token roles | [Stream setup](../../api-and-sdk-reference/api-and-sdk-reference/data-streams/create-a-stream.md) |
| Send JSON with the private write token | [Publish data](../../api-and-sdk-reference/api-and-sdk-reference/data-streams/publish.md) |
| Receive it with the public read token | [Subscribe](../../api-and-sdk-reference/api-and-sdk-reference/data-streams/subscribe.md) |
| Understand retained values and application timestamps | [Message format](../../api-and-sdk-reference/api-and-sdk-reference/data-streams/messages.md) |
| Plan freshness, reconnection, and cleanup | [Connection lifecycle](../../api-and-sdk-reference/api-and-sdk-reference/data-streams/lifecycle.md) |
| Diagnose a missing update | [Troubleshooting](../../api-and-sdk-reference/api-and-sdk-reference/data-streams/troubleshooting.md) |

Keep editorial content and its consumer local to the owning sub-composition. Preserve unrelated operator controls and shared styling. Define waiting, clearing, and stale-data behavior for your application, then test the actual app output separately from script preview.
