const http = require('http')
const express = require('express')
const { addUser } = require('./user')

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
  socket.on('join', ({ name, room }, callBack) => {
    const { user, error } = addUser({ id: socket.id, name, room })
    if (error) return callBack(error)
    socket.join(user.room) // connect socket (user) to room
    callBack(null)

    // welcome message
    socket.emit('message', {
      user: 'Bot',
      text: `Welcome to ${user.room}`
    })

    // inform other users that a new user has joined our room
    socket.broadcast
      .to(user.room).emit('message', {
        user: 'Bot',
        text: `${user.name} has joined!`
      })

    // sending message
    socket.on('sendMessage', ({ textMessage }) => {
      io.to(user.room).emit('message', {
        user: user.name,
        text: textMessage
      })
    })
  })
  socket.on('disconnect', () => {
    console.log('A disconnection has been made')
  })
})

server.listen(PORT, () => console.log(`Server is connected to port ${PORT}`))
