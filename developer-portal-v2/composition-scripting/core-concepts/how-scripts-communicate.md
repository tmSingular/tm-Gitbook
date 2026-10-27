# How scripts communicate

**Scripts share data in two ways:**

**Via `context.global`** — any script can read from and write to this shared object, set up in the global script.

**Via custom functions on the composition object** — a sub-composition script can expose a function on its own `comp` object, which the root script can then call directly. This is the recommended pattern for passing data between compositions (see Communicating between sub-compositions).
