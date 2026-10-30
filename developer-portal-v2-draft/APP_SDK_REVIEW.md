# App SDK v1 review and draft migration

Reviewed all Markdown in `app-sdk-v1/docs` and the supplied Graphics SDK dynamic preview HTML. The original documentation and example source files are unchanged. Work targets `developer-portal-v2-draft/docs` only, plus this maintainer report and validation scripts.

## Findings addressed

| Source weakness | Draft improvement |
| --- | --- |
| Sparse landing/index pages and a single large method dump | Task-based setup/deployment guides, object reference, and complete downloadable hosted examples. |
| Wrong receiver objects, old aliases, and misspelled output lookup | Explicit ById/ByName calls and application → output → composition → child ownership. |
| Invalid JSON and misleading Object return types | Valid JSON arrays; distinct getPayload pair-array and getPayload2 map shapes; optional/undefined results. |
| Undefined error variable and mixed hosted/local bootstraps | Separate initialization paths, no embedded credentials, explicit failure handling. |
| deploy.json / deploykey.json inconsistency | Correct deploykey.json, development verification, and separate deployment/publication guidance. |
| Unsupported render/remove form methods and advertised sequencer | Marked legacy form stubs unsupported and getSequencer absent from 1.0.0 exports. |
| Form drafts can follow the wrong selection | New example destroys old forms, clears drafts, and guards callbacks with a target and generation. |
| Storage listener cleanup unclear | Same-key/same-callback off contract; distinct composition event slot contract. |
| SDK APIs easily confused with composition scripting | Explicit object and host boundaries without changing the composition scripting reference. |

## Graphics SDK example

Copied the supplied HTML byte for byte into GitBook assets. Added a navigation page explaining both REST GETs, the different endpoint hosts, local Player writes, model indexing, supported controls, selection depth, and validation/concurrency limitations. No remote Control App write behavior is claimed.

## Evidence and remaining runtime checks

Signatures and callback behavior were inspected in the official public 1.0.0 App and Graphics SDK JavaScript sources on 2026-10-30:

- https://app.singular.live/libs/singularapp/1.0.0/singularapp.js
- https://app.singular.live/libs/singulargraphics/1.0.0/singulargraphics.js

The original setup material references CLI 0.4.0 and Firebase 4.9.0. Neither is asserted to be the latest release or an independently supported upgrade target. Current account eligibility, Node/browser support, App Manager status transitions, asset-browser payload schemas, and cross-host token/CORS behavior need service-owner confirmation. Browser/Player behavior with real credentials was not tested. Local mock checks cover example logic rather than service integration.

### Inspected source SHA-256

- `singularapp-1.0.0.js`: `281d235054b5d4369cc5152d5841cb7625cb1e72ec6d3a06482e2e6ff36a434d`
- `singulargraphics-1.0.0.js`: `cbfbe77413dc3c120fd3ed69482d8f76526388a76ff468a62d64e08033da067f`

Original Graphics demo SHA-256: `957bc5f0616fa2dca98c98aa28e498b1ec2833866cd595597345c89f0fb3dcc5`

## Validation

Run `node developer-portal-v2-draft/scripts/check-app-sdk.cjs` from the repository root. It checks complete and unique SUMMARY coverage, relative links and download targets in App/Graphics SDK pages, JSON/JavaScript syntax, all three downloaded HTML scripts, and mocked behavior for the two hosted apps and storage/composition reference snippets. The original Graphics demo is syntax checked but not executed against a live service. Run the existing `check-composition-scripting.cjs` separately for regression coverage.

## GitBook sync investigation (2026-10-30)

GitBook reported `Failed to parse Markdown content` for the lower-third example page. The page's download path resolves to a tracked file; its file-block syntax matches the official documented syntax, and its plain Markdown has no frontmatter, tables, or code fences that could explain the parser failure. All three new downloads directly referenced executable HTML assets.

The leading hypothesis is HTML attachment import/validation. GitBook's troubleshooting documentation confirms unsafe files can block sync, but does not establish that this generic Markdown error is caused by HTML. No authenticated GitBook import or backend error detail was available to prove the cause.

Candidate fix: each of the three file blocks now links to a ZIP containing its original HTML byte for byte. Instructions explain extraction. Raw HTML source assets are retained unchanged. Archive integrity, exact contents, local links, and the existing example checks were verified locally. This is not confirmation of successful GitBook sync: commit/push and retry GitHub → GitBook to validate the hypothesis. If it still fails, isolate the file block in a branch or test space and obtain GitBook's detailed import error.

Official references:
- https://gitbook.com/docs/create-content/blocks/insert-files
- https://gitbook.com/docs/docs-as-code/git-sync/troubleshooting
