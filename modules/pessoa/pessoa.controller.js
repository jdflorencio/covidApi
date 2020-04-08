const pessoaService = require('./pessoa.service')
const Response = require('../../core/response')

class PessoaController {
	constructor() {
		this.service = pessoaService
	}

	async save(req, res) {
		try {
			const result = await this.service.save(req.body);
			new Response(res).success(result)

		} catch (error) {
			new Response(res).preConditionFailed(error)
		}
	}

	async update(req, res) {
		try {
			const result = await this.service.update(req.body);
			new Response(res).success(result)

		} catch (error) {
			console.log(error)
			new Response(res).preConditionFailed(error)
		}
	}

	async findOne(req, res) {
		try {
			const result = await this.service.findById(+req.params.id);
			new Response(res).success(result)

		} catch (error) {
			new Response(res).preConditionFailed(error)
		}
	}

	async findAll(req, res) {
		try {
			const result = await this.service.findAll()
			new Response(res).success(result)

		} catch (error) {
			new Response(res).preConditionFailed(error)
		}
	}

	async updateCidade(req, res) {
		try {
			const result = await this.service.updateCidade(req)
			new Response(res).success(result)

		} catch (error) {
			new Response(res).preConditionFailed(error)
		}
	}

	async situacaoUpdate(req, res) {
		try {
			const result = await this.service.situacaoUpdate(req)
			new Response(res).success(result)

		} catch (error) {
			new Response(res).preConditionFailed(error)
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			const deletado = await this.service.deleting(id)
			new Response(res).success(deletado, `${deletado} removido Com sucesso!`)

		} catch (error) {
			new Response(res).preConditionFailed(error)
		}
	}
}

let pessoa = new PessoaController();
module.exports = pessoa;