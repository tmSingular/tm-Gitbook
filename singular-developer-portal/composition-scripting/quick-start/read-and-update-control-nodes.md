# Read and update control nodes

This example explains how to use composition scripting to read and update a composition's control nodes.

### Functions covered

* `comp.find()`
* `comp.getPayload()`
* `comp.getPayload2()`
* `comp.setPayload()`

Load this [example composition](https://app.singular.live/dashboard?templateLibraryItem=546) to follow along in a real composition.

### **Composition structure**

The example composition has one sub-composition called **Lower**, as you can see in the composition tree.

To see the sub-composition's objects:

* Select the Lower sub-composition and **Control Properties** in the property panel.

<figure><img src="https://lh3.googleusercontent.com/Lg_kWIXGrlXEvUy1qbOz1guO5uTFWizduI7zZh5xSFtZYkE79am8dOFOHDaGjHv-gt9zt2QBrdn6zeCpbiQx2qVXI1TOItOzv05AplparhYjEtBF-k8UnHRcvGIdGQ1Mfkt3M9PEMYtcrQYTHkjShhazrjQxz0nkRbmM-PCml4LnErcOh83zHw5T7KDT9g" alt=""><figcaption><p>The Lower sub-composition</p></figcaption></figure>

To see this sub-composition's control nodes:

1. [Open the composition script editor](../composition-script-editor-reference.md#accessing-the-composition-script-editor) within the same [example composition](https://app.singular.live/compositions/458659/edit) as above and open the **Lower composition script.**
2. In the Composition Control tab, select **Lower** and then the **Sub-comp info** tab.

This composition contains three control nodes:

* Title: a **text** control node
* Subtitle: a **textarea** control node
* Station Logo: an **image** control node

<figure><img src="https://lh5.googleusercontent.com/iaTgtG9Q9UVDJ_YW8RX_DvVJ84yMf_nWSMwLBDJpQgK_s62mKeZ25KdPVwcfaolVZ9xFUSAyMCmhbEqLDwjtdlO_eh3nKlu915DH5rCu0JhDzhHH8D6MDnL94LM5pN1MvUOiDxMSgublKiZY75gxOJ0qxQJenmbDlQduxDFLMHyxiPGXFKeg5Rmq1TKMHg" alt=""><figcaption><p>The sub-composition's control nodes</p></figcaption></figure>

### Composition script

Now that you have located the composition's control nodes, learn how to read and update them by reading the comments in the Lower composition script.&#x20;

You can also copy and paste the composition script below into your own compositions.&#x20;

{% code title="Lower Script" %}
```javascript
(function() {
  return {

    init: function(comp, context) {

      // get control node payload as array of key-value pairs
      const payload = comp.getPayload();
      console.log(payload);

      // get control node payload as JSON object
      const payload2 = comp.getPayload2();
      console.log(payload2);

      // set new control node payload
      const newPayload = {
        "Title": "New title",
        "Subtitle": "New subtitle line 1\nNew subtitle line 2",
        "Station Logo": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      };
      comp.setPayload(newPayload);

    },

    close: function(comp, context) {}
  };
})();
```
{% endcode %}
