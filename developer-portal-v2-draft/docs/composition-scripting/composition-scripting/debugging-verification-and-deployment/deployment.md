# Deployment

1. Read current source and inspect the intended composition's targets, public controls, links, and template requirements.
2. Apply one coherent change, preserving wrappers, lifecycle signatures, and unrelated behavior.
3. Read back the script and acknowledge the composition's successful save. If a write/save response is uncertain, inspect authoritative state before retrying.
4. Load persisted content into the script-editor preview/Player and verify initialization plus later updates in the same running instance.
5. Update the intended managed Control App extract when required; a shared-page refresh does not rebuild an extract.
6. Exercise the actual Control App and output URL, and report their results separately from private Player evidence.

Saving script text, saving a composition, and publishing an app are separate operations. Use the explicit destination workflow rather than assuming one performs the others.

Preserve required Control Node IDs/types/paths, composition names, and mandatory template behavior. Do not rename an integration input simply to fit a sample script. Keep credentials in their intended systems and sanitize shared diagnostics.

For Composer AI, use its dedicated persisted-script operations and documented recovery workflow. Pairing, leases, manual-save rules, cancellation, and publishing permissions belong to [that integration guide](../../../guides/guides/work-with-composer-ai.md), not the in-script runtime API.

* [Verification](verification.md)
* [Save, extract, publish, and output behavior](../../../operate-and-troubleshoot/operate-and-troubleshoot/save-extract-publish-and-output-behavior.md)
