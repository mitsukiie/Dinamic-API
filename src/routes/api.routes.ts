// src/routes/api.routes.ts
// Description: Rotas da API para gerenciamento de tokens e rotas dinâmicas.
import { Router } from "express";
import { authenticate } from "../middlewares/authentication";
import { token } from "../controllers/token.controller";
import { route } from "../controllers/route.controller";

// Cria um roteador do Express
const router = Router();

/**
 * ROTAS DE TOKEN
 * -------------------------
 * /token/create - Gera e salva um novo token JWT
 * /token/reset  - Redefine o token existente (autenticado com a chave)
 */
router.post("/token/create", token.create);
router.post("/token/reset", token.reset);

/**
 * ROTAS DE GERENCIAMENTO DE ROTA DINÂMICA
 * --------------------------------------
 * /route/create - Cria uma nova rota personalizada (proteção por token)
 */
router.post("/route/create", authenticate, route.create);

/**
 * ROTA GENÉRICA PARA EXECUÇÃO DE MÉTODOS
 * -----------------------------------------
 * /:route - Intercepta todos os métodos HTTP (GET, POST, etc.)
 *          para qualquer rota criada dinamicamente.
 */
router.all("/:route", route.methods);

// Exporta o roteador configurado
export default router;