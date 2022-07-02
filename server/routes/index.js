/* this file links all routes */

const Router = require('express')
const router = new Router()

const adminRouter = require('./adminPanelRouter')
const catalogRouter = require('./catalogRouter')

router.use('/catalog', catalogRouter)
router.use('/admin', adminRouter)

module.exports = router