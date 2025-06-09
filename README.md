# Sistema de Gerenciamento de Clientes — Escritório de Investimentos

Projeto fullstack com cadastro de clientes, usando React (Next.js), Fastify, Prisma e MySQL com Docker.
---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend (Fastify)
- **Fastify**: framework web rápido para Node.js
- **Prisma**: ORM moderno para SQL
- **MySQL**: Banco relacional (via Docker)
- **CORS**: Permitir comunicação com frontend
- **Zod**: Validação de dados

### 🖥️ Frontend (Next.js)
- **React + Next.js**: Interface web com rotas
- **React Hook Form + Zod**: Formulários validados
- **React Query**: Cache e requisições
- **Tailwind CSS**: Estilização rápida e responsiva
- **ShadCN UI**: Componentes modernos de UI

---

## 🐳 Como rodar o projeto localmente

```bash
git clone https://github.com/ErikNoda3/investments-app.git
cd investments-app

cd investments-backend
cp .env.example .env
docker compose up -d
npx prisma migrate dev --name init
npm install
npm run dev

cd investments-frontend
npm install
npm run dev
```
### Obs.: a aplicação está nas rotas "localhost:3001/clients" para o backend e "localhost:3000/clients" para o frontend
---
### Estrutura do banco de dados (prisma)
```bash
model Client {
  id     Int    @id @default(autoincrement())
  name   String
  email  String @unique
  status Boolean
}
```
