const router = require('express').Router();
const { throwError } = require('../utils/error.utils');

const { isAuthenticated } = require('../middlewares/jwt.middleware');
const { encrypt, verify, generateToken } = require('../utils/auth.utils');

const User = require('../models/User.model');

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username, !password) {
      throwError('Todos os campos são obrigatórios.', 400);
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
      throwError('Todos os campos são obrigatórios.', 400);
    }

    const userFromDB = await User.findOne({ username });

    if (!userFromDB) {
      throwError('Usuário ou senha inválidos.', 401);
    }

    const passwordMatch = verify(password, userFromDB.passwordHash);

    if (!passwordMatch) {
      throwError('Usuário ou senha inválidos.', 401);
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