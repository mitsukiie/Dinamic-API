// src/utils/json.utils.ts
// Description: Classe utilitária para operações de leitura e escrita de arquivos JSON.
import fs from 'fs';
import path from 'path';

// Classe utilitária para operações de leitura e escrita de arquivos JSON. 
export class Json {

    /**
     * Salva um objeto como um arquivo JSON formatado.
     * 
     * @param file - Caminho absoluto ou relativo do arquivo a ser salvo.
     * @param data - Objeto que será transformado em JSON.
     * @returns boolean - Retorna true se a operação for bem-sucedida, false em caso de erro.
     */
    static save(file: string, data: any): boolean {
        try {
            // Garante que o diretório onde o arquivo será salvo exista
            const folder = path.dirname(file);
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true });
            }

            // Converte o objeto para JSON com identação (2 espaços)
            const jsonData = JSON.stringify(data, null, 2);

            // Salva o conteúdo JSON no arquivo
            fs.writeFileSync(file, jsonData, 'utf8');

            return true;
        } catch (error) {
            console.error(`Erro ao escrever no arquivo ${file}:`, error);
            return false;
        }
    }

    /**
     * Lê um arquivo JSON e o transforma em objeto JavaScript.
     * 
     * @param file - Caminho do arquivo JSON a ser lido.
     * @returns any | null - Retorna o objeto carregado ou null se não existir ou ocorrer erro.
     */
    static read(file: string): any | null {
        try {
            // Verifica se o arquivo existe
            if (!fs.existsSync(file)) {
                return null;
            }

            // Lê o conteúdo do arquivo e converte de volta para objeto
            const data = fs.readFileSync(file, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Erro ao ler o arquivo ${file}:`, error);
            return null;
        }
    }
}
