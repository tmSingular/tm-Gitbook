---
description: "Render Singular graphics with CEF off-screen rendering, preserve alpha, and synchronize frames with a host video pipeline."
---

# Optimize CEF integration

Use Chromium Embedded Framework (CEF) off-screen rendering to embed a Singular output in your application's video pipeline. The host owns frame transfer, compositing, timing, and output encoding.

This guide adapts the supplied optimization notes. For a Windows implementation using a historical OBS-patched build, see [Integrating with CEF version 103](integrating-with-cef-103.md).

## Choose a rendering path

| Path | Host receives | Main trade-off |
| --- | --- | --- |
| Software off-screen rendering | A CPU pixel buffer through `CefRenderHandler::OnPaint` | Simple to inspect, but copying, conversion, and blending can consume substantial CPU and memory bandwidth. |
| Accelerated off-screen rendering | A platform-specific GPU resource through the callback supported by your CEF build | Avoids GPU readback when the compositor can consume the resource, but requires explicit resource lifetime and synchronization handling. |

Keep GPU acceleration enabled for the normal graphics path and benchmark with representative animations. Use `--disable-gpu` or `--disable-gpu-compositing` only when deliberately testing a software path or diagnosing a build-specific problem. The source notes include these flags as a setup step, but they should not be a universal default for a GPU integration.

## Configure off-screen rendering

Enable windowless rendering in the CEF settings and create a windowless browser using the APIs in the headers shipped with your distribution. Provide the view dimensions through `GetViewRect`; account for the device scale factor when allocating pixel buffers.

Set `windowless_frame_rate` to an appropriate supported value for your pipeline, such as 50 or 60. Configure transparent rendering using your build's browser/background settings. Windowless mode alone does not establish the host's alpha handling.

Match the graphics resolution to the target output. Validate configuration against the installed CEF headers rather than copying constructor signatures from a different branch.

## Copy and retain software frames

`OnPaint` supplies a whole-image BGRA buffer with four bytes per pixel. The dirty rectangles identify the updated areas; they are not separate image buffers. Copy the pixels you need into memory owned by your host before returning from the callback. Do not retain the callback's buffer pointer for later use.

Keep these values with each retained frame:

* Width, height, and row stride.
* Pixel order and alpha convention.
* Frame sequence number or capture timestamp.
* The generation of the surface, so a resize cannot mix old dimensions with new pixels.

Check dimensions and allocation sizes before copying. Handle view and popup paint events deliberately rather than treating every event as the main graphics frame.

## Composite premultiplied alpha correctly

The source describes CEF's transparent graphics as premultiplied BGRA, also called **shaped fill** in broadcast workflows. Confirm the alpha convention of the actual path you use.

For premultiplied foreground color `F`, background color `B`, and alpha `a` in the range 0 to 1, composite onto an opaque background using:

```text
result.rgb = F.rgb + B.rgb * (1 - a)
```

The foreground RGB already includes its alpha. Multiplying it by alpha again darkens translucent edges. The original optimization notes show that extra multiplication; do not copy that equation for premultiplied input.

If a downstream device requires straight alpha or **unshaped fill**, convert explicitly:

```text
if a > 0:
    straight.rgb = clamp(F.rgb / a, 0, 1)
else:
    straight.rgb = 0
```

Retain alpha separately and avoid division by zero. Match channel order, color space, range, and alpha convention at each pipeline boundary. A conversion to a format without alpha needs a separate alpha/key path or prior compositing.

## Synchronize producer and consumer

CEF paint callbacks and your video consumer run on separate schedules. Follow the threading contract in your exact CEF headers; the upstream `CefRenderHandler` interface specifies its UI thread, which is distinct from assuming the host application's UI or video thread.

Use owned buffers and a synchronization strategy that prevents CEF from overwriting pixels while the compositor reads them. A straightforward initial design is:

1. Under a mutex, copy a complete paint into a pending host buffer and increment its sequence number.
2. On a video tick, take the mutex and transfer the pending frame to the current frame if its sequence number changed.
3. Read the current frame while its storage remains protected. If you release the mutex before an asynchronous upload or encode completes, give that consumer separate owned storage or hold a buffer lease until completion.

An atomic ready flag or atomic pointer swap alone does not protect buffer ownership. Use a proper queue, buffer pool, or GPU fence scheme before removing the mutex from a measured bottleneck.

### Reuse the latest valid frame

An unchanged page may not produce a new `OnPaint` event for every video tick. Continue using the latest valid frame until a new frame arrives. Absence of a callback does not mean that the overlay has become transparent.

Initialize new surfaces to transparent black. Clear them only on an explicit clear, navigation/reset policy, or failure state that your application defines. Apply that policy consistently to avoid stale graphics after an output is removed.

## Reduce copies and conversions

Keep the pipeline on the GPU when both CEF and your compositor support it. A shared texture can avoid a GPU-to-CPU readback followed by another GPU upload. Verify the platform API, callback, ownership, and fencing rules for the selected CEF build; fork-specific methods are not portable CEF APIs.

For a CPU pipeline, profile copies, color conversion, blending, and encoding separately. SIMD conversion can help after the format and alpha rules are correct.

Dirty rectangles can reduce updates to the **retained overlay surface**. They do not generally let you skip compositing unchanged overlay areas onto a new underlying video frame. If you update only dirty regions, preserve every unchanged pixel in the retained surface and correctly clear newly transparent areas.

The source describes Singular Recast using multiple GPU buffers while encoding previous frames. It also describes forcing DOM updates for a particular capture path. Treat that as implementation history, not a general requirement to mutate the page every video frame.

## Handle interlaced delivery downstream

CEF renders progressive images. If the delivery format is interlaced, generate the fields in your video pipeline. Verify field order and temporal sampling against the target format; alternating lines from one progressive frame do not reproduce motion sampled at two different field times.

## Validate the integration

Test transparent and partially transparent edges over both light and dark video, channel order with color bars, static graphics without new paints, moving graphics at the target cadence, resizing, clearing, and long-running playback. Measure frame age and dropped updates as well as average throughput. Include the GPU/driver combinations you support.

For pixel debugging, capture a frame with its width, height, stride, BGRA order, and alpha convention. Avoid synchronous disk writes inside the production paint callback.

Source: *Optimize CEF Integration*, supplied integration notes (undated). Corrections to the source examples are described above. API names and threading were checked against the [upstream CEF render-handler interface](https://github.com/chromiumembedded/cef/blob/master/include/cef_render_handler.h); use your distribution's headers as the implementation contract. See also Microsoft's [premultiplied-alpha description](https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-blendfunction). This guide does not establish a tested CEF build or benchmark.
