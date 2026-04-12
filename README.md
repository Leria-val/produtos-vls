# 🚀 Porducto-vls - Node.js + React (JWT + Roles)

## 📖 Descrição

Este projeto consiste no desenvolvimento de uma aplicação fullstack utilizando Node.js (Express + SQL) no backend e React no frontend.

A aplicação implementa:

- Autenticação com JWT  
- Autorização por níveis de acesso admin e user 
- CRUD completo  
- Validação de dados  
- Integração entre backend e frontend  
- Estrutura modular escalável  

---

## 🏗️ Arquitetura do Projeto

/backend
├── /models         
├── /controllers    
├── /routes         
├── /middlewares    
├── /config         
├── /utils         
└── server.js 

/frontend
├── /src
│   ├── /pages        
│   ├── /components  
│   ├── /services     
│   └── App.js

---

## 🗄️ Banco de Dados

Utilizado PostgreSQL ou MySQL.

### Entidades:

#### Users (obrigatória)
- id
- name
- email
- password (hash com bcrypt)
- role (admin | user)

#### Segunda entidade (ex: Products ou Tasks)
- id
- name
- description
- user_id

---

## 🔌 API REST

### CRUD Completo

| Método | Endpoint              | Descrição        |
|--------|----------------------|------------------|
| GET    | /api/resource        | Listar todos     |
| GET    | /api/resource/:id    | Buscar por ID    |
| POST   | /api/resource        | Criar            |
| PUT    | /api/resource/:id    | Atualizar        |
| DELETE | /api/resource/:id    | Deletar          |

---

## 🔐 Autenticação

- Login com email e senha  
- Hash de senha com bcrypt  
- Geração de JWT  
- Rotas protegidas  

### Fluxo:

1. Usuário faz login  
2. Backend valida  
3. Gera token  
4. Frontend armazena  
5. Envia nas requisições  

---

## 🛡️ Autorização por Roles

- admin: acesso total  
- user: acesso limitado  

Middleware controla acesso a rotas protegidas.

---

## ✅ Validações

- Campos obrigatórios  
- Email válido  
- Senha mínima  
- Middleware de validação  

---

## 🌐 CORS

app.use(cors({ origin: 'http://localhost:3000⁠�' }))

---

## 🖥️ Frontend (React)

### Funcionalidades

- Login  
- Consumo da API  
- Listagem  
- Criação  
- Exclusão  
- Uso de JWT  
- Proteção de rotas  
- Feedback de erro e loading  

---

### Telas

- Login  
- Dashboard (CRUD)  

---

## 🔗 Axios

import axios from 'axios'
const api = axios.create({ baseURL: 'http://localhost:5000/api⁠�' })
api.interceptors.request.use(config => { const token = localStorage.getItem('token') if (token) { config.headers.Authorization = Bearer ${token} } return config })
export default api

---

## 🚀 Instalação

### Backend

cd backend 
npm install 
npm run dev

Criar .env:
DB_HOST= 
DB_USER= 
DB_PASS= 
DB_NAME= 
JWT_SECRET=

---

### Frontend

cd frontend 
npm install 
npm start

---

## 📋 Checklist

- API funcional  
- CRUD SQL  
- Login + JWT  
- Roles (admin/user)  
- Validações  
- Integração React  
- Repositório organizado  
- README completo  

---

## 🎤 Apresentação

- Arquitetura do projeto  
- Relação entre entidades  
- Fluxo de autenticação  
- Segurança aplicada  
- Rotas protegidas  
- CRUD no React  
- Conclusões  

---

## 🧠 Conclusão

Projeto fullstack com:

- Backend organizado  
- Segurança com JWT  
- Integração frontend/backend  
- Controle de acesso por roles

Grupo: Leonardo, Valeria, Samyra
  


