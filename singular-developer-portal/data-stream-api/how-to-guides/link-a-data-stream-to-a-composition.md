# Link a data stream to a composition

{% hint style="info" %}
This how-to guide requires composition scripting to prepare the composition to accept data from the data stream API. For an overview of composition scripting and to learn how to accomplish common tasks with it, visit the [composition scripting](https://app.gitbook.com/s/3cdPul5g3lHEzkm2UkSf/composition-scripting) section of this portal.&#x20;
{% endhint %}

1. Open the composition you want to connect to a data stream in Composer.
2. If you haven't already created a control node for the widget you want to update with the data stream API, [create a control node](../../singular-basics/building-overlays-in-composer/how-to-set-up-control-nodes-to-make-widget-properties-available-to-a-control-app.md) for it.
3. Open the [composition script editor](../../singular-basics/building-overlays-in-composer/composer-reference.md#areas-of-the-property-panel) and paste this code snippet into it. You'll need to connect it to the control node in strep 2 and also add the public data stream token.

{% code title="Composition Script" %}
```javascript
context.utils.createDataStream(
  data_stream_public_token, 
  (status, payload) => 
  {
    console.log("we have received: ", status, payload);
    if (status === "message") {
      	// process your data here
    }
  });
```
{% endcode %}

{% hint style="info" %}
For more help, see the composition scripting section of this portal.
{% endhint %}
