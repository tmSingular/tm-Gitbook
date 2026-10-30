# Composition scripting alignment

Updated 29 October 2026 against the installed composer-ai skill and its focused runtime references.

## Scope

The draft's composition scripting documentation now covers lifecycle/signatures, namespaces, lookup, read-only control metadata, raw normalized values, single-slot listener ownership, native animation, percentage layout and anchors, native Timer actions/events, common widget payloads, and evidence-aware deployment.

Completed the heading-only HTML, interactive-button, score-feed, and script-editor reference pages. Updated old examples to apply initial state, handle later input, validate targets, escape embedded text, preserve property ownership, and release resources. Added complete Timer, bounds, clock, and interruptible-opacity examples.

## Source mapping

| composer-ai reference | Draft destinations |
|---|---|
| composition-scripts.md; singular-scripting-doc.md | Core concepts, composition/widget/group APIs, lifecycle and host boundaries |
| runtime-events.md | Event listeners, animation control, reactive and interpolation examples |
| control-node-value-types.md | Normalized numbers, native color versus gradient ownership |
| control-node-timer.md | Timer command units, identity, formatted getters and rich events |
| script-design.md; scripting-examples.md | Reactive controls, feeds, clocks, composition communication |
| widget-references.md and selected widget contracts | Widget compatibility and common payload references |
| debugging-and-verification.md; player-sdk.md | Debugging, evidence boundaries, host versus in-script callbacks |

Common payload coverage includes Text/Metric Text families, Image, Rectangle, Table, Grid, HTML and tickers. This is not a complete widget catalog. Inspect the live schema and loaded version for all changes.

## Editorial decisions

- ES2017 is a conservative authoring baseline, not an official support matrix.
- Native methods and source-derived contracts follow the skill; local mocks must not be described as live Player validation.
- In-script removeListener(eventType) is documented as deleting an event slot. Examples do not pass a callback as though removal were callback-specific, even where older skill examples do.
- Empty boilerplate handlers are removed because they consume slots and can suppress existing behavior.
- Legacy ticker restart remains explicitly version-dependent; no universal restart API is promised.
- Pairing, leases, transport recovery and publishing permissions remain in Composer AI integration guidance, not the public runtime API.
- Skill source paths refer to reference filenames for maintainers; public pages have no dependency on local skill installation paths.

## Verification boundaries

Validate navigation/link targets, GitBook block balance, source syntax and the examples' input/cleanup logic. Native rendering, event ordering, fonts, asset loading, provider CORS, temporal smoothness and actual Control App/output delivery still require acceptance checks against the intended supported runtime.

This update does not publish the site or modify the installed skill.

## Local validation

Run `node developer-portal-v2-draft/scripts/check-composition-scripting.cjs` from the repository root. The check uses Node built-ins only, parses every JavaScript block, rejects optional-chaining/nullish-coalescing syntax, and exercises the examples with mocked runtime objects. It is not an exhaustive ES2017 grammar checker.

The behavior fixtures cover reactive input repair, stream envelopes, score validation, escaped HTML, conditional background, Timer source filtering, widget bounds, button identities, child/root forwarding, current normalized-number ranges, legacy speed-toggle requests, clock cleanup, interrupted fades, and request ordering/closure.

Validation completed: 59 scripting pages; 100 unique navigation targets across the draft; 370 local references and 4 local fragments checked; 2 JSON blocks parsed; 38 JavaScript blocks parsed; 14 mocked behavior fixtures passed. Git diff whitespace checks passed. Native Player and rendered GitBook preview checks were not performed.
