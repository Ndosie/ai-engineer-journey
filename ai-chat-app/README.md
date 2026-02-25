# AI Chat App

A simple ChatGPT-like demo: a full-stack chat application with a FastAPI backend and a React frontend.

Quick start

- Activate Python venv (PowerShell):

```powershell
& aienv\Scripts\Activate.ps1
```

- Start backend:

```powershell
cd ai-chat-app/backend
python -m uvicorn main:app --reload
```

- Start frontend:

```bash
cd ai-chat-app/frontend
npm install
npm start
```

Where to look

- Backend: `ai-chat-app/backend/` (FastAPI endpoints, experiments)
- Frontend: `ai-chat-app/frontend/` (React UI)

Notes

- Backend runs on http://localhost:8000 by default.
- Frontend runs on http://localhost:3000 by default.

License

MIT-style — add a LICENSE file if desired.
