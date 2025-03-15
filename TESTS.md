# 📌 Documentação de Testes  

Este documento contém a especificação dos casos de teste implementados no projeto.

# Documentação Client


# Documentação Server 

## ✅ Testes Automatizados
O projeto inclui testes automatizados para garantir a integridade das funcionalidades principais.

### 🚀 Como rodar os testes manualmente?
Execute o seguinte comando:

```bash
pytest tests/
```

### 📌 Execução automática dos testes
Sempre que iniciar o servidor com o comando:

```bash
python main.py
```

Os testes serão executados automaticamente.

- Se **todos os testes passarem**, você receberá a mensagem:
  
  **✅ Todos os testes passaram! Iniciando o servidor...**

- Caso contrário, se houver falhas, o servidor **não iniciará**, e a seguinte mensagem será exibida:
  
  **❌ Testes falharam! Corrija os erros antes de iniciar o servidor.**

---

## Testes de Usuário
### 🔹 Criar Usuário
**Descrição:** Verifica se um novo usuário pode ser criado corretamente.  
**Entrada:** Nome, sobrenome, e-mail, senha válida.  
**Saída esperada:** O usuário deve ser salvo no banco de dados com a senha criptografada.  

### 🔹 Criar Usuário com E-mail Duplicado
**Descrição:** Garante que não é possível cadastrar dois usuários com o mesmo e-mail.  
**Entrada:** Nome, sobrenome, e-mail já cadastrado, senha válida.  
**Saída esperada:** Erro informando que o e-mail já está em uso.  

### 🔹 Login do Usuário
**Descrição:** Testa o login com credenciais corretas e erradas.  
**Entrada:** E-mail e senha.  
**Saída esperada:**  
- Se corretos → Retorna sucesso  
- Se errados → Retorna erro de credenciais  

### 🔹 Alteração de Senha
**Descrição:** Testa se um usuário pode atualizar sua senha corretamente.  
**Entrada:** E-mail, senha antiga, nova senha válida.  
**Saída esperada:** A senha do usuário é alterada e a anterior não funciona mais.  

### 

---

## Testes de Resumos (Summaries)

### 🔹 Criar Resumo
**Descrição:** Testa se um usuário pode adicionar um resumo.  
**Entrada:** Texto do resumo no formato JSON.  
**Saída esperada:** O resumo pode ser criado, mas só será salvo se o usuário estiver cadastrado.  

### 🔹 Buscar Resumos
**Descrição:** Verifica se os resumos podem ser listados corretamente.  
**Saída esperada:** Lista de resumos do usuário.  

### 🔹 Deletar Resumo
**Descrição:** Testa a remoção de um resumo específico.  
**Entrada:** ID do resumo.  
**Saída esperada:** O resumo é removido com sucesso.  

### 🔹 Deletar Resumo de Outro Usuário
**Descrição:** Testa se um usuário pode deletar um resumo que não pertence a ele.  
**Entrada:** ID de um resumo de outro usuário.  
**Saída esperada:** Erro informando que a operação não é permitida.  

---
## 📌 Conclusão
Se algum teste falhar, corrija os erros antes de rodar o servidor novamente!

