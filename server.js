const http = require('http')
const express = require('express')

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
})

const PORT = process.env.PORT || 5000

io.on('connection', (socket) => {
  console.log('A connection has been made')
  socket.on('disconnect', ()=> {
    console.log('A disconnection has been made')
  })
})

server.listen(PORT, () => console.log(`Server is connected to port ${PORT}`))
