const compiladorHtml = require('../api/compiladorHtml')
const knex = require('../conexão')
const transportador = require('../email')

// const buscaNome = async (destinatario) => {
//     destinatario = destinatario.toString()
//     const busca = await knex('usuario').select("nome")//.first().where({ nome: destinatario })
//     return busca
// }

const cadastrar = async (req, res) => {
    const { nome, email } = req.body

    try {
        const cadastrarUsuario = await knex.from('usuario').insert({ nome, email }).returning("*")

        return res.json(cadastrarUsuario)

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}
const enviarEmail = async (req, res) => {
    const { texto } = req.body
    let destinatariosNome = []
    let destinatariosEmail = []

    const remetente = {
        nome: "ton",
        email: "arkanorun@gmail.com"
    }

    try {

        const busca = await knex('usuario')

        const html = await compiladorHtml('./src/templates/newsletter.html', {
            texto
        })
        for (let i in busca) {
            transportador.sendMail({
                from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}`,
                to: `${busca[i].nome} <${busca[i].email}>`,
                subject: `acho que consegui fazer o exercício de envio de E-mail da cubos academy 
                ${busca[i].nome} :)`,
                //text: `${texto}`
                html
            })
        }
        return res.json({ mensagem: "tentativa de envio de email realizada" })

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}




module.exports = { cadastrar, enviarEmail }