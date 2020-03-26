const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

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