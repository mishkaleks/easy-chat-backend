const http = require("http")
const express = require("express")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server is connected to port ${PORT}`))
