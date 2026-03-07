from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from rag_pipeline import process_pdf, ask_question
from dotenv import load_dotenv
import shutil
import os

load_dotenv()

app = FastAPI()
UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

# allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class QuestionRequest(BaseModel):
    question: str

@app.post('/upload-pdf')
async def upload_pdf(file:UploadFile = File(...)):
    try:
        filename = file.filename.replace(" ", "_")
        file_path = f"{UPLOAD_DIR}/{filename}"

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        process_pdf(file_path)

        return {"message": "PDF processed successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ask")
async def ask(data: QuestionRequest):
    try:
        answer = ask_question(data.question)

        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))