# Choose an integration

Choose the interface according to where your code runs and what it must control.

| Goal                                                  | Interface                           | Reference                                                                       |
| ----------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------- |
| Change Control App content or trigger In/Out remotely | REST API                            | [REST](../../api-and-sdk-reference/api-and-sdk-reference/rest/)                 |
| Deliver frequent data updates to a running graphic    | Data Streams and a runtime consumer | [Data Streams](../../api-and-sdk-reference/api-and-sdk-reference/data-streams/) |
| Transform data or react inside the graphic            | Composition scripting               | [Scripting](../../composition-scripting/composition-scripting/)                 |
| Embed and control a Player from a host web page       | Graphics SDK                        | [Graphics SDK](../../api-and-sdk-reference/api-and-sdk-reference/graphics-sdk/) |
| Integrate overlays with video playback                | Overlay SDK                         | [Overlay SDK](../../api-and-sdk-reference/api-and-sdk-reference/overlay-sdk.md) |
| Develop a reusable custom widget                      | Widget SDK                          | [Widget SDK](../../api-and-sdk-reference/api-and-sdk-reference/widget-sdk.md)   |
| Author and inspect graphics with an AI assistant      | Composer AI                         | [Composer AI guide](../../guides/guides/work-with-composer-ai.md)               |

Several interfaces can be used together. For example, a feed can publish Data Stream messages while a composition script formats them for display. Keep operator inputs and feed-owned widget values distinct.
