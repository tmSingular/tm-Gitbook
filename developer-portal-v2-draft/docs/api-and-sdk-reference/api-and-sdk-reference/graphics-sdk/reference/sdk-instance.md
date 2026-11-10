# SDK instance

Create an instance against an existing Player iframe:

```javascript
// Host-page fragment, after the iframe exists and the SDK library is loaded.
const graphics = SingularGraphics("SingularOverlay");
```

`graphics.id` is the iframe ID and `graphics.host` is the Player origin derived from its `src`. The constructor does not create or replace a div. The inspected constructor also accepts an optional second API-key argument used by some loading environments; these examples do not require or infer a key.

## Loading

| Method | Parameters | Result |
| --- | --- | --- |
| `loadComposition(reference, callback)` | Composition token or JSON URL; callback | Queues a Player load |
| `renderComposition(compositionObject, callback)` | Parsed composition definition; callback | Queues rendering of the supplied object |
| `renderAppOutput(appReference, output, callback)` | Supported app reference; output selector; callback | Queues app-output loading |

All three callbacks receive `{ "success": true }` or `{ "success": false }` in the inspected bridge. An object containing `success: false` is truthy, so `if (result)` is not a load-success check.

```javascript
// Host-page fragment; compositionUrl is your extracted JSON URL.
graphics.loadComposition(compositionUrl, function(result) {
  if (result.success) {
    const compMain = graphics.getMainComposition();
    const compLowerThird = compMain.find("Lower Third")[0];
    compLowerThird.jumpTo("Out");
  }
});
```

Commands can be queued while the iframe is becoming ready, but getters need loaded composition data. Wait for the load callback before resolving wrappers. Do not start overlapping loads on one instance: the bridge reports a busy operation instead of providing a cancellable load API. Replace composition-wrapper references after a new load.

## Getters

| Method | Returns |
| --- | --- |
| `getMainComposition()` | Root composition wrapper after loading; otherwise undefined |
| `getCompositionById(id)` | Wrapper for a loaded composition ID; undefined for an unknown ID |
| `getCompositionInfo()` | Loaded definition/cache, including composition ID, names, data sources, states, properties, and adaptation globals |
| `getSequencer()` | Sequencer wrapper for the loaded root |
| `getConfig()` | Configuration readback; keys depend on the Player configuration contract |
| `getAdaptationGlobals()` | Loaded adaptation-global values |

Treat returned definitions and models as read-only. Do not edit internal caches to simulate a setter. Readback describes SDK state, not proof of final rendered pixels or successful delivery to another app.

## Events and cleanup

`addListener(event, callback)` appends a callback. Multiple host callbacks for the same event are supported. `removeListener(event, callback)` removes that callback; keep the exact function reference. Omitting the callback clears that event’s callbacks. `removeAllListener()` clears the SDK instance’s event callbacks and should be reserved for an instance whose listeners you fully own.

There is no public destroy/dispose method in the inspected instance. Removing event callbacks does not itself destroy the iframe or release every internal SDK reference. Normal page teardown releases the page’s environment; deliberate SPA iframe replacement needs its own ownership design.

See [Events and messages](events.md) for accepted event names and examples. The host listener API differs from the one-slot composition-script listener API.

## Configuration, tracking, and compatibility

`setConfig(config)` stores configuration for loading commands; `getConfig()` reads it. Set configuration before loading. `setAdaptationGlobals(values)` sends adaptation values to the loaded Player. `noTrack()` sets the app-output loading flag used to disable analytics tracking on that path; call it before loading rather than assuming it removes all application telemetry.

The older reference marks `onmessage`, `setFrameNumber`, and `videoCommand` deprecated. `onmessage` also exists as an internal bridge entry point; do not call it or emit private bridge messages as an integration API. See [Compatibility](../compatibility.md).
