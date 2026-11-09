# Composition scripting coverage matrix

Planning draft · 2026-11-09

This is a documentation backlog, not a claim of exhaustive catalog coverage or tested runtime behavior. The seed inventory contains 26 widgets with dedicated installed Composer AI scripting references, plus Whirligig as an explicit gap. Reconcile against the current Singular widget catalog before claiming “all widgets”.

Source root: `C:/Users/thoma/.agents/skills/composer-ai/references/`. Widget source paths below are relative to `composition-scripting/`.

## Status legend

| Code | Meaning |
| --- | --- |
| R | Dedicated installed reference located; examples and completeness still need review |
| P | Planned coverage; API/value contract still needs inspection |
| V | Exact version and relevant behavior verified in Player, with evidence recorded |
| U | Unknown or missing reference; do not infer support |
| N/A | Confirmed inapplicable, with supporting evidence recorded |

No row is V in this planning draft. “Unconfirmed” in the activation column means the reference search did not establish an activation contract; it does not mean events are disabled or unsupported.

## Widget inventory

Each widget page must cover read/write properties, supported shared transforms/effects, special features, commands, messages, clearing/reset behavior, and version/evidence. Shared transforms/effects should link to common pages instead of repeating examples.

| Widget | Type ID | Source / property status | Features to cover | Message coverage / activation |
| --- | --- | --- | --- | --- |
| Text | 1032 | R · `widget-text.md` | Font, alignment, spacing, HTML behavior | U |
| Metric Text | 4662 | R · `widget-metrictext.md` | Font 2.0, HTML, overflow, fitting, bounds | `bounds`; `emitEvents: true` |
| Metric Text ML | 4671 | R · `widget-metrictextml.md` | Wrapping, line limits, HTML behavior, bounds | `bounds`; `emitEvents: true` |
| Metric Text Animation | 4706 | R · `widget-metrictextanim.md` | Character/word animation, text changes, HTML | `bounds`; `emitEvents: true` |
| Metric Text Style | 4758 | R · `widget-metrictextstyle.md` | Gradient, outline, glow, shadow, overflow | `bounds`; `emitEvents: true` |
| Metric Text Ticker | 4672 | R · `widget-metricticker.md` | Queue, loop, separators, pause/resume | `tickerPause`, `tickerResume`, `tickerComplete`, `messageStart`; `emitEvents: true` |
| Text Ticker | 1216 | R · `widget-text-ticker.md` | Legacy font, queue, separators, clearing | `tickerPause`, `tickerResume`, `messageStart`; activation unconfirmed |
| Image | 642 | R · `widget-image.md` | Source, fit, shift, mirroring, loading | U |
| Rectangle | 1022 | R · `widget-rectangle.md` | Internal size versus tile size, corners, fill, stroke | U |
| Circle | 1052 | R · `widget-circle.md` | Ellipse, ring, wedge, angles, outline | U |
| Gradient | 12 | R · `widget-gradient.md` | Linear/radial style, transparency, clearing | U |
| HTML | 1212 | R · `widget-html.md` | Content replacement, clearing, markup handling | U |
| AI Graphics | 4792 | R · `widget-aigraphics.md` | Dynamic fields, definition contract, responsive layout | U; inspect definition-specific behavior |
| Bodymovin | 3367 | R · `widget-bodymovin.md` | Asset loading, Timeline-driven playback | U |
| Bodymovin Loop | 3783 | R · `widget-bodymovin-loop.md` | Looping, speed, direction | U |
| Sound | 3585 | R · `widget-sound.md` | Source, volume, playback policy | U |
| Video Animation | 3934 | R · `widget-video-animation.md` | In/Out/loop clips, fit, shift, crossfade | Media events documented; activation unconfirmed |
| Video Background | 3936 | R · `widget-video-background.md` | Looping, fit, shift, composition-state behavior | U |
| Video Clip | 812 | R · `widget-videoclip.md` | Playback commands, source, loop, fit | Media events documented; activation unconfirmed |
| Video Clip with Audio | 4307 | R · `widget-videoclip-with-audio.md` | Video Clip contract and audio behavior | Shared Video Clip event contract; activation unconfirmed |
| Web Page | 822 | R · `widget-web-page.md` | URL, reload, embedded-page readiness | U |
| Timer widget | 3558 | R · `widget-timer.md` | Time Control, count direction, bounds, format, outputs | `timeChanged` on updates; no activation flag documented in reviewed reference |
| Date / Time Countdown | 3617 | R · `widget-date-time-countdown.md` | Target, expiry, templates, outputs | `timeChanged` on successful updates; no activation flag documented in reviewed reference |
| Current Date and Time | 3616 | R · `widget-current-date-time.md` | Format, offset, locale, frequency, outputs | `timeChanged` on updates; no activation flag documented in reviewed reference |
| Table | 1182 | R · `widget-table.md` | Row data, columns, templates, typed cells | U |
| Grid | 3284 | R · `widget-grid.md` | Cell data, templates, spacing, pagination, transitions | U |
| Whirligig | Unknown | U · no dedicated scripting reference found | Inventory features and exact loaded contract | User-identified message producer; names, payloads, activation need verification |

