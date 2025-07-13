# 📦 Product DDD API

API RESTful para gerenciamento de produtos com autenticação, desenvolvida com **Node.js**, **TypeScript**, **Express** e **MongoDB**, seguindo os princípios de **Domain-Driven Design (DDD)** e **Clean Architecture**.

---

## 🔧 Tecnologias Utilizadas

- **Node.js** + **Express**
- **TypeScript**
- **MongoDB** (Mongoose)
- **JWT** para autenticação
- **Zod** para validação
- **Jest + Supertest** para testes automatizados
- **Docker** para ambiente isolado
- **dotenv** para variáveis de ambiente
- **Swagger** para documentação da API

---

## 📁 Estrutura do Projeto

```
src/
├── application/        # Casos de uso (use-cases)
├── domain/             # Entidades e interfaces (contratos)
├── infrastructure/     # Banco de dados, models, repositórios
├── presentation/       # Rotas e controllers
├── shared/             # Middlewares, helpers, tratamentos de erro
├── config/             # Configurações da aplicação (ex: env)
├── app.ts              # Instância e configuração do Express
└── server.ts           # Ponto de entrada do servidor
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3334
JWT_SECRET=sua_chave_secreta_segura
MONGO_URL=mongodb://mongo:27017/product_db
```

> 🔁 Caso a porta `27017` já esteja em uso no seu host, altere no `docker-compose.yml` para algo como `27018:27017` e atualize o `MONGO_URL` no `.env` para:  
> `MONGO_URL=mongodb://mongo:27017/product_db`

---

## 🚀 Executando o Projeto com Docker

1. Instale as dependências:

```bash
npm install
```

2. Suba a aplicação com Docker Compose:

```bash
docker-compose up --build
```

3. Acesse:

- API: http://localhost:3334
- Swagger: http://localhost:3334/api-docs

> Obs: Certifique-se que as portas no `.env` e no `docker-compose.yml` estejam sincronizadas.

---

## 📦 Comandos Úteis

### Rodar a aplicação em modo desenvolvimento

```bash
npm run dev
```

### Rodar os testes

```bash
npm run test
```

---

## 🧪 Testes Automatizados

Os testes utilizam `Jest` e `Supertest`. Para executá-los:

```bash
npm run test
```

---

## 📚 Documentação Swagger

A documentação da API está disponível no seguinte endpoint:

```
GET http://localhost:3334/api-docs
```

Você pode testar as rotas diretamente pela interface Swagger.

--# Backend-developer-test-
