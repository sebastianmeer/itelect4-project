# Orbit submission checklist

Prepared November 7, 2026. The lecture materials state an October 30, 2026 deadline; this document does not represent the work as on time or as accepted late work.

## Four primary links

1. Frontend repository: https://github.com/sebastianmeer/itelect4-project
2. Backend repository: https://github.com/sebastianmeer/itelect4-backend
3. Frontend deployment: https://orbit-mu-lilac.vercel.app
4. Backend deployment: https://orbit-api-weld-tau.vercel.app

## Evidence links

- Frontend GT5 PR: https://github.com/sebastianmeer/itelect4-project/pull/5
- Backend GT5 PR: https://github.com/sebastianmeer/itelect4-backend/pull/3
- Frontend deployment fix PR: https://github.com/sebastianmeer/itelect4-project/pull/6
- Backend deployment fix PR: https://github.com/sebastianmeer/itelect4-backend/pull/5
- Frontend GT5 tag: https://github.com/sebastianmeer/itelect4-project/releases/tag/gt5
- Backend GT5 tag: https://github.com/sebastianmeer/itelect4-backend/releases/tag/gt5
- Frontend CI: https://github.com/sebastianmeer/itelect4-project/actions/workflows/ci.yml
- Backend CI: https://github.com/sebastianmeer/itelect4-backend/actions/workflows/ci.yml
- Backend health: https://orbit-api-weld-tau.vercel.app/api/health

## Verified commands

Frontend: `npm ci`, `npm run typecheck`, `npm test`, `npm run build`.

Backend: `npm run typecheck`, `npm test`, `npm run build`.

## Browser evidence to capture

1. Register a new test account.
2. Log in and refresh.
3. Load Explore prompts from the deployed API.
4. Create an Explore response and confirm persistence after refresh.
5. Submit a 20+ character Coach prompt and show the structured result.
6. Log out and confirm protected-route redirection.
7. Check mobile layout and dark mode.

Do not submit passwords, API keys, JWTs, MongoDB URLs, or screenshots containing them.

## Remaining provider configuration

The Vercel connector currently returns HTTP 403 for environment-variable management. Before claiming full production persistence or live Gemini verification, configure these variables in Vercel for `orbit-api`: `MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, and `CORS_ORIGIN`. Configure `VITE_API_URL` for the frontend if it is not already set.
