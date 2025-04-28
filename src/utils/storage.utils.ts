import path from "path";
import fs from "fs";
import { readJson } from "./json/readJson.utils";
import { saveJson } from "./json/saveJson.utils";

/**
 * Retorna e salvar os dados dos arquivos das rota
 * @param filename - Nome do arquivo
 * @param data - Dados para salvar
 */

export function getStorage(filename: string): any | null {
  const file = path.join(__dirname, "..", "data", "storage", filename);
  return readJson(file);
}

export function postStorage(filename: string, data: any): boolean {
  const file = path.join(__dirname, "..", "data", "storage", filename);
  return saveJson(file, data);
}
