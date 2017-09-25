//elementy główne wyświetlanie
var newGameElem = document.getElementById('js-newGameElement');
var playersPickElem = document.getElementById('js-playerPickElement');
var resultsElem = document.getElementById('js-resultsTableElement');

//button start game
var newGameButton = document.getElementById('js-newGameButton');

// wybór gracza button's
var pickRock = document.getElementById('js-playerPick_rock');
var pickPaper = document.getElementById('js-playerPick_paper');
var pickScissors = document.getElementById('js-playerPick_scissors');

//tabela wyników
var playerNameElem = document.getElementById('js-playerName');

var playerPointsElem = document.getElementById('js-playerPoints');
var computerPointsElem  = document.getElementById('js-computerPoints');

//wybór graczy/komputera
var playerPickElem = document.getElementById('js-playerPick');
var computerPickElem = document.getElementById('js-computerPick');

//wynik wyboru graczy/komputera
var playerResultElem = document.getElementById('js-playerResult');
var computerResultElem = document.getElementById('js-computerResult');

var resultWinner = document.getElementById('js-resultWinner');

newGameButton.onclick = function(){newGame()};
pickRock.onclick = function(){getPlayerPick('rock')};
pickPaper.onclick = function(){getPlayerPick('paper')};
pickScissors.onclick = function(){getPlayerPick('scissors')};

var gameState = 'notStarted',

player = {
    name : '',
    score : 0
},
computer = {
    score: 0
};

function setGameElements() {
    switch(gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            playersPickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            resultWinner.style.display = 'none';
            break;
        case 'ended':
            newGameButton.innerText = 'Jeszcze raz';
            newGameElem.style.display = 'block';
            playersPickElem.style.display = 'none';
            resultsElem.style.display = 'none';
            resultWinner.style.display = 'block';
            break;
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            playersPickElem.style.display = 'none';
            resultsElem.style.display = 'none';
            resultWinner.style.display = 'none';
    }
}

setGameElements();

function newGame() {
    player.name = prompt('Podaj nick');
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started'
        setGameElements()
        playerNameElem.innerHTML = player.name;
        playerResultElem.innerText = 'Wybór gracza';
        computerResultElem.innerText = 'Wybór Komputera';
        playerPickElem.innerText = 'Wybór gracza';
        computerPickElem.innerText = 'Wybór Komputera';
        setGamePoints();
    }
}

//Losowanie wyboru komputera
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

// playerP = playerPick
function checkRoundWinner(playerP, computerP) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';
    var winnerIs = 'player';

    if(playerP == computerP) {
        winnerIs = '';
        playerResultElem.innerHTML = computerResultElem.innerHTML = 'Remis!';

    } else if (
        (computerP == 'rock' && playerP == 'scissors') ||
        (computerP == 'scissors' && playerP == 'paper') ||
        (computerP == 'paper' && playerP == 'rock')){

        winnerIs = 'computer';
    }

    if(winnerIs == 'computer') {
        computerResultElem.innerHTML = 'Wygrana';
        computer.score++;

    } else if (winnerIs == 'player') {
        playerResultElem.innerHTML = 'Wygrana';
        player.score++;
    }
    
    checkResult ()
    setGamePoints();
    setGameElements();

}

function getPlayerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick)
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function checkResult () {
    if (computer.score == 10) {
        computerResultElem.innerHTML = 'Zwyciężca Computer';
        gameState = 'ended'
        resultWinner.innerText = computerResultElem.innerHTML;
        setGameElements()
    } else if (player.score == 10) {
        playerResultElem.innerHTML = 'Zwyciężca '+ player.name;
        gameState = 'ended'
        resultWinner.innerText = playerResultElem.innerHTML;
        setGameElements()
    }
}
