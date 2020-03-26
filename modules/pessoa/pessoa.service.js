//Validando as requisições de put e postconst { Sequelize, connection } = require('../../dao/connection')
// const { Op } = Sequelize
// const pessoaModel = require('../../dao/models/pessoa.model')
// const enderecoModel = require('../../dao/models/endereco.model')
// const telefoneModel = require('../../dao/models/telefone.model')
// const helper = require('../pessoa/pessoa.helper')


// const Promise = require('bluebird');

class PessoaService {

	async findAll() {
		return `retorno de todas as pessoas`
	}

	async findById(pessoaId) {
        return `consulta de pessoa ok! ${pessoaId} `	
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