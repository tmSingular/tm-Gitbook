---
description: "Historical Windows integration notes for the OBS-patched CEF 103 used by Singular Recast 2.0.1."
---

# Integrating with CEF version 103

This case study records Singular's September 20, 2023 work integrating an OBS-patched CEF 103 build into Recast 2.0.1 alongside NDI 5.5. It explains the rendering and audio decisions that can help diagnose an existing integration.

{% hint style="warning" %}
This is a historical, Windows-specific implementation, not a recommendation to choose CEF 103 for a new product. Callback signatures, shared-texture behavior, and resource lifetimes depend on the CEF distribution. Use the headers and documentation for the build you actually ship.
{% endhint %}

For the general pipeline design and corrected alpha, threading, and buffering guidance, start with [Optimize CEF integration](optimize-cef-integration.md).

## Why the browser engine changed

The team found overlays that worked in contemporary desktop browsers but failed in integrations based on CEF 75. One example was composition scripts using `String.prototype.replaceAll()`, unavailable in that older engine. Browser compatibility includes JavaScript, HTML, CSS, rendering, and resource use; test the embedded engine separately from a desktop browser.

The team's findings describe the versions available in 2023. They do not define today's supported browser or CEF baseline.

## Build and handler setup

The source used Windows CEF binaries distributed by OBS after encountering GPU and synchronization issues with other precompiled builds. Record both the Chromium/CEF version and the patch distribution when reproducing the environment.

The historical build linked `libcef.lib` and `libcef_dll_wrapper.lib`. Its client supplied:

* `CefClient::GetRenderHandler` for graphics callbacks.
* `CefClient::GetAudioHandler` for audio callbacks.

The [OBS account of its graphics synchronization hotfix](https://obsproject.com/blog/the-tale-of-a-legendary-hotfix) explains the earlier patched-build context. It describes OBS 27.2 and Chromium 95, rather than verifying this CEF 103 integration.

The original document lists these archived CEF 103 packages:

```text
https://cdn-fastly.obsproject.com/downloads/cef_binary_5060_windows_x64.zip
https://cdn-fastly.obsproject.com/downloads/cef_binary_5060_windows_x86.zip
```

These are historical references, not verified current downloads or installation instructions. Do not mix headers, wrapper libraries, and runtime binaries from different builds.

## Off-screen rendering and shared textures

Create the off-screen surface at the required resolution and frame rate. The source favored GPU rendering for demanding 1080p animation at 60 fps and used shared textures to avoid reading GPU pixels into main memory and uploading them again.

The OBS-patched build used this setting:

```cpp
// Historical OBS-patched CEF 103 configuration.
CefWindowInfo info;
info.shared_texture_enabled = true;
```

In that build, `OnAcceleratedPaint2` replaced `OnPaint` for this path. The source's signature was:

```cpp
// Fork-specific signature; not a portable CEF API.
OnAcceleratedPaint2(CefRefPtr<CefBrowser> browser,
                    PaintElementType type,
                    const RectList& dirtyRects,
                    void* share_handle,
                    bool new_texture);
```

The host opened the resource with `ID3D11Device1::OpenSharedResource1`, obtained an `ID3D11Texture2D`, inspected its descriptor, and created a shader-resource view when `D3D11_BIND_SHADER_RESOURCE` was present. Production code must check return values and manage COM object lifetime.

### Texture updates are build-specific

The source reports that this callback notified the application about a shared texture rather than delivering one notification for every rendered frame. The application retained the opened texture and sampled it at its output cadence while CEF continued updating it.

Do not apply that lifetime model to another CEF build. Confirm whether a shared handle or opened resource remains usable outside the callback, when it changes, and how producer/consumer access is synchronized. Handle resize, texture replacement, device loss, and shutdown. A shared handle alone does not guarantee synchronized access.

## Preserve transparency

The source describes the graphics as shaped fill, or premultiplied RGB. A downstream device expecting unshaped fill needs unpremultiplication: divide RGB by alpha only where alpha is greater than zero, and set RGB to zero at zero alpha. Perform this in a shader if the pipeline is already on the GPU.

Keep premultiplied RGB unchanged when compositing with the corresponding premultiplied blend operation. See [alpha handling](optimize-cef-integration.md#composite-premultiplied-alpha-correctly) before adding a conversion.

## Capture audio

The historical implementation configured `CefAudioHandler::GetAudioParameters` as follows:

```cpp
params.sample_rate = 48000;
params.frames_per_buffer = 1920;
params.channel_layout = CEF_CHANNEL_LAYOUT_STEREO;
return true;
```

It received audio through:

```cpp
OnAudioStreamPacket(CefRefPtr<CefBrowser> browser,
                    const float** data,
                    int frames,
                    int64 pts);
```

At 48 kHz, 1,920 samples represent 40 ms. This was the source's audio configuration, not a requirement for every video frame rate. Implement audio buffer ownership, timestamp interpretation, and audio/video synchronization according to your selected build's `CefAudioHandler` contract.

## Reproduce the rendering tests

The source supplied these test outputs. They contain shared output identifiers and may change or become unavailable; request maintained test assets from Singular before using them as release criteria.

| Test | What to inspect | Historical output identifier |
| --- | --- | --- |
| Static rectangle | URL loading, basic rendering, and dimensions | `5ZzzJADkEiSGsfZxxbltbJ` |
| Moving rectangle | Smooth horizontal motion and cadence | `7oTbGvhQYlmEHWIWE4NWCg` |
| Twenty text elements | HTML text rendering | `4BxIZCOM2J5PPgojAnZfRj` |
| Example graphics | Text, images, and basic widgets together | `6MAXCzTulkAyZlGPHfYJoM` |
| Pixel fill-rate workload | Throughput under heavy rendering | `3KM3hemkGlLdPfBrHVCXuK` |
| Ticker, frame counter, FPS meter, and color bars | Timing and pixel channel order | `6W76ei5ZNekKkYhe8nw5o8` |

The historical URL form is `https://app.singular.live/output/OUTPUT_IDENTIFIER/Output?aspect=16:9`. Replace `OUTPUT_IDENTIFIER` with an approved test output. Compare software and GPU paths on your actual target hardware; the source's performance observations are not benchmark guarantees.

Source: *Integrating with CEF version 103*, version 1.0, September 20, 2023. This migration preserves its build-specific findings without claiming current binary availability or runtime verification. Reference interfaces: [CEF client](https://github.com/chromiumembedded/cef/blob/master/include/cef_client.h), [render handler](https://github.com/chromiumembedded/cef/blob/master/include/cef_render_handler.h), and [audio handler](https://github.com/chromiumembedded/cef/blob/master/include/cef_audio_handler.h).
