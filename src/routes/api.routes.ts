import { Router } from "express";
import { authenticate } from "../middlewares/authentication";
import { Token } from "../controllers/token.controller";

const router = Router();

// Rotas para /api/token
router.post("/token/create", Token.create);
router.post("/token/reset", Token.reset);


export default router;