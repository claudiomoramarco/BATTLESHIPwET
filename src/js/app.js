/*App = {  //global app oggetto per la nostra applicazione,carica il pet data in un init e poi chiama la funzione initweb3()
  web3Provider: null,
  contracts: {},
  
  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
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
const gamesBoardContainer = document.querySelector('#gamesboard-container')
const flipButton = document.querySelector('#flip-button')
const optionContainer = document.querySelector('.option-container')
//opzioni per rotazione delle navi 
//funzione per flippare le navi 
let rotato = false;

function flip() {
  const opzioneNavi = Array.from(optionContainer.children) 

  if (rotato) {
    opzioneNavi.forEach(opzioneNave =>  opzioneNave.style.transform = 'none')
  }
  else  {
    opzioneNavi.forEach(opzioneNave =>  opzioneNave.style.transform = 'rotate(90deg)')
  }
  rotato = !rotato;
}


//quando clicco voglio essenzialmente chiamare questa funzione flip
//prendo i child della option-container che sarebbereo le navi 

flipButton.addEventListener('click',flip)

//creazione della Board di gioco

const width = 10;
const container = document.getElementById('gamesboard-container');

function creaBoard(color,user) {
  //div salvato su questa const
  const gameBoardContainer = document.createElement('div');
  gameBoardContainer.classList.add('game-board');
  gamesBoardContainer.append(gameBoardContainer)
  

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.id = `${i}-${j}`; //ho unito gli id
      gameBoardContainer.appendChild(cell);
      gameBoardContainer.style.backgroundColor = color;
      gameBoardContainer.id = user
    }
  }
  
  
  
 
}

creaBoard('lightblue','giocatore1') 
creaBoard('darkblue', 'giocatore2')
