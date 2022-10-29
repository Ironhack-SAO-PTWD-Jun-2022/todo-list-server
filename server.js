// importar app
const app = require('./app.js');

// configuração de porta
const PORT = process.env.PORT || 5000;
// caso não exista PORT no arquivo .env, usa o número 5000 como padrão.

// ouvir a porta para conexão externa
app.listen(PORT, () => console.log(`Servidor ouvindo porta: ${PORT}`));