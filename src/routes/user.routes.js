const { Router } = require('express')

const userController = require('../controllers/user.controllers')

const router = Router()

router.post('/register', userController.registerNewUser)

module.exports = router
