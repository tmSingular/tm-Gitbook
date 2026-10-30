# Architecture, terminology, and data flow

A **composition** is the graphics document authored in Composer. Its **root composition** contains sub-compositions, widgets, and controls. A **Control App** exposes the composition's operator-facing inputs. A **Player** renders output and runs composition scripts.

Typical data paths are:

1. An operator or REST client updates a Control App; the output receives the relevant control values.
2. A publisher sends data to a Data Stream; a composition script subscribes and applies it to widget content.
3. A host web page embeds a Player and communicates through its SDK interface.

Methods with similar names can belong to different objects. An in-script composition object, a widget object, and a host SDK object are separate interfaces. Start with [Host boundaries](../../composition-scripting/composition-scripting/core-concepts/host-boundaries.md) before combining them.

Use the [published terminology glossary](https://developer.singular.live/support/singular-terminology) for Dashboard, output URL, template, and other product terms.
