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
  "origin": "https://localhost:5173",
  "methods": "GET, POST, PUT, DELETE",
  "credentials": "true"
}));
app.use(express.json());
app.use('/categories', categoryRouter)
app.use('/products', productRouter)
app.use('/auth', authRouter)

const startServer = async () => {
  try {
    // 1. Conectamos y Sincronizamos (usa la función que ya tiene el try/catch)
    await connect(); 
    
    // 2. Encendemos el server
    app.listen(PORT, () => {
      console.log(`Servidor rodando em: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro fatal ao iniciar o servidor:", error);
  }
};

startServer();