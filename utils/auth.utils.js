const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const encrypt = (str) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(str, salt);
  return hash;
}

const verify = (str, hash) => {
  return bcrypt.compareSync(str, hash);
}

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}

module.exports = {
  encrypt,
  verify,
  generateToken,
}