
const { Sequelize, connection } = require('../../dao/connection')
const { Op } = Sequelize
const pessoaModel = require('../../dao/models/pessoa.model')
const prontuarioModel = require('../../dao/models/prontuario.model')
const cidadeModel = require('../../dao/models/cidade.model')
const helper = require('../pessoa/pessoa.helper')
const Promise = require('bluebird')
const casos = require('../../core/novoCaso')

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
					model: cidadeModel
				},
				{
					model: prontuarioModel
				}
			]
		})
	}

	async save(payload) {

		payload.situacao = 1
		payload.prontuario = {
			situacao: 1,
			data_hora: new Date()
		}

		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {
			let validPayload = helper.isValidCreate(payload)

			if (validPayload.error) {
				return Promise.reject({
					mensagem: "Dados de entrada inválidos, verifique os campos obrigatorios",
					error: validPayload.error.msg
				});
			}

			const pessoaBuild = pessoaModel.build(validPayload.value)
			const pessoaSaved = await pessoaBuild.save({ transaction })
			const { prontuario } = payload
			prontuario.pessoa_id = pessoaSaved.id

			Promise.resolve(prontuarioModel.create(prontuario, { transaction }),
				casos.novos(validPayload.value.cidade_id))
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
				mensagem: "Dados de entrada inválidos, verifique os campos obrigatorios",
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
			return pessoa

		} catch (error) {
			transaction.rollback()
			throw error
		}
	}

	async deleting(pessoaId) {
		await casos.delete(pessoaId)
		return await pessoaModel.destroy({ where: { id: pessoaId } })

	}

	async updateCidade(payload) {
		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		const { params, body } = payload
		const cidade = {
			id: params.id,
			nova: body.cidade_nova,
			uf_anterior: body.uf_anterior,
			situacao: body.situacao
		}


		try {
			const pessoa = await pessoaModel.update({ cidade_id: cidade.nova }, { where: { id: cidade.id } }, { transaction })
			casos.alterarCidade(cidade)
			transaction.commit()
			return pessoa

		} catch (error) {
			transaction.rollback()
			throw error
		}
	}

	async situacaoUpdate(payload) {
		const { params, body } = payload

		const prontuario_body = {
			pessoa_id: params.id,
			situacao: body.situacao
		}

		const situacao = {
			situacao: body.situacao,

		}


		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })


		let validPayload = helper.isValidSituacao(prontuario_body)

		if (validPayload.error) {
			return Promise.reject({
				mensagem: "Dados de entrada inválidos, verifique os campos obrigatorios",
				error: validPayload.error.msg
			});
		}

		try {
			const prontuario = await prontuarioModel.create(validPayload.value, { transaction })
			pessoaModel.update(situacao, { where: { id: prontuario_body.pessoa_id } }, { transaction })
			casos.atualizar(body)

			transaction.commit()

			return prontuario

		} catch (error) {


			transaction.rollback()
			throw error
		}
	}
}

let pessoa = new PessoaService();

module.exports = pessoa;