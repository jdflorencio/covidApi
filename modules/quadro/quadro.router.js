const router = require('express').Router()
const controller = require('./quadro.controller')

router.get('/quadro', async (req, res) => { await controller.findAll(req, res)})
router.get('/quadro/:id', async (req, res) => { await controller.findOne(req, res)})
router.post('/quadro', async (req, res) => { await controller.save(req, res)})
router.put('/quadro', async (req, res) => { await controller.update(req, res)})
router.delete('/quadro/:id', async(req, res) => { await controller.delete(req, res) })


module.exports = router
