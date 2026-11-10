# Troubleshooting

| Observation | Check |
| --- | --- |
| Nothing loads | SDK script access, iframe existence and ID, iframe src origin, composition reference, and the load result’s success property |
| A failed load is treated as successful | Check result.success; `{success:false}` is a truthy object |
| Callback never behaves as expected | Use the verified method arity; do not insert a null output argument into loadComposition/renderComposition |
| A second load is rejected | Wait for the first callback; the bridge does not expose a cancellable SDK load |
| Root/child getters are undefined | Resolve wrappers after successful loading and replace stale references after reload |
| SDK input writes do not change text | Use the public Control Node ID, correct owning composition, correct value type, and the intended native link or script consumer |
| Remote app fields do not follow local edits | An extracted local preview is not a REST write to the app’s operator form |
| Local preview does not follow app edits | Check the chosen loading mode; reading compositionJson does not establish continuous app synchronization |
| Event registration throws | Use a name accepted by this SDK’s host registration allowlist |
| Listener behavior differs from composition scripts | Host callbacks are additive and receive two arguments; in-script listeners have a different ownership/propagation contract |
| An app REST read fails | Use a matching API origin/token and inspect the actual HTTP response and CORS behavior; do not assume the SDK authenticates your fetch |
| Form edits disappear | Preserve dirty drafts instead of refreshing every input from payload events |
| A Number unexpectedly becomes zero | Do not convert an empty input with Number without checking it first |
| Normalized input ranges look wrong | Raw input is 0–100; low/high describe its output mapping |
| Selection picks the wrong option | Preserve typed option IDs; HTML select values are strings, so map through an option index |
| A color loses transparency | Preserve alpha, for example with an rgba string; a plain RGB picker cannot represent it |
| Empty dates change the current time | Do not substitute Date.now for an empty editor; use explicit timestamp units and empty-value policy |
| A sequence starts at the wrong video position | Call seek(video.currentTime) before play; do not rely on the ignored play(time) argument |

## Verify in layers

Check the host source, SDK callback, selected composition ID, input values, and visible Player result separately. Verify the intended app output separately from an extracted preview. For animation/video cases, observe intermediate times and seeks rather than relying on one screenshot.

Use the local [quick start](getting-started.md), [loading sample](loading-methods.md), and [dynamic preview](local-preview-dynamic-form.md) before adding provider data or complex field types. Optional diagnostics should use concise labels and omit tokens; keep ordinary examples free of repeated warning/error output.
