# Easy Chat Backend

Backend работает с [внешним интерфейсом](https://github.com/mishkaleks/easy-chat-frontend).

## Основные этапы создания серверной части

- Инициализировать проект и установить зависимости сервера.

`$ npm init -y`

`$ npm i express socket.io concurrently nodemon`

- Настройка сервера.

Создать `server.js` файл со всеми необходимыми зависимостями:

```javascript
const http = require("http")
const express = require("express")
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

**Остальные этапы создания серверной части будут добавляться по мере развития проекта*.
