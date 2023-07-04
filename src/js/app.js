/*App = {  //global app oggetto per la nostra applicazione,carica il pet data in un init e poi chiama la funzione initweb3()
  web3Provider: null,
  contracts: {},
  
  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.lenght; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
  // Modern dapp browsers...
if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    await window.ethereum.enable();
  } catch (error) {
    // User denied account access...
    console.error("User denied account access")
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  App.web3Provider = window.web3.currentProvider;
}
// If no injected web3 instance is detected, fall back to Ganache
else {
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Battleship.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);
    
      // Set the provider for our contract
      App.contracts.Battleship.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });
    

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function() {
    /*
     * Replace me...
     */
  /*}

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
/*  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
*/



//da qui battleship poi cambieremo il codice di sopra
  document.addEventListener('DOMContentLoaded', () => { 
  const userGriglia = document.querySelector('.container .griglia-user')
  const computerGriglia = document.querySelector('.container .griglia-computer')
  const displayGriglia = document.querySelector('.container .griglia-display')
  const navi = document.querySelectorAll('.nave')
  const naveuno = document.querySelector('.naveuno-container')
  const navedue = document.querySelector('.navedue-container')
  const navetre = document.querySelector('.navetre-container')
  const navequattro = document.querySelector('.navequattro-container')
  const navecinque = document.querySelector('.navecinque-container')
  const startButton = document.querySelector('#start')
  const rotateButton = document.querySelector('#rotate')
  const turnDisplay = document.querySelector('#whose-go')
  const infoDisplay = document.querySelector('#info')
  const userSquares=[]
  const computerSquares=[]
  let orizzontale = true
  let giocoFinito = false
  let currentPlayer = 'user'
  const width = 10
  
  //crea board
  function createBoard(griglia, squares){
    for(let i = 0; i < width*width;i++){
      const square = document.createElement('div')
      square.dataset.id = i
      griglia.appendChild(square)
      squares.push(square)
    }
  }

  createBoard(userGriglia, userSquares)
  createBoard(computerGriglia, computerSquares)

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
 function generate(nave) {
  let randomDirection = Math.floor(Math.random() * nave.directions.length)
  let current = nave.directions[randomDirection]
  if (randomDirection === 0) direction = 1
  if (randomDirection === 1) direction = 10
  let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (nave.directions[0].length * direction)))

  const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'))
  const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
  const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

  if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => computerSquares[randomStart + index].classList.add('taken', nave.name))

  else generate(nave)
}
generate(naveArray[0])
generate(naveArray[1])
generate(naveArray[2])
generate(naveArray[3])
generate(naveArray[4])


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
  console.log(selectedNaveNameWithIndex)
}))

function dragStart() {
  draggedNave = this
  draggedNaveLength = this.childNodes.length
  console.log(draggedNave)
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault()
}

function dragLeave() {
  console.log('drag leave')
}

function dragDrop() {
  if(draggedNave === null) {
    return //Skip the code if draggedNave is null
  }
  let naveNameWithLastId = draggedNave.lastChild.id
  let naveClass = naveNameWithLastId.slice(0,-2)
  console.log(naveClass)
  let lastNaveIndex = parseInt(naveNameWithLastId.substr(-1))
  let naveLastId = lastNaveIndex + parseInt(this.dataset.id)
  console.log(naveLastId)
  const notAllowedOrizzontale = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93]
  const notAllowedVerticale = [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60]
  
  let newNotAllowedOrizzontale = notAllowedOrizzontale.splice(0, 10 * lastNaveIndex)
  let newNotAllowedVerticale = notAllowedVerticale.splice(0, 10 * lastNaveIndex)
    selectedNaveIndex = parseInt(selectedNaveNameWithIndex.substr(-1))
    naveLastId = naveLastId - selectedNaveIndex
    console.log(naveLastId)
    
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

    displayGriglia.removeChild(draggedNave)

}

function dragEnd(){
  console.log('dragend')
}


