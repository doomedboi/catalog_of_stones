const Router = require('express')
const router = new Router()
const stoneController = require('../controllers/stoneController')

router.post('/', stoneController.create)
router.get('/', stoneController.getAll)
router.get('/:id', stoneController.getOne)


module.exports = router