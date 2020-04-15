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

        if (cidade_nova.uf == payload.uf_anterior) {
            return true
        }

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
        const total = (quadro.caso_suspeito + quadro.caso_analise + quadro.caso_confirmado + quadro.caso_descartado) - 1
        if (total <= 0) {
            QuadroService.delete(pessoa.cidade.uf)
            return true
        }

        const atualizar = {}

        atualizar.uf = pessoa.cidade.uf
        atualizar[this.table[pessoa.situacao]] = quadro[this.table[pessoa.situacao]] - 1
        await QuadroService.update(atualizar)
        return true
    }

    async cidade(cidade_id, ufAnterior, ufAtual) {

        const quadro_uf_anterior = await QuadroService.consultar(ufAnterior)
        const quadro_uf_atual = await QuadroService.consultar(ufAtual)

        const linha_anterior = {}
        const linha_nova = {}

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

        if (quadro_uf_anterior) {
            
            linha_anterior.uf = quadro_uf_anterior.uf
            linha_anterior.caso_suspeito = quadro_uf_anterior.caso_suspeito || 0
            linha_anterior.caso_analise = quadro_uf_anterior.caso_analise || 0
            linha_anterior.caso_confirmado = quadro_uf_anterior.caso_confirmado || 0
            linha_anterior.caso_descartado = quadro_uf_anterior.caso_descartado || 0

            linha_anterior.caso_suspeito = typeof atualizar.caso_suspeito == 'number' && linha_anterior.caso_suspeito > 0 ?
                linha_anterior.caso_suspeito - atualizar.caso_suspeito : linha_anterior.caso_suspeito

            linha_anterior.caso_analise = typeof atualizar.caso_analise == 'number' && linha_anterior.caso_analise > 0 ?
                linha_anterior.caso_analise - atualizar.caso_analise : linha_anterior.caso_analise

            linha_anterior.caso_confirmado = typeof atualizar.caso_confirmado == 'number' && linha_anterior.caso_confirmado > 0 ?
                linha_anterior.caso_confirmado - atualizar.caso_confirmado : linha_anterior.caso_confirmado

            linha_anterior.caso_descartado = typeof atualizar.caso_descartado == 'number' && linha_anterior.caso_descartado > 0 ?
                linha_anterior.caso_descartado - atualizar.caso_descartado : linha_anterior.caso_descartado

            const totalAnterior = (
                linha_anterior.caso_analise
                + linha_anterior.caso_suspeito
                + linha_anterior.caso_confirmado
                + linha_anterior.caso_descartado)
                - 1

            if (totalAnterior >= 0) {
                QuadroService.update(linha_anterior)
            } else {
                QuadroService.delete(linha_anterior.uf)


            }
        }


        if (!quadro_uf_atual) {
            atualizar.uf = ufAtual

            await QuadroService.insert(atualizar)
            return true
        }
        
        linha_nova.uf = quadro_uf_atual.uf
        linha_nova.caso_suspeito = quadro_uf_atual.caso_suspeito || 0
        linha_nova.caso_analise = quadro_uf_atual.caso_analise || 0
        linha_nova.caso_confirmado = quadro_uf_atual.caso_confirmado || 0
        linha_nova.caso_descartado = quadro_uf_atual.caso_descartado || 0


        linha_nova.caso_suspeito = typeof atualizar.caso_suspeito == "number" && atualizar.caso_suspeito > 0 ?
            linha_nova.caso_suspeito + atualizar.caso_suspeito : linha_nova.caso_suspeito

        linha_nova.caso_analise = typeof atualizar.caso_analise == "number" && atualizar.caso_analise > 0 ?
            linha_nova.caso_analise + atualizar.caso_analise : linha_nova.caso_analise

        linha_nova.caso_confirmado = typeof atualizar.caso_confirmado == "number" && atualizar.caso_confirmado > 0 ?
            linha_nova.caso_confirmado + atualizar.caso_confirmado : linha_nova.caso_confirmado

        linha_nova.caso_descartado = typeof atualizar.caso_descartado == "number" && atualizar.caso_descartado > 0 ?
            linha_nova.caso_descartado + atualizar.caso_descartado : linha_nova.caso_descartado


        await QuadroService.update(linha_nova)
        return true
    }
}

const casos = new Casos
module.exports = casos