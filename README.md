# Low-Ops React Default Template

<p align="left">
  <img src="./public/logo.svg" height="50" width="60" alt="Low-Ops logo" style="background: white; padding: 20px; border-radius: 10px; margin-right: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1)"/>
  <img src="./public/react-logo.svg" height="50" width="60" alt="React logo" style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1)"/>
</p>

Boardflow-style React starter with mock Kanban data.

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** and lightweight UI primitives
- In-memory boards/tasks context + **dnd-kit**

## Local development

```bash
npm install
npm start
```

## Docker

```bash
docker compose up --build
```

App listens on `PORT` (default `8000`). Health check: `GET /ready`. HTML is served with no-cache headers.
