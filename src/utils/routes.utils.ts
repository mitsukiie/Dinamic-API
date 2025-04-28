import path from "path";
import { readJson } from "./json/readJson.utils";

/**
 * Retorna os dados dos arquivos das rota
 * @param filename Nome do arquivo
 */
export function getData(filename: string): any | null {
  const file = path.join(__dirname, "..", "data", "routes", filename);
  return readJson(file);
}
