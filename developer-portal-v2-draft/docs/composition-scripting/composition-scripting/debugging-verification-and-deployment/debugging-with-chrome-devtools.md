# Debugging with Chrome DevTools

Open browser developer tools for the script editor or actual output host. Select the Player/frame context that runs the composition script rather than assuming the top-level page is the right execution context.

1. Find the relevant script in Sources using its composition/script name.
2. Set a breakpoint in `init()` and in the callback responsible for the behavior.
3. Inspect expected target identity, input type, and branch execution.
4. Trigger a later input change without reloading and observe that callback.
5. Inspect requests and asset failures separately from payload delivery.

Keyboard shortcuts vary by browser/OS; use the developer-tools UI if a shortcut differs. Avoid retaining private tokens, full feed payloads, or raw errors containing credential-bearing URLs in logs.

The Player can catch script exceptions internally, so an absent browser `pageerror` or console error is not proof of successful execution. Confirm the branch ran and place a sanitized diagnostic after a suspected call. Use [the debugging ladder](../debugging-verification-and-deployment/debugging.md).

Do not inject diagnostic overlays into the editor DOM or outside a widget's owned runtime root; they can outlive a script swap and obstruct the operator.
