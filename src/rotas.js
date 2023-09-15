const { Router } = require('express')
const { cadastrar, enviarEmail } = require('./controladores/newsletter')
const verificaCadastrar = require('./intermediario/verificaNewsletter')

const rotas = Router()


rotas.post('/cadastrar', verificaCadastrar, cadastrar)
rotas.post('/email', enviarEmail)

module.exports = rotas
