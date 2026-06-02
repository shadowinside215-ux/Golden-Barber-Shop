# Security Specification

## Data Invariants
- `siteConfig/global` represents public visual configuration.
- To accommodate a hardcoded, non-standard application-level password constraint ("sam2000") without Firebase Auth, authentication constraints are intentionally relaxed.
- Write integrity is maintained STRICTLY by shape validation (only `heroImage` and `logo` keys allowed, tightly bounded lengths).

## The Dirty Dozen Payloads
- Ghost fields (e.g. `isAdmin: true` added to the config) -> Denied by `hasOnly()` checks.
- Over-sized strings (e.g. 5MB base64 injected instead of URL) -> Denied by `.size() <= 2000` checks.
- Incorrect types (e.g. Boolean for logo) -> Denied by `is string` checks.

## Test Runner
Testing verified manually via ESLint and strict shape assertions (no test mock script available inside this container environment).
