# Projeto Fullstack: Sistema de Gestão de Produtos

Este projeto é uma aplicação Fullstack completa, desenvolvida para demonstrar competências em Node.js (Express) integrando um banco de dados PostgreSQL com um frontend em React. A aplicação foca em segurança, controle de acesso e boas práticas de desenvolvimento modular.

## Arquitetura do Sistema

A aplicação segue o padrão MVC (Model-View-Controller) para garantir escalabilidade e organização.

### Backend
- **models/**: Definição de tabelas e relacionamentos via Sequelize.
- **controllers/**: Lógica de negócio e manipulação de requisições.
- **routes/**: Endpoints da API REST.
- **middlewares/**: Camadas de segurança (JWT) e controle de Roles.
- **validations/**: Esquemas de validação de dados antes da persistência.
- **config/**: Configurações de conexão com o banco e variáveis de ambiente.

### Frontend
- **context/**: Gerenciamento de estado global de autenticação.
- **api/**: Configuração do Axios com interceptores para injeção automática de Token.
- **pages/**: Interfaces de usuário (Login, Dashboard, Formulários).

## Modelo de Dados (Relacional)

Utilizamos o PostgreSQL com as seguintes entidades:

1. **Users**: Gestão de acesso.  
   - id, email, password (encriptada com bcrypt), role (admin | user).

2. **Products**: Gestão de estoque.  
   - id, name, price, description, categoryId.

3. **Categories**: Classificação de produtos.  
   - id, name.

Relacionamento: Products possui uma chave estrangeira para Categories (1:N), garantindo integridade referencial.

## 🔐 Segurança e Regras de Negócio

### 1. Autenticação e Autorização
- **JWT (JSON Web Token)**: Emitido no login e validado em todas as rotas privadas.
- **Controle de Níveis (Roles)**:
  - **User**: Pode visualizar produtos.
  - **Admin**: Acesso total (Criar, Editar e Excluir).

## 2. Proteção de Rotas

As rotas críticas são protegidas por um encadeamento de middlewares: authMiddleware ➡ roleMiddleware('admin') ➡ validateMiddleware ➡ Controller.

## 🔌 API Endpoints (Resumo)

| Método | Endpoint            | Proteção   | Descrição                                         |
|--------|--------------------|------------|--------------------------------------------------|
| POST   | /api/auth/login    | Pública    | Autentica usuário e retorna Token.              |
| GET    | /api/products      | User/Admin | Lista todos os produtos com suas categorias.    |
| POST   | /api/products      | Admin      | Cria um novo produto (Validação Joi).           |
| PUT    | /api/products/:id  | Admin      | Atualiza dados de um produto existente.         |
| DELETE | /api/products/:id  | Admin      | Remove permanentemente um produto.              |

## 🛠️ Instalação e Configuração

### 1. Backend

```bash
cd backend
npm install

DB_NAME=produtos_db
DB_USER=postgres
DB_PASS=sua_senha
DB_HOST=127.0.0.1
DB_PORT=5432
JWT_SECRET=segredo_super_seguro

npm run dev

### 2. Frontend
cd frontend
npm install
npm start

**Desenvolvido por:**
👤 Valeria | 👤 Leonardo | 👤 Samyra


