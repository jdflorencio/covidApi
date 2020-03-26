const router = require('express').Router()
const controller = require('./cidade.controller')

router.get('/cidade', async (req, res) => { await controller.findAll(req, res)})
router.get('/cidade/:id', async (req, res) => { await controller.findOne(req, res)})
router.post('/cidade', async (req, res) => { await controller.save(req, res)})
router.put('/cidade', async (req, res) => { await controller.update(req, res)})
router.delete('/cidade/:id', async(req, res) => { await controller.delete(req, res) })


module.exports = router
