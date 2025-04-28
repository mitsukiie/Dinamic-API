import { getStorage } from '../utils/storage.utils';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Chave para verificar o token, armazenada em uma variável de ambiente
const key = process.env.KEY || '';

// Recupera o token armazenado no arquivo "token.json"
const { token } = getStorage('token.json');

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

    // O formato esperado no cabeçalho é "Bearer <token>"
    const [type, Token] = authorization.split(' ');

    // Verifica se os campos "Bearer" e o "Token" estão presentes e corretos
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

    // Verifica se o token enviado no cabeçalho é igual ao token armazenado
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
        // Verifica se o token é válido e assinado corretamente
        jwt.verify(Token, key);
        next(); // Token válido, continua para a próxima função
    } catch (error) {
        res.status(403).json({
            error: {
                code: "TOKEN_VERIFICATION_FAILED",
                message: "〔API〕» Acesso negado!",
                reason: "Falha ao verificar o token."
            },
        });
    }
};
