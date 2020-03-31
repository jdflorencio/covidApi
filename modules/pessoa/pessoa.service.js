
const { Sequelize, connection } = require('../../dao/connection')
const { Op } = Sequelize
const pessoaModel = require('../../dao/models/pessoa.model')
const prontuarioModel = require('../../dao/models/prontuario.model')
const cidadeModel = require('../../dao/models/cidade.model')
const helper = require('../pessoa/pessoa.helper')
const Promise = require('bluebird')

class PessoaService {

	async findAll() {
		return await pessoaModel.findAll({
			include: [
				{
					model: cidadeModel,
					attributes: ['nome', 'uf']
				}
			],
		})
	}

	async findById(pessoaId) {
		return await pessoaModel.findByPk(pessoaId, {
			include: [
				{
					model: cidadeModel,
					attributes: {
						exclude: ['createdAt', 'updatedAt']
					}
				},
				{
					model: prontuarioModel
				}
			],
			attributes: {
				exclude: ['createdAt', 'updatedAt']
			}
		})
	}

	async findData(data) {
		return `retorno consultar lista de pessoas com sucesso! ${data}`
	}

	async save(payload) {
		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {
			let validPayload = helper.isValidCreate(payload)

			if (validPayload.error) {
				return Promise.reject({
					message: "Dados de entrada inválidos, verifique os campos obrigatorios",
					error: validPayload.error.msg
				});
			}

			const pessoaBuild = pessoaModel.build(validPayload.value)
			const pessoaSaved = await pessoaBuild.save({ transaction })
			const { prontuario } = payload
			prontuario.pessoa_id = pessoaSaved.id

			Promise.resolve(prontuarioModel.create(prontuario, { transaction }))
				.then(() => {
					transaction.commit()
				})
				.catch(error => {
					transaction.rollback()
					throw error
				})
			return pessoaSaved.id



		} catch (error) {
			transaction.rollback()
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

		let pessoa = await pessoaModel.findByPk(validPayload.value.id)

		if (!pessoa) {
			return Promise.reject({
				message: "Pessoa não encontrada.",
			})
		}

		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {
			const pessoaUpdated = await pessoaModel.update(validPayload.value, { where: { id: pessoa.id } }, { transaction })
			transaction.commit()
			return pessoaUpdated

		} catch (error) {
			transaction.rollback()
			throw error
		}
	}

	async deleting(pessoaId) {
		return `pessoa deletada ${pessoaId}`
	}

	async updateCidade() {

	}

	async findAllSituacoes() {
		return [
			{situacao:1, descricao: "Suspeito"},
			{situacao:2, descricao: "Em Análise"},
			{situacao:3, descricao: "Confirmado"},
			{situacao:4, descricao: "Descartado"},

		]
	}

	async situacaoUpdate(payload) {
		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		let validPayload = helper.isValidSituacao(payload)

		if (validPayload.error) {
			return Promise.reject({
				message: "Dados de entrada inválidos, verifique os campos obrigatorios",
				error: validPayload.error.msg
			});
		}

		try {
			await prontuarioModel.create(validPayload.value, { transaction })

		} catch (error) {
			throw error
		}
	}
}

let pessoa = new PessoaService();

module.exports = pessoa;