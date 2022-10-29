const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const User = require('../models/User.model');

// rotas de autenticação
router.get('/', (req, res, next) => {
  res.json('Tudo certo aqui!'); // rota de teste
});

module.exports = router;