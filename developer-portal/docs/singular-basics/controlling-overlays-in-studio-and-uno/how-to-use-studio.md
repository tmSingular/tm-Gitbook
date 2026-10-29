# How to use Studio

In this guide, you'll get up and running with Studio, Singular's app for controlling live graphics.

Although you don't need it if you use the Singular API, it is useful for previewing app templates.

For best results, use Google Chrome browser.

### 1. Download and open the template used in this guide

* Navigate to **Dashboard** > **Templates** and download and open the **Momentum** template.

### 2. Preview and take In overlays

#### To preview an overlay

* Click the name of a sub-composition. It will appear in the preview window.

<figure><img src="../../.gitbook/assets/Previewing overlays.gif" alt=""><figcaption><p>Previewing overlays</p></figcaption></figure>

#### To take an overlay In or Out (play it live)

* Press the play button next to the overlay's name. It will appear in the output window.
* Press the stop button to take it Out.

<figure><img src="../../.gitbook/assets/Taking overlays in and out.gif" alt=""><figcaption><p>Taking overlays in and out</p></figcaption></figure>

### 3. See layer logic in action

In Singular, you can assign layers of the same type or that take up the same space on the screen to a logic layer. Layer logic doesn't allow two overlays on the same layer onscreen at the same time—it animates the first layer Out before the new layer animates In.

#### To see layer logic in action, follow these steps and watch the output window.

1. Press the play button next to the Upper Left - 2 Line overlay to take it In.
2. Press the play button next to the Upper Left - 3 Line overlay to take it In.

<figure><img src="../../.gitbook/assets/Two layers assigned to the same logic layer animating in and out.gif" alt=""><figcaption><p>Two layers assigned to the same logic layer animating In and Out</p></figcaption></figure>

{% hint style="info" %}
Logic layer assignments are shown to the left of the overlay names. Overlays that share a logic layer share the same color.
{% endhint %}

#### To see what happens when two overlays share the space on the screen but aren't assign to the same logic layer, follow these steps and watch the output window.

1. Press the play button next to the Upper Right - 2 Line overlay to take it In.
2. Press the play button next to the Panel Right - Image + Text overlay to take it In.

<figure><img src="../../.gitbook/assets/Two overlays overlapping.gif" alt=""><figcaption><p>Two overlays overlapping</p></figcaption></figure>

### 4. Change overlay names and content

You can also rename overlays and change their text in Studio. Here's how:

#### To change text in an overlay

1. Select an overlay in the playlist. The overlay editor will show an editable overlay name field and text fields.
2. Change the text in one of the text fields. It will instantly update in the preview window.&#x20;

#### To change the name of an overlay name

1. Select an overlay in the playlist. The overlay editor will show an editable overlay name field and text fields.
2. Click into the overlay name field in the overlay editor. It will instantly update in the overlay playlist.

<figure><img src="../../.gitbook/assets/Changing overlay text and names.gif" alt=""><figcaption><p>Changing overlay text and names</p></figcaption></figure>

### 5. Add overlays and change their order in the playlist

You can also add and delete overlays on the playlist, as well as reorder them.

#### To add an overlay to the playlist

* Press **+** at the top right of the playlist panel or click **Click here to Add Overlay** to add an overlay from a drop-down list.

<figure><img src="../../.gitbook/assets/Adding overlays to the playlist.png" alt=""><figcaption><p>Adding an overlay to the playlist</p></figcaption></figure>

#### To delete overlays from the playlist

* Right-click on an overlay in the playlist panel and select **Delete**.

<figure><img src="../../.gitbook/assets/Deleting an overlay from the playlist.png" alt=""><figcaption><p>Deleting an overlay from the playlist</p></figcaption></figure>

#### To change the playlist order

1. Grab the triple bar icon to the left of an overlay name on the playlist panel.
2. Drag the overlay to the desired position in the playlist.

<figure><img src="../../.gitbook/assets/Changing the playlist order.gif" alt=""><figcaption><p>Changing the playlist order</p></figcaption></figure>

### 6. See the output in a web browser <a href="#id-8c38ihv7lccy" id="id-8c38ihv7lccy"></a>

Now that you have the basics of Studio down, it's time to see how the overlays would look in a video player.

{% hint style="info" %}
For this tutorial, you'll use a web browser, but you can also use a video player like OBS. Once you integrate the Singular API into your system, you can control and view overlays from there.
{% endhint %}

1.  Click the **Copy URL button** to get the output URL.

    <figure><img src="../../.gitbook/assets/Copying the output URL.png" alt=""><figcaption><p>Copying the output URL</p></figcaption></figure>
2. Paste the Output URL into an internet browser.
3. Add `&bgcolor=green` to the end of the URL and press enter. This will set the background color of the webpage to green.
4.  Play around with the Momentum app in Studio with the output webpage open.

    <figure><img src="../../.gitbook/assets/Momentum in web browser.png" alt=""><figcaption><p>Momentum in a web browser</p></figcaption></figure>

### &#x20;<a href="#id-9mqbwnx4ntkp" id="id-9mqbwnx4ntkp"></a>
