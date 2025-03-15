```markdown
# 📌 Documentação de Testes Server 

Este documento contém a especificação dos casos de teste implementados no projeto.

## Testes de Usuário
### 🔹 Criar Usuário
**Descrição:** Verifica se um novo usuário pode ser criado corretamente.  
**Entrada:** Nome, sobrenome, e-mail, senha válida.  
**Saída esperada:** O usuário deve ser salvo no banco de dados com a senha criptografada.  

### 🔹 Login do Usuário
**Descrição:** Testa o login com credenciais corretas e erradas.  
**Entrada:** E-mail e senha.  
**Saída esperada:**  
- Se corretos → Retorna sucesso  
- Se errados → Retorna erro de credenciais  

## Testes de Resumos (Summaries)
### 🔹 Criar Resumo
**Descrição:** Testa se um usuário pode adicionar um resumo.  
**Entrada:** Texto do resumo no formato JSON.  
**Saída esperada:** O resumo é salvo no banco e pode ser recuperado.  

### 🔹 Buscar Resumos
**Descrição:** Verifica se os resumos podem ser listados corretamente.  
**Saída esperada:** Lista de resumos do usuário.  

### 🔹 Deletar Resumo
**Descrição:** Testa a remoção de um resumo específico.  
**Entrada:** ID do resumo.  
**Saída esperada:** O resumo é removido com sucesso.  

---
## Executando os Testes
Para rodar todos os testes, execute: 

```bash
python main.py 
```
--- 
Se todos os testes passarem, vocẽ receberá a mensagem: 
**✅ Todos os testes passaram! Iniciando o servidor...**

Caso não, 
**❌ Testes falharam! Corrija os erros antes de iniciar o servidor.**