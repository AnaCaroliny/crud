/**
 * Declaração de informações básicas para conexão com o banco de dados
 */
const MongoClient = require('mongodb').MongoClient

// URI de conexão com o banco
const uri = "mongodb://patrickisidoro:nuzor1539@ds133279.mlab.com:33279/crud-nodejs";

let _db;

module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect( uri,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('crud-nodejs');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};