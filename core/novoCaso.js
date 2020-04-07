const { Sequelize } = require('../dao/connection')
const  QuadroService = require( '../modules/quadro/quadro.service')
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

    async atualizar(teste) {
        QuadroService.insertQuadro()
    }

    async cidade(cidade_id, ufAnterior, ufAtual) {

        const quadroUf = await QuadroService.consultar(ufAnterior)

        if (!quadroUf) {
            return true
        }

        const pessoa =  await pessoaModel.findAll({
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
            caso_suspeito: 0, 
            caso_analise: 0,
            caso_confirmado: 0, 
            caso_descartado: 0
        }
   
        pessoa.forEach( status => {

             switch(status.dataValues.situacao) {
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

        quadroUf.caso_suspeito = 40
        quadroUf.caso_suspeito -= payload.caso_suspeito
        quadroUf.caso_analise -= payload.caso_analise
        quadroUf.caso_confirmado -= payload.caso_confirmado
        quadroUf.caso_descartado -= payload.caso_descartado

        await QuadroService.update(quadroUf)

        

    }

}

const casos = new Casos
module.exports = casos