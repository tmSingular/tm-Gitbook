# Rate limits

Every day, the Singular API receives millions of requests. To manage the volume of requests, limits are placed on the number of requests that one account can make. The Singular API also employs several safeguards against bursts of incoming traffic. If you send a lot of requests in quick succession or if the data you send exceeds your account limit, you might receive error responses that show up as [status code 429](https://tools.ietf.org/html/rfc6585). These limits help to provide a reliable, scalable API.

The API has several limiters, including:

* **Daily limiters**, which limit the number of requests and the amount of data received by the API per day.
* **Burst rate limiters**, which limit the number of requests and the amount of data received by the API per minute.

The daily and burst rate limiters depend on your subscription type.

#### **Rate limits for enterprise subscriptions**

|                    | Daily API limit | Burst API limit (per minute) |
| ------------------ | --------------- | ---------------------------- |
| Number of requests | 100,000 calls   | 500 calls                    |
| Amount of data     | 500 MB          | 1 MB                         |

#### **Rate limits for professional and non-profit subscriptions**

|                    | Daily API limit | Burst API limit (per minute) |
| ------------------ | --------------- | ---------------------------- |
| Number of requests | 20,000 calls    | 200 calls                    |
| Amount of data     | 100 MB          | 500 KB                       |

#### **Rate limits for free subscriptions**

|                    | Daily API limit | Burst API limit (per minute) |
| ------------------ | --------------- | ---------------------------- |
| Number of requests | 5,000 calls     | 25 calls                     |
| Amount of data     | 25 MB           | 100 KB                       |

Treat these limits as maximums and don’t generate unnecessary load. See [Handling rate limit violations](rate-limits.md#handling-rate-limit-violations) for advice on handling 429s.&#x20;

If you suddenly see a rising number of rate-limited requests, please contact [Singular Support](mailto:support@singular.live?subject=Rate-Limit-Increase). We may reduce limits to prevent abuse or increase limits to enable high-traffic applications.&#x20;

To request an increased rate limit, contact [Singular Support](mailto:support@singular.live?subject=Rate-Limit-Increase).

For integrating data feeds with high-volume, high-frequency, and low-latency updates, we recommend using [Singular Data Streams](https://app.gitbook.com/s/3cdPul5g3lHEzkm2UkSf/data-stream-api).

### Endpoints that use rate limits

* **POST / PATCH:** https://app.singular.live/apiv2/controlapps/:appToken/control
* **POST / PATCH:** https://app.singular.live/apiv2/controlapps/:appToken/command

### Header response codes

Requests to endpoints that use rate limits return custom headers response codes. The response code is a JSON string with detailed information about daily limits and burst limits.

<table><thead><tr><th width="304">Header</th><th>Value</th></tr></thead><tbody><tr><td><h4><strong>X-Singular-Ratelimit-Burst-Calls</strong></h4></td><td><pre class="language-json" data-overflow="wrap"><code class="lang-json">{"limit": 500, "remaining": 499, "reset": 1614430792}
</code></pre></td></tr><tr><td><h4><strong>X-Singular-Ratelimit-Daily-Calls</strong></h4></td><td><pre class="language-json" data-overflow="wrap"><code class="lang-json">{"limit": 100000, "remaining": 99854, "reset": 1614470401}
</code></pre></td></tr><tr><td><h4><strong>X-Singular-Ratelimit-Burst-Data</strong></h4></td><td><pre class="language-json" data-overflow="wrap"><code class="lang-json">{"limit": 1048576, "remaining": 1048452, "reset": 1614430792}
</code></pre></td></tr><tr><td><h4><strong>X-Singular-Ratelimit-Daily-Data</strong></h4></td><td><pre class="language-json" data-overflow="wrap"><code class="lang-json">{"limit": 524288000, "remaining": 522565096, "reset": 1614470401}
</code></pre></td></tr></tbody></table>

#### Rate limit values

<table><thead><tr><th width="312">Property</th><th>Description</th></tr></thead><tbody><tr><td>limit</td><td>Maximum number of requests per minute or day</td></tr><tr><td>remaining</td><td>Number of calls left within the current minute or day</td></tr><tr><td>reset</td><td>UTC time indicates the next reset of the burst or daily limit</td></tr></tbody></table>

### Common causes and mitigation strategies

Rate limits can occur under a variety of conditions, but it’s most common in these scenarios:

* Running a large volume of closely-spaced requests can lead to the burst rate limiting. This often happens when developing or testing a data feed integration. When engaging in these activities, you should try to control the client side's request rate and data volume (see Handling Rate Limit Violations).
* Sending huge amounts of data to the API can lead to the burst rate limiting. This happens when sending growing statistics data over a period of time. In such a case, you should control the data volume on the client-side and only send the required dynamic data to the API.

### Rate limit violations

Rate limit violations are logged to your [Account Usage Statistics](https://app.singular.live/users/settings/accountStatus) and processed according to your subscription level.

**Professional and enterprise subscriptions**: Rate limit violations are logged, but API requests that exceed the limits are still processed.

**Free subscriptions**: Rate limit violations are logged and API requests exceeding the limits are rejected and return [error status code 429](https://tools.ietf.org/html/rfc6585) `Too Many Requests`.

### How to handle rate limit violations

A basic technique for integrations to handle rate limiting is to watch for `429 status codes` and build in a retry mechanism. Your retry mechanism should follow an exponential backoff schedule to reduce request volume or increase the time between requests when necessary. Ideally, the client-side is self-aware of existing rate limits and can pause requests until the currently exceeded window expires.

We also recommend looking into the following techniques for handling limiting smoothly:

* Add randomness into the requests to avoid a [thundering herd problem](https://en.wikipedia.org/wiki/Thundering_herd_problem).
* Implement a [token bucket algorithm](https://en.wikipedia.org/wiki/Token_bucket) for controlling rate limits at a global scale.
