
const { Sequelize, connection } = require('../../dao/connection')
const quadroModel = require('../../dao/models/quadro.model')

class QuadroService {

	async findAll() {
		const geral = await quadroModel.findAll({
		})


		const cidade = await connection.query(`SELECT cidade_id, 
				COUNT(DISTINCT CASE WHEN situacao = 1 THEN pessoa.id END ) AS suspeito,
				COUNT(DISTINCT CASE WHEN situacao = 2 THEN pessoa.id END ) AS analise, 
				COUNT(DISTINCT CASE WHEN situacao = '3' THEN pessoa.id END) AS confirmado, 
				COUNT(DISTINCT CASE WHEN situacao = 4 THEN pessoa.id END ) AS descartado, 
				cidade.nome, cidade.uf  
			FROM pessoa 
			INNER JOIN cidade 
			ON pessoa.cidade_id = cidade.id 
			GROUP BY cidade_id`)
		return {
			geral, cidade
		}
	}

	async insert(payload) {
		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })
		try {		
		
			const quadroBuild = quadroModel.build(payload)					
			const quadrado = await quadroBuild.save({ transaction })

			transaction.commit()
			return quadrado

		} catch (error) {
			transaction.rollback()
			throw error

		}
	}

	async update(payload) {


		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })
		try{
			
			const quadro = await quadroModel.update(payload, {
				where: {uf: payload.uf}
			}, {transaction})

			transaction.commit()

			return quadro

		} catch(error) {
			transaction.rollback()
			throw error
		}
	}

	async consultar(uf) {
		return await quadroModel.findOne({
			where : {uf}
		 })
	}
}





let quadro = new QuadroService();

module.exports = quadro;