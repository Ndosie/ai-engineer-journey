# AI Text Summarizer

A compact summarization demo for text summarization.

Quick start

- Activate Python venv (PowerShell):

```powershell
& aienv\Scripts\Activate.ps1
```

- Start backend:

```powershell
cd ai-text-summarizer/backend
python -m uvicorn main:app --reload
```

- Start frontend:

```bash
cd ai-text-summarizer/frontend
npm install
npm start
```

Where to look

- Backend: `ai-text-summarizer/backend/` (`main.py` defines the `/summarize` endpoint)
- Frontend: `ai-text-summarizer/frontend/` (React demo for quick testing)

Notes

- Backend expects an OpenAI API key in environment variables (see project files for details).

License

MIT-style — add a LICENSE file if desired.
