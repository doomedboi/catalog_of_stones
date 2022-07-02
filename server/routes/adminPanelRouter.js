const Router = require('express')
const router = new Router()
const panelController = require('../controllers/adminPanelController')

router.post('/login', panelController.login)
router.get('/auth', panelController.authCheck)

module.exports = router