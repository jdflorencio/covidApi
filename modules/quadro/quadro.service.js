
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

		const pessoa = await pessoaModel.findAll({

			include: [
				{
					model: cidadeModel,

				},
			],
			attributes: [
				[Sequelize.fn('count', Sequelize.col('cidade_id')), 'count']
			],

			group: ['cidade_id']

		})

		// const prontuario = await prontuarioModel.findAll({
		// 	attributes: [

		// 		[Sequelize.fn('count', Sequelize.col('situacao')), 'situacaoTotal']
		// 	], 
		// 	include: [
		// 		{ 
		// 			model: pessoaModel

		// 		}
		// 	],
		// 	group: ['pessoa_id']

		// })


		return {
			geral, pessoa
		}

	}

	async getQuadroCidade() {

	}

	async save() {





	}
}

let quadro = new QuadroService();

module.exports = quadro;