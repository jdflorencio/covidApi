const { Sequelize, connection } = require('../../dao/connection')
const { Op } = Sequelize
const cidadeModel = require('../../dao/models/cidade.model')
const helper = require('../cidade/cidade.helper')
const casos= require('../../core/novoCaso')
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
				[Op.or]: [
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
		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {

			let validPayload = helper.isValidCreate(payload)
			if (validPayload.error) {
				return Promise.reject({
					mensagem: "Dados de entrada inválidos, verifique os campos obrigatorios",
					error: validPayload.error.msg
				});
			}

			const cidadeBuild = cidadeModel.build(validPayload.value)
			const cidade = await cidadeBuild.save({ transaction })

			transaction.commit()
			return cidade.id

		} catch (error) {
			transaction.rollback()
			throw error
		}
	}

	async update(payload) {

		let validPayload = helper.isValidUpdate(payload)

		if (validPayload.error) {
			return Promise.reject({
				mensagem: "Dados de entrada inválidos, verifique os campos obrigatorios",
				error: validPayload.error.msg
			});
		}

		let cidade = await cidadeModel.findByPk(validPayload.value.id)

		if (!cidade) {
			return Promise.reject({
				mensagem: "Cidade não encontrada."
			})
		}

		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {
			await cidadeModel.update(validPayload.value, { where: { id: cidade.id } }, { transaction })
			
			Promise.resolve(casos.alterar_uf(cidade.id, cidade.uf, validPayload.value.uf)).then(() => {
				transaction.commit()
			})
			.catch( error => {
				transaction.rollback()
				throw error
			})

			

		} catch (error) {
			transaction.rollback()
			throw error
		}
	}

	async deleting(cidadeId) {
		try {
			return await cidadeModel.destroy({ where: { id: cidadeId } })
		} catch (error) {
			if(error.fields) {
				 throw {mensagem: "não é possível excluir esta cidade pois existem pessoas associadas à mesma."}
			}else {
				throw error
			}
			
		}
	}
}

let cidade = new CidadeService();

module.exports = cidade;