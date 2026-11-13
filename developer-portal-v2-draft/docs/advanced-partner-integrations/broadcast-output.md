---
description: "Separate preview graphics from on-air graphics with Singular Output and Broadcast URLs and REST commands."
---

# Singular Broadcast Output

Use the Broadcast output when your application needs a separate on-air graphics destination while an operator prepares content in the standard Output. The control app edits the standard Output; explicit commands copy content between the two outputs.

This guide adapts *Singular Broadcast Output*, version 1.2, December 2023. Verify Broadcast command support with the app type and environment used for your integration. The commands below are shared platform operations, not newly assigned partner endpoints.

## Choose the output for each role

| Destination | Role in this workflow |
| --- | --- |
| Standard `Output` | The app-controlled output used to prepare and preview the next graphics state. It can also be used directly for ordinary live-streaming or embedded-player workflows. |
| `Broadcast` | The separate production output to which the prepared graphics state is copied for on-air use. |

In a preview/program arrangement, connect preview to `Output` and production to `Broadcast`. If production displays `Output`, normal app edits will be visible there; changing which destination your application labels “preview” does not change that behavior.

## Get the URLs

Locate the output URL in the app instance's **Share** menu. The source documents this relationship:

```text
https://app.singular.live/output/OUTPUT_TOKEN/Output?aspect=16:9
https://app.singular.live/output/OUTPUT_TOKEN/Broadcast?aspect=16:9
```

Use the URLs provided for your app instance and preserve its required query parameters. `OUTPUT_TOKEN` is the graphics output identifier; it is not the Shared App Token used to authorize control commands. Do not substitute one token for the other.

## Prepare and take graphics to air

1. Load the standard Output in preview and Broadcast in the production destination.
2. Use the control app to prepare the desired subcompositions and content in Output.
3. Review the preview.
4. Send `CopyOutputToBroadcast` to copy the prepared state into Broadcast.
5. Verify Broadcast, then prepare the next graphics state in Output.

These operations copy graphics state between outputs. They do not copy or switch your application's background video.

## REST API v2 commands

Send JSON to the command endpoint with your **Shared App Token** in the path:

```text
POST https://app.singular.live/apiv2/controlapps/APP_TOKEN/command
Content-Type: application/json
```

The shared token authorizes these requests; the source requires no additional Basic or Bearer authentication for this endpoint. Protect the token and exclude it from public code, logs, screenshots, and analytics.

| Operation | JSON body | Destination affected |
| --- | --- | --- |
| Take the prepared state to air | `{"action":"CopyOutputToBroadcast"}` | Copies Output into Broadcast. |
| Restore the on-air state to preview | `{"action":"CopyBroadcastToOutput"}` | Copies Broadcast into Output, replacing the prepared preview state. |
| Take all Broadcast graphics out | `{"action":"TakeOutAllBroadcast"}` | Takes out graphics in Broadcast. |
| Take control-app graphics out | `{"action":"TakeOutAllOutput"}` | Takes the app's graphics to the Out state; verify the affected outputs for your app. |

For example, with `APP_TOKEN` set to your Shared App Token:

```sh
curl --request POST \
  "https://app.singular.live/apiv2/controlapps/$APP_TOKEN/command" \
  --header 'Content-Type: application/json' \
  --data '{"action":"CopyOutputToBroadcast"}'
```

Inspect the HTTP status and response body. Verify the resulting output before treating an operation as complete. Do not send commands to an on-air app while testing this guide.

### Restore the Broadcast state to Output

Use `CopyBroadcastToOutput` when the prepared preview should return to the state currently represented by Broadcast. This overwrites the prepared Output state; make this distinction visible in the host application's controls.

### Clear the intended destination

Use `TakeOutAllBroadcast` to take Broadcast graphics out. The source also lists `TakeOutAllOutput` on its clearing page, while the current REST reference describes that action as taking all control-app elements to the Out state. Do not assume it only clears preview or is interchangeable with the Broadcast-specific action. Validate both against a test app and check every output your app exposes before release.

## REST API v1 compatibility

The December 2023 source also documents these legacy forms. Keep them for an existing integration; verify availability before choosing them for new work.

| Operation | App instance ID with Basic authentication | Shared App Token without additional authentication |
| --- | --- | --- |
| Output to Broadcast | `PUT /apiv1/appinstances/APP_INSTANCE_ID/output2broadcast` | `PUT /apiv1/control/APP_TOKEN/output2broadcast` |
| Broadcast to Output | `PUT /apiv1/appinstances/APP_INSTANCE_ID/broadcast2output` | `PUT /apiv1/control/APP_TOKEN/broadcast2output` |
| Clear Broadcast | `PUT /apiv1/appinstances/APP_INSTANCE_ID/clearbroadcast` | `PUT /apiv1/control/APP_TOKEN/clearbroadcast` |

These paths use the `https://app.singular.live` origin and send no request body. The app instance ID, Shared App Token, and output token have different purposes; keep their configuration fields separate.

## Validate the workflow

Use an isolated test app. Prepare visibly different states in Output and Broadcast, then verify each copy direction. Confirm that ordinary app edits stay in the expected destination, that each take-out action affects the intended output, and that reconnecting or reloading a renderer shows the expected state. Include multiple subcompositions and animation states in the test.

Source: *Singular Broadcast Output*, version 1.2, December 2023. The screenshots were rewritten as the destination table and workflow above, and example app tokens were replaced with placeholders. See the [Singular REST API reference](https://api.singular.live/) for the common control command endpoint. No live copy or take-out commands were issued during documentation integration.