//logica del gioco
function playGame() {
  if (giocoFinito) return
  if (currentPlayer === 'user') {
    turnDisplay.innerHTML= 'Your Go'
    computerSquares.forEach(square => square.addEventListener('click', function(e) {
      revealSquare(square)
    }))
  }
  if (currentPlayer === 'computer') {
    turnDisplay.innerHTML = 'Computer Go'
    setTimeout(computerGo,1000)
  }
}
startButton.addEventListener('click', playGame)


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
  currentPlayer = 'computer'
  playGame()
}

let cpuNaveunoCount = 0
let cpuNavedueCount = 0
let cpuNavetreCount = 0
let cpuNavequattroCount = 0
let cpuNavecinqueCount = 0

function computerGo() {
  let random = Math.floor(Math.random() * userSquares.length);
  if (!userSquares[random].classList.contains('boom')) {
    userSquares[random].classList.add('boom')
    // Aggiorna il conteggio delle navi colpite dal computer
    if (userSquares[random].classList.contains('naveuno')) cpuNaveunoCount++;
    if (userSquares[random].classList.contains('navedue')) cpuNavedueCount++;
    if (userSquares[random].classList.contains('navetre')) cpuNavetreCount++;
    if (userSquares[random].classList.contains('navequattro')) cpuNavequattroCount++;
    if (userSquares[random].classList.contains('navecinque')) cpuNavecinqueCount++;
    checkForWins();
  } else {
    computerGo();
    return; // Aggiungi questa riga per terminare la funzione dopo la chiamata ricorsiva
  }
  currentPlayer = 'user';
  turnDisplay.innerHTML = 'Your Go';

  //setTimeout(() => {
   // playGame(); // Chiamata ricorsiva ritardataw
 // }, 1000);
}


function checkForWins() {
  if(naveunoCount === 2) {
    infoDisplay.innerHTML = 'Hai affondato la Nave1 del computer'
    naveunoCount = 10
  }
  if(navedueCount === 3) {
    infoDisplay.innerHTML = 'Hai affondato la Nave2 del computer'
    navedueCount = 10
  }
  if(navetreCount === 3) {
    infoDisplay.innerHTML = 'Hai affondato la Nave3 del computer'
    navetreCount = 10
  }
  if(navequattroCount === 4) {
    infoDisplay.innerHTML = 'Hai affondato la Nave4 del computer'
    navequattroCount = 10
  }
  if(navecinqueCount === 5) {
    infoDisplay.innerHTML = 'Hai affondato la Nave5 del computer'
    navecinqueCount = 10
  }
  if(cpuNaveunoCount === 2) {
    infoDisplay.innerHTML = 'Hai affondato la Nave1 del computer'
    cpuNaveunoCount = 10
  }
  if(cpuNavedueCount === 3) {
    infoDisplay.innerHTML = 'Hai affondato la Nave2 del computer'
    cpuNavedueCount = 10
  }
  if(cpuNavetreCount === 3) {
    infoDisplay.innerHTML = 'Hai affondato la Nave3 del computer'
    cpuNavetreCount = 10
  }
  if(cpuNavequattroCount === 4) {
    infoDisplay.innerHTML = 'Hai affondato la Nave4 del computer'
    cpuNavequattroCount = 10
  }
  if(cpuNavecinqueCount === 5) {
    infoDisplay.innerHTML = 'Hai affondato la Nave5 del computer'
    cpuNavecinqueCount = 10
  }
  if ((naveunoCount + navedueCount + navetreCount + navequattroCount + navecinqueCount) === 50 ) {
    infoDisplay.innerHTML = 'Hai vinto'
    giocoTerminato()
    
  }

  if ((cpuNaveunoCount + cpuNavedueCount + cpuNavetreCount + cpuNavequattroCount + cpuNavecinqueCount) === 50 ) {
    infoDisplay.innerHTML = 'Hai perso, ha vinto il pc'
    giocoTerminato()
  } 
}
function giocoTerminato() {
  giocoFinito = true
  startButton.removeEventListener('click', playGame)

}

})