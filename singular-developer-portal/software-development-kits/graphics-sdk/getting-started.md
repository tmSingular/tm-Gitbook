# Getting started

Include the Singular Graphics SDK JavaScript library in your HTML code:

```html
<head>
  <!-- Include the Singular Graphic SDK JavaSrcipt library -->
  <script src="https://app.singular.live/libs/singulargraphics/1.0.0/singulargraphics.js"></script>
</head>
```

Add a `div` to your HTML code for a non-interactive Singular overlay instance:

```html
<body>
    <!-- define iframe for a non-interactive Singular player instance -->
    <iframe id="SingularOverlay"
      style="width:720px; height: 400px;"
      src="https://app.singular.live/singularplayer/client">
    </iframe>
</body>
```

Or add a `div` to your HTML code for an interactive Singular overlay instance:

```html
<body>
    <!-- define iframe for a non-interactive Singular player instance -->
    <iframe id="SingularOverlay"
      style="width:720px; height: 400px;"
      src="https://app.singular.live/singularplayer/client?interactive=1">
    </iframe>
</body>
```
