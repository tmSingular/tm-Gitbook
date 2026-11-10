# Troubleshooting

Start with the [quick start](quick-start.md) and deterministic text values before adding a production feed. Change one part of the path at a time: publisher, stream, subscription, script, and rendered output.

| Symptom | Check |
| --- | --- |
| Publishing does not return 200 | Use PUT, the private token in the endpoint path, Content-Type application/json, valid JSON, and a package below the size limit; inspect the actual response |
| Publishing succeeds but the graphic stays unchanged | Confirm that publisher and subscriber tokens belong to the same stream and that the intended Player is running the subscription script |
| The script cannot find its widget | Match the exact unique name and owning sub-composition; root widget lookup does not descend into every child |
| Data arrives but text does not change | Read message.payload.text for the text example, use the expected string field, and leave the destination text property unlinked |
| A value changes and immediately reverts | Check for a native link, another script, or animation writing the same destination field |
| The initial value appears but later values do not | Send a second distinct publication while keeping the same Player open; check subscription lifetime and callback routing |
| A newly opened Player shows old data | The retained latest payload can predate the connection; check the publisher and the application’s freshness timestamp |
| The connection is open but data is stale | Connection state does not prove new samples; evaluate data age separately |
| The graphic changes but Control App fields do not | Widget writes occur in the running output and do not synchronize the operator form |
| Script preview works but app output does not | Check saved scripts, composition changes, managed extract updates, actual output URL, and runtime context |
| Extra previews cause connection problems | Review all active consumers and the per-stream connection limit; release unused subscriptions |
| Clearing does not behave as expected | Use an explicit agreed clearing value; the text example clears with an empty string, not an omitted field |
| Several feed updates are missed after interruption | The documented retained value is current state, not a promise to replay every intermediate publication |

## Inspect the right layer

Record the HTTP status at the publisher, the callback status at the subscriber, and the visible widget result separately. Use short diagnostic labels and application sample IDs rather than logging private tokens or full production payloads.

The examples omit repeated warning/error branches. Add optional diagnostics with [reportOnce](../../../composition-scripting/composition-scripting/examples/report-once.md) when needed. Field-level validation, retry behavior, and stale-data presentation belong to the application contract.

## Minimal verification record

Record the target stream, public-token identity without exposing the token itself, composition/sub-composition, saved script or extract version, expected test text, observed text, and whether the second update arrived without a reload. For a freshness issue, record the application timestamp’s units and clock assumptions.

See [message format](messages.md), [connection lifecycle](lifecycle.md), and [limits](limits.md) before assuming that a publisher success response establishes final output delivery.
