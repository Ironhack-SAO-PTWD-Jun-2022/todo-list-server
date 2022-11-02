// pacotes
require('dotenv/config'); // permite acesso ao arquivo .env
const express = require('express');
const app = express();

// banco de dados
require('./db');

// configurações
require('./configs')(app);

// middlewares gerais
const { isAuthenticated } = require('./middlewares/jwt.middleware');

// rotas
app.use('/auth', require('./routes/auth.routes'));
app.use('/api', isAuthenticated, require('./routes/todo.routes'));

// erros
require('./error-handling')(app);

// exportar app
module.exports = app;