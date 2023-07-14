const TruffleContract = require('truffle-contract')

App = {

  web3Provider: null,
  contracts: {},
  informazioni: null,

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function () { 

    if(window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access
        console.error("User denied account access")

      }
    }
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // Legacy dapp browsers...
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }d
    web3 = new Web3(App.web3Provider);
    web3.eth.defaultAccount = web3.eth.accounts[0];
    return App.initContract();
  },

  
  initContract:function()  {

    $.getJSON("Battleship.json", function(data) {
      var BattleshipArtifact = data; //prendi il contratto e inizializzalo
      App.contracts.Battleship = TruffleContract(BattleshipArtifact);
      App.contracts.Battleship.setProvider(App.web3Provider);
    })

    return App.bindEvents()

  },

  bindEvents : async function() {

    //qui dobbiamo fare la creazione del gioco con id e delle board
    $(document).on('click', '.nave', App.handleNaveClick);
    
  }
}






//da qui battleship poi cambieremo il codice di sopra
document.addEventListener('DOMContentLoaded', () => { 
  //per le navi
  
  $(document).on ('click', '.nave', App.handleNaveClick)
  
  const userGriglia = document.querySelector('.container .griglia-user')
  //for the users
  const enemyGriglia = document.querySelector('.container .griglia-enemy')
  const displayGriglia = document.querySelector('.container .griglia-display')
  //ships definitions
  const navi = document.querySelectorAll('.nave')
  const naveuno = document.querySelector('.naveuno-container')
  const navedue = document.querySelector('.navedue-container')
  const navetre = document.querySelector('.navetre-container')
  const navequattro = document.querySelector('.navequattro-container')
  const navecinque = document.querySelector('.navecinque-container')
  //for the starting point
  $(document).on('click', '#start', App.playGame)
  $(document).on('click', '#rotate', App.rotate)


  $(document).on('click')
  const turnDisplay = document.querySelector('#whose-go')

  const infoDisplay = document.querySelector('#info')
  //button per il Multiplayer e per ogni player
  
  const multiplayerButton = document.querySelector('#multiplayerBottone')

  
  //user and enemy squares
  const userSquares=[]
  const enemySquares=[]
  //game definitions
  let orizzontale = true
  let giocoFinito = false

  let currentPlayer = 'user'
  //definition of static board game
  const width = 10


  
  //qui possiamo implementare che i giocatori del contratto sono solo due, poi si vedrà
  let numeroGiocatore = 0

  //per verificare se un player è pronto o meno
  let userPronto = false
  //verifico che nemico is ready
  let nemicoPronto = false

  //come vedo se le navi sono state posizionate correttamente e pronte, prima che la partita inizi
  let naviPiazzate = false

  //teniamo traccia del colpo
  let colpo = -1



  //listener per i bottoni delle modalità di gioco
  multiplayerButton.addEventListener('click',iniziaMultiplayer)

  //data trasmetto da socke io è string e passiamo come num 
  //e se player numero uguale a 1 allora player attuale = enemy 

  //modalità Multi
  //se prendo multiplayer, inizio la gamemode multi, e inizio la socket connect e listen per il num dei player

  function iniziaMultiplayer(){
  
    function giocatoreConnessoDisconnesso(num){
      document.querySelector(`${giocatore}.connected span`).classList.toggle('green')
      if(parseInt(num) == numeroGiocatore) document.querySelector(giocatore).style.fontWeight = 'bold'
    }
  }
 


//giocatori sono pronti per giocare
startButton.addEventListener('click', () => {
  playGameMulti
})

  //ready button 
  startButton.addEventListener('click', () => {
    if(naviPiazzate)
      playGame
  })
    
  
  //submitting the attack
  userSquares.forEach(square => {
    square.addEventListener('click', () => {
      if(currentPlayer == 'user' && nemicoPronto) {
        colpo = square.dataset.id
      }
    })
  })



  //funzione sing player
 /* function iniziaSingolo(){
    modalitaDiGioco = "giocatoreSingolo"

  generate(naveArray[0])
  generate(naveArray[1])
  generate(naveArray[2])
  generate(naveArray[3])
  generate(naveArray[4])


  startButton.addEventListener('click', playGame)

  } */

  //crea board
  // a questa le diamo un Id cosi per il multiplayer si 
  //puo collegare con l id della board nemica
  function createBoard(griglia, squares){
    for(let i = 0; i < width*width;i++){
      const square = document.createElement('div')
      square.dataset.id = i
      griglia.appendChild(square)
      squares.push(square)
    }
  }

  createBoard(userGriglia, userSquares)
  createBoard(enemyGriglia, enemySquares)

  //navi 
  const naveArray = [
    {
      name: 'naveuno',
      directions: [
        [0, 1],
        [0, width]
      ]
    },
    {
      name: 'navedue',
      directions: [
        [0, 1, 2],
        [0, width, width*2]
      ]
    },
    {
      name: 'navetre',
      directions: [
        [0, 1, 2],
        [0, width, width*2]
      ]
    },
    {
      name: 'navequattro',
      directions: [
        [0, 1, 2, 3],
        [0, width, width*2, width*3]
      ]
    },
    {
      name: 'navecinque',
      directions: [
        [0, 1, 2, 3, 4],
        [0, width, width*2, width*3, width*4]
      ]
    },
  ];



 //navi dell'avversario 
 //Disponi le navi nella griglia dell'utente in modo casuale
 function generate(nave) {
  let randomDirection = Math.floor(Math.random() * nave.directions.length)
  let current = nave.directions[randomDirection]
  if (randomDirection === 0) direction = 1
  if (randomDirection === 1) direction = 10
  let randomStart = Math.abs(Math.floor(Math.random() * enemySquares.length - (nave.directions[0].length * direction)))

  const isTaken = current.some(index => enemySquares[randomStart + index].classList.contains('taken'))
  const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
  const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

  if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => enemySquares[randomStart + index].classList.add('taken', nave.name))

  else generate(nave)
}

//qui pc genera le navi automaticamente,
//ma noi vogliamo che funzioni solo in giocatore singolo


// rotazione nella board delle navi 
function rotate() {
  if (orizzontale) {
    naveuno.classList.add('naveuno-container-vertical')
    navedue.classList.add('navedue-container-vertical')
    navetre.classList.add('navetre-container-vertical')
    navequattro.classList.add('navequattro-container-vertical')
    navecinque.classList.add('navecinque-container-vertical')
    orizzontale = false
    console.log(orizzontale)
    return 
  }
  if (!orizzontale) {
    naveuno.classList.remove('naveuno-container-vertical')
    navedue.classList.remove('navedue-container-vertical')
    navetre.classList.remove('navetre-container-vertical')
    navequattro.classList.remove('navequattro-container-vertical')
    navecinque.classList.remove('navecinque-container-vertical')
    orizzontale = true
    console.log(orizzontale)
    return
    
  }
}

rotateButton.addEventListener('click', rotate);

//move around user ship
navi.forEach(nave => nave.addEventListener('dragstart', dragStart))
userSquares.forEach(square => square.addEventListener('dragstart', dragStart))
userSquares.forEach(square => square.addEventListener('dragover', dragOver))
userSquares.forEach(square => square.addEventListener('dragenter', dragEnter))
userSquares.forEach(square => square.addEventListener('dragleave', dragLeave))
userSquares.forEach(square => square.addEventListener('drop', dragDrop))
userSquares.forEach(square => square.addEventListener('dragend', dragEnd))

let selectedNaveNameWithIndex
let draggedNave
let draggedNaveLength

navi.forEach(nave => nave.addEventListener('mousedown', (e) => {
  selectedNaveNameWithIndex = e.target.id
  //console.log(selectedNaveNameWithIndex)
}))

function dragStart(event) {
  draggedNave = this
  draggedNaveLength = this.childNodes.length
  //console.log(draggedNave)
  
  //Per rendere un elemento non trascinabile dopo essere stato trascinato una volta
  //il metodo draggable dell'elemento e impostarlo su false
  //event.target.setAttribute('draggable', 'false')
  
  
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault()
}

function dragLeave() {
  
  //console.log('drag leave')
}

function dragDrop() {
 //vedo se entra qui console.log('drag drop')
  let naveNameWithLastId = draggedNave.lastChild.id
  let naveClass = naveNameWithLastId.slice(0,-2)
  //console.log(naveClass)
  let lastNaveIndex = parseInt(naveNameWithLastId.substr(-1))
  let naveLastId = lastNaveIndex + parseInt(this.dataset.id)
 // console.log(naveLastId)
  const notAllowedOrizzontale = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93]
  const notAllowedVerticale = [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60]
  
  let newNotAllowedOrizzontale = notAllowedOrizzontale.splice(0, 10 * lastNaveIndex)
  let newNotAllowedVerticale = notAllowedVerticale.splice(0, 10 * lastNaveIndex)

  selectedNaveIndex = parseInt(selectedNaveNameWithIndex.substr(-1))

  naveLastId = naveLastId - selectedNaveIndex
  //console.log(naveLastId)
   
    if (orizzontale && !newNotAllowedOrizzontale.includes(naveLastId)){
      for (let i=0; i < draggedNaveLength; i++) {
        
        userSquares[parseInt(this.dataset.id) - selectedNaveIndex + i].classList.add('taken', naveClass)
      }
      //quando metteremo la nave che stiamo draggando in un index non consentito ritornera sulla nostra griglia
      
    } else if (!orizzontale && !newNotAllowedVerticale.includes(naveLastId)) {
      for (let i=0; i < draggedNaveLength; i++) {
       
        userSquares[parseInt(this.dataset.id) - selectedNaveIndex + width*i].classList.add('taken', naveClass)
      }
      
    } else return 

    if (displayGriglia) {
      displayGriglia.removeChild(draggedNave);
      if(!displayGriglia.querySelector('.nave')) naviPiazzate = true
    }
    
    draggedNave.style.display='none'

}


