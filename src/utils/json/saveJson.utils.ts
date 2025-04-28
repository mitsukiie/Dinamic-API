import fs from 'fs';
import path from 'path';

/**
 * Salva um objeto como arquivo JSON formatado
 * @param file - Caminho do arquivo
 * @param data - Objeto para salvar
 */
export function saveJson(file: string, data: any): boolean {
    try {
        // Garante que a pasta "storage" existe
        const folder = path.dirname(file);
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }

        const jsonData = JSON.stringify(data, null, 2); // Indenta o JSON para ficar legível
        fs.writeFileSync(file, jsonData, 'utf8');
        return true; // Indica sucesso
    } catch (error) {
        console.error(`Erro ao escrever no arquivo ${file}:`, error);
        return false; // Indica erro
    }
}
