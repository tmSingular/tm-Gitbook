# Set image widget URL property

This example explains how to set a composition's image widget URL property.

### Functions covered

* `comp.findWidget()`
* `widget.getPayload()`
* `widget.setPayload()`

Load this [example composition](https://app.singular.live/dashboard?templateLibraryItem=548) to follow along in a real composition.

### Composition structure

The example composition has one sub-composition called **Lower**, as you can see in the composition tree.

<figure><img src="https://lh6.googleusercontent.com/tqb-_aq0hgxDSFLSERmw9ZjxyvJWOHG5gXm98kQADOo07QzO3dYNeRfsjpkI62pCG-A2JmseSxAGxngufy39p2PuivPeBDetzC0MpnmK7n03jDVIfhkLcJbh2clFRk5u-KbkEwysF4ZfvNfwqt5p_KIHEA4k10zbx2LpqMttdD3E9Crj18XZNSUObi6U" alt=""><figcaption><p>The Lower sub-composition</p></figcaption></figure>

To see this sub-composition's widgets:

1. [Open the composition script editor](../composition-script-editor-reference.md#accessing-the-composition-script-editor) within the same [example composition](https://app.singular.live/compositions/458663/edit) as above and select the Lower composition script.
2. In the composition navigator, select the **Widget Explorer** tab.

This composition contains three widgets, but for this quick start, you'll look at its **image** widget, which in the composition is called **lowerLogo**.

<figure><img src="https://lh3.googleusercontent.com/ABdW8sgtON2bTNZA9RZzlHi4jZByWuRuvXGGD1TgsdUaFz4eoLN2sPebtxk-j6Co5d-GlrgLtuTozGoOSu72cKyNRY8NQCvMBV4Ybs2hP-qKC8MHBmkykhrDMWlcRacsyCRzn2iucFJc0PKVAlE0J8tHdD4rSCTgZW0Dh0uAurvihO8kioBLlgpBCsr7" alt=""><figcaption><p>The sub-composition's widgets</p></figcaption></figure>

### Composition script

Now that you have located the composition's widgets, learn how to set the image widget URL property by reading the comments in the Lower composition script.

You can also copy and paste the composition script below into your own compositions.&#x20;

{% code title="Lower Script" %}
```javascript
(function() {
  return {

    init: function(comp, context) {

      // get reference to the logo widget
      const wiLowerLogo = comp.findWidget("lowerLogo")[0];

      // log widget object to the console
      console.log(wiLowerLogo);

      // update the image URL
      wiLowerLogo.setPayload({
        "image": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      });

    },

    close: function(comp, context) {}
  };
})();
```
{% endcode %}
