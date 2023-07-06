
const express = require('express')

const path = require('path')
const http = require('http')
const PORT= process.env.PORT || 3000
//in dev la porta sara 3000 ma con heroku la potremo cambiare se vogliamo 
const socketio = require('socket.io')
const app = express()

const server = http.createServer(app)

const io = socketio(server)

//settiamo la cartella static

app.request(express.static(path.join(__dirname,"src")))

//ora possiamo iniziare il server
server.listen(PORT, ()=> console.log(`Server in run sulla porta ${PORT}`))
    