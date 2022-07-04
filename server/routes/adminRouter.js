const Router = require('express')
const router = new Router()
const panelController = require('../controllers/adminController')
const authCheck = require('../middleware/checkAuth')

router.post('/login', panelController.login)
router.post('/register', panelController.register)
router.get('/auth', authCheck, panelController.authCheck)

module.exports = router