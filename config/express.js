/**
 * Declaração de informações básicas para configuração do express
 */
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

module.exports = app;