# Orbit

Orbit is a dating and social discovery web app that combines traditional
profile-based dating with an interaction-first **Explore** mode.

## Why Orbit

Traditional dating apps overemphasize instant profile judgment: photo, swipe,
decide. Orbit keeps that familiar path available, but leads with something
different — interaction before decision. Personality, humor, interests, and
communication style get a chance to matter before or alongside appearance.

## Explore Mode

Explore is Orbit's signature experience. Instead of judging profiles, users
respond to conversation prompts, opinions, and interest-based topics inside
**Circles** (Gaming, Music, Movies, Food, Tech, Deep Talks, and more). Replying
to someone's answer can turn into a conversation — an **Encounter** — and, if
interest is mutual, a **Connection**. Explore is designed to feel useful and
entertaining on its own, not just as a funnel toward a match.

## Discover Mode

Discover is the traditional dating experience: browse profiles, view photos,
bios, and interests, and send a **Signal** (a lightweight expression of
interest) or pass. It stays intentionally secondary to Explore in this
project.

## Current Technology

This milestone (GT1) is a TypeScript foundation only — no UI yet.

- Node.js
- TypeScript (strict mode)
- ts-node (for running `.ts` files directly)

## Project Structure

```text
itelect4-project/
├─ src/
│  └─ index.ts       # Orbit domain interfaces in use, generics, utility types
├─ types/
│  └─ index.ts        # UserProfile, ExplorePrompt, ExploreResponse, Connection, enums, ApiResponse<T>
├─ sample.ts           # Strict-TypeScript conversion of the provided sample.js
├─ tsconfig.json
└─ package.json
```

## Setup

```bash
npm install
```

## Run

```bash
npm run start
```

Runs `src/index.ts` directly via `ts-node`.

To run the standalone converted sample:

```bash
node --loader ts-node/esm sample.ts
```

## Type-check

```bash
npm run typecheck
```

or directly:

```bash
npx tsc --noEmit
```

This must complete with zero TypeScript errors.
