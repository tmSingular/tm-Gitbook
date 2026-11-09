# Video Background

Widget type **3936**. Use an existing Video Background widget named `Video Background` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Field | Type | Contract |
| --- | --- | --- |
| `videoFile` | URL string | Background clip |
| `objectFit` | selection | contain, cover, fill |
| `shift` | number | Inspect loaded alignment range |

Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Video Background");
if (wiMatches.length !== 1) throw new Error("Expected exactly one Video Background");
const wiVideo = wiMatches[0];
const current = wiVideo.getPayload() || {};
wiVideo.setPayload({ videoFile: "https://example.com/background.mp4", objectFit: "cover", shift: 0 });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

Muted looping video normally pauses on Out and resumes on In. Replacing its source while already Out can restart playback; Out is not a continuously enforced guard. There are no documented widget button actions.

## Events and messages

No message contract is established on this page. This does not establish that the widget has no messages.

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
