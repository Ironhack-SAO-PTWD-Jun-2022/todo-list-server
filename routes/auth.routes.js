const router = require('express').Router();

const { isAuthenticated } = require('../middlewares/jwt.middleware');
const { encrypt, verify, generateToken } = require('../utils/auth.utils');

const User = require('../models/User.model');

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username, !password) {
      const error = new Error('Todos os campos são obrigatórios.');
      error.status = 400;
      throw error;
    }

    const hash = encrypt(password)
    const userFromDB = await User.create({ username, passwordHash: hash });

    res.status(201).json({ message: `Usuário ${userFromDB.username} criado com sucesso!` });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username, !password) {
      const error = new Error('Todos os campos são obrigatórios.');
      error.status = 400;
      throw error;
    }

    const userFromDB = await User.findOne({ username });

    if (!userFromDB) {
      const error = new Error('Usuário ou senha inválidos.');
      error.status = 401;
      throw error;
    }

    const passwordMatch = verify(password, userFromDB.passwordHash);

    if (!passwordMatch) {
      const error = new Error('Usuário ou senha inválidos.');
      error.status = 401;
      throw error;
    }

    const { _id } = userFromDB;
    const payload = {
      username,
      _id
    };

    const token = generateToken(payload);

    res.status(200).json({ message: 'Login com sucesso.', authToken: token });
  } catch (error) {
    next(error)
  }
})

router.get('/verify', isAuthenticated, (req, res, next) => {
  try {
    res.status(200).json({ authenticatedUser: req.payload });
  } catch (error) {
    next(error);
  }
});

module.exports = router;