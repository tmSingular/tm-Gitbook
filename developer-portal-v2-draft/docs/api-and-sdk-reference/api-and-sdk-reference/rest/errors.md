# Errors

Inspect the response status and body before deciding whether to retry. Validate the app token, target ID, request JSON, and field types when a request is rejected.

For rate limiting, follow the [published 429 handling guidance](https://developer.singular.live/rest-api/rate-limits#how-to-handle-rate-limit-violations). Bound retries and account for repeated effects before retrying animation or button commands.

* [Rate limits](limits.md)
* [Schemas](schemas.md)
* [Troubleshooting by symptom](../../../operate-and-troubleshoot/operate-and-troubleshoot/troubleshooting-by-symptom.md)
