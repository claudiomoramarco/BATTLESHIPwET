pragma solidity ^0.5.0; 

contract Battleship{
    address public giocatore1;
    address public giocatore2;

    constructor() public {
        giocatore1 = msg.sender;
    }
}
//modifier  per controllare se l'indirizzo dell'entita chiamante msg sender corrisponde ad uno dei due giocatori
    modifier soloGiocatori() {
        require(msg.sender == giocatore1 || msg.sender == giocatore2)
    }
    