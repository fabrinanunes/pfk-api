const cors = require('cors')
const express = require('express')
require("dotenv").config();

const server = express()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
require('./routes/routes')(server)

server.listen(process.env.PORT, () => {
    console.log(`Server is running: Port ${process.env.PORT}`)
})