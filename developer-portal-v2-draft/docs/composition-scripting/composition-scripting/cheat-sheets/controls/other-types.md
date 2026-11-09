# Other types and read-only fields

The reference inventory is a starting point, not a complete current-catalog guarantee. For every additional type, establish whether it is a writable runtime input, action, display field, or editor-only configuration before adding an example.

## Info Text

Use [model inspection](README.md#read-any-existing-type) to identify `infotext` fields. A runtime value-write contract has not been established in the reviewed sources. Do not imply a display field is writable merely because its metadata can be inspected.

## Gradient and additional types

Native Gradient Control Node authoring is outside the current Composer AI agent support contract. That does not prove the Player has no Gradient runtime type. Establish a public value shape before documenting a native Control Node update. Widget gradient examples remain available under [colors and nested objects](../colors-and-nested-objects.md).

## Read-only metadata

`compCurrent.getModel()` and `compCurrent.getControlNode()` expose definitions for inspection. Do not mutate returned objects to change types, bounds, selection options, containers, defaults, or links. Configure these in Composer using its supported authoring path.

When a type-specific write is unverified, document the read, consumer, and gap instead of inventing a setter. The maintenance coverage matrix tracks these gaps separately from completed examples.
