import { postStorage } from '../utils/storage.utils';
import { getStorage } from '../utils/storage.utils';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';


export class Token {
    static create(req: Request, res: Response) {
        try {

            const { key } = req.body;

            if (!key || typeof key !== 'string') {
                res.status(400).json({
                    error: {
                        code: "KEY_MISSING_OR_INVALID",
                        message: "〔API〕» Chave inválida ou ausente.",
                        detail: "A chave 'key' é obrigatória para gerar o token.",
                        suggestion: "Envie uma chave válida no corpo da requisição.",
                        example: {
                            key: "sua-chave-secreta"
                        }
                    }
                });
                return;
            }

            const data = getStorage('token');

            // Se já existe um token salvo, precisa validar a chave
            if (data?.key && data.key !== key) {
                res.status(403).send("〔API〕» Chave incorreta. A key enviada não corresponde à configurada.");
            }

            // Payload do token
            const payload = {
                app: 'fast-api',
                createdAt: new Date().toISOString()
            };

            // Gera um token JWT
            const token = jwt.sign(payload, key);

            const success = postStorage('token', { token, key });

            if (!success) {
                res.status(500).json({ message: 'Erro ao salvar o token.' });
                return;
            }

            // Retorna o token criado
            res.status(201).json({ token });
        } catch (error) {
            console.error('Erro ao gerar token:', error);
            res.status(500).json({ message: 'Erro interno ao gerar token.' });
        }
    }
}
