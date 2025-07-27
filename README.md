# 📌 Dinamic API - Documentação

Uma API rápida, leve e dinâmica feita com **TypeScript** e **Express**, que permite criar rotas personalizadas em tempo real e armazenar dados localmente em arquivos `.json`.

## 📦 Tecnologias Utilizadas

- **Node.js**: Plataforma de execução JavaScript
- **TypeScript**: Superset do JavaScript com tipagem estática
- **Express**: Framework para criação de API REST
- **JWT**: JSON Web Token para autenticação
- **File System**: Armazenamento em arquivos locais

## 📁 Estrutura do Projeto

```
📦 Dinamic-API
┣ 📂 src
┃ ┣ 📂 controllers
┃ ┃ ┣ 📜 route.controller.ts     # Lógica das rotas dinâmicas
┃ ┃ ┗ 📜 token.controller.ts     # Lógica para criação e redefinição de tokens
┃ ┣ 📂 middlewares
┃ ┃ ┗ 📜 authentication.ts       # Middleware de autenticação por token
┃ ┣ 📂 routes
┃ ┃ ┗ 📜 api.routes.ts           # Definição das rotas da API
┃ ┣ 📂 utils
┃ ┃ ┣ 📜 json.utils.ts           # Leitura e escrita de arquivos JSON
┃ ┃ ┣ 📜 routes.utils.ts         # Gerenciador de dados das rotas
┃ ┃ ┗ 📜 storage.utils.ts        # Gerenciador de dados internos
┃ ┣ 📜 app.ts                     # Configuração principal do Express
┃ ┗ 📜 server.ts                  # Inicialização do servidor
┣ 📜 package.json                 # Dependências do projeto
┣ 📜 README.md                    # Documentação do projeto
┗ 📜 tsconfig.json                # Configuração do TypeScript
```

## 🚀 Como Executar o Projeto

```bash
# Instale as dependências
npm install

# Rode o servidor em modo desenvolvimento
npx tsx watch server.ts

# Ou compile e execute
npm start
```

## 🔐 Autenticação

A API utiliza JWT como sistema de autenticação. A maioria das rotas dinâmicas pode ser protegida e requer um token.

### Criar Token

`POST /api/token/create`

```json
{
  "key": "sua-chave-secreta"
}
```

### Redefinir Token

`POST /api/token/reset`

```json
{
  "key": "sua-chave-secreta"
}
```

## 🛠️ Rotas da API

### Criar nova rota dinâmica

`POST /api/route/create`

> Protegida por token (envie no header `Authorization: Bearer <token>`)

```json
{
  "name": "produtos",
  "protect": ["POST"]
}
```

Cria a rota `/api/produtos`, com o método POST protegido.

### Usar rotas dinâmicas

`ANY /api/:route`
> (protegidos, se configurado)
* `GET /api/produtos` → Retorna dados
* `POST /api/produtos` → Salva dados

**Exemplo de envio:**

```json
{
  "nome": "Notebook",
  "preco": 3999
}
```

## 🧪 Exemplo de uso com cURL

```bash
# Criar um token
curl -X POST http://localhost:3000/api/token/create \
     -H "Content-Type: application/json" \
     -d '{"key": "1234"}'

# Criar uma rota protegida
curl -X POST http://localhost:3000/api/route/create \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"name": "produtos", "protect": ["POST"]}'

# Salvar dados na rota
curl -X POST http://localhost:3000/api/produtos \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"nome": "Teclado", "preco": 199}'
```

## 📌 Observações

* Todos os dados são persistidos em arquivos `.json`, organizados na pasta `/data`.
* O token e a key é salvo em `data/storage/token.json`.
* As rotas criadas ficam salvas em `data/storage/routes.json`, e os dados de cada rota vão para `data/routes/:nome.json`.

## 📄 Licença

Este projeto está sob a licença MIT.

## Manutenção e Contato

Caso encontre algum problema ou tenha sugestões de melhorias, entre em contato ou abra uma issue no repositório.

🔹 **Desenvolvedor:** @mitsukiie

[![GitHub](https://img.shields.io/badge/GitHub-000?logo=github&logoColor=white)](https://github.com/mitsukiie) [![Discord](https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=white)](https://discord.com/users/1098021115571490947)
