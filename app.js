// pacotes
require('dotenv/config'); // permite acesso ao arquivo .env
const express = require('express');
const app = express();

// banco de dados
require('./db');

// configurações
require('./configs')(app);

// middlewares gerais

// rotas
app.use('/auth', require('./routes/auth.routes'));

// erros
require('./error-handling')(app);

// exportar app
module.exports = app;