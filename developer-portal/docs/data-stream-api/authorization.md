# Authorization

The data stream API uses a private token and a public token to provide authorization.

**Private token**

The private token is used by the REST API to send data to the data stream and must be kept secret. Anyone with that token can write to the data stream.

**Public token**

The public token is used in the composition script and can be known by anyone. With the public token, you can listen to the data coming from the data stream.

To locate data stream tokens, or create new ones, navigate to the Dashboard and select Data Stream Manager in the user menu.
