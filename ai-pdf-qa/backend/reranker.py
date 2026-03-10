from openai import OpenAI
import os
import re

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def rerank(question, chunks):
    joined_chunks = "\n\n".join([f"{i+1}.{chunk}" for i, chunk in enumerate(chunks)])

    prompt = f"""
    You are a ranking assistant.

    Question:
    {question}

    Chunks:
    {joined_chunks}

    Select the 3 most relevant chunks to answer the question.

    Example output:
    1,3,5

    Do not explain anything.
    Do not write words.
    Return only their numbers separated by commas.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )

    result = response.choices[0].message.content
    numbers = re.findall(r'\d+', result)
    indexes = [int(n)-1 for n in numbers[:3]]
    best_chunks = [chunks[i] for i in indexes]

    return best_chunks