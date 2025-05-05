// src/app.ts
// Description: Configuração inicial da aplicação Express, incluindo middlewares e rotas.
import express from 'express';
import cors from "cors";
import Routes from './routes/api.routes';

const app = express();

// Configura o espaçamento na resposta JSON para facilitar a leitura no terminal ou em ferramentas de testes
app.set("json spaces", 2);

// Middleware que habilita o CORS (permite que outros domínios acessem a API)
app.use(cors());

// Middleware que permite a leitura de dados no formato JSON no corpo da requisição
app.use(express.json());

// Middleware que permite interpretar dados enviados em formulários (URL encoded)
app.use(express.urlencoded({ extended: true }));

// Aplica o prefixo '/api' a todas as rotas da aplicação
app.use('/api', Routes);

// Exporta a instância do app para ser utilizada pelo servidor
export default app;