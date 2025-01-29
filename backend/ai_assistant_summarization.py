import os
from openai import OpenAI
from dotenv import load_dotenv

# Load .env environment variables
load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
)

# System prompt to use in the chat completion. Tells how the AI assistant should act and what it should do.
system_prompt = {"role": "system", "content": "You are a helpful assistant that summarizes texts and data. You must take the"
                " most important key points from the original content to the summarized text, you have to make the information" 
                " on the summarized text very clear and understandable for the user, and you should make topics and give examples" 
                " if necessary for a better visualization and understanding of the content for the user."}

# Function to summarize text
def summarize_text(text: str) -> str:
    messages = [system_prompt, {"role": "user", "content": text}]
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages
    )
    
    return response.choices[0].message.content
