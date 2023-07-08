const express = require('express')
const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 3000

//in dev la porta sara 3000 ma con heroku la potremo cambiare se vogliamo 
const socketio = require('socket.io')
const app = express()

const server = http.createServer(app)
const io = socketio(server)
console.log('Socket.io inizializzato')

//settiamo la cartella static
app.use(express.static(path.join(__dirname, "src")))




//ora possiamo iniziare il server
server.listen(PORT, () => console.log(`Server in run sulla porta ${PORT}`))


//configuriamo la socket io 
//Socket.IO è una libreria JavaScript 
//che permette la comunicazione bidirezionale in tempo reale 
//tra client e server.

//socket io richiesta di connessione  da un web client 
//io,che è la socket è in ascolto per questa connesssione7
//socket è il client in connessione

//come teniamo traccia dei 2 player in multi, "connessione" sono le due connessioni di cui terremo traccia
const connessioni = [null, null]


io.on('connection', socket => {
  
  let giocatoreIndex = -1
  console.log('Nuova websocket connessa')

  //troviamo un valido num player
  
  for (const i in connessioni) {
    if (connessioni[i] == null) {
      giocatoreIndex = i
      console.log(`Giocatore ${giocatoreIndex} si è connesso`)
      break     
    }
  }

    //se troviamo una connessione interrompi ciclo 
    //se abbiamo gia una connessione, index sara meno 1, cosi vediamo se abbiamo 2 player
    //ignoriamo se ci sono piu di 3 giocatori


    if (giocatoreIndex == -1) return
    
    


    // ci dice che la connessione client che num giocatore sono 

    socket.emit('numero-player', giocatoreIndex)
    
    //emit ci dice che la socket è connessa
    //numero player è cosa il client sta cercando, che m
    //come un messaggio, titolo sara cosa il client sta cercando e num giocatore
    
  })
