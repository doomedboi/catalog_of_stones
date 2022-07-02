const Router = require('express')
const router = new Router()
const selectionController = require('../controllers/selectionPlaceController')

router.get('/', selectionController.get)
router.post('/', selectionController.create)

module.exports = router