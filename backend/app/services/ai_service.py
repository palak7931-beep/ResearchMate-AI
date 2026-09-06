from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def summarize_text(text):
    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "user",
                "content": f"""
Summarize this research paper.

Give:
1. Executive Summary
2. Key Contributions
3. Methodology
4. Advantages
5. Limitations

{text}
"""
            }
        ]
    )

    return response.choices[0].message.content