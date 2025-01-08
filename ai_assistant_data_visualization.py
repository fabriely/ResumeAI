import os
from openai import OpenAI
from dotenv import load_dotenv
import data_visualization as dv

# Load .env environment variables
load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    organization="org-dHEb2RJFMlSk3AkW3EaqchuP",
    project="proj_07gI9lPK51DvCfjgw6uIGRyW"
)

# System prompt to use in the chat completion. Tells how the AI assistant should act and what it should do.
system_prompt = {"role": "system", "content": "You are a helpful assistant that analyzes texts and data and extracts"
                 "from them statistically insightful information to display in a appropriate graph or chart. You are"
                 "free to choose which type of graph or chart better suits the information to be visualized by the"
                 "users. You can and should plot more than one graph or chart, but only if you can extract various"
                 "informations that need different graphs or charts to be visualized. You should NOT plot more than"
                 "one graph or chart for that displays same information, even if displayed in different graphs or" 
                 "charts. You should only display the graphs or charts and should NOT give summaries or explanations" 
                 "to the text or data. You have to return the code that plots the graph or chart using python libraries"
                 "and you should not write ```python in the beginning and ``` in the end of the file."}

# message_history is a list that stores the messages between users and AI in the chat completion messages parameter format.
message_history = [system_prompt]

# Gets user input, creates prompt, stores prompt in message_history variable.
user_input = input("\033[92mUser: \033[0m").strip()
user_prompt = {"role": "user", "content": user_input}
message_history.append(user_prompt)

# Generate response (summarized text) based on user prompt
response = client.chat.completions.create(
    model="gpt-4o",
    messages=message_history
)

# Stores assistant prompt in the message_history variable
# response.choices[0].message == {"role": "assistante", "content": "<response>"}
message_history.append(response.choices[0].message)

# Prints response to the terminal.
# print("\033[92mAssistant: \033[0m" + response.choices[0].message.content)
print("\033[92mOK\033[0m")

data_visualization_file = open("data_visualization.py", "w")
data_visualization_file.write(response.choices[0].message.content)
data_visualization_file.close()









