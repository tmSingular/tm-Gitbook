# Read and update widget properties

This example explains how to use composition scripting to read and update a composition's widget properties.

### Functions covered

* `comp.findWidget()`
* `widget.getPayload()`
* `widget.setPayload()`

Load this [example composition](https://app.singular.live/dashboard?templateLibraryItem=547) to follow along in a real composition.

### Composition structure

The example composition has one sub-composition called **Lower**, as you can see in the composition tree.

<figure><img src="https://lh6.googleusercontent.com/tqb-_aq0hgxDSFLSERmw9ZjxyvJWOHG5gXm98kQADOo07QzO3dYNeRfsjpkI62pCG-A2JmseSxAGxngufy39p2PuivPeBDetzC0MpnmK7n03jDVIfhkLcJbh2clFRk5u-KbkEwysF4ZfvNfwqt5p_KIHEA4k10zbx2LpqMttdD3E9Crj18XZNSUObi6U" alt=""><figcaption><p>The Lower sub-composition</p></figcaption></figure>

To go deeper and open the sub-composition's widgets:

* Double-click the Lower sub-composition.

This sub-composition contains three widgets.

* lowerTitle: a **text** widget
* lowerSubtitle: a **text** widget
* lowerLogo: an **image** widget

<figure><img src="https://lh5.googleusercontent.com/3-ZMOmymcdor5ltLX6kFt45MLVrAGykCXtqKzjRf_6HTlEuAZB27r-XN-iiy5R9H09fDCjrA9R0fYMmdPlwmLIA5xSN1C5fPcOaVXxiKzkIKMoDMNNEk6PLg0kv0R-9Q27Q5Gka0eoEg8SCkOlU2ORgVR-TInzr5sbPNiyD4ff8KLIZa3XhF6e3L9z9l" alt=""><figcaption><p>The sub-composition's widgets</p></figcaption></figure>

### **Composition script**

To get the same information using composition scripts, [open the composition script editor](../composition-script-editor-reference.md#accessing-the-composition-script-editor) within the same [example composition](https://app.singular.live/compositions/458660/edit) as above.&#x20;

Then, read the comments in the Lower composition script to see the composition scripts needed to read and update widget properties.

You can also copy and paste the composition script below into your own compositions.&#x20;

{% code title="Lower Script" %}
```javascript
(function() {
  return {

    init: function(comp, context) {

      // get reference to the title widget
      const wiLowerTitle = comp.findWidget("lowerTitle")[0];

      // get widget properties
      const p = wiLowerTitle.getPayload();
      console.log(p);

      // get title text
      const titleText = p.text;

      // change title to uppercase
      wiLowerTitle.setPayload({
        "text": titleText.toUpperCase()
      });

    },

    close: function(comp, context) {}
  };
})();
```
{% endcode %}
