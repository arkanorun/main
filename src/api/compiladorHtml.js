const fs = require('fs/promises')
const handlebars = require('handlebars')

const compiladorHtml = async (caminhoArquivo, contexto) => {
    const arquivo = await fs.readFile(caminhoArquivo)
    const compilador = handlebars.compile(arquivo.toString())
    const htmlString = compilador(contexto)
    return htmlString
}


module.exports = compiladorHtml