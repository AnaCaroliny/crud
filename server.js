const app = require('./config/express');
const mongoUtil = require('./config/mongo-util');

const faturaRoutes = require('./src/routes/faturaRoutes');

// Porta utilizada para a execução.
const port = 3001;

// Tipo de template engine
app.set('view engine', 'ejs')

// Realiza a conexão com o banco a partir do utilitário definido
mongoUtil.connectToServer( function( err, client ) {

  if (err) 
    console.log('Erro ao realizar conexão com banco: ', err);

  app.listen(port, () => {
    console.log(`Server running on port: ${port}.`);
  })

  const db = mongoUtil.getDb();

  // Declaração das rotas de fatura
  faturaRoutes(app, db);
} );