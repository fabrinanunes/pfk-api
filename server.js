const cors = require('cors')
const express = require('express')

const server = express()
server.use(cors())
server.use(express.json())
require('./routes/routes.js')(server)

server.listen(process.env.PORT, () => {
    console.log(`Server is running: Port ${process.env.PORT}`)
})