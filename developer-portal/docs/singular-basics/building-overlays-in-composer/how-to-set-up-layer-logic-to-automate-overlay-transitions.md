# How to set up layer logic to automate overlay transitions

Layer logic allows for smooth on-air transitions between overlays that have been assigned to the same layer type.&#x20;

To show how this works, let's look at an example. Say you're creating overlays for a talk show where the hosts will talk about a variety of subjects. You create a playlist of overlays for the subjects and assign them to the same logic layer. Then every time you send one of these overlays on air, the previous one animates out before the new one animates in.&#x20;

In this guide, you'll learn how to set up layer logic.

{% hint style="info" %}
To follow along, you'll need a composition. If you don't have one, first learn [how to build a composition](how-to-build-a-composition.md) or [extract a composition from a Singular template](../managing-overlays-in-the-dashboard/how-to-extract-a-composition-from-an-app.md).&#x20;
{% endhint %}

## How to set up layer logic

1.  Open a composition in Composer and open the composition navigator.&#x20;

    <figure><img src="../../.gitbook/assets/Opening the composition navigator.png" alt=""><figcaption><p>Opening the composition navigator</p></figcaption></figure>
2. In the composition navigator's Logic Layer column, open the drop-down for an overlay.
3.  Select the layer of your choice or create a new logic layer by entering a new name in the **new layer** field.

    <figure><img src="../../.gitbook/assets/Adding logic layers.gif" alt=""><figcaption><p>Adding layer logic</p></figcaption></figure>
4. Repeat for any additional layers.

{% hint style="danger" %}
If you build a composition where one layer spills into an area where another layer sits, they will overlap if they're onscreen at the same time. Thus, be mindful of the space that your layers occupy when you're creating and controlling overlays.
{% endhint %}
