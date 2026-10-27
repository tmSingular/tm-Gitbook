# How to set up control nodes to make widget properties available to a control app

Control nodes expose widgets in a composition to a control application or the Singular APIs so that you can dynamically update them without having to go into the composition itself.

In this guide, you'll learn how to create control nodes in the [data interface and control panel](how-to-set-up-control-nodes-to-make-widget-properties-available-to-a-control-app.md#how-to-create-a-control-node-with-the-data-interface-and-control-panel) and in the [node link browser](how-to-set-up-control-nodes-to-make-widget-properties-available-to-a-control-app.md#how-to-create-a-control-node-with-the-node-link-browser). The examples show a control node being made for a text widget, but you can also create control nodes for various other types of widgets.

{% hint style="info" %}
To follow this guide, you'll need a composition. If you don't have one, first learn [how to build a composition](how-to-build-a-composition.md) or [extract a composition from a Singular template](../managing-overlays-in-the-dashboard/how-to-extract-a-composition-from-an-app.md).
{% endhint %}

## How to create a control node in the data interface and control panel

1. Open a composition in Composer.
2. Navigate to the data interface and control panel and select **Text** from the drop-down menu.
3.  Name the control node in **Field name**.&#x20;

    <figure><img src="../../.gitbook/assets/Creating and naming a control node.gif" alt=""><figcaption><p>Creating and naming a control node</p></figcaption></figure>
4.  In the composition tree, select a widget to connect to the control node. (You might need to click into a group or sub-composition to find the widget.)

    <figure><img src="../../.gitbook/assets/Selecting a text widget from the composition tree.gif" alt=""><figcaption><p>Selecting a widget to connect to the control node</p></figcaption></figure>
5. In the property panel, select the text tab and click **Text** just under it. The link browser will appear.
6.  In the link browser, select the name of the control node you just created.

    <figure><img src="../../.gitbook/assets/Linking a widget to a control node.gif" alt=""><figcaption><p>Linking a widget to a control node</p></figcaption></figure>
7.  Back in the data interface and control panel, you can change the text for the control node.

    <figure><img src="../../.gitbook/assets/Finding a new control node in the data interface and control panel.png" alt=""><figcaption><p>Finding a new control node in the data interface and control panel</p></figcaption></figure>

## How to create a control node with the node link browser

1. Open a composition in Composer.
2.  Navigate to the composition tree and select a text widget. (You might need to click into a sub-composition or group to see the widgets.)

    <figure><img src="../../.gitbook/assets/Selecting a text widget from the composition tree.gif" alt=""><figcaption><p>Selecting a text widget from the composition tree</p></figcaption></figure>
3. In the property panel, select the text tab and click **Text** just under it. The link browser will appear.
4.  In the link browser, name the control node in the text field and select **Add**.

    <figure><img src="../../.gitbook/assets/Naming a control node.gif" alt=""><figcaption><p>Naming a control node</p></figcaption></figure>
5. Navigate to the data interface and control panel and find the control node that you just created.
6.  In the text field to the right of the control node name, you can change the text.

    <figure><img src="../../.gitbook/assets/Finding a new control node in the data interface and control panel.png" alt=""><figcaption><p>Finding a new control node in the data interface and control panel</p></figcaption></figure>
