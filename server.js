
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb://patrickisidoro:nuzor1539@ds133279.mlab.com:33279/crud-nodejs";

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db('crud-nodejs')

  app.listen(3001, () => {
    console.log('Server running on port 3001')
  })
})

//Tipo de template engine
app.set('view engine', 'ejs')

app.route('/')
.get((req, res) => {
  db.collection('data').find().toArray((err, results) => {
    if (err) 
      return console.log(err)
    res.render('fatura/listar.ejs', { data: results })
  })
})

app.route('/cadastrar') //setado a rota, e abaixo as ações a serem tomadas dentro desta rota
  .get(function(req, res) {
    const cursor = db.collection('data').find()
    res.render('index.ejs')
})
.post((req, res) => {
  console.log(req.body);

  db.collection('data').save(req.body, (err, result) => {
    if (err) 
      return console.log(err)

    console.log('Salvo no Banco de Dados')
    res.redirect('/')
  })
})

app.route('editar/:id')
.get((req, res) => {
  var id = req.params.id

  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('fatura/editar.ejs', { data: result })
  })
})
.post((req, res) => {
  var id = req.params.id
  var name = req.body.name
  var surname = req.body.surname

  db.collection('data').updateOne({_id: ObjectId(id)}, {
    $set: {
      name: name,
      surname: surname
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/')
    console.log('Atualizado no Banco de Dados')
  })
})

app.route('/delete/:id')
.get((req, res) => {
  var id = req.params.id

  db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/')
  })
})