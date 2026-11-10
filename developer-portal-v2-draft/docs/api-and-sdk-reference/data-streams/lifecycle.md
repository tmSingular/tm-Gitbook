# Connection lifecycle

A subscription has both connection state and data state. Keep these separate: a connection can be open while its latest data is old, and a reconnect can deliver a retained value that was published earlier.

## Initialization

1. Resolve the script-owned widgets in `init(compCurrent, context)`.
2. Set an intentional waiting presentation.
3. Create one subscription with the public token.
4. Process data only for the `message` status.

An existing stream can provide its retained latest value during connection. Do not assume the waiting presentation must remain visible for a particular duration, or that the first data callback corresponds to a new publisher action.

## Connection notifications

| Status | Application consideration |
| --- | --- |
| `connecting` | A connection is being established; keep the waiting or last-good presentation |
| `connect`, `open` | Connection notifications; neither proves a fresh sample has arrived |
| `message` | Consume `message.payload` according to the agreed data schema |
| `close`, `disconnect` | Connection notifications that require your disconnected/stale presentation policy |
| `error` | A client-reported issue; use deliberate diagnostics if needed |

These status names are the client callback vocabulary, not a promise that every session produces every status or produces them in table order. The section does not specify an automatic retry schedule, backoff interval, or reconnect delivery guarantee.

## Freshness and last-good content

Decide what the graphic should show when no value has ever arrived, when a value is malformed, and when a previously valid value becomes too old. Options include a waiting label, preserving the last good display, a stale indicator, or hiding the feed-driven module. These are application choices, not implicit Data Stream commands.

If updates can stop while a subscription remains open, a stale indicator needs its own age check; evaluating age only on new messages cannot detect a feed that has stopped. If the application schedules an age-check timer, close that timer along with the subscription. Use application timestamps or verified metadata as explained in [Message format and timestamps](messages.md).

## Reconnect and recovery

Do not open an additional subscription on each status callback. Define which code owns connection recovery, and test the actual supported client’s behavior before adding application retries. Retained latest data supports current-state initialization but does not establish history replay, exactly-once actions, or ordering of every intermediate publication.

Use test data that makes replay recognizable, such as an application-defined sample sequence. Treat it as part of your schema rather than a service guarantee. Verify recovery in the same Player and in the real output host.

## Cleanup

Close the subscription handle when the script unloads, and prevent late callbacks from writing after cleanup. Close any application-owned stale-data timers or requests as well. The [quick-start script](quick-start.md#3-subscribe) demonstrates the subscription closure using the standard init/close structure.

For optional status presentation, the [Context & utilities example](../../composition-scripting/api-reference/context-and-utilities.md#data-streams-separate-content-from-connection-status) displays connection state separately from received text. For optional colored, deduplicated diagnostics, use [reportOnce](../../composition-scripting/examples/report-once.md).

## Verification sequence

Test initial retained data, two new publications without reload, intentional clearing, an interrupted connection, resumed delivery, stale-data policy, and cleanup. A successful PUT, a new Player load, and a rendered update are distinct observations.

For a complete status-by-status diagnostic script, see [Log every callback status](subscribe.md#2-log-every-callback-status). It uses colored console.log entries and logs full messages so you can inspect the deployed envelope.
