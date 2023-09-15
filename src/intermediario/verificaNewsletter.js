const knex = require('../conexão')


const verificaCadastrar = async (req, res, next) => {
    const { nome, email } = req.body
    try {

        if (!nome || !email) {
            return res.status(403).json({ mensagem: "os dados nome e email são obrigatórios " })
        }

        const buscaEmail = await knex('usuario').where('email', email)

        if (buscaEmail.length > 0) {
            return res.status(400).json({ mensagem: "já existe um email cadastrado" })
        }

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

    next()
}

module.exports = verificaCadastrar