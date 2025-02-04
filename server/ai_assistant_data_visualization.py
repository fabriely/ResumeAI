import os
from openai import OpenAI
from dotenv import load_dotenv
import matplotlib.pyplot as plt

# Load .env environment variables
load_dotenv()

# Initialize OpenAI client with API key from environment variables
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# System prompt to instruct the assistant for data visualization tasks
system_prompt = {
    "role": "system",
    "content": (
        "You are a helpful assistant that analyzes texts and data and extracts "
        "statistically insightful information to display in an appropriate graph or chart. "
        "You are free to choose which type of graph or chart better suits the information to be visualized by the "
        "users. You can and should plot more than one graph or chart, but only if you can extract various "
        "information that need different graphs or charts to be visualized. You should NOT plot more than "
        "one graph or chart for the same information, even if displayed in different forms. "
        "You should only display the graphs or charts and should NOT give summaries or explanations "
        "to the text or data. You have to return the code that plots the graph or chart using python libraries "
        "such as matplotlib, seaborn, or pandas, and you should NOT write ```python in the beginning and ``` "
        "in the end of the file. You Do NOT put plt.show() in the code. "
    )
}

# Function to handle data visualization request
def generate_data_visualization(text: str) -> str:

    messages = [system_prompt, {"role": "user", "content": text}]


    # Send the messages to OpenAI's API for processing
    response = client.chat.completions.create(
        model="gpt-4o",  # Use the appropriate model
        messages=messages
    )


    # Write the response (which should be Python code for visualization) to a file
    data_visualization_code = response.choices[0].message.content

    # Execute the visualization code
    exec(data_visualization_code)

    # Save the generated plot to a file
    output_file = "data_visualization.png"
    plt.savefig(output_file, format="png")
    plt.close()

    return output_file



    

    
