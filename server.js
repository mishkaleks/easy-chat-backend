const http = require('http')
const express = require('express')
const { addUser, removeUser } = require('./user')

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

  // disconnect user
  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    io.to(user.room).emit('message', {
      user: 'Bot',
      text: `${user.name} just left the room`
    })
  })
})

server.listen(PORT, () => console.log(`Server is connected to port ${PORT}`))
