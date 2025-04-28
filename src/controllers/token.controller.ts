import { postStorage } from '../utils/storage.utils';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const key = process.env.KEY || '';

export class Token {
    static create(req: Request, res: Response) {
        try {
            // Define o conteúdo do payload
            const payload = {
                app: 'fast-api',
                createdAt: new Date().toISOString()
            };

            // Gera um token JWT
            const token = jwt.sign(payload, key);

            const success = postStorage('token.json', { token });

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
