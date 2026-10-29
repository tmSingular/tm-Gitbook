# Verification

Choose evidence that matches the behavior you need to prove.

| Check | What it establishes |
|---|---|
| Read back saved source | The intended code was persisted |
| Observe initialization in a Player | The script runs in that runtime |
| Change input without reloading | Reactive updates work in the same instance |
| Inspect named targets and visible output | The intended presentation changed |
| Exercise In/Out and repeated updates | The tested transitions and repeated behavior work |
| Close or replace a script | Owned work stops as intended |
| Test the actual app output | Delivery works in that host |

A screenshot of one state does not establish animation continuity or live input propagation. Record the tested inputs, expected results, and remaining limitations. Continue with [Deployment](deployment.md).
