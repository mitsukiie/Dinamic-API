// src/middlewares/authentication.ts
// Description: Middleware de autenticação via token JWT.
import { Storage } from '../utils/storage.utils';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware de autenticação via token JWT
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    // Verifica se o cabeçalho "Authorization" está presente na requisição
    const authorization = req.headers['authorization'];

    if (!authorization) {
        res.status(403).json({
            error: {
                code: "AUTHORIZATION_HEADER_MISSING",
                message: "〔API〕» Acesso negado!",
                reason: "O cabeçalho de autorização é obrigatório.",
                suggestion: "Envie o token no formato: Bearer <token>."
            },
        });
        return;
    }

    // Recupera o token armazenado no arquivo JSON
    const data = Storage.get('token');
    if (!data) {
        res.status(403).json({ 
            message: '〔API〕» Token não configurado.',
            suggestion: "Use a rota /token/create para criar um."
        });
        return;
    }

    const { token, key } = data;

    // O formato esperado é "Bearer <token>"
    const [type, Token] = authorization.split(' ');

    // Verifica se o tipo e o token estão presentes e corretos
    const missingFields = [];
    if (type !== 'Bearer') missingFields.push('Bearer');
    if (!Token) missingFields.push('Token');

    if (missingFields.length > 0) {
        res.status(400).json({
            error: {
                code: "MISSING_AUTH_PARTS",
                message: "〔API〕» Acesso negado!",
                details: `Partes ausentes: ${missingFields.join(', ')}`,
                suggestion: "Use o formato correto: Bearer <token>."
            },
        });
        return;
    }

    // Compara o token recebido com o que foi salvo na criação
    if (Token !== token) {
        res.status(403).json({
            error: {
                code: "INVALID_TOKEN",
                message: "〔API〕» Acesso negado!",
                reason: "Token inválido."
            },
        });
        return;
    }

    try {
        // Verifica se o token é válido e assinado com a chave correta
        jwt.verify(Token, key);
        next(); // Token válido, segue para o próximo middleware ou rota
    } catch (error) {
        // Token inválido ou expirado
        res.status(403).json({
            error: {
                code: "TOKEN_VERIFICATION_FAILED",
                message: "〔API〕» Acesso negado!",
                reason: "Falha ao verificar o token."
            },
        });
    }
};
