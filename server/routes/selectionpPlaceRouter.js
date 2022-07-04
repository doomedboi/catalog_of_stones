const Router = require('express')
const router = new Router()
const selectionController = require('../controllers/selectionPlaceController')
const autchCheck = require('../middleware/checkAuth')

router.get('/', selectionController.get)
router.post('/', autchCheck, selectionController.create)

module.exports = router