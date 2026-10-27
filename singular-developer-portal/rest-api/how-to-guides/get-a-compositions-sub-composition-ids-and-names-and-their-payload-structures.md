# Get a composition's sub-composition IDs and names and their payload structures

To update graphics in a control app, you need their sub-composition IDs and payload structures.

There are two ways to get them:

* [In Composer](get-a-compositions-sub-composition-ids-and-names-and-their-payload-structures.md#to-get-a-sub-composition-id-from-composer)
* [Using the API](get-a-compositions-sub-composition-ids-and-names-and-their-payload-structures.md#to-get-a-sub-composition-id-from-the-api)&#x20;

### Get a composition's sub-composition IDs and names and their payload structures i**n Composer**

1. Open the app's composition in Composer. If the app is from a template and doesn't have an associated composition, you'll need to [extract a composition from the app](../../singular-basics/managing-overlays-in-the-dashboard/how-to-extract-a-composition-from-an-app.md).
2. Navigate to the composition tree and click into each sub-composition you'd like to update.
3.  In the lower right quadrant of Composer, click on the wrench icon to open a pop-up that shows the sub-composition's ID and payload structure.

    <figure><img src="../../.gitbook/assets/Getting a sub-composition ID from Composer.gif" alt=""><figcaption><p>Getting a sub-composition ID in Composer</p></figcaption></figure>

### Get a composition's sub-composition IDs and names and their payload structures using the API

1. [Get the API token ](get-a-control-apps-api-token.md)for the particular app instance that contains the sub-composition ID and payload structure you're looking for.
2. Send a `GET` request to the endpoint for [Get a control app's control data](../api-reference/get-control-app-details/get-a-control-apps-control-data.md) `https://app.singular.live/apiv2/controlapps/:appToken/control` replacing `:appToken` with the actual app token for the app instance.
3. In the response, locate `subCompositionId` and `subCompositionName` and the payload structure of each sub-composition you'd like to update.
