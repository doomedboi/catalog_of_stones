require('dotenv').config()
const express = require('express')
const port = process.env.port || 5000
const sequelize = require('./database')

const app = express()

/* connect to database is there */

app.listen(port, () => {
    console.log("Server started on the 5001 port")
})