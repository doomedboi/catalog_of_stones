const Router = require('express')
const router = new Router()
const stoneController = require('../controllers/stoneController')
const autchCheck = require('../middleware/checkAuth')

router.post('/', autchCheck, stoneController.create)
router.get('/', stoneController.getAll)
router.get('/:id', stoneController.getOne)


module.exports = router