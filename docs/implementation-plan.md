# Orbit Full-Stack Coursework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Evolve Orbit from its local json-server prototype into a separately hosted React frontend and Express/TypeScript/MongoDB backend with real authentication, owner-scoped response CRUD, Gemini AI assistance, automated tests, CI, deployment evidence, and accurate coursework documentation.

**Architecture:** Keep the existing Explore-first Orbit UI and migrate its data boundary to a typed HTTP client backed by an Express API. The backend owns users, prompts, responses, JWT authorization, validation, Gemini integration, and MongoDB persistence; Vercel hosts the frontend and backend separately. Course stages are delivered as incremental branches/PRs and tagged only after verified merges.

**Tech Stack:** React 19, Vite, TypeScript strict mode, React Router, Zustand, TanStack Query, React Hook Form, Zod, Express, Mongoose, MongoDB Atlas, bcryptjs, JWT, Gemini, Vitest, Supertest, GitHub Actions, Vercel.

**Spec:** `C:\Users\Sebastian\Downloads\ORBIT_MASTER_IMPLEMENTATION_PROMPT.md`

## Global Constraints

- Preserve Orbit's Explore, Discover, Signals, Connections, theming, and responsive shell.
- Never commit secrets; use `.env.example` and provider secret stores.
- Every response CRUD query is scoped by the verified JWT user ID.
- Public prompt reads remain separate from private owner-scoped response CRUD.
- Do not claim deployment, checks, browser verification, merges, or tags without evidence.
- Do not rewrite existing history or move existing tags without explicit approval.
- Complete and verify each vertical slice before progressing to the next stage.

## Review Focus

- Cross-user response IDs must return 404 rather than leak existence; test in backend route tests.
- Expired, forged, malformed, and missing bearer tokens must consistently return 401; test auth middleware.
- Invalid response forms must show exact Zod messages and issue no network request; test the frontend form.
- Gemini output must be runtime-validated and safely rendered even when the provider returns malformed data; test the AI service/schema.
- Fresh sessions and hard reloads must retain only intended auth/persistence behavior; verify with deployed browser checks.

### Task 1: Baseline audit and repository plan

**Files:** `docs/implementation-plan.md`; repository state and GitHub metadata.

- [x] Record frontend baseline, authenticated GitHub account, remote, clean status, and missing backend repository.
- [ ] Inspect the four lecture HTML references if present and map exact rubric requirements to implementation tasks.
- [ ] Re-check GitHub account/repository access before any remote mutation.

### Task 2: Backend GT4 Part 1

**Repository:** `sebastianmeer/itelect4-backend`, branch `gt4-part1`.

- [ ] Create the repository only if absent, preserving any existing remote work if discovered.
- [ ] Add strict TypeScript Express modules, ignored env files, health route, centralized errors, and cached Mongo connection.
- [ ] Add User and ExploreResponse models with required, enum/match, and length validation rules.
- [ ] Add register/login, bcrypt password hashing, JWT issue/verification, typed request user ID, and safe DTOs.
- [ ] Add authenticated owner-scoped five-route response CRUD and prompt existence/ID validation.
- [ ] Add deterministic route/auth tests for register/login, CRUD, missing/invalid tokens, and cross-user 404.
- [ ] Run build/tests/diff checks, commit incrementally, open and review a PR, and merge only after verified checks.

### Task 3: GT4 Part 2 integration and deployment

**Repositories:** frontend and backend, branch `gt4-part2` from current merged `main`.

- [ ] Add ExplorePrompt model, idempotent seed, and public prompt list/detail routes.
- [ ] Migrate frontend to `VITE_API_URL` through one typed request helper with bearer auth and timeout/error handling.
- [ ] Replace mock login and active json-server use with real registration/login, query invalidation, loading/error/empty states, and persistence after reload.
- [ ] Remove active json-server runtime dependency only after seed data is preserved and migration is verified.
- [ ] Configure controlled CORS, Vercel-compatible app export, Atlas/Vercel environment variables, and deployment-safe connection reuse.
- [ ] Deploy both apps, verify health/auth/persistence in a fresh browser session, inspect network origin/console, merge PRs, then tag `gt4` in both repos.

### Task 4: GT5 Gemini AI

**Repositories:** frontend and backend, branch `gt5-ai`.

- [ ] Add protected `POST /api/ai` with input limits, rate limiting, Orbit-specific prompt instructions, two typed few-shot examples, and Zod-validated structured output.
- [ ] Return safe 400/401/429/502 errors without exposing provider keys or raw provider details.
- [ ] Add protected Conversation Coach UI using `useMutation`, showing every validated output field and explicit copy/apply behavior.
- [ ] Add Icebreaker Generator and Prompt Studio only after the canonical coach flow is working.
- [ ] Test mocked AI success, malformed output, auth, bounds, rate-limit behavior, and no-key CI behavior.
- [ ] Deploy/verify real AI only with user-provided provider access, merge both PRs, and tag `gt5` after evidence.

### Task 5: GT6 tests and CI

**Repositories:** frontend and backend, branch `gt6-tests`.

- [ ] Add meaningful frontend component, hook, and invalid-form/no-fetch tests; prove a temporary mutation fails before restoring it.
- [ ] Add backend Vitest/Supertest tests for middleware/route auth and owner scoping without Atlas/Gemini network calls.
- [ ] Add least-privilege GitHub Actions workflows for install, typecheck, tests, and builds on push/PR.
- [ ] Add real workflow badges and verify green PR checks before merging; tag `gt6` in both repos after merge.

### Task 6: Final release and documentation

- [ ] Update both READMEs with architecture Mermaid, routes, env setup, seed/test/CI instructions, live links, tags, and accurate AI-use disclosure.
- [ ] Add `docs/submission.md` with verified repo/deployment/PR/tag/action links and factual completion dates.
- [ ] Run the final security/history checks, fresh-browser smoke checks, builds, tests, and `git diff --check`.
- [ ] Create and push annotated `final` tags only at verified merged commits in both repositories.

## Verification commands

Run the commands supported by each repository: `npm ci`, `npm run typecheck`, `npm run build`, `npm test`, configured lint, `git diff --check`, `git status --short`, `git grep -n localhost`, `git grep -n AIza`, `git log --all -p -S AIza`, `gh pr checks`, `gh run list`, and `git show-ref --tags`. Record failures and blockers instead of inferring success.
