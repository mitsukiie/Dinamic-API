import { Router } from "express";
import { authenticate } from "../middlewares/authentication";
import { Token } from "../controllers/token.controller";

const router = Router();

// Rotas para /api/token
router.post("/token", Token.create);


export default router;