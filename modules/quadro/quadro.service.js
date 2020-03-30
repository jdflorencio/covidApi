//Validando as requisições de put e post
const { Sequelize, connection } = require('../../dao/connection')
const quadroModel = require('../../dao/models/quadro.model')

class QuadroService {

	async findAll() {
		return await quadroModel.findAll({
			limit: 10,
			order: [
				['id', 'DESC']
			]
		})
	}

	async save() {
		
	}
}

let quadro = new QuadroService();

module.exports = quadro;