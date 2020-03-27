//Validando as requisições de put e post
const { Sequelize, connection } = require('../../dao/connection')
const { Op } = Sequelize
const quadroModel = require('../../dao/models/quadro.model')

// const helper = require('../quadro/quadro.helper')


// const Promise = require('bluebird');

class QuadroService {

	async findAll() {
		return await quadroModel.findAll({
			limit: 10
		})
	}
}

let quadro = 
new QuadroService();

module.exports = quadro;