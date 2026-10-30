# Verification

## State what each check proves

| Evidence                               | Establishes                                 | Does not establish                     |
| -------------------------------------- | ------------------------------------------- | -------------------------------------- |
| Model/link inspection                  | Stored values, source identities, ownership | Script execution or pixels             |
| Exact saved script readback            | Source persistence                          | Successful initialization              |
| Acknowledged composition save          | Saved composition checkpoint                | Actual app/extract delivery            |
| One Player capture                     | Sampled appearance at that state            | Continuity or future updates           |
| Later input in the same running Player | Reactive propagation to observed targets    | Operation of a real Control App slider |
| Timed movement/phase observations      | The tested temporal interval                | Every possible interruption/host       |
| Actual Control App and output test     | The exercised app delivery                  | Untested app variants                  |

## Minimum script checks

1. Identify the owning composition, script, named targets, controls, links, and loaded widget versions.
2. Define expected outputs before running each input/mode.
3. Verify initial rendering and later updates in one initialized Player, without using reload as the update mechanism.
4. Check each intended target positively; a whole-frame difference or one event alone is insufficient.
5. Test missing/invalid/empty input and the agreed failure presentation.
6. Close or replace the script and check that timers, frames, streams, and late writes stop.
7. Save and test the actual app/output path where required.

For a percentage control, test 100, an intermediate value such as 40, and 0. For repeated content, test initial, replace, shrink, empty, and restore. For native Timer, test pause/resume, reset/start, endpoint, signed/fractional adjustments, overtime, disabled rich events, and source filtering. For a clock, observe at least five visible changes.

## Timing and continuity

Waits and screenshot processing add variable elapsed time. A series of requested waits is not a precise transition clock. Timeline seeks inspect native composition motion, not arbitrary script-driven fades or widget Update effects. Settled endpoint captures do not prove a smooth transition or uninterrupted playback.

Observe phase or playback time in the same instance when continuity matters. Background recovery tests must establish the actual initiating suspension/resume condition, transport recovery, fresh data, and rendered recovery separately; manually triggering a handler does not reproduce a browser suspension.

## Interpret results carefully

Compare exact stored representations for model preservation, but compare parsed RGBA channels for rendered color equivalence. Equivalent CSS strings can be visually equal without being identical stored source.

Record asset failures independently; do not attribute unrelated missing images to a control edit. Contradictory captures remain unresolved even if other assertions pass. One anomalous frame needs repeat/adjacent evidence before attributing a runtime defect; do not loosen tolerance just to pass.

Static syntax checks and mocked API fixtures test source and local logic only. They do not validate actual widget rendering, event ordering, fonts, third-party transport, or Control App synchronization. Record each as independently tested, user-reported, or untested.

Composer AI users should use its supported bounded Player verification flow; see the separate [Composer AI guide](../../../guides/guides/work-with-composer-ai.md). Follow [Deployment](deployment.md) for the real output path.
