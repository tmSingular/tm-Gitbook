# Widget payloads

Select a contract by the widget's actual type and loaded version. A composition script's `widget.setPayload()` is distinct from Composer AI authoring commands and from host SDK Control Node writes.

| Payload reference | Covered widget IDs |
|---|---|
| [Text and Metric Text](text-and-metric-text.md) | Text 1032; Metric Text 4662; ML 4671; Animation 4706; Style 4758 |
| [Image and Rectangle](image-and-rectangle.md) | Image 642; Rectangle 1022 |
| [Table and Grid](table-and-grid.md) | Table 1182; Grid 3284 |
| [HTML](html.md) | HTML 1212 |
| [Tickers](tickers.md) | Legacy Text Ticker 1216; Metric Text Ticker 4672 |

These pages cover the common widgets used by the scripting guides. They are not an exhaustive widget catalog. For another widget, inspect its loaded schema and use its dedicated runtime contract before writing unfamiliar keys. Do not infer API fields from display labels.

Live schema and version inspection take precedence when a field, type, or supported option differs. Renderer fallbacks are not guaranteed catalog defaults. Preserve unrelated payload fields, fonts, template relationships, and required integration controls.
