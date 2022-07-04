/* this file links all routes */

const Router = require('express')
const router = new Router()

const adminRouter = require('./adminRouter')
const authorRouter = require('./authorRouter')
const placeholderRouter = require('./placeholderRouter')
const selectionRouter = require('./selectionpPlaceRouter')
const stoneRouter = require('./stoneRouter')


router.use('/admin', adminRouter)
router.use('/author', authorRouter)
router.use('/placeholder', placeholderRouter)
router.use('/selection', selectionRouter)
router.use('/stone', stoneRouter)

module.exports = router