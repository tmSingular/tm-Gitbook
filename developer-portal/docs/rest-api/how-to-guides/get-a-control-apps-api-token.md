# Get a control app's API token

Every API request requires an app token, which refers to a specific instance of a control app and is required for authorization.

The app token replaces `:appToken` in endpoints like this: `https://app.singular.live/apiv2/controlapps/:appToken/control`.

You can find a control app's shared app token here:

* [The Singular Dashboard](get-a-control-apps-api-token.md#on-the-dashboard) (for all control apps)
* [UNO](get-a-control-apps-api-token.md#in-uno) (for UNO apps)
* [Studio](get-a-control-apps-api-token.md#in-studio) (for all other Singular apps)

### How to get a control app's API token from the Dashboard

1. Select your desired app in Dashboard.
2.  Press the **i** button at the top right to open the [Dashboard inspector](../../support/singular-terminology.md#dashboard-inspector). The shared app token is listed under URLs and Token.

    <figure><img src="../../.gitbook/assets/Getting an app&#x27;s shared app token.gif" alt=""><figcaption><p>Getting the shared app token on the Dashboard</p></figcaption></figure>

### How to get the API token for an UNO app

*   With the app open, press the **\</>** icon to copy the shared app token.

    <figure><img src="../../.gitbook/assets/Finding the shared app token in Uno control apps.png" alt=""><figcaption><p>Getting an Uno app's shared app token</p></figcaption></figure>

### How to get the API token for a Studio app

1. With the app open, press the **three-dot menu** at the top right of screen.
2. Select **Manage Access**.
3.  Copy the App Token.

    <figure><img src="../../.gitbook/assets/Getting the shared app token for a Studio control app.gif" alt=""><figcaption><p>Getting the shared app token for a Studio control app</p></figcaption></figure>
