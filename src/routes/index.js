const { Router } = require('express')
// const { version } = require('../../package.json')

const router = Router()

router.get('/api/v1', (_, res) => {
  return res.json({
    message: 'Bem vindo à API + JWT + Mongo',
    version: '1.0.0',
  })
})

module.exports = router
