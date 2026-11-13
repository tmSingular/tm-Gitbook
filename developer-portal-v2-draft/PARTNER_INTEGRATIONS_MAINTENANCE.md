# Maintaining advanced partner integrations

The published content is self-contained in `docs/advanced-partner-integrations/`. Keep links between its pages relative to that folder, and keep partner-specific endpoint assignments outside the generic guides. Add future integration guides to the section overview and `docs/SUMMARY.md`.

The section is initially visible in the v2 draft. Publication and audience settings in GitBook are unchanged.

## Hide navigation links

To remove the section from public navigation while retaining access by direct URL:

1. Add `hidden: true` to the YAML frontmatter of every page in `docs/advanced-partner-integrations/`, including `README.md` and future child pages.
2. Remove its entry from the portal home page (`docs/README.md`) and any other explicit public links. Keep the entries in `docs/SUMMARY.md` so GitBook retains the page structure.
3. In GitBook, configure page search indexing and web crawling separately if those discovery paths should also be disabled. Preview navigation, pagination, search, and direct-link behavior before publishing.

To restore navigation, remove `hidden: true` and restore the portal home link.

**This does not restrict access.** Hidden pages remain accessible through their direct URLs. Disabling indexing also does not provide authorization.

## Restrict public access

If public visitors must not open a direct URL, move the content to a separate partner site and configure its Audience settings before publishing:

* **Share links** require a revocable secret link. Anyone holding the link can access the site.
* **Authenticated access** requires sign-in and authorization through the configured authentication backend.

An unlisted site only disables search engine indexing; it remains accessible to anyone who knows the URL. A new space or hidden site section alone does not establish an access boundary. Confirm the GitBook plan supports the desired audience settings.

After configuration, verify both authorized partner access and rejection of an unauthenticated direct URL in a private browser session. Check HTML, Markdown/export routes, search, and any previously published URLs. Do not redirect an old public URL to sensitive content without confirming authorization is enforced at the destination.

## Move to a separate GitBook

1. Copy `docs/advanced-partner-integrations/` into the new site's content directory. Its `README.md` becomes that space's home page. Add or update the visible Last modified timestamp below its title using the repository's Europe/Berlin convention.
2. Create a `SUMMARY.md` in the copied directory:

   ```markdown
   # Table of contents

   * [Advanced partner integrations](README.md)
     * [Pair an application with overlays.uno](pair-an-application-with-overlays-uno.md)
     * [Optimize CEF integration](optimize-cef-integration.md)
     * [Integrating with CEF version 103](integrating-with-cef-103.md)
     * [Singular Broadcast Output](broadcast-output.md)
     * [Configure Singular SSO](configure-singular-sso.md)
     * [Select control apps and load a local preview](control-app-selection-and-preview.md)
     * [Integrate Singular Sign-In](singular-sign-in.md)
     * [Render image sequences with Singular Reframe](singular-reframe.md)
     * [Render poster frames](poster-frame-rendering.md)
     * [Migrate Apps from Firebase to Datastore](migrate-apps-from-firebase-to-datastore.md)
   ```

3. Configure the new site's Git Sync content mapping to that directory. For a new site-level configuration, this is a minimal `gitbook-docs.yaml` placed immediately above the directory:

   ```yaml
   $schema: https://api.gitbook.com/gitbook-docs.yaml
   site:
     title: Singular Partner Integrations
     structure:
       - type: space
         key: partner-integrations
         title: Advanced partner integrations
         path: partner-integrations
         default: true
         content:
           directory: ./advanced-partner-integrations
   ```

4. Set the target site's audience before publishing. The YAML above defines structure only; it does not configure private access.
5. Verify the target site's content and audience. Remove the original pages, their `docs/SUMMARY.md` entries, and the portal home link when cutting over. Update the portal home timestamp. Do not leave a public copy behind if the purpose is to restrict access.

The example mapping is an export template, not an active change to this draft's site configuration. No assigned partner URL is required to move the generic content.

## Sources and review

The pairing guide was adapted from the supplied `splitcam-pairing.md`. Partner names, concrete launch/exchange endpoints, and registered callback details were replaced with onboarding configuration. The resource paths, JSON fields, code lifetime, token policy, and disconnect behavior were retained from that source; no live pairing or API calls were made. Confirm these details against the enabled integration during onboarding, especially token expiry and disconnect behavior.

GitBook visibility references:

