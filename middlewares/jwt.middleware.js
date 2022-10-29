const { express-jwt: jwt } = require('express-jwt');

// função par extrair o token do header da requisição
const getTokenFromHeaders = (req) => {

  // verifica se tem algo no campo 'Authorization'
  const { authorization } = req.headers;
  if (!authorization) return null; // caso não tenha nada no campo
  
  // caso tenha algum valor no authorization, separa a string pelo espaço em branco
  // já retornando para as variáveis na mesma ordem
  // ex: 'Bearer meuToken123' separa type = Bearer e token = meuToken123
  const [type, token] = authorization.split(' ');
  if (type === 'Bearer') return token;
  
  return null;
}

const isAuthenticated = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload', // cria o req.payload (você pode mudar esse nome se quiser), onde ele insere o payload descodificado.
  getToken: getTokenFromHeaders, // usa a função para pegar o token
});

module.exports = {
  isAuthenticated,
};