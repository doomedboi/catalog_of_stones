require('dotenv').config()
const express = require('express')
const port = process.env.port || 5000
const sequelize = require('./database')
const cors = require('cors')
const router = require('./routes/index')
const models = require('./models/models')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(port, () => {console.log('server started')})
    } catch (e) {
        console.log(e)
    }
}

start()