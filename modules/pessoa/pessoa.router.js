const router = require('express').Router()
const controller = require('./pessoa.controller')

router.get('/pessoa', async (req, res) => {await controller.findAll(req, res)})
router.get('/pessoa/:id', async (req, res) => {await controller.findOne(req, res)})