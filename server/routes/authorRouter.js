const Router = require('express')
const router = new Router()
const authorController = require('../controllers/authorController')
const authCheck = require('../middleware/checkAuth')

router.post('/', authCheck, authorController.create)
router.get('/', authorController.get)

module.exports = router