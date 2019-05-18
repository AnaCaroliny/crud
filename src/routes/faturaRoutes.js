const ObjectId = require('mongodb').ObjectID

module.exports = (app, db) => {

    /**
     * Rota principal de listagem de faturas
     */
    app.route('/').get((req, res) => {
        db.collection('data').find().toArray((err, results) => {
            if (err) 
            return console.log(err)
            res.render('fatura/listar.ejs', { data: results })
        })
    })

    /**
     * Rota de cadastro de informações da fatura
     */
    app.route('/cadastrar')
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

    /**
     * Rota responsável pela edição da fatura de {id} informado
     */
    app.route('editar/:id')
        .get((req, res) => {
        var id = req.params.id

        db.collection('data').find(ObjectId(id)).toArray((err, result) => {
            if (err) {
                console.log('caiu é no erro bixo');
                return res.send(err);
            }
                

            res.render('fatura/editar.ejs', { data: result });
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

    /**
     * Rota responsável por deletar a fatura informada
     */
    app.route('/delete/:id')
        .get((req, res) => {
        var id = req.params.id

        db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
                if (err) return res.send(500, err)
                console.log('Deletado do Banco de Dados!')
                res.redirect('/')
            })
    })

};