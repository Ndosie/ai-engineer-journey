from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class SummaryRequest(BaseModel):
    text: str
    max_words: int = 100

@app.post("/summarize")
async def summarize(request: SummaryRequest):
    try:
        prompt = f"""
        Summarize the following text in no more than {request.max_words} words.
        Make it clear and consise.

        Text: {request.text}
        """

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages= [
                {
                    "role": "system", 
                    "content": (
                        "You are a professional text summarization assistant."
                        "You produce clear, accurate, and concise summaries."
                )},
                {
                    "role": "user", 
                    "content": (
                        f"Summarize the text below in no more than {request.max_words} words. \n\n"
                        "Requirements:\n"
                        "-Keep the core meaning.\n"
                        "-Avoid repetition.\n"
                        "-Do not add new information.\n"
                        "-Use simple, clear language.\n\n"
                        f"Text:\n{request.text}"
                    )
                }
            ],
            max_tokens=300,
            temperature=0.3
        )

        return {"summary": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))