# Update multiple sub-compositions in one call

To update multiple sub-compositions in one API call, you'll need two things:

* The[ app token](get-a-control-apps-api-token.md) for the particular instance of the control app you're using
* The[ sub-composition IDs and payload structures](get-a-compositions-sub-composition-ids-and-names-and-their-payload-structures.md) of the overlays you want to update

With that data on hand

1. Prepare a `PATCH` request to `https://app.singular.live/apiv2/controlapps/:appToken/control`, which is the endpoint to [update a control app](../api-reference/send-data-to-a-control-app/update-a-control-apps-content.md).&#x20;
2. Replace `:appToken` with the actual app token for your app instance.
3. Add a request body with the actual sub-composition IDs and payload structures, and include the updates you'd like to make. The request body should look like this, but with sub-composition IDs and payload data filled in.

{% tabs %}
{% tab title="Sub-composition name" %}
```json
[
    {
        "subCompositionName": "your-subcomposition-name-1",
        "payload": {
           "controlnode-field": "control node content"
         },
    },
    {
        "subCompositionName": "your-subcomposition-name-2",
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
        "subCompositionId": "your-subcomposition-id-1",
        "payload": {
           "controlnode-field": "control node content"
         },
    },
    {
        "subCompositionId": "your-subcomposition-id-2",
        "payload": {
           "controlnode-field": "control node content"
         },
        "state": "<toState>"
    }
]
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
You can also send the final sub-composition in the list to its In or Out state with this request.
{% endhint %}

After sending the request, you should get a `200 OK` response with a payload of `{ "success": true }`.





