# Update a sub-composition's content

To update a sub-composition's content, you'll need two things:

* The[ app token](get-a-control-apps-api-token.md) for the particular instance of the control app you're using
* The[ sub-composition's name or ID and its payload structure](get-a-compositions-sub-composition-ids-and-names-and-their-payload-structures.md)

With that data on hand

1. Prepare a `PATCH` request to `https://app.singular.live/apiv2/controlapps/:appToken/control`, which is the endpoint to [update a control app](../api-reference/send-data-to-a-control-app/update-a-control-apps-content.md).&#x20;
2. Replace `:appToken` with the app token for your app instance.
3. Add a request body with the actual sub-composition ID and payload structure, and include the updates you'd like to make. The request body should look like this, but with sub-composition name or ID and payload data filled in.

{% tabs %}
{% tab title="Sub-composition name" %}
```json
[
    {
        "subCompositionName": "your-subcomposition-name",
        "payload": {
          "controlnode-field": "control node content"
        }
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
        }
    }
]
```
{% endtab %}
{% endtabs %}

After sending the request, you should get a `200 OK` response with a payload of `{ "success": true }`.
