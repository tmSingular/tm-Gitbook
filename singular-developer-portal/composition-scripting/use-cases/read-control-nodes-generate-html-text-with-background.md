# Read control nodes, generate HTML text with background

This example explains how to read control nodes and use the text widget’s HTML feature to style text with auto-sizing background.

<figure><img src="../../.gitbook/assets/HTMLTextBackground.jpg" alt=""><figcaption><p>Screenshot</p></figcaption></figure>

### Widget used

* <img src="../../.gitbook/assets/image (5).png" alt="" data-size="line">[Text widget](https://support.singular.live/hc/en-us/articles/360025486472-Text-Widget)

### Functions covered

* [comp.findWidget()](https://developer.singular.live/composition-scripting/cheat-sheets/fundamentals#findwidget)
* [comp.getPayload2()](https://developer.singular.live/composition-scripting/cheat-sheets/fundamentals#getpayload2)
* [widget.setPayload()](https://developer.singular.live/composition-scripting/cheat-sheets/fundamentals#setpayload-1)

Load this [example composition](https://app.singular.live/dashboard?templateLibraryItem=830) to follow along in a real composition

### Composition structure

The composition has one sub-composition called **Lower**, as you can see in the composition tree.

<figure><img src="../../.gitbook/assets/image (10).png" alt=""><figcaption><p>The Lower sub-composition with control nodes</p></figcaption></figure>

To see this sub-composition's widgets:

1. [Open the composition script editor](../composition-script-editor-reference.md#accessing-the-composition-script-editor) within the same [example composition](https://app.singular.live/compositions/459184/edit) as above and select the **Lower composition script**.
2. In the composition navigator, select the **Widget Explorer** tab.

This composition contains three widgets, but for this quick start, you'll look at the text widget, which in the composition is called **lowerText**.

<figure><img src="../../.gitbook/assets/image (1).png" alt=""><figcaption><p>Lower sub-composition payload JSON</p></figcaption></figure>

### Composition script

Now that you have located the composition's text widget, learn how to use the text widget’s HTML feature to style text and set a background color in the Lower composition script.

You can also copy and paste the composition script below into your own compositions.&#x20;

{% code title="Lower script" %}
```javascript
(function() {

  const HTML_TEMPLATE = '<html><span style="background:{{background-color}}; padding: 0px {{padding-right}}px 0px {{padding-left}}px">{{firstname}} <b>{{secondname}}</b></span></html>';

  // convert color JSON to CSS rgba()
  const parseColor = function(color) {
    const colorRgba = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    // console.log("colorRgba =", colorRgba);
    return colorRgba;
  }

  return {

    init: function(comp, context) {

      // get reference to the fullname widget
      const wiLowerText = comp.findWidget("lowerText")[0];

      /**********************************************************************/

      // we define a function to update the composition
      function updateComposition() {
        // get control node payload as JSON object
        const p = comp.getPayload2();
        console.log(p);

        const colorRgba = parseColor(p["Background Color"]);

        // build HTML text.
        let htmlText = HTML_TEMPLATE.replace(/{{background-color}}/gi, colorRgba);
        htmlText = htmlText.replace(/{{padding-right}}/gi, p["Padding Right"]);
        htmlText = htmlText.replace(/{{padding-left}}/gi, p["Padding Left"]);
        htmlText = htmlText.replace(/{{firstname}}/gi, p["Firstname"]);
        htmlText = htmlText.replace(/{{secondname}}/gi, p["Lastname"]);

        // update fullname text
        wiLowerText.setPayload({
          "text": htmlText
        });

      }

      /**********************************************************************/

      // we listen to payload_changed events
      comp.addListener('payload_changed', (event, msg, e) => {
        updateComposition();
        e.stopPropagation();
      });

      /**********************************************************************/

      // update the composition when loading the output URL
      updateComposition();

    },

    close: function(comp, context) {}
  };
})();
```
{% endcode %}

### Singular control app

{% embed url="https://app.singular.live/control/0abwCjnV0aen75c87cuKDD" %}
Read control nodes, generate HTML text with background app
{% endembed %}
