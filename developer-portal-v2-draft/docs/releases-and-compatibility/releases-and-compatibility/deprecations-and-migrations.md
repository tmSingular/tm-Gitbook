# Deprecations and migrations

Before changing a runtime, SDK, or widget version, record the current version and verify the intended upgrade in a separate test workflow.

1. Read the applicable product or SDK release information.
2. Compare field IDs, payload types, methods, and event contracts used by the integration.
3. Preserve the current working revision.
4. Test initialization, live updates, animation, cleanup, and actual output delivery.

Existing v2 scripting page paths are retained in this navigation. When moving a page in a later migration, update incoming links and provide a redirect for its previous published path.

* [Supported environments](supported-environments.md)
* [Widget compatibility](../../composition-scripting/composition-scripting/widget-payloads-and-version-compatibility.md)
* [Verification](../../composition-scripting/composition-scripting/debugging-verification-and-deployment/verification.md)