* [Page visibility and discoverability](https://github.com/GitbookIO/public-docs/blob/main/guides/editing-and-publishing-documentation/how-to-use-gitbooks-editor.md)
* [Site visibility modes](https://gitbook.com/docs/developers/gitbook-api/api-reference/docs-sites)
* [Publishing and audience options](https://gitbook.com/docs/guides/editing-and-publishing-documentation/complete-guide-to-publishing-docs-gitbook)

## PDF content integration

The four supplied PDFs were converted into native GitBook pages, rather than published as attachments. The section has no required relative links to other portal sections, so it remains portable. The previous operations SSO page retains a bridge to the canonical partner guide. If moving or restricting the section, remove that bridge and its navigation entry if public discovery is unwanted.

| Supplied source | Canonical page | Editorial treatment |
| --- | --- | --- |
| Optimize CEF Integration (undated, 7 pages) | `optimize-cef-integration.md` | Separated CPU/GPU paths; corrected premultiplied blending, callback thread assumptions, frame ownership, missing-paint behavior, and dirty-rectangle compositing scope. Did not reproduce the unsafe atomic-flag example or fork-specific GetBackingTexture advice as portable APIs. |
| Integrating with CEF version 103 (v1.0, September 20, 2023, 8 pages) | `integrating-with-cef-103.md` | Kept OBS-patched Windows behavior explicitly historical, preserved audio settings and test identifiers, and qualified shared-texture lifetimes and archived downloads. |
| Singular Broadcast Output (v1.2, December 2023, 10 pages) | `broadcast-output.md` | Preserved v1 paths and v2 actions; replaced example tokens; distinguished take-out actions and flagged output scope for validation. Converted screenshots to workflow and destination tables. |
| Singular SSO-202407 (v1.10, July 2024, 7 pages) | `configure-singular-sso.md` | Moved the existing full guide into this section; preserved the old URL as a bridge. Retained the public-certificate correction instead of repeating the source's contradictory private-key wording. |

All 32 source pages were text-extracted and visually reviewed during integration. Sources were treated as documentation content, not as instructions to run commands, install archived software, send on-air actions, contact people, or change account settings. Original PDFs and screenshots were not copied into the public assets directory. No CEF build, live API command, or SSO account change was executed.

## App discovery and Reframe additions

| Supplied source | Published content | Treatment |
| --- | --- | --- |
| Wildmoka Integration Enhancements.docx | `control-app-selection-and-preview.md` | Partner-neutral guidance; omitted account details, credential values, subscription information, and vendor screenshots. Preserved folder-scoped v2 reads, selected-app metadata, control-model options, and local preview behavior. |
| Singular Sign-In.pdf (v1.0, February 5, 2020) | `singular-sign-in.md` | Historical interactive callback/code exchange separated from tenant credentials. Qualified the six-month lifetime and unspecified request/response encoding; corrected the source's callback-token inconsistency. |
| Singular Reframe v1.0.pdf (April 14, 2021) | `singular-reframe.md` | Preserved sequence job fields, revision pinning, documented CLI options, and directory layout. Omitted developer-specific debug arguments. No archived binary installed. |
| Poster Frame Rendering.docx | `poster-frame-rendering.md` | Preserved singleframe.html, requestedTime, floor-based filenames, and keeping the page and composition in memory; identified the missing persistent-process job-submission contract. |
| singleFrameJob.json | `examples/single-frame-job.json` | Valid JSON template preserving the four subcomposition schedules and format; replaced asset/composition URLs, identifiers, payload titles, and local output path. Linked from the poster-frame guide. |

The source files were found under the content directory's `done` subfolder. Both PDFs (12 pages total) were extracted and visually reviewed; DOCX text, tables, hyperlinks, and embedded screenshots were inspected. The enhancement source contains credential values: none were copied to published pages or example files. Original documents and screenshots are not included as public downloads. Source instructions were treated as reference content; no login, token exchange, render job, binary install, email, or remote account change was performed.

The new guides link within the partner folder, and the JSON example resides under that folder, preserving the existing export/migration workflow. The older Sign-In and Reframe material is explicitly dated. Platform endpoint behavior, permissions, token lifetime, and persistent-render submission must be confirmed during onboarding.

## Datastore migration guide

The four-page supplied `Moving to Singular Datastore.pdf` was text-extracted and visually reviewed. Its content was already integrated under releases and compatibility; the full guide now lives at `docs/advanced-partner-integrations/migrate-apps-from-firebase-to-datastore.md`. The original page remains as a bridge, and the migrations overview links directly to the new canonical page.

The guide preserves backend detection, all four migration endpoint directions, the historical May 2024 rollout note, shared data-node dependencies, mandatory UI/output reloads, Output Manager reattachment, and account-default coordination. The source's mislabeled reverse data-node direction remains corrected. Optional links outside the partner folder were replaced by self-contained guidance, so the section remains portable. No account settings or storage backend was changed.

If this section moves to a restricted partner site, review the old migration bridge, its sidebar entry, and the migrations-overview link alongside the existing SSO bridge to avoid unwanted public discovery.
