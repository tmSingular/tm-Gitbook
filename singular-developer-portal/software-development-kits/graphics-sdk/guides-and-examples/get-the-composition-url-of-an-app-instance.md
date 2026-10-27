# Get the composition URL of an app instance

You can use an app instance to manage layout modifications in a composition and publish them to the graphics SDK.

**Get URL of the composition loaded into an app instance**

```javascript
const SHARED_APP_TOKEN = "2B50lCTxWNYfoYadq1I2K9";
const apiURL = "https://app.overlays.uno/apiv2/controlapps/" + SHARED_APP_TOKEN;

const requestOptions = {
  method: "GET",
  redirect: "follow"
};
fetch(apiURL, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    loadCompositionUrl(result.compositionJson);
  })
  .catch((error) => console.log("error", error));

const loadCompositionUrl = function(compUrl) {
  overlay.loadComposition(compUrl, function (isSuccess) {
    if (isSuccess) {
      console.log("Composition loaded");
    } else {
      console.warn("Couldn't load composition");
    }
  }); 
}
```

**See also**

[Load a composition with its URL](load-a-composition-with-its-url.md)
