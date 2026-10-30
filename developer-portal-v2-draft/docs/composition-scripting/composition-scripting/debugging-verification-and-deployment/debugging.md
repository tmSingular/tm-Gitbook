# Debugging

## Debugging ladder

1. Confirm the script initializes in the intended script-editor preview or Player.
2. Confirm the responsible listener/callback branch runs after initialization.
3. Check exact target names, IDs, loaded versions, links, and input types.
4. Try a simple visible content change before diagnosing subtle geometry.
5. Check the correct payload field versus layout method and its units.
6. Check propagation, handler replacement, and freshness of saved content/extracts.

The Player catches some script exceptions internally. Missing a later log is only a clue: first check branch execution and log collection. A browser-level error listener does not necessarily see every script failure.

Use sanitized diagnostic labels around a suspect call:

```javascript
try {
  applyPresentation(); // Your existing update function.
  console.log('Presentation update completed');
} catch (error) {
  console.error('Presentation update failed');
}
```

Do not print private tokens, arbitrary raw errors, or full payloads. Keep diagnostics inside the owned script/runtime surface; avoid adding nodes to `document.body`, editor DOM, or another widget's root.

## Common causes

| Observation                             | Check                                                             |
| --------------------------------------- | ----------------------------------------------------------------- |
| It works only after reload              | Initial-only logic; add reactive updates                          |
| One feature stops when another is added | A shared composition/event slot was replaced                      |
| Script values revert                    | A native link, persisted-model update, or another writer competes |
| Slider mapping is wrong                 | Raw Normalized Number percentage versus mapped value              |
| A fade is almost invisible              | Opacity percent versus color alpha                                |
| Root cannot find a widget               | Find the owning descendant composition first                      |
| Timer arithmetic is wrong               | Seconds versus legacy milliseconds; formatted versus rich reads   |
| Private preview works; app does not     | Saved composition/extract and actual output delivery              |

Use [DevTools](debugging-with-chrome-devtools.md), [verification](verification.md), and the relevant widget contract. If observations conflict, report what was actually observed rather than inventing a renderer cause.
