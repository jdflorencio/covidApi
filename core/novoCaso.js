const { Sequelize } = require('../dao/connection')
const QuadroService = require('../modules/quadro/quadro.service')
const cidadeModel = require('../dao/models/cidade.model')
const pessoaModel = require('../dao/models/pessoa.model')
class Casos {

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

        const table = {
            1: "caso_suspeito",
            2: "caso_analise",
            3: "caso_confirmado",
            4: "caso_descartado",
        }
        const atualizar = {}

        console.log('teste')

        atualizar.uf = uf
        atualizar[table[situacao]] = quadro[table[situacao]] + 1
        atualizar[table[anterior]] = quadro[table[anterior]] - 1   

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

        const payload = {
            uf: ufAtual,
            caso_suspeito: 0,
            caso_analise: 0,
            caso_confirmado: 0,
            caso_descartado: 0

        }

        pessoa.forEach(status => {

            switch (status.dataValues.situacao) {
                case 1:
                    payload.caso_suspeito = status.dataValues.total
                    break
                case 2:
                    payload.caso_analise = status.dataValues.total
                    break
                case 3:
                    payload.caso_confirmado = status.dataValues.total
                    break
                case 4:
                    payload.caso_descartado = status.dataValues.total
                    break

            }
        })

        if (!quadro_uf_atual & !quadro_uf_anterior) {
            await QuadroService.insert(payload)
            return true
        }

        const estadoAnterior = {
            uf: ufAnterior,
            caso_suspeito: quadro_uf_anterior.dataValues.caso_suspeito,
            caso_analise: quadro_uf_anterior.dataValues.caso_analise,
            caso_confirmado: quadro_uf_anterior.dataValues.caso_confirmado,
            caso_descartado: quadro_uf_anterior.dataValues.caso_descartado,

        }

        if (!quadro_uf_atual) {

            await QuadroService.insert(payload)
            return true
        }
        estadoAnterior.caso_suspeito -= payload.caso_suspeito
        estadoAnterior.caso_analise -= payload.caso_analise
        estadoAnterior.caso_confirmado -= payload.caso_confirmado
        estadoAnterior.caso_descartado -= payload.caso_descartado

        await QuadroService.update(estadoAnterior)
        const atualizado = await QuadroService.consultar(ufAtual)

        payload.caso_suspeito += atualizado.caso_suspeito
        payload.caso_analise += atualizado.caso_analise
        payload.caso_confirmado += atualizado.caso_confirmado
        payload.caso_descartado += atualizado.caso_descartado


        await QuadroService.update(payload)
    }
}

const casos = new Casos
module.exports = casos