from pdf_reader import read_pdf
from text_chunker import chunk_text
from embeddings import create_embedding
from vector_store import add_documents, search
from openai import OpenAI
from reranker import rerank
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def process_pdf(file_path):
    text = read_pdf(file_path)

    chunks = chunk_text(text)

    metadatas = []
    
    for i, chunk in enumerate(chunks):
        metadatas.append({
            "chunk": i,
            "document": file_path
        })

    vectors = create_embedding(chunks)
    
    add_documents(chunks, vectors, metadatas)

def ask_question(question):
    question_vector = create_embedding([question])[0]

    retrieved_chunks = search(question_vector, k=10)

    best_chunks = rerank(question, retrieved_chunks)

    context = "\n".join(best_chunks)

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