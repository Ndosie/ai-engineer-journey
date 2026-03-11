# AI Email Generator

A simple AI email-generation demo: a FastAPI backend and a React frontend.

Quick start

- Activate Python venv (PowerShell):

```powershell
& aienv\Scripts\Activate.ps1
```

- Start backend:

```powershell
cd ai-email-generator/backend
python -m uvicorn main:app --reload
```

- Start frontend:

```bash
cd ai-email-generator/frontend
npm install
npm start
```

Where to look

- Backend: `ai-email-generator/backend/` (FastAPI endpoints, `main.py`)
- Frontend: `ai-email-generator/frontend/` (React UI)

Notes

- Backend runs on http://localhost:8000 by default.
- Frontend runs on http://localhost:3000 by default.

License

MIT-style — add a LICENSE file if desired.
