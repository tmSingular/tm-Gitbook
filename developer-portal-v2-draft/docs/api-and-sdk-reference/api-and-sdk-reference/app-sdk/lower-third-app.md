# Lower-third Control App

This hosted example reads the current lower-third text, lets the operator edit a draft, and sends it only when Apply is pressed. In and Out animate the child independently of editing. It checks its configuration before enabling the buttons.

{% file src="../../../.gitbook/assets/app-sdk-lower-third.zip" %}
Download the complete hosted app HTML as a ZIP archive.
{% endfile %}

## Run it

1. Follow [environment setup](prepare-your-environment.md).
2. Assign a composition to the test app output named `Default`.
3. Add a direct child named `Lower Third` with a **text** control ID `Name`. Bind the control to the intended text widget in Composer.
4. Extract the ZIP and save its HTML file as `source/app.html`, deploy it, and open the development instance.
5. Change the text, press Apply, then In. Confirm Out plays the exit animation.

The hosted runtime calls `singularAppInit`; the file intentionally has no local bootstrap credentials. For a local adaptation, use [Hosted and local development](hosted-and-local-development.md).

## What to verify

Reloading reads `getPayload2()` and does not reset the output. Editing alone leaves the output unchanged. Missing output, child, or text control leaves all command buttons disabled. Reinitialization replaces DOM event handlers rather than accumulating them.

The example does not subscribe to other operators' edits. A production app should choose a conflict policy before adding shared storage or payload listeners. App SDK commands change the shared app composition and may affect viewers of its outputs.
