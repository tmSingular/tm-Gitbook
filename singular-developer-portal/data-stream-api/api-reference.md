# API reference

## Update data stream content

<mark style="color:orange;">`PUT`</mark> `https://datastream.singular.live/datastreams/:datastreamPrivateToken`

Send data to a data stream.

#### Path Parameters

| Name                                                     | Type   | Description                |
| -------------------------------------------------------- | ------ | -------------------------- |
| datastreamPrivateToken<mark style="color:red;">\*</mark> | String |  Private data stream token |

{% tabs %}
{% tab title="200: OK " %}

{% endtab %}
{% endtabs %}

### Example request body

```json
{
    "number": 123,
    "text": "this is text",
    "isActive": true,
    "color": "#3333ff"
}
```

{% hint style="info" %}
You can send any JSON data in the request body and then define how it is processed in the composition script editor.
{% endhint %}
