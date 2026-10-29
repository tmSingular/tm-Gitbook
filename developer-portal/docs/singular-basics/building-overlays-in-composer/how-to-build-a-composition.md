# How to build a composition

Singular's Composer gives you the tools to create stunning overlays with impressive animations, powerful controls, and live data integration. But how do you go from a blank page to a full set of overlays? Follow this step-by-step guide to get started making basic overlays.

### 1. Open a blank composition

1. If you haven't already done so, [create a new composition in the Dashboard](../managing-overlays-in-the-dashboard/how-to-create-a-new-composition.md).
2. Double-click the name of the composition to open it in Composer.

### 2. Rename the default sub-composition

When you open a composition for the first time, you'll see an empty default overlay called Overlay 1 in the composition tree.

* Double-click **Overlay 1** to rename it.

<figure><img src="../../.gitbook/assets/Renaming the default subcomposition.png" alt=""><figcaption><p>Renaming the default sub-composition</p></figcaption></figure>

### 3. Assign the sub-composition to a logic layer

{% hint style="info" %}
Assigning a logic layer to a sub-composition allows overlays of the same type, or ones that sit in the same portion of the screen, to be smoothly replaced instead of displayed on top of each other.
{% endhint %}

To add an overlay to a logic layer

1. Open the composition navigator.
2. Click _**No Layer**_ and name the new layer.

{% hint style="info" %}
When you add another sub-composition, you can assign it to the same layer or create a new layer, accordingly.
{% endhint %}

<figure><img src="../../.gitbook/assets/Assigning a logic layer.gif" alt=""><figcaption><p>Selecting a logic layer for the overlay</p></figcaption></figure>

### 4. Add widgets to the sub-composition

There are two ways to add widgets to a sub-composition:

* By selecting a widget icon
* By choosing a widget from the widget library

For both

* Navigate to the composition tree and click the **small arrow** to the right of the sub-composition name.

{% hint style="info" %}
The name of the sub-composition will disappear from the composition tree and appear in the composition breadcrumb at the top of the screen. The composition breadcrumb should say the name of your composition followed by the name of the sub-composition.
{% endhint %}

In the composition toolbar

* Select the text, circle, rectangle, image, or video icon, **or**
* Select **Add** > **Widget** to choose widgets from the widget library.

From there, you just need to rename and configure the new widget.

#### To rename a widget

* Double-click its default name and enter a new one.

#### To configure a widget

* With the widget selected in the composition tree, navigate to the property panel and adjust the widget properties as needed.

{% hint style="info" %}
Repeat step four for as many widgets as needed.
{% endhint %}

<figure><img src="../../.gitbook/assets/Adding widgets.gif" alt=""><figcaption><p>Adding widgets to the sub-composition</p></figcaption></figure>

### 5. Reorder the sub-composition's widgets

If you haven't already done so, you might need to reorder the widgets in the sub-composition you just created in the composition tree so they display correctly.

The widget at the top of the list will be at the front, the second widget will be behind it, and so on.

### 6. Add control nodes

Now that you've built the structure of an overlay, you need to make certain elements available to be edited and controlled with a control app or by using the Singular APIs. To do this, you'll add control nodes for each element you want to control.

To add a control node

1.  Navigate to the data interface and control panel, select **Text** from the drop-down menu, and name the control node in **Field name**.

    <figure><img src="../../.gitbook/assets/Where to create a new control node.png" alt=""><figcaption><p>Where to create a new control node</p></figcaption></figure>
2.  In the composition tree, select a widget to connect to the control node. (You might need to click into a group or sub-composition to find the widget.)

    <figure><img src="../../.gitbook/assets/Selecting a widget to connect to the control node.png" alt=""><figcaption><p>Selecting a widget to connect to the control node</p></figcaption></figure>
3. In the property panel, select the text tab and click **Text** just under it. The link browser will appear.
4.  In the link browser, select the name of the control node you just created.

    <figure><img src="../../.gitbook/assets/Linking a widget to a control node.gif" alt=""><figcaption><p>Linking a widget to a control node</p></figcaption></figure>
5.  Back in the data interface and control panel, you can change the text for the control node.

    <figure><img src="../../.gitbook/assets/Where to change the text in the new control node.png" alt=""><figcaption></figcaption></figure>

### 7. Add animations

1. Select **Animation** in the properties panel.
2. Click the widget or sub-composition in the composition tree that you want to animate.
3. Adjust the settings in the property panel and click and drag on the timeline to adjust the duration of the animation.
4. See how it looks by toggling the in/out buttons in the output window.

<figure><img src="../../.gitbook/assets/Adding animation to the overlay.gif" alt=""><figcaption><p>Adding animation to the overlay</p></figcaption></figure>

### 8. Repeat steps 3-7 for each overlay

For each overlay you add to the composition, add a new sub-composition and repeat steps three through seven.

To add a new sub-composition

* Navigate to the composition tree toolbar in the top left of the screen and select **Add** > **New Sub-composition**.
* Double-click **New Sub-comp** to rename it.

<figure><img src="../../.gitbook/assets/Creating a new subcomposition.gif" alt=""><figcaption><p>Adding a new sub-composition</p></figcaption></figure>

### 9. Create an app for your composition

Once your composition is finished, you'll need to [create an app for it in Dashboard](../managing-overlays-in-the-dashboard/how-to-create-an-app-for-a-composition.md).

From there, you can add content to it and control it with the Singular APIs or with Studio.

<figure><img src="../../.gitbook/assets/The app in Studio.gif" alt=""><figcaption><p>The app for this composition being controlled in Studio</p></figcaption></figure>
