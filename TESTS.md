# 📌 Documentação de Testes  

Este documento contém a especificação dos casos de teste implementados no projeto.

# Documentação Client

### 🚀 Como rodar os testes manualmente?
Execute o seguinte comando:

```bash
npm test
```

## Testes envolvendo botões
### 🔹 Renderizar botão
**Descrição:** Verifica se um botão foi renderizado com o texto correto.    
**Saída esperada:** Botão padrão do sistema com o texto definido pelo teste.

### 🔹 Executar função ao clicar no botão 
**Descrição:** Verifica se a função desejada foi chamada ao acionar o botão.    
**Saída esperada:** A função definida é iniciada.

## Testes com o componente de Login
### 🔹 Logar com campos não preenchidos
**Descrição:** Verifica se todos os campos foram preenchidos e acusa erro se algum campo está vazio.  
**Entrada:** Email e senha.  
**Saída esperada:** Retorna erro indicando que o campo de email ou o campo de senha está vazio.

## Testes na tela de chat
### 🔹 Digitar mensagem
**Descrição:** Verifica se a mensagem digitada foi inserida no sistema corrretamente.  
**Entrada:** Mensagem a ser enviada para o chat.  
**Saída esperada:** A mensagem deve ser exibida na área de digitação do chat.

### 🔹 Enviar mensagem vazia
**Descrição:** Verifica se a mensagem a ser enviada tem algum caractere ou se existe algum arquivo anexado.  
**Saída esperada:** Alerta pedindo para que uma mensagem seja digitada ou um arquivo enviado.  

### 🔹 Executar função de envio de mensagem
**Descrição:** Verifica se a função de envio de mensagem foi chamada quando uma mensagem com algum caractere é enviada.  
**Entrada:** Mensagem a ser enviada para o chat.  
**Saída esperada:** A função handleSendMessage é chamada.

### 🔹 Executar função de envio de arquivo
**Descrição:** Verifica se a função de envio de arquivo foi chamada quando uma mensagem vazia é enviada e um arquivo está anexado.  
**Saída esperada:** A função handleSendFile é chamada.

## Testes na tela de cadastro
### 🔹 Preencher campos de cadastro
**Descrição:** Verifica se os campos a serem preenchidos na tela de cadastro foram habilitados e possibilitam seu preenchimento.  
**Entrada:** Nome, sobrenome, e-mail, código de verificação e senha válida.
**Saída esperada:** Os campos são preenchidos com as informações fornecidas.

### 🔹 Fazer cadastro com senha e confirmação de senha diferentes
**Descrição:** Verifica se os campos de senha e confirmação de senha são iguais
**Entrada:** Senha e Confirmação de senha.
**Saída esperada:** Alerta informando que a senha e a confirmação não coincidem.

### 🔹 Solicitar código de confirmação de email
**Descrição:** Verifica se o código de confirmação de email é enviado no momento do cadastro
**Saída esperada:** O código é recebido pelo sistema.

### 🔹 Tentar se cadastrar sem preencher todas as informações
**Descrição:** Verifica se algum campo da tela de cadastro está vazio.
**Entrada:** Nome, sobrenome, e-mail, código de verificação e senha válida.
**Saída esperada:** Desabilita o botão de confirmar e continuar.

### 🔹 Alterar visibilidade da senha
**Descrição:** Verifica se a senha está visível e passa a não estar visível quando requisitado e vice-versa.
**Saída esperada:** o campo de senha alterna entre os tipos "text" e "password".

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

