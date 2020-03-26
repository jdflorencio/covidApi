const router = require('express').Router()
const controller = require('./pessoa.controller')

router.get('/pessoa', async (req, res) => { await controller.findAll(req, res)})
router.get('/pessoa/:id', async (req, res) => { await controller.findOne(req, res)})
router.post('/pessoa', async (req, res) => { await controller.save(req, res)})
router.put('/pessoa', async (req, res) => { await controller.update(req, res)})
router.delete('/pessoa/:id', async(req, res) => { await controller.delete(req, res) })


module.exports = router
