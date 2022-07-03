require('dotenv').config()
const express = require('express')
const port = process.env.port || 5000
const sequelize = require('./database')
const cors = require('cors')
const router = require('./routes/index')

const models = require('./models/models')
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

/* connect to database is there */

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {console.log('server started')})
    } catch (e) {
        console.log(e)
    }
}

start()