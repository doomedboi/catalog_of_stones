const Router = require('express')
const router = new Router()
const stoneController = require('../controllers/stoneController')
const autchCheck = require('../middleware/checkAuth')

router.post('/', autchCheck, stoneController.create)
router.get('/', stoneController.getAll)
router.get('/:id', stoneController.getOne)
router.post('/remove', autchCheck, stoneController.delete)
router.post('/create2', autchCheck, stoneController.create2)
module.exports = router