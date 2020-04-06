
const { Sequelize, connection } = require('../../dao/connection')
const quadroModel = require('../../dao/models/quadro.model')
const cidadeModel = require('.././../dao/models/cidade.model')
const pessoaModel = require('../../dao/models/pessoa.model')
const prontuarioModel = require('../../dao/models/prontuario.model')

class QuadroService {

	async findAll() {
		const geral = await quadroModel.findAll({
			limit: 10,
			order: [
				['id', 'DESC']
			]
		})

		const cidade = await connection.query("select cidade_id, count(distinct case when situacao = 1 then pessoa.id end ) as suspeito, count(distinct case when situacao = 2 then pessoa.id end ) as analise, count(distinct case when situacao = '3' then pessoa.id end) as confirmado, count(distinct case when situacao = 4 then pessoa.id end ) as descartado, cidade.nome, cidade.uf  from pessoa inner join cidade on pessoa.cidade_id = cidade.id group by cidade_id")
		return {
			geral, cidade
		}
	}
}

let quadro = new QuadroService();

module.exports = quadro;