function dragEnd(event){

  //console.log('dragend')
  // Rimuovi l'elemento della nave dalla griglia display

  //console.log('dragend')

}


//logica del gioco
function playGame() {
  if (giocoFinito) return
  if (currentPlayer === 'user') {
    turnDisplay.innerHTML= 'Il tuo turno'
    enemySquares.forEach(square => square.addEventListener('click', function(e) {
      revealSquare(square)
    }))
  }

  //da fare sempre con web3
  if (currentPlayer === 'enemy') {
    turnDisplay.innerHTML = 'Turno Avversario'
    setTimeout(enemyGo,1000)
  }
}




function playGame() {
  if(giocofinito) return;
  if(currentPlayer === 'user') {
    turnDisplay.text('Il tuo turno')
    enemySquares.on('click', function() {
      revealSquare($(this))
    })
  }
}

if(currentPlayer === 'enemy') {
  turnDisplay.text('Turno Avversario')
  setTimeout(enemyGo,1000)
}


let naveunoCount = 0
let navedueCount = 0
let navetreCount = 0
let navequattroCount = 0
let navecinqueCount = 0

function revealSquare(square) {
  if(!square.classList.contains('boom')) {
    //aggiorna il conto delle navi colpite
    if (square.classList.contains('naveuno')) naveunoCount++
    if (square.classList.contains('navedue')) navedueCount++
    if (square.classList.contains('navetre')) navetreCount++
    if (square.classList.contains('navequattro')) navequattroCount++
    if (square.classList.contains('navecinque')) navecinqueCount++
  }
  if (square.classList.contains('taken')) {
    square.classList.add('boom')

  } else {
    square.classList.add('miss')
  
  }
  checkForWins()
  currentPlayer = 'enemy'
  playGame()
}

