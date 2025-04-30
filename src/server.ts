// server.ts
import app from './app'

// Configuração da porta do servidor
const PORT = process.env.PORT || 3000;

// Inicia o servidor e escuta na porta configurada
app.listen(PORT, () => {
    console.log(`〔API〕» Servidor rodando na porta ${PORT}.`);
});