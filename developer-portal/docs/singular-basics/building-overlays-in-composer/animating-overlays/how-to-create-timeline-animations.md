# How to create timeline animations

Timeline animations control the speed, duration, and style of how sub-compositions, groups, and widgets animate In and Out.

This guide shows you how to:

* [Change the timing of animations](how-to-create-timeline-animations.md#how-to-change-the-timing-of-animations)
* [Create independent In and Out animations](how-to-create-timeline-animations.md#how-to-create-independent-in-and-out-animations)
* [Change animation settings](how-to-create-timeline-animations.md#how-to-change-animation-settings)
* [How to use the Link Timelines feature to run timeline animations in nested sub-compositions](how-to-create-timeline-animations.md#how-to-link-timelines-to-run-the-timeline-animations-of-nested-sub-compositions)

## How to change the timing of animations

Timeline animations are represented by colored bars in the animation menu tab in the property panel. To change them

1. Navigate to the animation tab in the property panel.
2. Click, hold, and drag the bar left and right to change when the animation starts. Or click hold and drag either end of the bar to shorten or lengthen the duration of an animation.

<figure><img src="../../../.gitbook/assets/Timeline animations represented by colored bars.gif" alt=""><figcaption><p>Changing animation timing</p></figcaption></figure>

## How to create independent In and Out animations

To set up animations so they animate In differently than they animate Out

1. Navigate to the animation tab in the property panel.
2. Activate **2 timelines** in the top of the animation tab.
3. Select **Out1 to In** to configure the In animation and **In to Out2** to configure the Out animation.

<figure><img src="../../../.gitbook/assets/ Enabling two animation timelines.gif" alt=""><figcaption><p> Enabling two animation timelines</p></figcaption></figure>

{% hint style="info" %}
If you want an overlay to animate In and Out in the same way, don't use this feature.
{% endhint %}

## How to change animation settings

To fine-tune animation settings

1. Navigate to the animation tab in the property panel.
2. Click **the three sliders icon** on the timeline animation bar. You can change the type, direction, duration, and curve of animations.
3. Test your changes by clicking **In** and **Out** below the output window.

<figure><img src="../../../.gitbook/assets/Adjusting timeline animation settings.gif" alt=""><figcaption><p>Adjusting timeline animation settings</p></figcaption></figure>

{% hint style="info" %}
The Singular REST API and control applications can only control timeline animations that have been set to the root level of your composition tree structure. If you need timeline animations to play out in nested sub-compositions, use the link timelines feature.
{% endhint %}

## How to use the link timelines feature to run timeline animations in nested sub-compositions

You can force the Singular REST API and control apps to run the timeline animations of nested sub-compositions by linking timelines.

To play the animation timelines of a sub-composition nested beneath another sub-composition, right click the nested sub-composition in the composition tree and select **Link Timeline**.&#x20;

<figure><img src="../../../.gitbook/assets/Link Timeline feature.png" alt=""><figcaption><p>Choosing Link Timeline from the composition tree menu</p></figcaption></figure>

{% hint style="success" %}
When a timeline animation has been linked, it will turn green in the composition tree.&#x20;
{% endhint %}

You can also show or hide sub-compositions with linked timelines by toggling the linked timelines button (chainlink icon) in the top left of the composition navigator.

<figure><img src="../../../.gitbook/assets/Link icon.png" alt=""><figcaption><p>The linked timelines button in the composition navigator</p></figcaption></figure>
