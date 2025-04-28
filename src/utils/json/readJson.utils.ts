import fs from 'fs';

/**
 * Lê o conteúdo de um arquivo JSON e retorna como objeto
 * @param file Caminho do arquivo
 */
export function readJson(file: string): any | null {
    try {
        if (!fs.existsSync(file)) {
            return null; // Retorna null se o arquivo não existir
        }

        const data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data); // Retorna o conteúdo do arquivo
    } catch (error) {
        console.error(`Erro ao ler o arquivo ${file}:`, error);
        return null;
    }
}