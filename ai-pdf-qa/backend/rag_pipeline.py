from pdf_reader import read_pdf
from text_chunker import chunk_text
from embeddings import create_embedding
from vector_store import create_index, search
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def process_pdf(file_path):
    text = read_pdf(file_path)

    chunks = chunk_text(text)

    vectors = []

    for chunk in chunks:
        embedding = create_embedding(chunk)
        vectors.append(embedding)
    
    create_index(vectors, chunks)

def ask_question(question):
    question_vector = create_embedding(question)

    relevant_chunks = search(question_vector)

    context = "\n".join(relevant_chunks)

    prompt = f"""
    Answer the question using ONLY the context below.

    Context: {context}

    Question: {question}
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Answer questions based only on the provided document."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    return response.choices[0].message.content