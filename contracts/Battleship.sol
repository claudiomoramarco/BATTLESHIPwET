pragma solidity ^0.5.0; 

contract Battleship{
    address public giocatore1;
    address public giocatore2;
    //mapping che associa un valore booleano a ciascun indirizzo Ethereum
    mapping(addmod => bool) public navePiazzata;
    mapping(address => mapping(uint8 => mapping(uint8 => bool))) public griglia;


    constructor() public {
        giocatore1 = msg.sender;
    }
}
//modifier  per controllare se l'indirizzo dell'entita chiamante msg sender corrisponde ad uno dei due giocatori
    modifier soloGiocatori() {
        require(msg.sender == giocatore1 || msg.sender == giocatore2 "Solo i Giocatori possono eseguire questa azione"):
        _; // Punto in cui il corpo della funzione verrà eseguito
    }

    //giocatore1 viene impostato nel costruttore senza la necessità di chiamare una funzione separata per impostare il primo giocatore.
    function partecipaGioco () public {
        require(giocatore2 == address(0),"il gioco è al completo");
        giocatore2 = msg.sender;

        } 
     function piazzaNavi(uint8 x, uint8 y) public soloGiocatori {
        require(!navePiazzata[msg.sender], "Hai già piazzato le navi");
        require(x < 10 && y < 10, "Coordinate non valide");
        require(!griglia[msg.sender][x][y], "Posizione già occupata");
        
        griglia[msg.sender][x][y] = true;
    }
        
        //uint va bene per un 8x8 8bit da 0 a 7
    function attaccoPosizione(uint8 x,uint8 y) public soloGiocatori {
        require(navePiazzata[giocatore1] && navePiazzata[giocatore2], "Attendi il piazzamento delle navi da entrambi i giocatori");
        require(x < 10 && y < 10, "Coordinate non valide");
        require(!griglia[msg.sender][x][y], "Hai già attaccato questa posizione");
        
    }

    function impostaNaviPosizionate() public soloGiocatori  {
        require(!navePiazzata[msg.sender],"hai segnalato che hai piazzato una nave");
        require(giocatore1 != address(0) && giocatore2 != address(0),"attendi che entrambi i player si uniscano");

        navePiazzata[msg.sender] = true;
        
    }
