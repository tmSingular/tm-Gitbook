# How to create update animations

Update animations are automatically triggered when new data is pushed to a widget via a control node or data node. If an update animation is enabled, any new information entered in the control field (or pushed via a data node) updates with an animation of your choosing. This requires your widget to first be connected to a control node or data node.

### Requirements&#x20;

* A composition with a text widget connected to a control node.

Learn know how to connect a widget to a control node [here](../how-to-set-up-control-nodes-to-make-widget-properties-available-to-a-control-app.md).

### 1. Enable update animation

1. Open a composition and select the widget you want to have an update animation.
2. Click the update tab in the property panel and select **active**.

<figure><img src="../../../.gitbook/assets/Enabling update animation.gif" alt=""><figcaption><p>Enabling update animation</p></figcaption></figure>

### 2. Choose Out update animation settings

1. In the drop-down menu on the left, set the animation type.
2. In the drop-down menu in the center, set the animation direction.
3. In the drop-down menu on the right, set the animation effect.

<figure><img src="../../../.gitbook/assets/Choosing out update animation settings.gif" alt=""><figcaption><p>Choosing out update animation settings</p></figcaption></figure>

### 3. Choose in update animation settings

* Repeat the process from step two for the In animation settings.

<figure><img src="../../../.gitbook/assets/Choosing in update animation settings.gif" alt=""><figcaption><p>Choosing in update animation settings</p></figcaption></figure>

### 4. Test

#### To test your settings

* Navigate to the data interface and control panel and update the widget's control node contents.

{% hint style="info" %}
Every time you update the text, the In and Out update animations will be triggered.
{% endhint %}

#### To ensure the text is located where you want it in its bounding box

* Click on the **Toggle Bounding Box** icon above the output screen.

#### To change the justification of the text

1. Select the text tab in the property panel
2. Change the justification in the justification drop-down menu.

<figure><img src="../../../.gitbook/assets/Testing update animations.gif" alt=""><figcaption><p>Testing update animation</p></figcaption></figure>

