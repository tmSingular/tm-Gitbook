---
description: "Define a Singular Reframe job to render an animated composition as a PNG image sequence."
---

# Render image sequences with Singular Reframe

Singular Reframe renders frames from an animated Singular composition to an image sequence. A job JSON file defines the composition, subcomposition timing and payloads, output dimensions, frame rate, and destination files.

This guide adapts *Singular Reframe v1.0*, April 14, 2021. That version documents a Windows executable. Obtain the supported binary and runtime requirements from Singular; this page does not establish a current installer or platform-support list. For a single poster image and process reuse, see [Render poster frames](poster-frame-rendering.md).

## Prepare a working directory

The source uses this layout:

```text
C:/Reframe/
  GPUCache/
  output/
  reframe-bin/
  reframe-job.json
```

Place the supported Reframe distribution in `reframe-bin`, prepare a writable output directory, and install the matching Microsoft Visual C++ runtime required by that distribution. Use your own paths. Directory names in the example are conventions rather than fixed installation requirements.

## Define an image-sequence job

The following job is a template. Replace the composition revision URL, subcomposition ID, payload fields, and output path with values for your composition before rendering.

```json
{
  "url": "https://app.singular.live/reframe/default.html",
  "composition": "https://assets.example.com/composition-revision.json",
  "sequence": {
    "SUBCOMPOSITION_ID": [
      {
        "beginTime": 1,
        "endTime": 6,
        "controlNode": {
          "payload": {"Title": "Example title"}
        }
      }
    ]
  },
  "format": {
    "width": 1920,
    "height": 1080,
    "frameRate": 60,
    "beginTime": 0,
    "endTime": 10
  },
  "output": {
    "folder": "C:/Reframe/output",
    "file": "Frame%05d.png"
  }
}
```

| Field | Meaning |
| --- | --- |
| `url` | Render page for this job type. The historical sequence renderer uses `https://app.singular.live/reframe/default.html`. Keep it matched to the supported renderer rather than substituting an output URL. |
| `composition` | Composition API Token or composition JSON URL. |
| `sequence` | Mapping from subcomposition IDs to timed entries and Control Node payloads. Times are in seconds. |
| `format.width`, `format.height` | Output dimensions in pixels. |
| `format.frameRate` | Requested output frames per second. |
| `format.beginTime`, `format.endTime` | Portion of the sequence to render. |
| `adaptiveGlobals` | Optional adaptive-graphics values, keyed by globals IDs defined by the composition. |
| `output.folder` | Writable destination directory. |
| `output.file` | Image filename pattern containing a numeric placeholder such as `%05d`. |

The sequence entry's `beginTime` and `endTime` describe its timing within the composition sequence. The fields under `format` select the overall render interval; these are separate levels of the job.

Payload keys and types must match your composition. Do not assume the sample's `Title` field exists in another composition. The supplied material does not define interval boundary inclusivity or all animation evaluation details; verify the first and last frames against your intended sequence.

## Choose a stable composition version

A Composition API Token follows the composition's current state in Composer. Later edits can therefore change a render made from the same job.

For reproducible output, use a **Revision URL**: an immutable composition JSON snapshot created when that revision was saved. The source shows copying it from the composition's **Revisions** controls. Record the revision and job together, and ensure the renderer can access the referenced images, fonts, and other assets.

## Run the job

From the example working directory in PowerShell:

```powershell
& '.\reframe-bin\reframe.exe' --job='.\reframe-job.json' --thread=8 --cache-path='.\GPUCache'
```

Use thread counts appropriate to your host after measurement. The source documents:

| Option | Behavior in the documented version |
| --- | --- |
| `--job=PATH` | Location of the job JSON file. |
| `--disable-gpu` | Forces CPU-only rendering. GPU rendering is the default. |
| `--thread=N` | Number of image-encoding threads; the source's default is one. |
| `--cache-path=PATH` | Browser download-cache directory. The source says no cache directory is used unless configured. |

The original debug command includes extra Chromium flags and a developer-specific log path. They are not required by the job format and are omitted from this generic launch example.

The source illustrates console progress and a final completion message. Check your executable's completion/error behavior and inspect the destination files before reporting success. A sequence pattern such as `Frame%05d.png` produces padded numeric filenames; verify numbering and expected frame count with your binary rather than inferring them solely from the selected interval.

## Review and troubleshoot

Check timing, typography, asset loading, alpha, image dimensions, and frame cadence with representative compositions. If rendering stalls, check the job syntax, revision accessibility, output permissions, and runtime compatibility. Compare CPU-only and GPU rendering for diagnosis, while retaining the supported GPU path for normal workloads.

A browser disk cache can reduce downloads after startup. It does not retain the loaded composition across page reloads. For repeated single-frame work, follow the [poster-frame process-reuse guidance](poster-frame-rendering.md#keep-the-renderer-and-page-loaded).

Source: *Singular Reframe v1.0*, April 14, 2021. The example job above is a generic template derived from its documented structure, not a rendered or benchmarked job. No installer or executable was run while integrating this content.