## Shared property and behavior coverage

| Topic | Required examples | Status / evidence to obtain |
| --- | --- | --- |
| Target resolution | Owning composition, unique widget lookup, duplicates, missing target | R · portal widget-object page; expand scope examples |
| Payload reads and patches | Read, update one field, preserve unrelated fields, nested object handling | R · widget-object and per-widget references; check each nested contract |
| Position and size | Read/write X/Y, parent-relative units, groups, pixel layouts | R · portal widget-object page |
| Anchors | Interpret stored position versus rendered edge; supported changes | R for explanation; P for scripting mutation support |
| Rotation and opacity | Read/write; degrees, opacity 0–100, inherited state | R · portal widget-object page |
| Visibility | Read/write false and true; ancestor visibility | R · portal widget-object page |
| Other transforms | Inventory scale, pivot, skew, or other available UI fields | P · establish which have public runtime access |
| Native effects | Brightness, blur, contrast, grayscale, hue rotation, invert, saturation, sepia | P · distinguish direct runtime methods from linked Control Node access; verify units/ranges |
| Widget-specific effects | Text shadow, outline, glow, gradients, native text animation | R references available; review per widget |
| Groups and sub-compositions | Lookup, supported layout methods, inherited transforms, scope | P · review group/composition APIs |
| Ownership | Direct link, standalone control consumer, script-owned destination | R · control-node and widget-object references |
| HTML | Activation/format, supported markup, escaping, clearing, variant differences | R references available; verify exact per-widget contract |
| Messages | Enable, listen, filter sender, payload shapes, repeat handling, cleanup | R for documented subset; catalog audit P |
| Readiness | Fonts, media, templates, bounds timing, initial values | R references available; runtime checks P |
| Lifecycle/performance | Init/close, cancel scheduled work, coalesce frequent events, avoid redundant writes | P · review core API and runtime-events references |
| Persistence and delivery | Runtime versus saved model, Player versus operator UI | P · document separately for each API surface |

## Control Node inventory

This seed list comes from `control-nodes.md`, which lists agent-created types. It is not proof that every type can be written from a composition script. In particular, authoring-tool validation is not a composition-script payload contract.

For every row, document raw read shape, accepted write shape, one read example, one update or supported action example, metadata access, links/mapping, empty/reset behavior, and evidence/version.

