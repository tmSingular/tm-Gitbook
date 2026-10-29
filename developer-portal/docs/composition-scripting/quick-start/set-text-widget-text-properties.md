# Set text widget text properties

This example explains how to update single-line and multi-line text in a text widget.

### Functions covered

* `comp.findWidget()`
* `widget.getPayload()`
* `widget.setPayload()`

Load this [example composition](https://app.singular.live/dashboard?templateLibraryItem=550) to follow along in a real composition.

### Composition structure

The example composition has one sub-composition called **Lower**, as you can see in the composition tree.

<figure><img src="https://lh6.googleusercontent.com/tqb-_aq0hgxDSFLSERmw9ZjxyvJWOHG5gXm98kQADOo07QzO3dYNeRfsjpkI62pCG-A2JmseSxAGxngufy39p2PuivPeBDetzC0MpnmK7n03jDVIfhkLcJbh2clFRk5u-KbkEwysF4ZfvNfwqt5p_KIHEA4k10zbx2LpqMttdD3E9Crj18XZNSUObi6U" alt=""><figcaption><p>The Lower sub-composition</p></figcaption></figure>

To see this sub-composition's widgets:

1. [Open the composition script editor](../composition-script-editor-reference.md#accessing-the-composition-script-editor) within the same [example composition](https://app.singular.live/compositions/458662/edit) as above and select the Lower composition script.
2. In the composition navigator, select the **Widget Explorer** tab.

This composition contains three widgets, but for this quick start, you'll look at the text widgets, which in the composition are called **lowerTitle** and **lowerSubtitle**.

<figure><img src="https://lh6.googleusercontent.com/9Hw336O5Sgc1m-OO1j2GgWJ6yywxCEBf_vkS64tLijgH532zgv-hSK4iMC34mItDryjS_kGdKFGA26iVIWkF-ErJoJnxU5dCaIsfyOJcvhtIwEwFK0WJOqrvHbmpP0vP0TPTxtq6gemIg0dFIJMimN6NPzuf31OUKEJZq1pMnvwqryqSi7vJc4blIjZd" alt=""><figcaption><p>The sub-composition's widgets</p></figcaption></figure>

### Composition script

Now that you have located the composition's text widgets, learn how to set them by reading the comments in the Lower composition script.

You can also copy and paste the composition script below into your own compositions.&#x20;

{% code title="Lower Script" %}
```javascript
(function() {
  return {

    init: function(comp, context) {

      // get reference to the title and subtitle widget
      const wiLowerTitle = comp.findWidget("lowerTitle")[0];
      const wiLowerSubtitle = comp.findWidget("lowerSubtitle")[0];

      // update the single-line title
      wiLowerTitle.setPayload({
        "text": "This is the new title"
      });

      // update the multi-line subtitle
      wiLowerSubtitle.setPayload({
        "text": "New subtitle line 1\nNew subtitle line 2"
      });

    },

    close: function(comp, context) {}
  };
})();
```
{% endcode %}
