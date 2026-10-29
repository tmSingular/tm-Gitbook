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

The webpage should look like the image below. Keep this tab open for steps three, four, and five to see how the APIs change the overlay.

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
6. Locate the `Lower - Header` sub-composition in the response array and copy its `subCompositionId` for steps four and five. Its payload contains `Header` and `Main Text`. To match names to IDs, use the [composition model guide](rest-api/how-to-guides/get-a-compositions-sub-composition-ids-and-names-and-their-payload-structures.md). An example response entry is shown below; use the ID from your own response:

```json
{
  "subCompositionId": "57d57254-f15b-42ca-b68e-75b69875f5ea",
  "mainComposition": false,
  "state": "Out2",
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
curl --location --request GET "https://app.singular.live/apiv2/controlapps/:appToken/control"
```
{% endcode %}

2\.  In the Singular Dashboard, open the Dashboard inspector and copy the **Shared APP Token** for the UNO Lowers | Momentum control app.

<figure><img src=".gitbook/assets/Getting the shared app token.png" alt=""><figcaption></figcaption></figure>

3\. Back in your text editor, replace `:appToken` in the cURL request with the actual Shared App Token.

4\. Open Terminal on macOS/Linux or PowerShell/Command Prompt on Windows. On Windows, replace `curl` with `curl.exe` to call cURL rather than a PowerShell alias. Run each command below as one line.

5\. Paste the updated cURL request into the command line and press enter. \
The response is a JSON array. This excerpt shows the `Lower - Header` entry; your IDs and current state may differ:

```json
[
  {
    "subCompositionId": "57d57254-f15b-42ca-b68e-75b69875f5ea",
    "mainComposition": false,
    "state": "Out2",
    "payload": {
      "Header": "HEADER",
      "Main Text": "MAIN LINE OF TEXT"
    }
  }
]
```

6\. Copy your `Lower - Header` sub-composition's ID for steps four and five. Its payload contains `Header` and `Main Text`. Use the [composition model guide](rest-api/how-to-guides/get-a-compositions-sub-composition-ids-and-names-and-their-payload-structures.md) to match names to IDs if needed.
{% endtab %}
{% endtabs %}

### 4. Use the API to change an overlay's text <a href="#id-update-overlay-text" id="id-update-overlay-text"></a>

In this step, you'll change the text in the `Lower - Header` overlay and take it In so the change is visible. Both Postman and cURL send the same JSON array. Replace the sample `subCompositionId` below with your own ID from step three.

