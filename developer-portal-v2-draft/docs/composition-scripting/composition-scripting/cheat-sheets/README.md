# Scripting reference & cheat sheets

Find a short example for the operation you need. Examples run inside composition scripts in the Player or script-editor output preview. They do not run on the normal Composer canvas.

| I want to… | Start here |
| --- | --- |
| Change widget content or a widget-specific setting | [Widget reference](widgets/README.md) |
| Move, resize, rotate, hide, or fade a widget/group | [Transforms and visibility](transforms-and-visibility.md) |
| Apply native filters or widget-specific effects | [Effects](effects.md) |
| Update fonts, colors, or gradients without losing fields | [Colors and nested objects](colors-and-nested-objects.md) |
| Render styled text markup | [HTML text](html-text.md) |
| Activate and receive widget messages | [Widget events and custom messages](widget-messages.md) |
| Read/write a composition input | [Control Node values](controls/README.md) |
| Recompute presentation after an input changes | [React to changes](react-to-changes.md) |

## Before copying code

1. Identify the owning composition, exact widget type/version, and public Control Node IDs. Names can be duplicated; these examples assume their documented names resolve uniquely.
2. Keep one writer per destination. Update a linked property through its defining Control Node, or leave the destination unlinked for script-owned presentation. Do not compete with Timeline/Update animation.
3. Check units and shapes. Tile geometry differs from widget content; opacity uses 0–100 while color alpha uses 0–1.
4. A fragment labeled `init(compCurrent)` belongs inside your existing script wrapper. Merge listener logic into existing handlers: each composition/event pair has one slot. Use ES2017-compatible JavaScript.
5. Verify initialization, later changes, and relevant empty/zero/false cases in the same running Player. Follow [verification guidance](../debugging-verification-and-deployment/verification.md).

## Scope and evidence

Widget payload writes affect running widget content; composition payload writes address Control Node values. Neither is an editor schema mutation API or proof of saved document changes. Player-side writes do not synchronize the Control App operator form. See [host boundaries](../core-concepts/host-boundaries.md).

Examples are based on the reviewed scripting contracts. No new live Player verification was performed for this documentation update. Unknown contracts are identified rather than represented as working code. Full implementations remain under [Examples](../examples/README.md); detailed method signatures remain in [API reference](../api-reference/README.md).