| Type | Read example | Update/action example | Specific questions or required notes |
| --- | --- | --- | --- |
| `text` | P | P | String, clearing, public ID |
| `textarea` | P | P | Newlines, whitespace, clearing |
| `number` | P | P | Runtime accepted types, bounds, zero |
| `normalizednumber` | R | P | Raw 0–100 versus mapped output; inspect low/high metadata |
| `counter` | P | P | Integer values and any action semantics |
| `color` | P | P | Runtime representation, alpha, linked renderer conversion |
| `image` | P | P | Exact media reference shape and clearing |
| `checkbox` | P | P | Boolean false must remain meaningful |
| `audio` | P | P | Asset reference versus playback command |
| `video` | P | P | Asset reference versus playback command |
| `data` | P | P | Exact schema, shape, update semantics |
| `jsonfile` | P | P | File reference versus loaded JSON; readiness |
| `json` | P | P | Object versus string, arrays, nested replacement |
| `datetime` | P | P | Format, timezone, invalid/empty values |
| `location` | P | P | Coordinate shape, units, validation |
| `selection` | P | P | Stored value versus option label; local/URL sources |
| `button` | P | P | Trigger/action contract, repeated activation |
| `timecontrol` | P | P | Time Control state and ownership; distinct from Timer |
| `timer` | R | R | Formatted reads, commands, `emitEvents` configuration, `timerChanged`; verify how configuration can be changed at runtime |
| `infotext` | P | U | Determine read-only/display behavior; do not promise writes |
| `metricfont` | P | P | Complete font object/metrics and supported mutations |
| Gradient / other catalog types | U | U | Reconcile catalog; native Gradient is outside current agent support, which does not establish runtime support or lack of support |

Normalized Number sources: `control-node-value-types.md` and portal normalized-number reference. Native Timer source: `control-node-timer.md`. Other type-specific contracts must be read before filling examples.

## Detailed property worksheet

Create one row per property or operation while authoring each page. This worksheet establishes whether a widget page is complete.

| Widget/control + version | UI label | Runtime key/method | Read shape | Write shape | Units/range | Activation/setup | Owner/link | Empty/reset | Example link | Source | Verification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| <target> | <label> | <identifier> | <shape> | <shape or unsupported> | <contract> | <requirements> | <authority> | <behavior> | <entry> | <source> | <status + evidence> |

## Message worksheet

| Widget/control + version | Message | Activation required? | Activation API/UI | Sender identity | Payload shape | Trigger/cadence | Initial/replay behavior | Repeated/terminal behavior | Example + evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| <target> | <exact name> | <yes/no/unknown> | <verified contract> | <routing fields> | <shape> | <condition> | <contract> | <guard needed> | <links> |

## Completion criteria

1. Reconcile widget and Control Node inventories against an authoritative current catalog; record catalog date and supported versions.
2. Populate the property and message worksheets from exact runtime contracts, including editor-only or unsupported operations where established.
3. Write entries using `composition-scripting-example-standard.md` and link them from the canonical navigation.
4. Verify meaningful behavior in Player for the claimed versions; record outcomes and remaining gaps.
5. Review catalog coverage separately from property coverage and tested example coverage. A reference file alone does not mark a widget complete.

## Implementation in this draft

Added the Scripting reference & cheat sheets navigation branch with 26 widget pages and shared property, HTML, message, reactive, and grouped Control Node pages. Existing grouped payload contracts remain in place and link to the new pages. Unknown contracts (including Whirligig and several structured/media Control Node writes) are explicitly marked. None of these new entries has been live Player-verified.

| Widget page | Documentation | Runtime verification |
| --- | --- | --- |
| [AI Graphics](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/aigraphics.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Bodymovin Loop](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/bodymovin-loop.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Bodymovin](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/bodymovin.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Circle](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/circle.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Current Date and Time](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/current-date-time.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Date / Time Countdown](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/date-time-countdown.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Gradient](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/gradient.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Grid](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/grid.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [HTML](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/html.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Image](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/image.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Metric Text](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/metrictext.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Metric Text Animation](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/metrictextanim.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Metric Text ML](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/metrictextml.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Metric Text Style](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/metrictextstyle.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Metric Text Ticker](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/metricticker.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Rectangle](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/rectangle.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Sound](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/sound.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Table](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/table.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Text Ticker](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/text-ticker.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Text](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/text.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Timer widget](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/timer.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Video Animation](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/video-animation.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Video Background](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/video-background.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Video Clip with Audio](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/videoclip-with-audio.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Video Clip](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/videoclip.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
| [Web Page](docs/composition-scripting/composition-scripting/cheat-sheets/widgets/web-page.md) | Added; exact property completeness still needs catalog reconciliation | Pending |
