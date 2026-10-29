# Getting started

Include the Singular overlay SDK JavaScript library in your HTML code:

{% code title="Load Overlay SDK" %}
```html
<head>
  <!-- Include the Singular Overlay JavaSrcipt library -->
  <script src="https://app.singular.live/libs/singularoverlay/1.0.0/singularoverlay.js"></script>
</head>
```
{% endcode %}

Add a `div` to your HTML code for the Singular overlay instance:

{% code title="Define Singular Overlay" %}
```html
<body>
  <!-- inside the div the iFrame of the overlay will be created -->
  <div id="SingularOverlay" style="width:720px; height: 400px;"></div>
</body>
```
{% endcode %}
