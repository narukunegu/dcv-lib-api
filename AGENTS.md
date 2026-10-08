# AGENTS.md

## Commands
- `npm start`: Start the Hapi API server (`node server/.`). Port defaults to `6314`.
- `npm install`: Install dependencies.

## Architecture & Layout
- **Framework:** Hapi (`@hapi/hapi`) backend API server (`server/index.js` -> `server/server.js`).
- **Database:** Microsoft SQL Server (`mssql`) via custom plugin (`server/plugins/sql.js`) and raw `.sql` query files located under `server/data/`.
- **Static Assets:** Prebuilt SPA static files located in `dist/` served via `@hapi/inert`.
- **Config:** `server/config.js` configures the server port, version, and MSSQL credentials/options.
