# Configuration and adaptation

Configuration accompanies loading. Adaptation globals describe presentation choices used by the graphic. Neither is a substitute for the graphic’s public Control Node payload.

## Configuration

```javascript
// Host-page fragment before loading; use config keys defined by your Player deployment.
const config = {};
graphics.setConfig(config);
const currentConfig = graphics.getConfig();
```

The inspected SDK stores configuration and includes it in loading commands. It does not define a complete public schema of config keys in this library, so this reference does not invent autoplay, dimensions, credential, or layout settings. The empty object above is a valid neutral example, not a list of supported options. Use iframe HTML/CSS for host layout.

Call `noTrack()` before app-output loading when that integration requires the bridge’s no-tracking flag. The flag is sent on the inspected `renderAppOutput` path; do not describe it as a promise to suppress every application’s telemetry.

## Adaptation globals

Read existing values with `getAdaptationGlobals()` and apply intended changes through `setAdaptationGlobals(values)`:

```javascript
// Host-page fragment after loading. The graphic must define the behavior of these values.
const currentGlobals = graphics.getAdaptationGlobals();
graphics.setAdaptationGlobals({ layout: "portrait", language: "en", textDirection: "ltr" });
```

The original examples include custom1/custom2/custom3, layout, language, screenSize, textDirection, and interactive values. They are data interpreted by the graphic/runtime, not a guarantee that every composition supports every selection or automatically rearranges itself. Check the adaptation configuration used by the loaded composition.

The bridge merges the supplied globals into its current adaptation data, sends them to the Player, and emits `adaptation_globals_changed`. Treat getter results as read-only; mutating a returned object is not a supported substitute for the setter. Do not infer measured canvas or widget dimensions from an adaptation label such as portrait or small.

## Runtime boundaries

Host calls use `graphics.getAdaptationGlobals()`. Composition scripts use their `context.utils` getters, including display-variant access. These are different API objects and do not necessarily have identical copy semantics or event support. See the local [context utility reference](../../../composition-scripting/api-reference/context-and-utilities.md).

Check the requested adaptation in the actual Player, including initial load and later changes. A value in the SDK cache alone does not prove the composition used it for layout or rendering.
