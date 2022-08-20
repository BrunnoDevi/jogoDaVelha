let playerID = document.getElementById('playerID');
let restartBTN = document.getElementById('restartBTN');
let caixas = Array.from(document.querySelectorAll(".box"));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-tiles');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;

//\/ criar um array chamado spacces [array(9)], nove espaços, igual ao número de objetos de boxes
// .fill (preencher) estes espaços com null (nada)
let spaces = Array(9).fill(null);



 const startGame = () => {
   for (var i = 0; i < caixas.length; i++) {
        
        caixas[i].addEventListener('click', boxClicked);
    }
} 

function boxClicked(e) {
    const id = e.target.id

    if (spaces[id] === null) {
        //o array spaces será preenchido com o currentPlayer
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        
        if (playerHasWon() !== false) {
            playerID.innerText = `${currentPlayer} venceu!`
            let winning_tiles = playerHasWon();

            winning_tiles.map(box => caixas[box].style.backgroundColor = winnerIndicator)
            return
        }
        
    } 
    
    if (currentPlayer === X_TEXT) {
        currentPlayer = O_TEXT
    } else {
        currentPlayer = X_TEXT;
    }
   
}



const winningCombos = [
    //direita pra esquerda \/
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //cima pra baixo \/
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //diagonal \/
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;
     
        
        // se a posição [a] do array spaces for igual a posição [b] do array spaces, ou seja
        //, estiver preenchida pelo mesmo valor (currentPlayer) e 
        // a posição a também for igual ao valor da posição c, ou seja, todos as posições
        //estão preenchidas pelo mesmo valor (currentPlayer X ou O)
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }

    }
    return false;
}





restartBTN.addEventListener('click', restart);

function restart() {
spaces.fill(null);

    for (var i = 0; i < caixas.length; i++) {
        caixas[i].innerText = ''
        caixas[i].style.backgroundColor = ''
    }

    playerID.innerText = "JOGO DA VELHA";

    currentPlayer = X_TEXT;


}

startGame();





