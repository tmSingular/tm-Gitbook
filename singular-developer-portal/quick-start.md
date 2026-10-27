---
description: Control your first Singular graphic with the REST API
---

# Quick start

In this guide, you’ll create an overlay, see its output in a web browser, and control it with Singular's REST API.

This quick start uses a [lower thirds](support/singular-terminology.md#lower-third) template, but the process is the same for other templates and even overlays you create from scratch.

{% hint style="info" %}
You’ll need a Singular account to follow this quick start. Get your free account [here](https://app.singular.live/users/signup).
{% endhint %}

### **1. Get a template** <a href="#id-55llaltqgpoc" id="id-55llaltqgpoc"></a>

In this step, you'll use the Singular Dashboard to get a control app template.

1. Open the[ Singular Dashboard](https://app.singular.live/dashboard).
2. Select **Templates** to open the template library.
3. In the template library, search for **UNO Lowers | Momentum**.
4. Double click on the template photo to open a preview.
5. Select **Use this template** to download it. UNO Lowers | Momentum will be listed under Apps in the Dashboard.

<figure><img src=".gitbook/assets/Opening a Template.gif" alt=""><figcaption><p>Opening the UNO Lowers | Momentum template</p></figcaption></figure>

### 2. See the output in a web browser <a href="#id-8c38ihv7lccy" id="id-8c38ihv7lccy"></a>

In this step, you'll get the output URL of the UNO Lowers | Momentum control app and paste it into a web browser to see one of the control app's overlays.

1. Select **UNO Lowers | Momentum** under Apps to highlight it.
2. Click the **i** button at the top right of the page to open the [Dashboard Inspector](support/singular-terminology.md#dashboard-inspector), which shows details about the app.
3.  Under **App URLs and Token**, locate and copy the [Output URL](support/singular-terminology.md#output-url).

    <figure><img src=".gitbook/assets/Getting the Output URL.gif" alt=""><figcaption><p>Locating the output URL</p></figcaption></figure>
4. Paste the Output URL into your internet browser.

The webpage should look like the image below. Keep this tab open for steps three and four to see how the APIs change the overlay.

<figure><img src=".gitbook/assets/Quick start 4 (1).png" alt=""><figcaption><p>UNO Lowers | Momentum overlay output</p></figcaption></figure>

### 3. Send your first Singular API request and see the payload <a href="#id-9mqbwnx4ntkp" id="id-9mqbwnx4ntkp"></a>

In this step, you'll use the Singular API to return JSON data about the UNO Lowers | Momentum overlay.

{% hint style="info" %}
This quick start makes API calls using [Postman](https://www.postman.com) and cURL, but you can also use other languages and API platforms.
{% endhint %}

{% tabs %}
{% tab title="Postman" %}
1. Open the [Singular API v2 Postman collection](https://api.singular.live) and press **Run in Postman**.
2.  In the Singular Dashboard, open the Dashboard inspector and copy the **Shared APP Token** for the UNO Lowers | Momentum control app.

    <figure><img src=".gitbook/assets/Getting the shared app token.png" alt=""><figcaption><p>Getting the Shared App Token</p></figcaption></figure>
3.  Back in Postman, navigate to **Collections** > **Singular REST API** > **Singular API v2** > **App Instance API (Token)** > **Get Control App Details** > **Get Control App Control**.

    <figure><img src=".gitbook/assets/Locating the Get Control App Control API request.png" alt=""><figcaption><p>Locating the Get Control App Control API request</p></figcaption></figure>
4.  Replace `:appToken` in the URL with the actual app token from step 3.2.

    <figure><img src=".gitbook/assets/Replacing the app token in the URL.png" alt=""><figcaption><p>Replacing the app token in the URL</p></figcaption></figure>
5.  Click **Save** and **Send** to return a payload for the UNO Lowers | Momentum control app.

    <figure><img src=".gitbook/assets/Saving and sending a request.png" alt=""><figcaption><p>Saving and sending a request</p></figcaption></figure>
6. Inspect the payload and notice that this control app is set up so the API can access its color, text, and In/Out state. In particular, we'll use this snippet from in the next step:

```json
{
        "subCompositionId": "57d57254-f15b-42ca-b68e-75b69875f5ea",
        "subCompositionName": "Lower - Header",
        "mainComposition": false,
        "state": "In",
        "payload": {
            "Header": "HEADER",
            "Main Text": "MAIN LINE OF TEXT"
        }
    }
```
{% endtab %}

{% tab title="cURL" %}
1. Open your favorite text editor and paste in the following command:&#x20;

{% code overflow="wrap" %}
```bash
curl --location --request GET 'https://app.singular.live/apiv2/controlapps/:appToken/control'
```
{% endcode %}

2\.  In the Singular Dashboard, open the Dashboard inspector and copy the **Shared APP Token** for the UNO Lowers | Momentum control app.

<figure><img src=".gitbook/assets/Getting the shared app token.png" alt=""><figcaption></figcaption></figure>

3\. Back in your text editor, replace `:appToken` in the cURL request with the actual Shared App Token.

4\. Open the Command Prompt in Windows or Terminal in Mac.

5\. Paste the updated cURL request into the command line and press enter. \
The payload (in JSON) should look like this:&#x20;

```json
[{
	"compositionId": "-MwbugjuLzQ1fYlGAczq",
	"compositionName": null,
	"mainComposition": true,
	"animation": {
		"state": "Out1"
	},
	"controlNode": {
		"payload": {
			"Accent Text Color": {
				"a": 1,
				"b": 255,
				"g": 255,
				"r": 255
			},
			"Dropline Color": {
				"a": 1,
				"b": 66,
				"g": 66,
				"r": 66
			},
			"Primary Color": {
				"a": 1,
				"b": 255,
				"g": 255,
				"r": 255
			},
			"Primary Text Color": {
				"a": 1,
				"b": 51,
				"g": 51,
				"r": 51
			},
			"Secondary Color": {
				"a": 1,
				"b": 0,
				"g": 0,
				"r": 180
			}
		}
	}
}, {
	"compositionId": "57d57254-f15b-42ca-b68e-75b69875f5ea",
	"compositionName": "Lower - Header",
	"animation": {
		"state": "Out2"
	},
	"controlNode": {
		"payload": {
			"Header": "HEADER",
			"Main Text": "MAIN LINE OF TEXT"
		}
	}
}, {
	"compositionId": "6cb2b49c-03e1-499b-89b1-93664560e92b",
	"compositionName": "Lower - Header + Dropline",
	"animation": {
		"state": "Out2"
	},
	"controlNode": {
		"payload": {
			"Dropline": "DROPLINE MESSAGE",
			"Header": "HEADER",
			"Main Text": "MAIN LINE OF TEXT"
		}
	}
}, {
	"compositionId": "f771e339-dde9-45ef-a8a4-5545f0bde56c",
	"compositionName": "Lower - Breaking News",
	"animation": {
		"state": "In"
	},
	"controlNode": {
		"payload": {
			"Header": "HEADER",
			"Text 1": "BREAKING NEWS",
			"Text 2": "MAIN LINE OF TEXT"
		}
	}
}]
```

6\. Inspect the payload and notice that this control app is set up so the API can access its color, text, and In/Out state.&#x20;
{% endtab %}
{% endtabs %}

### 4. Use the API to change an overlay's text <a href="#id-9mqbwnx4ntkp" id="id-9mqbwnx4ntkp"></a>

In this step, you'll change the text in the one of UNO Lowers | Momentum's overlays.

{% tabs %}
{% tab title="Postman" %}
1.  Navigate to **Collections** > **Singular REST API** > **Singular API v2** > **App Instance API (Token)** > **Send Data to Control App** >**Update Control App Content**.&#x20;

    <figure><img src=".gitbook/assets/Finding the Update Control App Content request.png" alt=""><figcaption><p>Finding the Update Control App Content request</p></figcaption></figure>
2. Update `:appToken` in the URL as you did in [step 3.4](quick-start.md#_9mqbwnx4ntkp).
3.  Select the Body tab and replace the JSON date with the code snippet from step 3.6 between the square brackets.

    <figure><img src=".gitbook/assets/Updating the request body.png" alt=""><figcaption><p>Updating the request body</p></figcaption></figure>
4.  In the JSON payload, change the text for `"HEADER"` and `"MAIN LINE OF TEXT"` to something else.

    <figure><img src=".gitbook/assets/Updating the sub-composition text.png" alt=""><figcaption><p>Updating the sub-composition's text fields</p></figcaption></figure>
5. Click **Save**.
6. With the output URL window from [step two](quick-start.md#_8c38ihv7lccy) visible, press **Send** and watch the text change in the web browser.
{% endtab %}

{% tab title="cURL" %}
In the payload from the `GET`**Control App Control** request in [step three](quick-start.md#_9mqbwnx4ntkp), this is the sub-composition that you'll update:

<pre class="language-json"><code class="lang-json">{
<strong>    "subCompositionId": "57d57254-f15b-42ca-b68e-75b69875f5ea",
</strong>    "state": "In",
    "payload": {
        "Header": "HEADER",
        "Main Text": "MAIN LINE OF TEXT"
    }
}
</code></pre>

1\. Paste the following cURL request into your text editor:

{% code overflow="wrap" %}
```bash
curl --location --request PATCH 'https://app.singular.live/apiv2/controlapps/:appToken/control'
--header 'Content-Type: application/json'
--data-raw '[ { "subCompositionId": "57d57254-f15b-42ca-b68e-75b69875f5ea", "mainComposition": false, "state": "In", "payload": { "Header": "HEADER", "Main Text": "MAIN LINE OF TEXT" } } ]'
```
{% endcode %}

&#x20;2\. Replace `:appToken` with the actual Shared App Token you got in [step 3.2](quick-start.md#_9mqbwnx4ntkp).

3\. Find the key-value pairs `"Header":"HEADER"` and `"Text 2":"MAIN LINE OF TEXT"` and change the current values (`"HEADER", "MAIN LINE OF TEXT"`) to the text of your choice.

4\. With the output URL window from [step two](quick-start.md#_8c38ihv7lccy) visible, copy your updated `PATCH` request and past it into the command line and press enter. Then, watch the text update in the web browser.
{% endtab %}
{% endtabs %}

### 5. Use the API to trigger an overlay in and out <a href="#id-964rt98h5emt" id="id-964rt98h5emt"></a>

In this step, you'll animate the same overlay in and out.

{% tabs %}
{% tab title="Postman" %}
1.  Navigate to the **Update Control App Animation State** request and select the **Body** tab.

    <figure><img src=".gitbook/assets/Finding the Update Control App Animation State request.png" alt=""><figcaption><p>Finding the Update Control App Animation State request</p></figcaption></figure>
2. Update `:appToken` in the URL as you did in [step 3.4](quick-start.md#_9mqbwnx4ntkp) and 4.2.
3.  Change the value of `subCompositionId` to `"57d57254-f15b-42ca-b68e-75b69875f5ea"`, from the previous request, and value of `"state"` to `"In"` or `"Out"` to animate this overlay in or out respectively.

    <figure><img src=".gitbook/assets/Updating an overlay&#x27;s animation state.png" alt=""><figcaption><p>Updating an overlay's animation state</p></figcaption></figure>
4. With the output URL window from [step two](quick-start.md#_8c38ihv7lccy) visible, press **Save** and **Send** and then watch the overlay change its animation state.
{% endtab %}

{% tab title="cURL" %}
In the payload from the `GET`**Control App Control** request in [step three](quick-start.md#_9mqbwnx4ntkp), this is the sub-composition that you'll update to trigger an overlay in and out.

```json
{
    "subCompositionId": "57d57254-f15b-42ca-b68e-75b69875f5ea",
    "state": "In",
    "payload": {
        "Header": "HEADER",
        "Main Text": "MAIN LINE OF TEXT"
    }
}
```

1\. Paste the following cURL request into your text editor:

{% code overflow="wrap" %}
```bash
 curl --location --request PATCH 'https://app.singular.live/apiv2/controlapps/:appToken/control'
--header 'Content-Type: application/json'
--data-raw '[ { "subCompositionId": "57d57254-f15b-42ca-b68e-75b69875f5ea", "state": "In" } ]'
```
{% endcode %}

2\. Replace `:appToken` with the actual Shared App Token you got in [step 3.2](quick-start.md#_9mqbwnx4ntkp).

3\. Find the key-value pair `"state": "In"` and change the value to `"Out"`.

4\. With the output URL window from [step two](quick-start.md#_8c38ihv7lccy) visible, copy your updated `PATCH` request, paste it into the command line, and press enter. Then, watch the overlay go to its Out state.

5\. Using the same API request, change the`"state"` value to `"Out"`.

6\. With the output URL window from [step two](quick-start.md#_8c38ihv7lccy) visible, copy your updated `PATCH` request, paste it into the command line, and press enter. Then, watch the overlay go to its Out state.
{% endtab %}
{% endtabs %}

### Next steps

Now that you've successfully used Singular, check out [Singular Basics](https://app.gitbook.com/s/3cdPul5g3lHEzkm2UkSf/singular-basics) to see how Singular works and learn some key concepts. Or jump right into the [REST APIs](https://app.gitbook.com/s/3cdPul5g3lHEzkm2UkSf/rest-api).
