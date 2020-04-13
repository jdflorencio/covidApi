const { Sequelize } = require('../dao/connection')
const QuadroService = require('../modules/quadro/quadro.service')
const cidadeModel = require('../dao/models/cidade.model')
const pessoaModel = require('../dao/models/pessoa.model')
class Casos {
    constructor() {
        this.table = {
            1: "caso_suspeito",
            2: "caso_analise",
            3: "caso_confirmado",
            4: "caso_descartado",
        }
    }

    async novos(cidadeId) {
        const cidade = await cidadeModel.findByPk(cidadeId)
        const quadroUf = await QuadroService.consultar(cidade.uf)
        const uf = cidade.uf

        const state = {
            uf,
            caso_suspeito: 1
        }

        if (quadroUf) {

            state.caso_suspeito = quadroUf.caso_suspeito + 1
            return await QuadroService.update(state)
        }

        return await QuadroService.insert(state)
    }

    async atualizar(payload) {

        const { situacao, anterior, uf } = payload

        const quadro = await QuadroService.consultar(uf)

        const atualizar = {}

        atualizar.uf = uf
        atualizar[this.table[situacao]] = quadro[this.table[situacao]] + 1
        atualizar[this.table[anterior]] = quadro[this.table[anterior]] - 1

        await QuadroService.update(atualizar)

        return true
    }

    async alterarCidade(payload) {


        const cidade_nova = await cidadeModel.findByPk(payload.nova)
        const quadro = await QuadroService.quadroAll()

        let decrementar = {}
        let atualizar = {}

        quadro.map(row => {
            if (row.uf == cidade_nova.uf) {
                atualizar = row.dataValues                    
                
            } else if (row.uf == payload.uf_anterior) {
                decrementar = row.dataValues
            }

        })
        
        decrementar[this.table[payload.situacao]] -= 1
        
        QuadroService.update(decrementar)

        if (!atualizar.uf) {
            atualizar.uf = cidade_nova.uf
            atualizar[this.table[payload.situacao]] = 1

            QuadroService.insert(atualizar)

            return true
        }

        atualizar[this.table[payload.situacao]] += 1

        QuadroService.update(atualizar)

        return true

    }

    async delete(id) {
        const pessoa = await pessoaModel.findByPk(id, {
            include: [
                {
                    model: cidadeModel
                }
            ]
        })

        const quadro = await QuadroService.consultar(pessoa.cidade.uf)
        const atualizar = {}

        atualizar.uf = pessoa.cidade.uf
        atualizar[this.table[pessoa.situacao]] = quadro[this.table[pessoa.situacao]] - 1
        await QuadroService.update(atualizar)
        return true
    }



    async cidade(cidade_id, ufAnterior, ufAtual) {

        const quadro_uf_anterior = await QuadroService.consultar(ufAnterior)
        const quadro_uf_atual = await QuadroService.consultar(ufAtual)

        const pessoa = await pessoaModel.findAll({
            where: {
                cidade_id: cidade_id
            },
            attributes: [
                'situacao',
                [Sequelize.fn('count', Sequelize.col('id')), 'total']
            ],
            group: ['situacao']
        })

        const atualizar = {}


        pessoa.map(status => {
            atualizar[this.table[status.dataValues.situacao]] = status.dataValues.total

        })

        quadro_uf_anterior.dataValues.caso_suspeito = Number.isInteger(quadro_uf_anterior.dataValues.caso_suspeito) ?
            quadro_uf_anterior.dataValues.caso_suspeito - atualizar.caso_suspeito : 0

        quadro_uf_anterior.dataValues.caso_analise = Number.isInteger(quadro_uf_anterior.dataValues.caso_analise) ?
            quadro_uf_anterior.dataValues.caso_analise - atualizar.caso_analise : 0

        quadro_uf_anterior.dataValues.caso_confirmado = Number.isInteger(quadro_uf_anterior.dataValues.caso_confirmado) ?
            quadro_uf_anterior.dataValues.caso_confirmado - atualizar.caso_confirmado : 0

        quadro_uf_anterior.dataValues.caso_descartado = Number.isInteger(quadro_uf_anterior.dataValues.caso_descartado) ?
            quadro_uf_anterior.dataValues.caso_descartado - atualizar.caso_descartado : 0


        await QuadroService.update(quadro_uf_anterior.dataValues)

        if (!quadro_uf_atual) {
            atualizar.uf = ufAtual

            await QuadroService.insert(atualizar)
            return true
        }

        quadro_uf_atual.dataValues.caso_suspeito = Number.isInteger(quadro_uf_atual.dataValues.caso_suspeito) ?
            quadro_uf_atual.dataValues.caso_suspeito + atualizar.caso_suspeito : 0

        quadro_uf_atual.dataValues.caso_analise = Number.isInteger(quadro_uf_atual.dataValues.caso_analise) ?
            quadro_uf_atual.dataValues.caso_analise + atualizar.caso_analise : 0

        quadro_uf_atual.dataValues.caso_confirmado = Number.isInteger(quadro_uf_atual.dataValues.caso_confirmado) ?
            quadro_uf_atual.dataValues.caso_confirmado + atualizar.caso_confirmado : 0

        quadro_uf_atual.dataValues.caso_descartado = Number.isInteger(quadro_uf_atual.dataValues.caso_descartado) ?
            quadro_uf_atual.dataValues.caso_descartado + atualizar.caso_descartado : 0


        await QuadroService.update(quadro_uf_atual.dataValues)
        return true
    }
}

const casos = new Casos
module.exports = casos