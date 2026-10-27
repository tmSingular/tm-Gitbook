# Text Ticker - Start ticker on "In" animation

This example explains how to start the Text Ticker widget crawl on the subcomposition's "In" animation.

<figure><img src="../../.gitbook/assets/Text Ticker-01.png" alt=""><figcaption><p>Screenshot</p></figcaption></figure>

## Widgets featured&#x20;

* <img src="../../.gitbook/assets/Text Ticker Icon.png" alt="" data-size="line"> [Text Ticker](https://support.singular.live/hc/en-us/articles/360025487532-Text-Ticker-Widget)

## Functions covered

* [comp.findWidget()](https://developer.singular.live/composition-scripting/cheat-sheets/fundamentals#findwidget)
* [comp.getPayload2()](https://developer.singular.live/composition-scripting/cheat-sheets/fundamentals#getpayload2)
* [widget.getPayload()](https://developer.singular.live/composition-scripting/cheat-sheets/fundamentals#getpayload-1)
* [widget.setPayload()](https://developer.singular.live/composition-scripting/cheat-sheets/fundamentals#setpayload-1)

## Composition Structure

1.  Add a subcomposition called **Text Ticker** into the **Root** composition.

    <figure><img src="../../.gitbook/assets/Text Ticker-02.png" alt=""><figcaption><p>Root composition structure</p></figcaption></figure>
2.  Add a Text Ticker widget, a rectangle as background, and create a control node.

    <figure><img src="../../.gitbook/assets/Text Ticker-03.png" alt=""><figcaption><p>Text Ticker subcomposition structure</p></figcaption></figure>
3.  Open the composition script editor, select the Text Ticker script, and copy & paste the script below.&#x20;

    <figure><img src="../../.gitbook/assets/Text Ticker-04.png" alt=""><figcaption><p>Text Ticker composition script</p></figcaption></figure>
4.  Save the composition scripts and test the script by animating the "Text Ticker" subcomosition "In" and "Out".

    <figure><img src="../../.gitbook/assets/Text Ticker-05.png" alt=""><figcaption><p>Text Ticker composition control</p></figcaption></figure>

## Composition Script

{% code title="Text Ticker script" %}
```javascript
(function() {

  return {

    init: function(comp, context) {
      console.log("Initialize Composition script " + comp.name);

      // we get the Text Ticker widget object
      const wiTextTicker = comp.findWidget("Text Ticker")[0];

      /**********************************************************************/

      // we listen to timeline events
      comp.addListener('timeline_event', (event, msg, e) => {
        // quick exit if a child composition propagated the event
        if (msg.compositionId != comp.id) return;

        const m = msg.message;
        // we reset and set the Text Ticker's speed on the "In" animation start
        if (m.event == "start" && m.targetState == "In") {
          const p = comp.getPayload2();
          // we remember the current ticker speed
          const speed = wiTextTicker.getPayload()["speed"];
          // we reset the speed and the message text
          wiTextTicker.setPayload({
            "speed": 0
          });
          // we set the ticker speed and update messages
          wiTextTicker.setPayload({
            "speed": speed,
            "text": p["Messages"]
          });
        }

        e.stopPropagation();
      });

      /**********************************************************************/

      // we listen to payload / control node changes
      comp.addListener('payload_changed', (event, msg, e) => {
        // quick exit if a child composition propagated the event
        if (msg.compositionId != comp.id) return;

        const p = comp.getPayload2();
        wiTextTicker.setPayload({
          "text": p["Messages"]
        });

        e.stopPropagation();
      });

    },

    close: function(comp, context) {
      console.log("Close Composition script " + comp.name);
    }
  };
})();
```
{% endcode %}

## Singular Control App

{% embed url="https://app.singular.live/control/5kYH7oYCt94a2gnG44O9ev" %}
Read control nodes, update ticker messages, and restart ticker on In animation
{% endembed %}
