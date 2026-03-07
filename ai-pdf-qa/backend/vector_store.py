import faiss
import numpy as np

index = None
documents = []

def create_index(vectors, chunks):
    global index
    global documents

    documents = chunks

    dimension = len(vectors[0])

    index = faiss.IndexFlatL2(dimension)

    index.add(np.array(vectors).astype("float32"))

def search(vector, k=3):
    D, I = index.search(np.array([vector]).astype("float32"), k)

    results = []

    for i in I[0]:
        results.append(documents[i])
    
    return results