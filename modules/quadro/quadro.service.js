//Validando as requisições de put e postconst { Sequelize, connection } = require('../../dao/connection')
// const { Op } = Sequelize
// const quadroModel = require('../../dao/models/quadro.model')
// const enderecoModel = require('../../dao/models/endereco.model')
// const telefoneModel = require('../../dao/models/telefone.model')
// const helper = require('../quadro/quadro.helper')


// const Promise = require('bluebird');

class QuadroService {

	async findAll() {
		return `retorno de todas as quadros`
	}

	async findById(quadroId) {
        return `consulta de quadro ok! ${quadroId} `	
    }

	async findData(data) {
		return `retorno consultar lista de quadros com sucesso! ${data}`
	}

	async save(payload) {
		// const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {
			return `quadro foi criada com sucesso`
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

		// let quadro = await quadroModel.findByPk(validPayload.value.id)

		// if (!quadro) {
		// 	return Promise.reject({
		// 		message: "Quadro não encontrada.",
		// 		error: ["Quadro não encontrada"]
		// 	})
		// }

		// const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {
            return `Atualida a quadro ${payload}`
	

		} catch (error) {
			
			return { status: 400, error }
		}
	}

	async deleting(quadroId) {
		return `quadro deletada ${quadroId}`
	}
}

let quadro = new QuadroService();

module.exports = quadro;