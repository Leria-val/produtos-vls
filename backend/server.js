import express from "express";
import cors from "cors";
import { connect, sequelize } from "./config/connection.js";
import categoryRouter from "./routes/categoryRouter.js";
import productRouter from "./routes/productRouter.js";
import authRouter from "./routes/authRouter.js";


import 'dotenv/config'

const PORT = process.env.PORT || 3000;
const app = express();

app.use (cors ({
  "origin": "http://localhost:5173",
  "methods": "GET, POST, PUT, DELETE",
  "credentials": true
}));
app.use(express.json());
app.use('/api/categories', categoryRouter)
app.use('/api/products', productRouter)
app.use('/api/auth', authRouter)

const startServer = async () => {
  try {
    // conectamos y Sincronizamos 
    await connect(); 
    
    // encendemos el server
    app.listen(PORT, () => {
      console.log(`Servidor rodando em: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro fatal ao iniciar o servidor:", error);
  }
};

startServer();