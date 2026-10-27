# Set table widget content property

This example explains how to update a composition's table widget’s content.

### Functions covered

* `comp.findWidget()`
* `widget.setPayload()`

Load this [example composition](https://app.singular.live/dashboard?templateLibraryItem=549) to follow along in a real composition.

### Composition structure

The example composition has one sub-composition called **Standings**, as you can see in the composition tree.

<figure><img src="https://lh4.googleusercontent.com/OIp1hjeLDnV5z9J65tzjfRyaf_AiTO_4p5TW5aNIeDu5HDzUk-fFdpi0GHMl7rAFDjIE5Md7xG4hMLwrPNAxYZUHQpq62CcOHNmSiJodJxfLE4Db1ewiIgH7_UvCnLmMhRoKA1ZzihkLyrl14Sy09Fq0MY52AEznvmaro8V3Jmk4MWqrZD9KYQFBxJXe" alt=""><figcaption><p>The Standings sub-composition</p></figcaption></figure>

To see the sub-composition's payload:

1. Double-click the Standings sub-composition in the composition tree.
2. Select the standingsTable widget and then the table tab in the property panel.

<figure><img src="https://lh5.googleusercontent.com/E6fKewx_5P8xg7sxg6JtO0ntjIcqqXVSHDGCntkccnKbQEn2cHDzC_ocTi6O7xBH3a8UG6mX-Xblid-p6PiMAksfGm1GpQoWcQdDmpXy2AP6iOuRt-gMM2McaF6dbVE8JWWdhw_2Yis5Ixehp07oZApCR59RioQTiz4DQg8xeDlntYJeg_-up-72NnNq" alt=""><figcaption><p>standingsTable's payload</p></figcaption></figure>

To see this sub-composition's widgets:

1. [Open the composition script editor](../composition-script-editor-reference.md#accessing-the-composition-script-editor) within the same [example composition](https://app.singular.live/compositions/458664/edit) as above and select the Lower composition script.
2. In the composition navigator, select the **Widget Explorer** tab.

This composition contains three widgets, but for this quick start, you'll look at its **Table** widget, which is called standingsTable in the composition.

<figure><img src="https://lh3.googleusercontent.com/GjIYkhJziq_8YuqxgW9uKzDNOe9CIPFShfpZXv2CUY85JjFsZmKOcIVPxvdntkbDCRJT2dwqChAedhQ5lXKkrqUrS-pzJJx-y9c6vKnuPwrvwo2a7gg9bjayQnHH2RraJMsqII0ZZ40iQQKW-1HTdnh6GFddfgx_M0hdbn7HPUNwfqg6a-f07kEzXrZr" alt=""><figcaption><p>The sub-composition's widgets</p></figcaption></figure>

### Composition script

Now that you've located the composition's table widget, learn how to set its content by reading the comments in the Standings composition script.

You can also copy and paste the composition script below into your own compositions.&#x20;

{% code title="Standings Script" %}
```javascript
(function() {
  return {

    init: function(comp, context) {

      // get reference to the standingsTable widget
      const wiStandingsTable = comp.findWidget("standingsTable")[0];

      // log widget objects to the console
      console.log(wiStandingsTable);

      // define standings data
      const tableData = [{
          "Position": 1,
          "Name": "The Winner",
          "Points": 987
        },
        {
          "Position": 2,
          "Name": "Silver medal",
          "Points": 876
        },
        {
          "Position": 3,
          "Name": "Bronce medal",
          "Points": 765
        },
        {
          "Position": 4,
          "Name": "4th place",
          "Points": 654
        },
        {
          "Position": 5,
          "Name": "5th place",
          "Points": 543
        }
      ];

      // build table content format
      const tableContent = {
        "content": tableData
      };
      
      // update tableContent widget property
      // we stringify the tableContent!
      wiStandingsTable.setPayload({
        "tableContent": JSON.stringify(tableContent)
      });

    },

    close: function(comp, context) {}
  };
})();
```
{% endcode %}
