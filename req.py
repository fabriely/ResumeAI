import openai
from dotenv import load_dotenv
import os

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Agora você pode acessar a chave da API
openai.api_key = os.getenv("OPENAI_API_KEY")

# Fazendo uma requisição para gerar texto com o modelo atualizado
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",  # Ou "gpt-4"
    messages=[
        {"role": "system", "content": "Você é um assistente útil."},
        {"role": "user", "content": "Olá, como posso integrar com a OpenAI?"}
    ],
    max_tokens=50
)

# Exibe a resposta
print(response['choices'][0]['message']['content'].strip())
