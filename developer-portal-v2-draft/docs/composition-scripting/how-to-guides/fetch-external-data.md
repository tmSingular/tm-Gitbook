# Fetch external data

Choose the provider, permissions, response schema, update cadence, failure display, and credentials policy before implementing a feed. No universal endpoint or polling interval is implied by this guide.

Use an unlinked widget destination and validate data before writing. Preserve the last good graphic on failure. Keep private credentials server-side and account for the provider's browser CORS policy.

The following is a **fragment to adapt inside an owning script**, not a runnable provider integration:

```javascript
// fetch and AbortController require explicit browser support checks.
var closed = false;
var generation = 0;
var controller = null;
function load(endpoint, target) {
  if (closed) return Promise.resolve();
  generation += 1;
  var requestGeneration = generation;
  if (controller) controller.abort();
  controller = new AbortController();
  return fetch(endpoint, { signal: controller.signal }).then(function(response) {
    if (!response.ok) throw new Error('Feed request failed');
    return response.json();
  }).then(function(data) {
    if (closed || requestGeneration !== generation) return;
    if (!data || typeof data.text !== 'string') throw new Error('Invalid feed data');
    target.setPayload({ text: data.text });
  }).catch(function() {
    if (!closed && requestGeneration === generation) console.warn('Feed update failed');
  });
}
function closeRequests() {
  closed = true;
  generation += 1;
  if (controller) controller.abort();
  controller = null;
}
```

The owning `close()` must call `closeRequests()`. Pass only the agreed endpoint and destination. This fragment deliberately defines no polling or retry policy. If you add those, bound retries, clear scheduled timers, avoid overlapping work, and test late completion after closure/replacement.

A successful mocked response does not prove real transport, CORS, freshness, or background recovery. Verify those separately for the actual provider and host.
