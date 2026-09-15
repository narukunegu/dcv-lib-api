# dcv-lib-api

Hapi-powered backend API server for `dcv-lib`, integrated with Microsoft SQL Server (MSSQL).

## Prerequisites

- Node.js (v16+ recommended)
- Microsoft SQL Server configured and accessible via config settings

## Project Setup

```bash
npm install
```

## Running the API Server

```bash
npm start
```

## API Endpoints

- `GET /api/books`: Search and retrieve books.
- `GET /api/book/{id}`: Get full details of a specific book.
- `GET /api/books/cover/{filename}`: Serve book cover image files.

