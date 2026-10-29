# Handle interactive events

Configure the intended interactive area in Composer, then handle its messages in the script responsible for that behavior.

- [Published interaction setup guide](https://developer.singular.live/singular-basics/building-overlays-in-composer/how-to-make-overlays-interactive)
- [Event listeners](../api-reference/event-listeners.md)
- [Interactive overlay example](../examples/interactive-overlay-with-button-events.md)

Check the event's source identity and payload before acting. Decide whether parent compositions need to receive the event before stopping propagation.
