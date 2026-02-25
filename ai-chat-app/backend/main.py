from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Message(BaseModel):
    text: str

@app.get("/")
async def home():
    return {"message": "Backend is working!"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"greetings": f"Hello, {name}"}

@app.get("/add/{a}/{b}")
async def add(a: int, b: int):
    return {"sum": f"The sum of {a} and {b} is {a + b}"}

@app.get("/square/{num}")
async def square(num: int):
    return {"square": f"The square of {num} is {pow(num, 2)}"}

@app.post("/echo")
async def echo(message: Message):
    return {"reply": f"You said: {message.text}"}