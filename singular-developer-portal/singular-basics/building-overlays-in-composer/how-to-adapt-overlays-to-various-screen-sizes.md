# How to adapt overlays to various screen sizes

This guide shows how to use the Singular adaptive overlays' layout feature. It uses a composition with overlays adapted to three separate aspect ratios:

* **16:9** (landscape mode on phones and typical laptop/desktop screens)
* **4:3** (square aspect ratio on most tablets)
* **9:16** (portrait mode on most phones)

### 1. Download and open the composition used in this guide

* Navigate to the **Dashboard** > **Templates** > **Resources** and download the **Adaptive Overlays for Screen Size** template.&#x20;

<figure><img src="../../.gitbook/assets/Adaptive Overlays for Screen Size.png" alt=""><figcaption><p>The Adaptive Overlays for Screen Size resource</p></figcaption></figure>

### 2. Open and inspect the composition

1. Open the downloaded composition in Composer.
2. Double-click the **Lower** sub-composition in the composition tree and notice the "16:9 (Landscape Range)," "4:3 (Square Range)," and "9:16 (Portrait Range)" overlays.

{% hint style="info" %}
These three overlays all present the same information but do so in layouts designed for the specific aspect ratios of various devices.&#x20;
{% endhint %}

<figure><img src="../../.gitbook/assets/Adaptive-Opening and inspecting the composition.gif" alt=""><figcaption><p>Opening and inspecting the composition</p></figcaption></figure>

### 3. Assign aspect ratios to an overlay

Since the three overlays have already been already built, all that is left to do is activate the Adaptive feature and assign them a layout (portrait, square, or landscape) so Singular knows which layout to render on various devices.

1. Select the 16:9 (Landscape Range) folder.
2. In the property panel, select the **Adaptive** tab.
3.  In the tab's drop-down menu, choose **Layout** and click **Add**.

    <figure><img src="../../.gitbook/assets/Adaptive-Adding layout in the Adaptive tab .gif" alt=""><figcaption><p>Adding a layout in the Adaptive tab </p></figcaption></figure>
4.  Select **Landscape** to make this specific overlay only visible when a landscape range device views this output.

    <figure><img src="../../.gitbook/assets/Adaptive-Choosing the layout.gif" alt=""><figcaption><p>Choosing the layout</p></figcaption></figure>

{% hint style="info" %}
If you roll over the selection box, a popup shows the available aspect ratios for each layout. Each layout option covers a range.
{% endhint %}

### 4. Repeat step three

Repeat [step three](how-to-adapt-overlays-to-various-screen-sizes.md#3.-assign-aspect-ratios-to-an-overlay) for the other two overlays in the composition.&#x20;

{% hint style="info" %}
Make sure to choose **square** for the "4:3 (Square Range)" overlays and **portrait** for the "9:16 (Portrait Range)" overlays.
{% endhint %}

### 5. Test in an output window

After you activate the adaptive overlay feature for all three sub-compositions, it's time to check your work in Composer. In this guide, you'll do this for the 9×16 (Portrait Range)" overlay.&#x20;

To do this, you'll change the output window's Globals - Layout setting.&#x20;

#### A. Set globals

Navigate to the data interface and control panel and select **Globals** > **Layout** > **Portrait**. The 9×16 (Portrait Range) overlay should be activated in the output window when you animate in the overlays.&#x20;

{% hint style="info" %}
This makes only overlays assigned to Portrait Layout visible in the composition tree, which is handy when you're authoring multiple aspect ratios in one composition.&#x20;
{% endhint %}

<figure><img src="../../.gitbook/assets/Adaptive-Setting Layout Global.gif" alt=""><figcaption><p>Setting Layout globals</p></figcaption></figure>

#### B. Change output window aspect ratio

In the top right corner above the output window, change the window size to 1080×1920 (or the portrait resolution of your choice) to view your overlay at the correct aspect ratio.&#x20;

<figure><img src="../../.gitbook/assets/Adaptive-Changing the output window aspect ratio.gif" alt=""><figcaption><p>Changing the output window aspect ratio</p></figcaption></figure>

{% hint style="info" %}
Continue to [step seven](how-to-adapt-overlays-to-various-screen-sizes.md#7.-adjust-the-output-settings) to test if your other overlays become visible when the output window is at their aspect ratios.
{% endhint %}

### 6. Take In an overlay in Studio

1. [Create a Studio app for the composition](../managing-overlays-in-the-dashboard/how-to-create-an-app-for-a-composition.md).
2. Click **Click here to Add Overlay** and select **Lower**.
3. Press the play button to take it In.

<figure><img src="../../.gitbook/assets/Adaptive-Opening the composition in Studio.gif" alt=""><figcaption><p>Setting up and taking In an overlay in Studio</p></figcaption></figure>

{% hint style="info" %}
Your output window is in portrait mode because that was the last mode set in Composer.
{% endhint %}

### 7. Adjust the output settings

The last step is to adjust the output settings so that the overlays adapt to the layout settings defined in Composer.&#x20;

1. Select the three dot button in the top right corner of Studio and select **Output URL**.&#x20;
2. On the left panel of the pop-up window, select **Advanced**.
3.  Choose **Responsive** in the Render Window Size drop-down menu.

    <figure><img src="../../.gitbook/assets/Adaptive-Choosing Responsive to render window size.jpeg" alt=""><figcaption><p>Choosing Responsive to render window size</p></figcaption></figure>
4. Select the Adaptation Globals menu option in the left panel.&#x20;
5.  In the Layout drop-down menu, choose **Automatic**.

    <figure><img src="../../.gitbook/assets/Adaptive-Adding Layout adaptive globals.jpeg" alt=""><figcaption><p>Adding "Layout" adaptive globals</p></figcaption></figure>
6.  Copy and paste the App Output URL to a new Chrome browser tab and scale the browser window around the screen. Depending on the aspect ratio, different sized pre-built overlays will be displayed.

    <figure><img src="../../.gitbook/assets/Adaptive-Testing the Adaptive Globals feature in a browser .gif" alt=""><figcaption><p>Testing the Adaptive Globals feature in a browser </p></figcaption></figure>

{% hint style="success" %}
You can also paste your adaptive URL into [Responsinator](http://www.responsinator.com/) to test how responsive websites look on various devices.&#x20;
{% endhint %}

### Generate locked URL outputs from an instance of Singular Studio

To generate multiple locked URL outputs from one instance of Singular Studio

* Add the screen size and layout to the end of an app's output URL.

For example, to lock the output of the app you used in this tutorial to 1920×1080: 16:9, add /`Output?width=1920&height=1080&g_layout=landscape` to the end of its output URL.

See the output here:

[https://app.singular.live/output/2C6LUMbEY0u83YItRILsbL/Output?width=1920\&height=1080\&g\_layout=landscape](https://app.singular.live/output/2C6LUMbEY0u83YItRILsbL/Output?width=1920\&height=1080\&g_layout=landscape)

<figure><img src="../../.gitbook/assets/Locked 1920×1080 output URL .png" alt=""><figcaption><p>Locked 1920×1080 output URL </p></figcaption></figure>

{% hint style="info" %}
In a locked output ratio, scaling the output window won't activate the other overlay layouts.
{% endhint %}
