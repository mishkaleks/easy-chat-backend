# Easy Chat Backend

Backend работает с [внешним интерфейсом](https://github.com/mishkaleks/easy-chat-frontend).

## Основные этапы создания серверной части

- Инициализировать проект и установить зависимости сервера.

`$ npm init -y`

`$ npm i express socket.io concurrently nodemon`

- Настройка сервера.

Создать `server.js` файл со всеми необходимыми зависимостями:

```javascript
const http = require('http')
const express = require('express')
```

Выполнить, непосредственно, настройку сервера. Создать настройку с помощью `socket.io`, используя `http` сервер узла:

```javascript
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server is connected to port ${PORT}`))
```

Для запуска сервера необходимо добавить команды в `package.json`:

```json
"start": "node server.js",
"server": "nodemon server",
"setup": "npm i && cd ../easy-chat-frontend && npm i",
"dev": "concurrently \"npm run server\" \"cd ../easy-chat-frontend && npm start\""
```

- Подключить внешний интерфейс к серверной части.

Создать соединение `socket.io` между внешним интерфейсом и сервером. Константа `io` слушает подключение от клиента.
Как только соединение установленно создается сокет, который передается параметром в функциюю. В этом параметре хранится
информация о текущем соединении.

```javascript
io.on('connection', (socket) => {
  console.log('A connection has been made')
  socket.on('disconnect', ()=> {
    console.log('A disconnection has been made')
  })
})
```

Обработка CORS

На стороне клиента, екземпляр `socket` передает конечную точку сервера `http://localhost:5000`. Это приведет к нарушению 
CORS политики совместного использования ресурсов между источниками, поскольку мы пытаемся передавать данные между двумя 
разными маршрутами.

Добавим опции к соединению `socket.io`, чтобы разрешить подключение от клиента:

```javascript
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
})
```

**Остальные этапы создания серверной части будут добавляться по мере развития проекта*.
