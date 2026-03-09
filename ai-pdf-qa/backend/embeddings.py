from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def create_embedding(texts):
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=texts
    )

    vectors = []

    for item in response.data:
        vectors.append(item.embedding)

    return vectors