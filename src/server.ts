// src/server.ts
// Description: Arquivo principal do servidor Express, onde a aplicação é iniciada e escuta requisições na porta definida.

// Importa a instância do app configurada no arquivo app.ts
import app from './app';

// Define a porta em que o servidor irá escutar (usa variável de ambiente ou padrão 3000)
const PORT = process.env.PORT || 3000;

// Inicia o servidor Express e exibe mensagem de confirmação no terminal
app.listen(PORT, () => {
    console.log(`〔API〕» Servidor rodando na porta ${PORT}.`);
});
