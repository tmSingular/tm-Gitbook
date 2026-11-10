# Data Streams

Send frequently changing feed values to running graphics. A publisher sends JSON through HTTP; composition scripts subscribe to the stream through the supported client and decide how to display each message.

## Data flow

```text
Data provider
  → HTTP PUT with the private write token
  → Singular Data Stream
  → subscription with the public read token
  → composition script
  → widget properties
```

The subscription delivers stream data over a WebSocket connection. HTTP publishing and WebSocket subscription are different sides of the same stream; you do not need to implement a raw WebSocket client in a composition script.

## When to use a stream

Use Data Streams for frequent feed updates such as telemetry, live statistics, or changing clock data. Use the Control App REST interface when your integration needs to update the app’s exposed operator inputs. A Data Stream does not automatically map JSON fields into Control Nodes or synchronize the operator form.

Keep editorial content and its consuming script in the relevant sub-composition. A feed can update script-owned widget properties while unrelated local operator controls and shared root styling retain their own ownership. An application may use one coordinator to distribute a shared feed to multiple modules, but that is a deliberate routing design rather than automatic broadcast into every widget.

## Read the section

| Task | Page |
| --- | --- |
| Send two values and see a graphic change | [Quick start](quick-start.md) |
| Create a stream and understand token roles | [Create a stream and find its tokens](create-a-stream.md) |
| Construct the HTTP request | [Publish data](publish.md) |
| Use the composition-script client | [Subscribe in a composition script](subscribe.md) |
| Understand payloads, retention, and timestamps | [Message format and timestamps](messages.md) |
| Handle waiting, reconnection, freshness, and cleanup | [Connection lifecycle](lifecycle.md) |
| Budget package size and connections | [Limits](limits.md) |
| Diagnose a result that does not update | [Troubleshooting](troubleshooting.md) |

Latency depends on the publisher, network, service, and rendering environment. This section does not promise a fixed end-to-end update time. A successful publish response and a visible change in an actual app output are separate observations.
