# AGENTS.md

## Commands
- `npm start`: Start the Hapi API server (`node server/.`).
- `npm install`: Install dependencies.

## Architecture
- **Framework:** Hapi (`@hapi/hapi`) backend API server.
- **Entrypoint:** `server/index.js` boots the application using config and routes.
- **Database / Data layer:** MSSQL (`mssql`) with custom SQL data plugins under `server/plugins/sql.js` and `server/data/`.
- **Static files / Client:** Prebuilt SPA assets located in `dist/` served via `@hapi/inert`.
