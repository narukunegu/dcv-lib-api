# AGENTS.md

## Commands
- `npm start`: Start the Hapi API server in production mode (`cross-env NODE_ENV=production node server/.`). Connects to SQL Server and initializes book covers. Port defaults to `1903` (`server/config.js`).
- `npm run dev`: Start the Hapi API server in development mode (`cross-env NODE_ENV=development node server/.`). Bypasses heavy SQL server initialization so the server and static routes can be tested locally without an active SQL connection.
- `npm install`: Install dependencies.

## Architecture & Layout
- **Framework:** Hapi (`@hapi/hapi`) backend API server (`server/index.js` -> `server/server.js`).
- **Database:** Microsoft SQL Server (`mssql`) via custom plugin (`server/plugins/sql.js`) and raw `.sql` query files located under `server/data/`.
- **Static Assets:** Prebuilt SPA static files located in `dist/` served via `@hapi/inert`.
- **Config:** `server/config.js` configures the server port, version, and MSSQL credentials/options.

