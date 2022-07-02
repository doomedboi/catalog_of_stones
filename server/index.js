require('dotenv').config()
const express = require('express')
const port = process.env.port || 5000
const sequelize = require('./database')
const cors = require('cors')
const router = require('./routes/index')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

/* connect to database is there */

app.listen(port, () => {
    console.log("Server started on the 5001 port")
})