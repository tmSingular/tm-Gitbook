# Handle interactive events

Configure an interactive widget/group area in Composer and send a message to composition JavaScript for the intended interaction. The incoming message is not the browser DOM event itself.

Interactive messages use `msg.type` (for example `mousedown`) and `msg.params`, which identifies the originating tile/group with `type`, `id`, `name`, and `compId`. Filter actual IDs from inspection. Do not reuse this envelope for Timer or other widget messages.

For a native Button Control Node, use the complete [button example](../examples/interactive-overlay-with-button-events.md). It uses the separate `button_clicked` event and public button ID. A widget/group pointer interaction needs the `message` route described here; adapt it using the actual Composer-configured interaction and inspected source ID.

Register one owned `message` slot, preserve unrelated routes in that callback, and stop propagation only when parents must not consume the interaction. Verify wrong-source rejection, repeated events, output state, and the actual interactive host.
