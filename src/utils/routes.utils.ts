// src/utils/routes.utils.ts
// Description: Classe utilitária para leitura e escrita de dados nas rotas criadas dinamicamente.
import path from "path";
import { Json } from "./json.utils";

/**
 * Classe utilitária para leitura e escrita de dados nas rotas criadas dinamicamente.
 * Cada rota é representada por um arquivo .json na pasta /data/routes.
 */
export class Route {

  /**
   * Lê os dados associados a uma rota.
   * 
   * @param filename - Nome da rota (com ou sem extensão .json).
   * @returns Conteúdo do arquivo JSON como objeto, ou null se não existir.
   */
  static get(filename: string): any | null {
    // Garante que o nome do arquivo tenha a extensão .json
    const jsoname = filename.endsWith(".json") ? filename : `${filename}.json`;

    // Caminho completo para o arquivo de rota
    const file = path.join(__dirname, "..", "data", "routes", jsoname);

    // Lê e retorna o conteúdo JSON
    return Json.read(file);
  }

  /**
   * Salva dados no arquivo associado a uma rota.
   * 
   * @param filename - Nome da rota (com ou sem extensão .json).
   * @param data - Objeto de dados a ser salvo.
   * @returns boolean - true se a operação for bem-sucedida, false caso contrário.
   */
  static post(filename: string, data: any): boolean {
    // Garante que o nome do arquivo tenha a extensão .json
    const jsoname = filename.endsWith(".json") ? filename : `${filename}.json`;

    // Caminho completo para o arquivo de rota
    const file = path.join(__dirname, "..", "data", "routes", jsoname);

    // Salva os dados como JSON
    return Json.save(file, data);
  }
}
