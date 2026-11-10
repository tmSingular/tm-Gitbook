# Publish data

Publish JSON to an existing stream using its private write token. The receiving composition script interprets the JSON; the service does not automatically map it onto graphic controls.

## HTTP request

```http
PUT https://datastream.singular.live/datastreams/{privateToken}
Content-Type: application/json
```

| Part | Required value |
| --- | --- |
| Method | `PUT` |
| Host | `datastream.singular.live` |
| Path | `/datastreams/{privateToken}` |
| Path parameter | The private token for the target stream |
| Content-Type | `application/json` |
| Body | Valid JSON matching the receiving application’s contract |

Replace the brace-delimited placeholder with the actual token. The documented authentication mechanism is the private token in the path; do not substitute a public read token or assume Control App authorization headers apply.

## Request body

The service accepts JSON data; the examples use an object with named fields so consumers can address them consistently:

```json
{
  "number": 123,
  "text": "First update",
  "isActive": true,
  "color": "#3333ff"
}
```

The field names above are examples, not reserved API fields. Send the object itself, rather than wrapping it in `{"payload": ...}`; the subscriber’s message envelope supplies `message.payload`.

Boolean false, numeric zero, and an empty string are intentional values. Define how a consumer interprets omitted fields and null values rather than silently treating them as clearing commands.

## curl examples

Bash/POSIX shell:

```bash
curl --request PUT \
  --url "https://datastream.singular.live/datastreams/YOUR_PRIVATE_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{"text":"First update"}'
```

For PowerShell, create `message.json` with the JSON body and send it with the native curl executable:

```powershell
curl.exe --request PUT --url "https://datastream.singular.live/datastreams/YOUR_PRIVATE_TOKEN" --header "Content-Type: application/json" --data-binary "@message.json"
```

Use `--include` if you need to inspect response headers and status during manual testing. Do not include real tokens in shared command output.

## Responses and delivery

The documented success response is **200 OK**. No stable response-body schema is specified in the available API contract, so this reference does not invent a JSON success object or require one in a client.

For an unsuccessful response, inspect the actual HTTP status and response content and check the method, private token, JSON validity, content type, and [limits](limits.md). A standardized list of failure codes and response bodies is not established here. Do not infer a particular authentication, throttling, or validation code from its name alone.

Successful publishing does not prove that every Player has rendered the value. Confirm a second update in one running subscriber, then verify the intended app output.

## Complete payloads and update frequency

Publish all fields a consumer needs for a coherent update. Do not rely on unspecified field-level merge behavior between publications. The stream retains the latest payload; it is not a documented event-history or command-replay interface. Application-specific sequence numbers or publisher timestamps can help a consumer interpret updates but do not create service delivery guarantees.

See [message format](messages.md), [limits](limits.md), and [connection lifecycle](lifecycle.md).
