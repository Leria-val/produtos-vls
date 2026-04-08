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
    await sequelize.sync({ force: false }); // Esto crea las tablas si no existen
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
    
    app.listen(PORT, () => {
      //await connect();
      console.log(`Servidor rodando em: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }
};

startServer();