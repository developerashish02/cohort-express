# Changelog

All notable changes to cohort-express are documented here.

Each version entry should follow this format:
- **Fixed** — bug fixes
- **Added** — new features or files
- **Changed** — changes to existing functionality
- **Removed** — removed features or files

---

## [1.0.0] - 2026-06-20 (`aecce97`)

### Added
- **Auth module with full MVC structure** (Ashish)
  - `src/modules/auth/auth.routes.js` — auth route definitions mounted at `/api/v1/auth`
  - `src/modules/auth/auth.controller.js` — request/response handling for auth endpoints
  - `src/modules/auth/auth.service.js` — business logic layer for auth operations
  - `src/modules/auth/auth.modal.js` — Mongoose user model (schema + model export)
  - `src/modules/auth/dto/register.dto.js` — Joi schema for validating register request body
- **Common shared utilities**
  - `src/common/utils/api-response.js` — `ApiResponse` class for consistent success response shape
  - `src/common/utils/api-error.js` — `ApiError` class extending Error for structured error responses
  - `src/common/utils/constants.js` — shared application-level constants
  - `src/common/dto/base.dto.js` — base Joi DTO helpers reused across modules
  - `src/common/middleware/validate.middleware.js` — Joi validation middleware applied per-route
  - `src/common/middleware/error.middleware.js` — global error handler, catches all unhandled errors

### Changed
- `src/app.js` — replaced inline Gemini chat handler with modular router registration;
  mounts `authRouter` and `errorHandler` middleware

### Removed
- Inline `/api/chat` Gemini endpoint removed from `app.js` (was a temporary prototype)
- `@google/genai` and `openai` SDK imports removed from `app.js`

---

## [1.0.0] - 2026-06-15 (`8368c50`)

### Added
- **MongoDB connection setup** (Ashish)
  - `src/common/config/db.js` — `connectDB()` async function using Mongoose;
    logs success or exits process on failure
  - `mongoose` added as a dependency
  - `index.js` updated to await `connectDB()` before starting the HTTP server

---

## [1.0.0] - 2026-06-15 (`a2cfbae`)

### Added
- **Simple chat API using Google AI SDK** (Ashish)
  - `POST /api/chat` endpoint — accepts `{ prompt }` in request body,
    calls Gemini `gemini-3.5-flash` model, returns `{ success, reply }`
  - `@google/genai` and `openai` packages installed

---

## [1.0.0] - 2026-06-14 (`c470ba8`)

### Fixed
- **Server startup error handling** (Ashish)
  - Wrapped `app.listen` inside a `try/catch` async block in `index.js`
  - Unhandled startup errors now log and exit cleanly instead of crashing silently

---

## [1.0.0] - 2026-06-14 (`63c632b`)

### Added
- `NODE_ENV` variable added to `.env.example` with `development` as the default value

---

## [1.0.0] - 2026-06-14 (`3ed06cf`)

### Added
- **Initial project scaffold** (Ashish)
  - `index.js` — entry point; loads env, starts Express server on `PORT` (default 8080)
  - `src/app.js` — Express app instance with `express.json()` middleware
  - `package.json` — ESM project (`"type": "module"`) with `node --watch` dev script
  - `.env.example` — documents required environment variables (`PORT`)
  - `.gitignore` — standard Node.js ignores (node_modules, .env, dist, etc.)

---
