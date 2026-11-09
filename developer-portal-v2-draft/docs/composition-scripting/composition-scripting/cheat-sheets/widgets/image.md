# Image

Widget type **642**. Use an existing Image widget named `Image` in the script’s owning composition. The snippets are fragments inside `init(compCurrent)`; the script owns the fields it changes, which must be unlinked and free of competing animation writers.

## Properties

| Key | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `image` | string | `""` | URL of the image to display. Supports automatic resolution selection for eligible `wiImage.singular.live` URLs. |
| `objectFit` | string | `"contain"` | How the image fits the layout: `"contain"` (fit entirely, letterbox) or `"cover"` (fill entirely, crop). |
| `shift` | number | `0` | Horizontal/vertical shift as a percentage. Shifts the image alignment when it doesn't perfectly fit the layout. Range `-100` to `100`. |
| `flipX` | boolean | `false` | If `true`, flips the image horizontally. |
| `flipY` | boolean | `false` | If `true`, flips the image vertically. |


Any Default/fallback column describes the source reference, not a guarantee about your loaded instance. Confirm current field choices, units, and values before use.

## Read and update

```javascript
const wiMatches = compCurrent.findWidget("Image");
if (wiMatches.length !== 1) throw new Error("Expected exactly one Image");
const wiImage = wiMatches[0];
const current = wiImage.getPayload() || {};
wiImage.setPayload({ image: "https://example.com/photo.jpg", objectFit: "cover", shift: -20, flipX: true });
```

**Expected result:** the running widget consumes the supplied values; assets and templates must finish loading before judging the rendered result. Example URLs must be replaced with reachable assets. Reads return processed/cached widget content, not raw Control Node inputs.

## Features and behavior

Replace the example URL with a reachable image asset. `shift` is a percentage from -100 to 100. Loading is asynchronous; eligible Singular image URLs can receive automatic resolution selection. A failed load can leave the image hidden. Set `flipX: false` to undo mirroring.

## Events and messages

No message contract is established on this page. This does not establish that the widget has no messages.

## Compatibility and checks

These examples are reference-backed; this documentation update has not exercised a live widget version in Player. Check the exact loaded version, initial display, a second update, clearing/reset where supported, and relevant asset/template readiness. A payload readback alone does not prove appearance or playback.

For geometry use [transforms and visibility](../transforms-and-visibility.md), for native filters use [effects](../effects.md), and for nested values use [colors and nested objects](../colors-and-nested-objects.md). Calls affect the running Player; they do not save the Composer document or synchronize values into a Control App form.
