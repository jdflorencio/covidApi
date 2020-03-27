
const { Sequelize, connection } = require('../../dao/connection')
const { Op } = Sequelize
const pessoaModel = require('../../dao/models/pessoa.model')
// const helper = require('../pessoa/pessoa.helper')
// const Promise = require('bluebird');

class PessoaService {

	async findAll() {
		return await pessoaModel.findAll()
	}

	async findById(pessoaId) {
        return await pessoaModel.findByPk(pessoaId)
    }

	async findData(data) {
		return `retorno consultar lista de pessoas com sucesso! ${data}`
	}

	async save(payload) {
		// const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {
			return `pessoa foi criada com sucesso`
		} catch (error) {

			// transaction.rollback()
			throw error
		}
	}

	async update(payload) {

		// let validPayload = helper.isValidUpdate(payload)

		// if (validPayload.error) {
		// 	return Promise.reject({
		// 		message: "Dados de entrada inválidos, verifique os campos obrigatorios",
		// 		error: validPayload.error.msg
		// 	});
		// }

		// let pessoa = await pessoaModel.findByPk(validPayload.value.id)

		// if (!pessoa) {
		// 	return Promise.reject({
		// 		message: "Pessoa não encontrada.",
		// 		error: ["Pessoa não encontrada"]
		// 	})
		// }

		// const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {
            return `Atualida a pessoa ${payload}`
	

		} catch (error) {
			
			return { status: 400, error }
		}
	}

	async deleting(pessoaId) {
		return `pessoa deletada ${pessoaId}`
	}
}

let pessoa = new PessoaService();

module.exports = pessoa;