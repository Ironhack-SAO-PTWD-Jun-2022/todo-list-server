const { json, urlencoded } = require('express');
const cors = require('cors');
const logger = require('morgan');

module.exports = (app) => {
  // como vamos hospedar o nosso app em um servidor que aceitará requisições de fora dele, e para isso ele pode usar um "proxy"
  // o express precisa saber q pode confiar nessa configuração externa, então usamos essa configuração na linha abaixo.
  app.set('trust proxy', 1);

  // caso um endereço não seja especificado, permitiremos acesso apenas a partir do localhost:3000, padrão do REACT.
  const FRONTEND_URL = process.env.ORIGIN || 'http://localhost:3000';

  // configurando CORS para aceitar apenas requisições de um lugar.
  // para deixar aberto à qualquer domínio pasta usar: app.use(cors());
  app.use(cors({
    origin: [FRONTEND_URL],
  }));

  // o logger faz console.logs automáticos, com o método, caminho e status da resposta.
  app.use(logger('dev'));

  // configuração para nosso servidor poder receber informações no formato JSON.
  app.use(json());
  app.use(urlencoded({extended: false}));
};