{% hint style="info" %}
The examples use the response shape in [Get a control app's control data](rest-api/api-reference/get-control-app-details/get-a-control-apps-control-data.md). If your GET response instead uses `compositionId`, `controlNode.payload`, and `animation.state`, map those to `subCompositionId`, `payload`, and `state` in the PATCH request. Do not send the entire GET response as a PATCH body.
{% endhint %}

{% tabs %}
{% tab title="Postman" %}
1.  Navigate to **Collections** > **Singular REST API** > **Singular API v2** > **App Instance API (Token)** > **Send Data to Control App** >**Update Control App Content**.&#x20;

    <figure><img src=".gitbook/assets/Finding the Update Control App Content request.png" alt=""><figcaption><p>Finding the Update Control App Content request</p></figcaption></figure>
2. Update `:appToken` in the URL as you did in [step 3.4](quick-start.md#id-9mqbwnx4ntkp).
3. Select **Body** > **raw** > **JSON** and replace the body with this request. Use your own sub-composition ID:

    ```json
    [
      {
        "subCompositionId": "57d57254-f15b-42ca-b68e-75b69875f5ea",
        "state": "In",
        "payload": {
          "Header": "HEADER",
          "Main Text": "MAIN LINE OF TEXT"
        }
      }
    ]
    ```

    <figure><img src=".gitbook/assets/Updating the request body.png" alt=""><figcaption><p>Updating the request body</p></figcaption></figure>
4.  In the JSON payload, change the text for `"HEADER"` and `"MAIN LINE OF TEXT"` to something else.

    <figure><img src=".gitbook/assets/Updating the sub-composition text.png" alt=""><figcaption><p>Updating the sub-composition's text fields</p></figcaption></figure>
5. Click **Save**.
6. With the output URL window from [step two](quick-start.md#id-8c38ihv7lccy) visible, press **Send** and watch the text change in the web browser.
{% endtab %}

{% tab title="cURL" %}
1. Create a file named `update-content.json` in your current terminal directory. Paste in this request body, replace `subCompositionId` with your ID from step three, and change `Header` and `Main Text` to the text you want to display. Save it as UTF-8:

```json
[
  {
    "subCompositionId": "57d57254-f15b-42ca-b68e-75b69875f5ea",
    "state": "In",
    "payload": {
      "Header": "HEADER",
      "Main Text": "MAIN LINE OF TEXT"
    }
  }
]
```

2. Replace `:appToken` in the command below with your Shared App Token. Run the command from the directory containing `update-content.json`.

**macOS/Linux (Bash):**

{% code overflow="wrap" %}
```bash
curl --location --request PATCH "https://app.singular.live/apiv2/controlapps/:appToken/control" --header "Content-Type: application/json" --data-binary "@update-content.json"
```
{% endcode %}

**Windows (PowerShell or Command Prompt):**

{% code overflow="wrap" %}
```powershell
curl.exe --location --request PATCH "https://app.singular.live/apiv2/controlapps/:appToken/control" --header "Content-Type: application/json" --data-binary "@update-content.json"
```
{% endcode %}

3. With the output URL window from [step two](quick-start.md#id-8c38ihv7lccy) visible, send the request and confirm that the overlay is In and shows your new text.
{% endtab %}
{% endtabs %}

### 5. Use the API to trigger an overlay in and out <a href="#id-964rt98h5emt" id="id-964rt98h5emt"></a>

In this step, you'll animate the same overlay in and out.

{% tabs %}
{% tab title="Postman" %}
1.  Navigate to the **Update Control App Animation State** request and select the **Body** tab.

    <figure><img src=".gitbook/assets/Finding the Update Control App Animation State request.png" alt=""><figcaption><p>Finding the Update Control App Animation State request</p></figcaption></figure>
2. Update `:appToken` in the URL as you did in [step 3.4](quick-start.md#id-9mqbwnx4ntkp) and 4.2.
3. Use your sub-composition ID from step three. Set `state` to `"Out"` and send the request to take the overlay Out; then set it to `"In"` and send it again to bring the overlay back In.

    <figure><img src=".gitbook/assets/Updating an overlay&#x27;s animation state.png" alt=""><figcaption><p>Updating an overlay's animation state</p></figcaption></figure>
4. With the output URL window from [step two](quick-start.md#id-8c38ihv7lccy) visible, press **Save** and **Send** and then watch the overlay change its animation state.
{% endtab %}

{% tab title="cURL" %}
1. Create `update-state.json` in your current terminal directory with this body. Replace the sample `subCompositionId` with your own ID from step three and save it as UTF-8:

```json
[
  {
    "subCompositionId": "57d57254-f15b-42ca-b68e-75b69875f5ea",
    "state": "Out"
  }
]
```

2. Replace `:appToken` with your Shared App Token and run the appropriate command as one line from the directory containing `update-state.json`.

**macOS/Linux (Bash):**

{% code overflow="wrap" %}
```bash
curl --location --request PATCH "https://app.singular.live/apiv2/controlapps/:appToken/control" --header "Content-Type: application/json" --data-binary "@update-state.json"
```
{% endcode %}

**Windows (PowerShell or Command Prompt):**

{% code overflow="wrap" %}
```powershell
curl.exe --location --request PATCH "https://app.singular.live/apiv2/controlapps/:appToken/control" --header "Content-Type: application/json" --data-binary "@update-state.json"
```
{% endcode %}

3. Confirm that the overlay animates Out in the output URL window.
4. Change `"state": "Out"` to `"state": "In"` in `update-state.json`, save the file, and run the same command again. Confirm that the overlay animates back In.
{% endtab %}
{% endtabs %}

### Next steps

Now that you've successfully used Singular, check out [Singular Basics](https://app.gitbook.com/s/3cdPul5g3lHEzkm2UkSf/singular-basics) to see how Singular works and learn some key concepts. Or jump right into the [REST APIs](https://app.gitbook.com/s/3cdPul5g3lHEzkm2UkSf/rest-api).
