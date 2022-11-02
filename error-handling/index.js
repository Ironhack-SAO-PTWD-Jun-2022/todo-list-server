const handleError = (app) => {
  // este middleware executa quando uma requisição não for disponível.
  app.use((req, res, next) => {
    res.status(404).json('Não encontrado!');
  })

  // este middleware executa quando chamamos next(error) nas rotas anteriores.
  app.use((error, req, res, next) => {

    // vamos fazer um log do erro:
    console.log('ERRO!', req.method, req.path, error);

    // só enviamos a resposta se já não tiver sido enviada antes.
    if(!res.headersSent) {
      res.status(error.status || 500).json({
        message: error.message || 'Erro interno no servidor',
        error
      });
    };
  })
}

module.exports = handleError;