let cpuNaveunoCount = 0
let cpuNavedueCount = 0
let cpuNavetreCount = 0
let cpuNavequattroCount = 0
let cpuNavecinqueCount = 0

/*function enemyGo() {
  let random = Math.floor(Math.rcpuandom() * userSquares.length);
  if (!userSquares[random].classList.contains('boom')) {
    userSquares[random].classList.add('boom')
    // Aggiorna il conteggio delle navi colpite dal enemy
    if (userSquares[random].classList.contains('naveuno')) cpuNaveunoCount++;
    if (userSquares[random].classList.contains('navedue')) cpuNavedueCount++;
    if (userSquares[random].classList.contains('navetre')) cpuNavetreCount++;
    if (userSquares[random].classList.contains('navequattro')) cpuNavequattroCount++;
    if (userSquares[random].classList.contains('navecinque')) cpuNavecinqueCount++;
    checkForWins();
  } else {
    enemyGo();
    return; // Aggiungi questa riga per terminare la funzione dopo la chiamata ricorsiva
  }
  currentPlayer = 'user';
  turnDisplay.innerHTML = 'Il tuo turno';

 
} */


function checkForWins() {
  if(naveunoCount === 2) {
    infoDisplay.innerHTML = 'Hai affondato la Nave1 del enemy'
    naveunoCount = 10
  }
  if(navedueCount === 3) {
    infoDisplay.innerHTML = 'Hai affondato la Nave2 del enemy'
    navedueCount = 10
  }
  if(navetreCount === 3) {
    infoDisplay.innerHTML = 'Hai affondato la Nave3 del enemy'
    navetreCount = 10
  }
  if(navequattroCount === 4) {
    infoDisplay.innerHTML = 'Hai affondato la Nave4 del enemy'
    navequattroCount = 10
  }
  if(navecinqueCount === 5) {
    infoDisplay.innerHTML = 'Hai affondato la Nave5 del enemy'
    navecinqueCount = 10
  }
  //dovrebbero essere le navi amiche che dobbiamo rivedere con enemy
  /*
  if(cpuNaveunoCount === 2) {
    infoDisplay.innerHTML = 'Hai affondato la Nave1 del enemy'
    cpuNaveunoCount = 10
  }
  if(cpuNavedueCount === 3) {
    infoDisplay.innerHTML = 'Hai affondato la Nave2 del enemy'
    cpuNavedueCount = 10
  }
  if(cpuNavetreCount === 3) {
    infoDisplay.innerHTML = 'Hai affondato la Nave3 del enemy'
    cpuNavetreCount = 10
  }
  if(cpuNavequattroCount === 4) {
    infoDisplay.innerHTML = 'Hai affondato la Nave4 del enemy'
    cpuNavequattroCount = 10
  }
  if(cpuNavecinqueCount === 5) {
    infoDisplay.innerHTML = 'Hai affondato la Nave5 del enemy'
    cpuNavecinqueCount = 10
  }
  if ((naveunoCount + navedueCount + navetreCount + navequattroCount + navecinqueCount) === 50 ) {
    infoDisplay.innerHTML = 'Hai vinto'
    giocoTerminato()
    
  }


  if ((cpuNaveunoCount + cpuNavedueCount + cpuNavetreCount + cpuNavequattroCount + cpuNavecinqueCount) === 50 ) {
    infoDisplay.innerHTML = 'Hai perso, ha vinto il pc'
    giocoTerminato()
  } */

}
function giocoTerminato() {
  giocoFinito = true
  startButton.removeEventListener('click', playGame)
  
}

});


$(function() {
  $(window).load(function() {
    App.init();
  });
});
