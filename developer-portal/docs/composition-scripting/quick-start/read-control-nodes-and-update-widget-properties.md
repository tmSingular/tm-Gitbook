# Read control nodes and update widget properties

This example explains how to read control nodes, concat strings, and update a widget’s text property.

### Functions covered

* `comp.findWidget()`
* `comp.getPayload()`
* `widget.setPayload()`

Load this [example composition](https://app.singular.live/dashboard?templateLibraryItem=828) to follow along in a real composition.

### Composition structure

The example composition has one sub-composition called **Lower**, as you can see in the composition tree.

<figure><img src="https://lh6.googleusercontent.com/tqb-_aq0hgxDSFLSERmw9ZjxyvJWOHG5gXm98kQADOo07QzO3dYNeRfsjpkI62pCG-A2JmseSxAGxngufy39p2PuivPeBDetzC0MpnmK7n03jDVIfhkLcJbh2clFRk5u-KbkEwysF4ZfvNfwqt5p_KIHEA4k10zbx2LpqMttdD3E9Crj18XZNSUObi6U" alt=""><figcaption><p>The Lower sub-composition</p></figcaption></figure>

To see this sub-composition's widgets:

1. [Open the composition script editor](../composition-script-editor-reference.md#accessing-the-composition-script-editor) within the same [example composition](https://app.singular.live/compositions/458661/edit) as above select the Lower composition script.
2. In the composition navigator, select the **Widget Explorer** tab.

This composition contains three widgets, but for this quick start, you'll look at its **text** widget, which in the composition is called **lowerFullname**.

<figure><img src="https://lh5.googleusercontent.com/5VTzpNPg4ZRy9I78AehkFz4OcgE7eUKiQF_LXuhMFKG4bluouqT14fcEBeo4sroaWB8b9tIb9jnrOh7WjpJbBTiVcug-fRTNZme2IgsjOEQMMN51WXv_LcNfEzXFL72MIRApGhxi4fg-SkDVZmZMLjvKJjdS_oV-TELxtRmQO40PnLZyD4bxYDVv4KTw" alt=""><figcaption><p>The sub-composition's widgets</p></figcaption></figure>

### Composition script

Now that you have located the composition's widgets, learn how to read their assigned control nodes and update them by reading the comments in the Lower composition script.&#x20;

You can also copy and paste the composition script below into your own compositions.&#x20;

{% code title="Lower Script" %}
```javascript
(function() {
  return {

    init: function(comp, context) {

      // get reference to the fullname widget
      const wiLowerFullname = comp.findWidget("lowerFullname")[0];

      // get control node payload as JSON object
      const p = comp.getPayload2();
      console.log(p);

      // concat control node content and change the lastname to upper case.
      const fullname = `${p["Firstname"]} ${p["Lastname"].toUpperCase()}`;

      // update fullname text
      wiLowerFullname.setPayload({
        "text": fullname
      });

    },

    close: function(comp, context) {}
  };
})();
```
{% endcode %}
