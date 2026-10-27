---
description: >-
  Overlay examples to test the performance of your hardware, encoding pipeline,
  and check its compatibility.
---

# Performance Testing and Browser Diagnostics

## Performance testing

Use these test overlays to verify browser rendering, CEF rendering, and your full output pipeline.

Run the tests in order. Start in a browser. Then test the same URLs in your production pipeline.

Your goal is a stable `60fps` result with no dropped frames, stutter, tearing, or visual artifacts.

{% hint style="info" %}
GPU acceleration is strongly recommended. This matters most for animation, scrolling tickers, and high pixel fill rate scenes.
{% endhint %}

### Run the tests in order

#### 1. Static Rectangle

Use this as the first smoke test for loading and rendering an output URL.

Expected result:

* The overlay loads quickly.
* The rectangle stays stable.
* No flicker, tearing, or scaling issues appear.

[https://app.singular.live/output/5ZzzJADkEiSGsfZxxbltbJ/Output?aspect=16:9](https://app.singular.live/output/5ZzzJADkEiSGsfZxxbltbJ/Output?aspect=16:9)

#### 2. Moving Rectangle

Use this to verify basic horizontal animation.

Expected result:

* Motion stays smooth at `60fps`.
* Movement does not jitter.
* Frames do not drop during playback.

[https://app.singular.live/output/7oTbGvhQYlmEHWIWE4NWCg/Output?aspect=16:9](https://app.singular.live/output/7oTbGvhQYlmEHWIWE4NWCg/Output?aspect=16:9)

#### 3. Static 20 Text Elements

Use this to verify text rendering performance and clarity.

Expected result:

* All text renders sharply.
* Layout stays stable.
* No missing glyphs or delayed text paint appear.

[https://app.singular.live/output/4BxIZCOM2J5PPgojAnZfRj/Output?aspect=16:9](https://app.singular.live/output/4BxIZCOM2J5PPgojAnZfRj/Output?aspect=16:9)

#### 4. Static Example Graphics

Use this to test a more realistic overlay with text, images, and basic widgets.

Expected result:

* All elements render correctly.
* Images load cleanly.
* Layering and alignment stay correct.

[https://app.singular.live/output/6MAXCzTulkAyZlGPHfYJoM/Output?aspect=16:9](https://app.singular.live/output/6MAXCzTulkAyZlGPHfYJoM/Output?aspect=16:9)

#### 5. Pixel fill rate performance of CEF

Use this as a stress test for heavy rendering load.

Expected result:

* Systems with a GPU should stay near `60fps`.
* CPU-only systems usually render at much lower frame rates.
* Performance should stay stable over time.

[https://app.singular.live/output/3KM3hemkGlLdPfBrHVCXuK/Output?aspect=16:9](https://app.singular.live/output/3KM3hemkGlLdPfBrHVCXuK/Output?aspect=16:9)

#### 6. Combined test

Use this as the final validation pass. It combines scrolling motion, frame timing, and color checks.

Expected result:

* The ticker scrolls smoothly.
* The frame counter and FPS meter stay stable.
* The color bar displays in the correct pixel order.

[https://app.singular.live/output/6W76ei5ZNekKkYhe8nw5o8/Output?aspect=16:9](https://app.singular.live/output/6W76ei5ZNekKkYhe8nw5o8/Output?aspect=16:9)

### Browser diagnostics

Use this page to inspect browser and pipeline capabilities.

Check for:

* browser feature support
* graphics acceleration behavior
* rendering issues in your integration

[https://app.singular.live/BrowserDiagnostics.html](https://app.singular.live/BrowserDiagnostics.html)

### Common failures

#### Static test fails

This usually points to a basic browser, integration, or output loading issue.

#### Animation test fails

This usually points to frame pacing, GPU acceleration, or compositor issues.

#### Text or graphics render incorrectly

This usually points to font, scaling, image decode, or browser compatibility issues.

#### Stress test drops frames

This usually means the system cannot sustain the required rendering load.

#### Color bar looks wrong

This usually points to a pixel format or channel order issue in the pipeline.

### Next steps

If these tests do not pass cleanly, review your browser configuration, GPU usage, and encoding pipeline before moving to production workloads.
