# Compatibility

This reference is based on the public SDK distributed at the following runtime path, inspected on 2026-11-10:

```text
https://app.singular.live/libs/singulargraphics/1.0.0/singulargraphics.js
```

The path identifies the distribution used by the examples. Its source header retains an older 0.1.2 label; do not resolve that discrepancy by silently treating it as a different download. Record the exact file when validating a deployment. These source checks establish bridge behavior, not every Player/backend or browser outcome.

## Corrections from the older reference

| Topic | Use in this reference |
| --- | --- |
| Constructor target | Existing iframe ID; the library does not replace a div |
| `loadComposition` | Two arguments: reference and callback |
| `renderComposition` | Two arguments: parsed object and callback |
| `renderAppOutput` | Three arguments: app reference, output selector, callback |
| Load callback | Object with Boolean `success`, not a Boolean callback result |
| ID lookup | `getCompositionById(id)` / `getSubcompositionById(id)`, not `find(id)` or a nonexistent `getComposition` |
| Model | Direct field-descriptor array, not an array wrapping each field in numeric properties |
| Payload pairs | Direct `{key, value}` array |
| Host listeners | Multiple callbacks supported; exact callback removal supported |
| Host error listener | Uses the shared `(event, data)` dispatch signature in this bridge |
| `sequencer.play(time)` | Time is not forwarded; use seek followed by play |
| Host event names | Use the registration allowlist, not every internal dispatch name |

The library itself can emit warnings for unsupported or malformed inputs. Removing warning statements from the documentation samples does not suppress the SDK’s own diagnostics. Fix the payload/model contract rather than overriding the browser console.

## Deprecated / internal calls

The original reference marks `setFrameNumber`, `videoCommand`, and `onmessage` deprecated. Avoid new application dependence on them. `onmessage` is also used internally by the library’s iframe bridge, so do not call it directly or construct private bridge events as a replacement public API.

`seek(to)` exists on host composition wrappers, but a portable composition-seek target contract is not established by the original documentation. Sequence seeking in seconds is documented separately; do not assume the two operations have identical units.

## Support boundaries

- The examples use a modern browser and a network-accessible Player and SDK.
- App API origins and credentials must match the environment you are authorized to use. Cross-host credential equivalence is not established by the SDK.
- No public SDK destroy method is exposed in this inspected instance. Own event cleanup and deliberate iframe replacement separately.
- Current structured controls can exceed the generic host editor’s supported types. Unsupported fields are read-only in the preview.
- No live authenticated app, visual Player rendering, or VOD timing test is claimed by static source inspection.

Inspected distribution SHA-256: `cbfbe77413dc3c120fd3ed69482d8f76526388a76ff468a62d64e08033da067f`. The unchanged MIT-licensed source snapshot is retained with the repository’s verification fixtures.
