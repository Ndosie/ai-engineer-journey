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

class ChatRequest(BaseModel):
    messages: list

@app.post("/chat")
async def echo(request: ChatRequest):
    try:
        MAX_MESSAGES = 10

        trimmed_messages = request.messages[-MAX_MESSAGES:]

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages= trimmed_messages,
            max_tokens=200,
            temperature=0.7
        )

        return {"reply": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))