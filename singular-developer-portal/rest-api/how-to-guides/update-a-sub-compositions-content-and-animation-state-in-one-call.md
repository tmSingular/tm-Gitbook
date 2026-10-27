# Update a sub-composition's content and animation state in one call

To update a sub-composition's content and update animation state in one API request, you'll need two things:

* The[ app token](get-a-control-apps-api-token.md) for the particular instance of the control app you're using
* The[ sub-composition ID and payload structure](get-a-compositions-sub-composition-ids-and-names-and-their-payload-structures.md) of the overlay you want to update

With that data on hand

1. Prepare a `PATCH` request to `https://app.singular.live/apiv2/controlapps/:appToken/control`, which is the endpoint to [update and animate a control app In and Out](/broken/pages/xE5E7LbfYihvan3VBARB).
2. Replace `:appToken` with the actual app token for your app instance.
3. Add a request body with the actual sub-composition ID and payload structure. Include the updates you'd like to make and change `state` to `In` or `Out`. The request body should look like this, but with the sub=composition ID, payload data, and state filled in.

{% tabs %}
{% tab title="Sub-composition name" %}
```json
[
    {
        "subCompositionName": "your-subcomposition-name",
        "payload": {
           "controlnode-field": "control node content"
         },
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
        "payload": {
           "controlnode-field": "control node content"
         },
        "state": "<toState>"
    }
]
```
{% endtab %}
{% endtabs %}



After sending the request, you should get a `200 OK` response with a payload of `{ "success": true }`.
