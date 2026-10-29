# Find sub-compositions and widgets

This example explains how to get composition's sub-compositions and widgets.&#x20;

### Functions covered

* `find()`&#x20;
* `findWidget()`&#x20;

Load this [example composition](https://app.singular.live/dashboard?templateLibraryItem=826) to follow along in a real composition.

### Composition structure

The example composition has one sub-composition called **Lower**, as you can see in the composition tree.

Select the Lower sub-composition and **Control Properties** in the property panel to see the sub-composition's objects.

<figure><img src="https://lh3.googleusercontent.com/Lg_kWIXGrlXEvUy1qbOz1guO5uTFWizduI7zZh5xSFtZYkE79am8dOFOHDaGjHv-gt9zt2QBrdn6zeCpbiQx2qVXI1TOItOzv05AplparhYjEtBF-k8UnHRcvGIdGQ1Mfkt3M9PEMYtcrQYTHkjShhazrjQxz0nkRbmM-PCml4LnErcOh83zHw5T7KDT9g" alt=""><figcaption><p>The Lower sub-composition</p></figcaption></figure>

To go deeper and open the sub-composition's widgets:

* Double-click the Lower sub-composition.&#x20;

This sub-composition contains three widgets.

* lowerTitle: a **text** widget
* lowerSubtitle: a **text** widget
* lowerLogo: an **image** widget

<figure><img src="https://lh5.googleusercontent.com/dzWk1bNlQGk7nVWHMAtmt0ftx4DQQEdvZvq6hWE5vvLnOCkkfg1vtzJne-DDe1nWVCS05rpQlKs52Im7NbDnS1xaJKv19PHaAfeGTlrvkaWzAQfYYhPcMsuRkoNFFkJ3e0g_j-ngcB0KdmMUUUKiYCJjxvR7ycZlEC6_sWgWQwza-3szyh48eaDUFHny3w" alt=""><figcaption><p>The sub-composition's widgets</p></figcaption></figure>

### Composition scripts

To get the same information using composition scripts, [open the composition script editor](../composition-script-editor-reference.md#accessing-the-composition-script-editor) within the same [example composition](https://app.singular.live/compositions/458658/edit) as above.&#x20;

Then, read the comments in the root and Lower composition scripts to see the composition scripts needed to find sub-compositions and widgets.&#x20;

You can also copy and paste the composition scripts below into your own compositions.&#x20;

{% code title="Root Script" %}
```javascript
(function() {
  return {

    init: function(comp, context) {

      // get reference to the subcomposition "Lower"
      const compLower = comp.find("Lower")[0];

      // log composition object to the console
      console.log(compLower);

    },

    close: function(comp, context) {}
  };
})();
```
{% endcode %}

{% code title="Lower Script" %}
```javascript
(function() {
  return {

    init: function(comp, context) {

      // get reference to the title, subtitle, and logo widget
      const wiLowerTitle = comp.findWidget("lowerTitle")[0];
      const wiLowerSubtitle = comp.findWidget("lowerSubtitle")[0];
      const wiLowerLogo = comp.findWidget("lowerLogo")[0];

      // log widget objects to the console
      console.log(wiLowerTitle);
      console.log(wiLowerSubtitle);
      console.log(wiLowerLogo);

    },

    close: function(comp, context) {}
  };
})();
```
{% endcode %}
