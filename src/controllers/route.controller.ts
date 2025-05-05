// src/controllers/route.controller.ts
// Description: Controlador responsável pela criação e manipulação de rotas dinâmicas.
import { Request, Response } from 'express';
import { Storage } from '../utils/storage.utils';
import { Route } from '../utils/routes.utils';
import { authenticate } from '../middlewares/authentication';

// Controlador responsável pela criação e manipulação de rotas dinâmicas
export class route {

  // Método para criar uma nova rota dinâmica
  static create(req: Request, res: Response) {
    const { name, protect = [] } = req.body;
  
    // Validação: nome da rota é obrigatório
    if (!name || typeof name !== "string") {
      res.status(400).json({
        error: {
          code: "INVALID_ROUTE_NAME",
          message: "〔API〕» Nome da rota ausente ou invalido",
          detail: "Campo 'name' é obrigatório e deve ser uma string."
        }
      });
      return;
    }
  
    // Normaliza o nome da rota (minúsculo, sem caracteres inválidos)
    const route = name.toLowerCase().replace(/[^a-z0-9-_]/gi, "-");

    // Recupera rotas salvas
    const data = Storage.get("routes") || {};
  
    // Verifica se a rota já existe
    if (data[route]) {
      res.status(409).json({
        error: {
          code: "ROUTE_EXISTS",
          message: `〔API〕» A rota /${route} já existe.`
        }
      });
      return;
    }
  
    // Métodos HTTP permitidos por padrão
    const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];

    // Cria estrutura inicial da rota
    data[route] = {
      methods: {},
      createdAt: new Date().toISOString()
    };
  
    // Define os métodos suportados e quais são protegidos
    methods.forEach((method) => {
      data[route].methods[method] = {
          protected: Array.isArray(protect)
          ? protect.includes(method)
          : false
      };
    });
  
    // Salva rota no armazenamento
    const success = Storage.post("routes", data);
  
    // Verifica se salvamento falhou
    if (!success) {
      res.status(500).json({
        error: {
          code: "SAVE_FAILED",
          message: "〔API〕» Erro ao salvar a nova rota."
        }
      });
      return;
    }
  
    // Resposta de sucesso
    res.status(201).json({
      message: `〔API〕» Rota '${route}' criada com sucesso.`,
      route: route,
      methods: data[route].methods
    });
  }

  // Método responsável por tratar requisições às rotas criadas
  static methods(req: Request, res: Response) {
    const { route } = req.params;
    const method = req.method;
    const routes = Storage.get("routes") || {};

    // Verifica se a rota existe
    if (!routes[route]) {
      res.status(404).json({
        error: {
          code: "ROUTE_NOT_FOUND",
          message: `〔API〕» A rota /${route} não existe.`,
          suggestion: "Crie a rota usando /routes/create."
        }
      });
      return;
    }

    // Verifica se o método HTTP é suportado pela rota
    if (!routes[route].methods[method]) {
      res.status(405).json({
        error: {
          code: "METHOD_NOT_ALLOWED",
          message: `〔API〕» Método '${method}' não permitido para esta rota.`,
          suggestion: "Verifique os métodos suportados para esta rota."
        }
      });
      return;
    }

    // Função para processar o método requisitado
    const Methods = () => {
      if (method === "GET") {
        // Busca dados armazenados para a rota
        const data = Route.get(route);
  
        if (!data || (Array.isArray(data) && data.length === 0)) {
          res.status(404).json({
            error: {
              code: "DATA_NOT_FOUND",
              message: `〔API〕» Nenhum dado encontrado para a rota /${route}`,
            }
          });
          return;
        }

        // Retorna os dados encontrados
        res.status(200).json(data);
      }
  
      if (method === "POST") {
        const { body } = req;
  
        // Verifica se o corpo da requisição é válido
        if (!body || typeof body !== "object") {
          res.status(400).json({
            error: {
              code: "INVALID_DATA",
              message: "〔API〕» Dados inválidos ou ausentes no corpo da requisição.",
            }
          });
          return;
        }
  
        // Salva os dados na rota especificada
        const data = Route.post(route, body);
  
        if (!data) {
          res.status(500).json({
            error: {
              code: "SAVE_FAILED",
              message: "〔API〕» Erro ao salvar os dados.",
            }
          });
          return;
        }
  
         // Confirmação de sucesso
        res.status(201).json({
          message: `〔API〕» Dados salvos com sucesso na rota /${route}.`
        });
      }

      // Outros métodos (PUT, DELETE, PATCH) vão ser implementados em breve.
    }

    // Se a rota estiver protegida, exige autenticação
    if (routes[route].methods[method].protected === true) {
      return authenticate(req, res, Methods);
    }
    
    // Executa método normalmente se não for protegido
    Methods();

  }
}
  