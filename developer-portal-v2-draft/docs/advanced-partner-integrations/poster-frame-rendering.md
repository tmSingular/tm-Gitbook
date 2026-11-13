---
description: "Render a requested frame from a Singular sequence and preserve the loaded renderer between poster-frame requests."
---

# Render poster frames

Use the Reframe single-frame render page to produce one image at a requested time in a Singular sequence. Keep both the executable and the render page alive between requests so the engine and composition can remain loaded.

This guide adapts the supplied poster-frame implementation notes and job file. For the underlying sequence structure, see [Render image sequences with Singular Reframe](singular-reframe.md).

## Use the single-frame job format

Set the render page to:

```text
https://app.singular.live/reframe/singleframe.html
```

In the job's `format` object, replace the sequence renderer's `beginTime` and `endTime` with `requestedTime`. This value is the time in **seconds** in the Singular sequence, not a frame index or wall-clock timestamp.

```json
{
  "format": {
    "width": 480,
    "height": 270,
    "frameRate": 60,
    "requestedTime": 3
  }
}
```

This fragment belongs inside a full job object. Preserve the `sequence` entries and their own `beginTime`/`endTime` fields: they still define subcomposition timing. The single-frame change applies to the `format` interval, not to every occurrence of timing fields in the job.

## Adapt the example job

[Download the generic single-frame job](examples/single-frame-job.json).

The download preserves the supplied sample's sequence timing and payload structure, with composition/asset URLs, subcomposition IDs, and local paths replaced by generic example values. Before use:

1. Set `composition` to your accessible composition JSON or pinned revision URL.
2. Replace each `SUBCOMPOSITION_ID_*` key with the corresponding real subcomposition ID.
3. Match payload field names and types to the composition, and replace example image URLs.
4. Set a writable `output.folder` and a suitable filename pattern.
5. Set the output size, `frameRate`, and `requestedTime` for the desired poster image.

The file is valid JSON but requires those replacements before it can render useful output. Retain revision and job identity with cached results so frames from different compositions or payloads are not confused.

## Derive the filename

The implementation notes specify the frame number as:

```text
frameNumber = Math.floor(requestedTime * frameRate)
```

With `requestedTime = 3`, `frameRate = 60`, and `output.file = "%05d.png"`, the expected file is **`00180.png`**. Floor is significant when the requested time does not land on a whole frame. Verify fractional-frame-rate behavior with the actual renderer.

Reusing the same directory and filename pattern can target the same filename for repeated requests at the same frame number. Give different jobs separate output destinations or manage the files explicitly to avoid returning a stale result.

## Keep the renderer and page loaded

Keeping the CEF process alive saves process startup time. Keeping `singleframe.html` loaded also preserves the page's render engine and composition. Reloading or navigating that page before or after each request loses that in-memory state and requires it to be downloaded and initialized again.

Preserve the same loaded page while scheduling further frame requests through the mechanism supported by your Reframe integration. The supplied notes and JSON do **not** define the IPC, command-line, HTTP, or JavaScript interface for submitting another request to a running process. Confirm that interface with Singular rather than inventing an endpoint.

Distinguish between repeated frame requests for a retained composition and a deliberate change of composition or job state. Verify when your integration needs to reload or reset, and avoid retaining stale payloads across unrelated jobs.

A disk cache is complementary; it does not replace the benefit of keeping the page and composition in memory.

## Version and capability checks

The source notes state that the Singular backend has no detailed version number to query, and distinguish the API generations `apiv1` and `apiv2`. Those names are not Reframe feature versions.

Record the Reframe executable build, render page, and job format supported by the assigned integration. Confirm current single-frame capabilities with Singular; do not infer support from an API-generation label or promise that a backend version endpoint exists.

## Verify repeated rendering

Verify the 3-second, 60-fps example produces the expected image and filename. Test different requested times, repeated requests at the same time, changed payloads, missing assets, and output-directory failures. Measure cold startup separately from repeated requests using the same loaded page. Confirm by instrumentation that the page does not reload between requests.

Source: *Poster Frame Rendering* and the supplied `singleFrameJob.json`, both undated. The example was sanitized for reuse and checked for JSON structure and filename arithmetic. No Reframe job was executed during documentation integration.
