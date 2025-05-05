// src/utils/storage.utils.ts
// Description: Utilitário para leitura e escrita de arquivos de armazenamento geral (como tokens, configurações, etc). Os dados são armazenados em arquivos JSON dentro da pasta /data/storage.
import path from "path";
import { Json } from "./json.utils";

/**
 * Classe utilitária para leitura e escrita de arquivos de armazenamento geral (como tokens, configurações, etc).
 * Os dados são armazenados em arquivos JSON dentro da pasta /data/storage.
 */
export class Storage {

  /**
   * Lê o conteúdo de um arquivo de armazenamento.
   * 
   * @param filename - Nome do arquivo (com ou sem extensão .json).
   * @returns Objeto lido do arquivo ou null se não existir ou falhar.
   */
  static get(filename: string): any | null {
    // Garante a extensão .json
    const jsoname = filename.endsWith(".json") ? filename : `${filename}.json`;

    // Caminho completo até o arquivo de armazenamento
    const file = path.join(__dirname, "..", "data", "storage", jsoname);

    // Retorna o conteúdo lido do arquivo
    return Json.read(file);
  }

  /**
   * Salva um objeto em um arquivo de armazenamento.
   * 
   * @param filename - Nome do arquivo (com ou sem extensão .json).
   * @param data - Objeto a ser salvo como JSON.
   * @returns boolean - true se salvar com sucesso, false caso contrário.
   */
  static post(filename: string, data: any): boolean {
    // Garante a extensão .json
    const jsoname = filename.endsWith(".json") ? filename : `${filename}.json`;

    // Caminho completo até o arquivo de armazenamento
    const file = path.join(__dirname, "..", "data", "storage", jsoname);

    // Salva o conteúdo no arquivo
    return Json.save(file, data);
  }
}
