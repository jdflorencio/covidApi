const { Sequelize, connection } = require('../../dao/connection')
const { Op } = Sequelize
const cidadeModel = require('../../dao/models/cidade.model')
const helper = require('../cidade/cidade.helper')
const Promise = require('bluebird');

class CidadeService {

	async findAll() {
		return await cidadeModel.findAll()
	}

	async findById(cidadeId) {
        return await cidadeModel.findByPk(cidadeId)
    }

	async findData(data) {

		return await cidadeModel.findAll({
			where: {
				[Op.or]:[
					{
						nome: {
							[Op.substring]: data
						}
					},
					{
						id: data
					},
					{
						uf: data
					}
				]
			}
		})
	}

	async save(payload) {
		// const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {
			return `cidade foi criada com sucesso`
		} catch (error) {

			// transaction.rollback()
			throw error
		}
	}

	async update(payload) {

		let validPayload = helper.isValidUpdate(payload)

		if (validPayload.error) {
			return Promise.reject({
				message: "Dados de entrada inválidos, verifique os campos obrigatorios",
				error: validPayload.error.msg
			});
		}

		let cidade = await cidadeModel.findByPk(validPayload.value.id)

		if (!cidade) {
			return Promise.reject({
				message: "Cidade não encontrada.",
				error: ["Cidade não encontrada"]
			})
		}

		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {
			await cidadeModel.update(validPayload.value, { where: { id: cidade.id}}, {transaction})		
		} catch (error) {
			transaction.rollback()
			throw error
		}
	}

	async deleting(cidadeId) {
		return `cidade deletada ${cidadeId}`
	}
}

let cidade = new CidadeService();

module.exports = cidade;