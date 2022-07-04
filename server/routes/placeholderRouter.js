const Router = require('express')
const router = new Router()
const placeholderController = require('../controllers/placeholderController')
const autchCheck = require('../middleware/checkAuth')

router.get('/', placeholderController.get)
router.post('/', autchCheck,  placeholderController.create)

module.exports = router