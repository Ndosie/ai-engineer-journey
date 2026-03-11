# AI PDF QA

Question-answering over PDFs using embeddings and a small RAG pipeline.

Quick start

- Activate Python venv (PowerShell):

```powershell
& aienv\Scripts\Activate.ps1
```

- Start backend:

```powershell
cd ai-pdf-qa/backend
python -m uvicorn main:app --reload
```

- Start frontend:

```bash
cd ai-pdf-qa/frontend
npm install
npm start
```

Where to look

- Backend: `ai-pdf-qa/backend/` (includes `rag_pipeline.py`, `vector_store.py`, `embeddings.py`, `pdf_reader.py`)
- Vector DB: `ai-pdf-qa/backend/chroma_db/` (local Chroma store used for demos)
- Frontend: `ai-pdf-qa/frontend/` (React UI for uploading PDFs and asking questions)

Notes

- Upload PDFs via the backend `/upload-pdf` endpoint before querying.
- Ingested data is stored under `ai-pdf-qa/backend/chroma_db/`.

License

MIT-style — add a LICENSE file if desired.
