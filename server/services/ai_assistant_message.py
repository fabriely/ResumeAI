import os
from openai import OpenAI
from dotenv import load_dotenv

# Load .env environment variables
load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
)

# System prompt to use in the chat completion. Tells how the AI assistant should act and what it should do.
system_prompt = {"role": "system", "content": "You are a helpful assistant that provides information and answers questions."}

# User prompt to use in the chat completion. Tells the AI assistant what the user is asking or saying.
# Function to response user
def response_message(text: str) -> str:
    messages = [system_prompt, {"role": "user", "content": text}]
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages
    )
    
    return response.choices[0].message.content
