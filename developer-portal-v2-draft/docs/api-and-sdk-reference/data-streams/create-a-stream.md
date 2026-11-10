# Create a stream and find its tokens

Create streams in the Singular Dashboard before publishing or subscribing. The publishing endpoint documented in this section updates an existing stream; it is not a stream-creation API.

## Dashboard steps

1. Open the Singular Dashboard.
2. Open the user menu and select **Data Stream Manager**.
3. Select **New**, enter a descriptive stream name, and create the stream.
4. Locate the stream’s public and private tokens in Data Stream Manager.
5. Copy the public token into the composition-script consumer and the private token into the publishing application’s configuration.

Use names that identify the feed’s purpose and environment, such as Match Statistics — Test. The stream’s name is for identification; requests and subscriptions use its tokens.

## Token roles

| Token | Capability | Used in |
| --- | --- | --- |
| Private | Publish data to this stream | HTTP publishing endpoint path |
| Public | Read data from this stream | `context.utils.createDataStream(publicToken, callback)` |

Anyone with the private token can publish to the stream. Keep it in the publisher’s protected configuration rather than embedding it in a composition script or exposing it in logs. Public tokens grant read access; “public” does not make the stream’s contents suitable for confidential data.

The tokens are Data Stream credentials, not interchangeable with Control App access tokens. A correctly formed request sent with another stream’s private token will not update the stream your current public token subscribes to.

## Input contract

Agree on field names, types, units, and clearing behavior before connecting a live provider. The quick start uses `{ "text": "First update" }`. A score graphic might instead expect numeric `homeScore` and `awayScore` fields. The application defines those names; creating a stream does not create matching Control Nodes or widget links.

Continue with the [quick start](quick-start.md) or [Publish data](publish.md).
