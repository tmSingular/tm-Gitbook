# How to make overlays interactive

Making overlays is one thing. Making _interactive_ overlays is another.

This guide shows how to make interactive overlays with buttons that toggle their corresponding graphics on and off.

{% hint style="warning" %}
Interactive overlays only work if you prepare and set up embed codes on your website.&#x20;
{% endhint %}

### 1. Download and open the template used in this guide

* Navigate to the **Dashboard** > **Templates** > **Resources** and download and open the **Interactive Example** template.

For help, see [How to open a new app template](../managing-overlays-in-the-dashboard/how-to-open-a-new-app-template.md).

<figure><img src="../../.gitbook/assets/Downloading the interactive example.png" alt=""><figcaption><p>Downloading the Interactive Example template</p></figcaption></figure>

{% hint style="info" %}
This template has four pre-built graphics: A, B, C, D, and four pre-built buttons: A Button, B Button, C Button, D Button.&#x20;
{% endhint %}

### 2. Choose an interactive object

1. In the composition tree, double-click the **A Button** sub-composition.
2. Select the **mainBase** widget to add the interactivity.

<figure><img src="../../.gitbook/assets/Selecting the mainBase widget.gif" alt=""><figcaption><p>Selecting the mainBase widget</p></figcaption></figure>

### 3. Add an event

The event tool allows you to assign interactivity to a widget.

1. Navigate to the event tab in the property panel and select **Mouse Down** from the drop-down men&#x75;**.**&#x20;
2. Click **Add**.

<figure><img src="../../.gitbook/assets/Adding a mouse down event.gif" alt=""><figcaption><p>Adding a "mouse down" event</p></figcaption></figure>

{% hint style="info" %}
You can perform eight different actions in the output window to control a sub-composition (you can test the swipe options on a touchscreen):

* Mouse down
* Mouse up
* Mouse enter
* Mouse leave
* Swipe left
* Swipe right
* Swipe up
* Swipe down
{% endhint %}

### 4. Deactivate the Send Message to Composition tool

* Deselect **Active** in the Send Message to Composition Script box.

{% hint style="info" %}
This tool is for advanced users.
{% endhint %}

<figure><img src="../../.gitbook/assets/Deactivating the JavaScript tool.png" alt=""><figcaption><p>Deactivating the composition script tool</p></figcaption></figure>

### 5. Activate the event

* Select **Active** in the control sub-composition box to activate the interactivity.

<figure><img src="../../.gitbook/assets/Activating the event.png" alt=""><figcaption><p>Activating the event</p></figcaption></figure>

### 6. Select the controlled graphic

* In the Composition dropdown menu, select **A**, which is the sub-composition that will be controlled by the A Button.

<figure><img src="../../.gitbook/assets/Selecting the composition A graphic.png" alt=""><figcaption><p>Selecting the composition A graphic</p></figcaption></figure>

### 7. Select the mode

* Select **Toggle** so the A Button toggles the A Graphic on and off.

<figure><img src="../../.gitbook/assets/Selecting Toggle mode.png" alt=""><figcaption><p>Selecting Toggle mode</p></figcaption></figure>

{% hint style="info" %}
You can assign three modes to a sub-composition:

* In
* Out
* Toggle
{% endhint %}

### 8. Test it

You've just added your first event.&#x20;

To test whether it worked

* Click **A Button** in the output window.

The green graphic should toggle off.

<figure><img src="../../.gitbook/assets/Testing interactive example.gif" alt=""><figcaption><p>Testing interactivity in the output window</p></figcaption></figure>

### 9. Set up the other three buttons

Repeat steps 3-8 to set up the other three buttons and their corresponding graphics.

If you want to specify the cursor type your viewers see while interacting with the output, see the Mouse Pointer event property setting.

{% hint style="info" %}
When you add events to a composition, make sure the bounding box is tight around the area you want as a button. When an event is added to a widget, the corresponding bounding box will control the overlay.
{% endhint %}

### 10. Output the overlays using an embed code

When outputting interactive overlays, you must use Singular embed codes on your website. If you output via the standard process of combining overlays with your video production software, the overlays won't be interactive.
