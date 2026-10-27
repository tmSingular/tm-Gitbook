# Update a sub-composition's animation state

To send overlays to their In and Out states, you'll need two things:

* The[ app token](get-a-control-apps-api-token.md) for the particular instance of the control app you're using
* The[ sub-composition ID and payload structure](get-a-compositions-sub-composition-ids-and-names-and-their-payload-structures.md) of the overlay you want to update

With that data on hand

1. Prepare a `PATCH` request to `https://app.singular.live/apiv2/controlapps/:appToken/control`, which is the endpoint to [animate a control app In and Out](../api-reference/send-data-to-a-control-app/update-a-control-apps-animation-state.md).
2. Replace `:appToken` with the actual app token for your app instance.
3. Add a request body with the actual sub-composition ID and update the value of the sub-composition's state to `In` or `Out`. The request body should look like this, but with sub-composition ID and state filled in.

{% tabs %}
{% tab title="Sub-composition name" %}
```json
[
    {
        "subCompositionName": "your-subcomposition-name",
        "state": "<toState>"
    }
]
```
{% endtab %}

{% tab title="Sub-composition ID" %}
```json
[
    {
        "subCompositionId": "your-subcomposition-id",
        "state": "<toState>"
    }
]
```
{% endtab %}
{% endtabs %}

After sending the request, you should get a `200 OK` response with a payload of `{ "success": true }`.
