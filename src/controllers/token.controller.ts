// src/controllers/token.controller.ts
// Description: Controlador responsável pela criação e redefinição do token JWT.
import { Storage } from '../utils/storage.utils';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Controlador responsável pela criação e redefinição do token JWT
export class token {

    // Gera um token JWT e armazena com a chave usada
    static create(req: Request, res: Response) {
        try {
            const { key } = req.body;

            // Validação: chave é obrigatória
            if (!key || typeof key !== 'string') {
                res.status(400).json({
                    error: {
                        code: "KEY_REQUIRED",
                        message: "〔API〕» Chave ausente.",
                        detail: "Chave 'key' obrigatória para gerar o token.",
                        suggestion: "Envie uma chave no corpo da requisição.",
                        example: {
                            key: "sua-chave-secreta"
                        }
                    }
                });
                return;
            }

            // Verifica se já existe um token salvo
            const data = Storage.get('token');
            if (data?.token) {
                res.status(409).json({
                    error: {
                        code: "TOKEN_ALREADY_EXISTS",
                        message: "〔API〕» Um token já foi gerado anteriormente.",
                        suggestion: "Use a rota /token/reset para gerar um novo.",
                    },
                });
                return;
            }

            // Payload padrão do token
            const payload = {
                app: 'fast-api',
                createdAt: new Date().toISOString()
            };

            // Cria o token com a chave fornecida
            const token = jwt.sign(payload, key);

            // Salva o token e a chave utilizada
            const success = Storage.post('token', { key, token });

            if (!success) {
                res.status(500).json({ message: 'Erro ao salvar o token.' });
                return;
            }

            // Retorna o token criado
            res.status(201).json({ 
                message: "〔API〕» Token criado com sucesso!",
                token,
            });

        } catch (error) {
            console.error('Erro ao gerar token:', error);
            res.status(500).json({ message: 'Erro interno ao gerar token.' });
        }
    }

    // Redefine o token JWT existente
    static reset(req: Request, res: Response) {
        try {
            const { key } = req.body;
            const data = Storage.get('token');

            // Verifica se já existe um token configurado
            if (!data?.token || !data?.key) {
                res.status(404).json({
                    error: {
                        code: "TOKEN_NOT_FOUND",
                        message: "〔API〕» Nenhum token foi configurado ainda.",
                        suggestion: "Use a rota /token/create para gerar o token inicial.",
                    },
                });
                return;
            }

            // Verifica se a chave informada está correta
            if (!key || key !== data.key) {
                res.status(403).json({
                    error: {
                        code: "INVALID_KEY",
                        message: "〔API〕» Chave inválida. A redefinição foi negada.",
                        suggestion: "Verifique se a chave está correta.",
                    },
                });
                return;
            }

            // Novo payload para o token atualizado
            const newPayload = {
                app: 'fast-api',
                createdAt: new Date().toISOString()
            };

            // Gera novo token com a mesma chave
            const token = jwt.sign(newPayload, key);

            // Salva o novo token
            const updated = Storage.post('token', { key, token });

            if (!updated) {
                res.status(500).json({
                    error: {
                        code: "TOKEN_RESET_FAILED",
                        message: "Erro ao salvar o novo token.",
                    },
                });
                return;
            }

            // Retorna o novo token
            res.status(200).json({
                message: "〔API〕» Token redefinido com sucesso!",
                token,
            });

        } catch (error) {
            console.error('Erro ao redefinir token:', error);
            res.status(500).json({ message: 'Erro interno ao redefinir token.' });
        }
    }
}
