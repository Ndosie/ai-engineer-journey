# AI Engineer Journey

Documenting my path from building simple AI apps to more advanced systems.

Overview

- Purpose: Track learning, projects, experiments, and reflections while building AI applications.
- Audience: Future-me, collaborators, and anyone following an applied AI learning path.

Quick environment

- Activate Python venv (PowerShell):

```powershell
& aienv\Scripts\Activate.ps1
```

Repository structure

- `ai-chat-app/`: A simple ChatGPT-like demo. See [ai-chat-app/README.md](ai-chat-app/README.md) for quick start and details.
- `ai-text-summarizer/`: A compact backend demo for summarization workflows. See [ai-text-summarizer/README.md](ai-text-summarizer/README.md) for quick start and details.
- `ai-email-generator/`: AI app for generating emails using prompts and small templating. See [ai-email-generator/README.md](ai-email-generator/README.md) for quick start.
- `ai-pdf-qa/`: Question-answering over PDFs using embeddings and a RAG pipeline. See [ai-pdf-qa/README.md](ai-pdf-qa/README.md) for quick start.
- `aienv/`: Local Python virtual environment (venv) used by the backend services. Activate before running Python backends.

Per-project quick start

- General backend pattern (works for most projects):

```powershell
& aienv\Scripts\Activate.ps1
cd <project>/backend
python -m uvicorn main:app --reload
```

- General frontend pattern (React apps in each project):

```bash
cd <project>/frontend
npm install
npm start
```

How I use this repo

- Each project keeps a small README that explains purpose, run steps, and relevant files. Check the project README before running it.
- I keep experiments and notes in the project folders; expect iterative changes and occasional notebooks.

Contributing

- Open issues or PRs. Small experiments and reproducible examples are welcome.

License
How I use this repo

- Each project keeps a small README that explains purpose, run steps, and relevant files. Check the project README before running it.
- I keep experiments and notes in the project folders; expect iterative changes and occasional notebooks.

Contributing

- Open issues or PRs. Small experiments and reproducible examples are welcome.

License

- MIT-style: add a LICENSE file if you want an explicit license.

---

Created to record experiments, code, and lessons while building AI apps.
