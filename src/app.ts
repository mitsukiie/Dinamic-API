import express from 'express';
import cors from "cors";
import Routes from './routes/api.routes';

const app = express();

// Configura o espaçamento do JSON nas respostas
app.set("json spaces", 2);

// Middleware para habilitar o CORS (liberar requisições de outros domínios)
app.use(cors())

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Middleware para interpretar dados de formulários (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Define o prefixo '/api' para todas as rotas
app.use('/api', Routes);

export default app;