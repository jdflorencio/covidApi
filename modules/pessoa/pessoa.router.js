const router = require('express').Router()
const controller = require('./pessoa.controller')

//PESSOA
router.get('/pessoa', async (req, res) => { await controller.findAll(req, res)})
router.get('/pessoa', async (req, res) => { await controller.findAll(req, res)})
router.get('/pessoa/:id', async (req, res) => { await controller.findOne(req, res)})
router.post('/pessoa', async (req, res) => { await controller.save(req, res)})
router.put('/pessoa/:id', async (req, res) => { await controller.update(req, res)})
router.delete('/pessoa/:id', async (req, res) => { await controller.delete(req, res) })

//CIDADE
router.put('/pessoa/:id/cidade', async (req, res) => { await controller.updateCidade(req, res)})

//SITUACAO
router.get('/pessoa/:id/situacao', async (req, res) => { await controller.situacaoAll(req, res)})
router.put('/pessoa/:id/situacao', async (req, res) => { await controller.situacaoUpdate(req, res)})

module.exports = router
