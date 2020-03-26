const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const rotaPessoa = require('./modules/pessoa/pessoa.router')
const rotaCidade = require('./modules/cidade/cidade.router')
const rotaQuadro = require('./modules/quadro/quadro.router')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', rotaPessoa)
app.use('/api', rotaCidade)
app.use('/api', rotaQuadro)

app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada')
    erro.status = 404
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            msg: error.message
        }
    })
})


module.exports = app;