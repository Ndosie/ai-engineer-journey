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
                {"role": "system", "content": "You are an expert summarizer."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.5
        )

        return {"summary": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))