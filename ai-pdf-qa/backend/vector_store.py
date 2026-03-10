import chromadb

client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection(name="documents")

def add_documents(chunks, embeddings, metadatas):
    ids = []

    for i in range(len(chunks)):
        ids.append(f"id_{i}")

    collection.add(documents=chunks, embeddings=embeddings, metadatas=metadatas, ids=ids)

def search(query_embedding, k=3):
    results = collection.query(query_embeddings=[query_embedding], n_results=k)

    return results["documents"][0]