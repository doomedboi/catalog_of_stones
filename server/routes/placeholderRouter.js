const Router = require('express')
const router = new Router()
const placeholderController = require('../controllers/placeholderController')

router.get('/', placeholderController.get)
router.post('/', placeholderController.create)

module.exports = router