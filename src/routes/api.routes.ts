import { Router } from "express";
import { authenticate } from "../middlewares/authentication";
import { token } from "../controllers/token.controller";

const router = Router();

// Rotas para /api/token
router.post("/token/create", token.create);
router.post("/token/reset", token.reset);


export default router;