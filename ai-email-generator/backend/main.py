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

class EmailRequest(BaseModel):
    recipient: str
    purpose: str
    tone: str

@app.post("/generate-email")
async def generate_email(request: EmailRequest):
    prompt = f"""
    Write a professional email.

    Recipient: {request.recipient}
    Purpose: {request.purpose}
    Tone: {request.tone}

    Include:
    - Subject line
    - Greeting
    - Body
    - Closing
    """

    try:
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages= [
                { "role": "system", "content": "You are an assistant that writes professional emails." },
                { "role": "user", "content": prompt }
            ],
            max_tokens=300,
            temperature=0.5
        )

        return {"email": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))