import path from "path";
import fs from "fs";
import { readJson } from "./json/readJson.utils";
import { saveJson } from "./json/saveJson.utils";
import { json } from "stream/consumers";

/**
 * Retorna e salvar os dados dos arquivos das rota
 * @param filename - Nome do arquivo
 * @param data - Dados para salvar
 */

export function getStorage(filename: string): any | null {
  const jsoname = filename.endsWith(".json") ? filename : `${filename}.json`;
  const file = path.join(__dirname, "..", "data", "storage", jsoname);
  return readJson(file);
}

export function postStorage(filename: string, data: any): boolean {
  const jsoname = filename.endsWith(".json") ? filename : `${filename}.json`;
  const file = path.join(__dirname, "..", "data", "storage", jsoname);
  return saveJson(file, data);
}
