import express, { json } from "express";
import { connect } from "./config/sqlConnection.js";
import categoryRouter from "./routes/categoryRouter.js";
import productRouter from "./routes/productRouter.js";
import authRouter from "./routes/authRouter.js";

import 'dotenv/config'

const PORT = process.env.PORT || 3000;
const app = express();

app.use (cors ({
  "origin": "https://localhost.5173",
  "methods": "GET, POST, PUT, DELETE",
  "credential": "true"
}));
app.use(json());
app.use('/categories', categoryRouter)
app.use('/products', productRouter)
app.use('/auth', authRouter)

app.listen(PORT, () => {
  connect();
  console.log(`Servidor rodando no link http://localhost:${PORT}`);
});
