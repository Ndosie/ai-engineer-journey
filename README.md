**AI Engineer Journey**

Documenting my path from building simple AI apps to more advanced systems.

**Overview**

- **Purpose:** Track learning, projects, experiments, and reflections while building AI applications.
- **Audience:** Future-me, collaborators, and anyone following an applied AI learning path.

**Repository Structure**

- **`ai-chat-app/`**: Single full-stack app containing both backend and frontend:
- **`aienv/`**: Python virtual environment for the backend.

**Getting Started**

- **Activate Python venv (PowerShell):**

```powershell
& aienv\Scripts\Activate.ps1
```

- **Start backend (from `ai-chat-app/backend/`):**

```powershell
cd ai-chat-app/backend
python -m uvicorn main:app --reload
```

- **Install and run frontend (from `ai-chat-app/frontend/`):**

```bash
cd ai-chat-app/frontend
npm install
npm start
```

**How I'll Use This Repo**

- Each project will live in its own folder (backend service, frontend demo, notebooks, etc.).
- I'll keep short READMEs per project with goals, implementation notes, and lessons learned.

**Roadmap & Learning Goals**

- **Phase 1 — Basics:** Hello-world models, prompt engineering, simple web demos.
- **Phase 2 — Intermediate:** Small end-to-end apps (API + UI), model fine-tuning, evaluation.
- **Phase 3 — Advanced:** Multi-component systems, pipelines, deployment, monitoring, efficiency.

**Notes & Contributing**

- I'll add issues and small tasks as I progress — PRs and suggestions welcome.

**License**

- MIT-style: add a LICENSE file later if desired.

---

_Created to record experiments, code, and lessons while building AI apps._
