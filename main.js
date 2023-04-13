
const gameBoardButtons = document.querySelectorAll('.gameboard button');
const resetButton = document.querySelector('.reset-btn');
const winner = document.querySelector('.winner');

const gameBoard = () => {
    const board = new Array(9);
    let round = 0;
    return {board, round};
}

const player = () => {
    const player1 = 'X';
    const player2 = 'O';
    return {player1, player2};
}

const gameBoardSquares = gameBoard();

//checks if the game has a winner and returns true
function checkWinner() {
    //horizontal
    if((gameBoardSquares.board[0] === gameBoardSquares.board[1]) && (gameBoardSquares.board[1] === gameBoardSquares.board[2]) && gameBoardSquares.board[0] !== undefined){
        return true;
    } 
    if((gameBoardSquares.board[3] === gameBoardSquares.board[4]) && (gameBoardSquares.board[4] === gameBoardSquares.board[5]) && gameBoardSquares.board[3] !== undefined){
        return true;
    } 
    if((gameBoardSquares.board[6] === gameBoardSquares.board[7]) && (gameBoardSquares.board[7] === gameBoardSquares.board[8]) && gameBoardSquares.board[6] !== undefined){
        return true;
    } 
    // vertical
    if((gameBoardSquares.board[0] === gameBoardSquares.board[3]) && (gameBoardSquares.board[3] === gameBoardSquares.board[6]) && gameBoardSquares.board[0] !== undefined){
        return true;
    } 
    if((gameBoardSquares.board[1] === gameBoardSquares.board[4]) && (gameBoardSquares.board[4] === gameBoardSquares.board[7]) && gameBoardSquares.board[1] !== undefined){
        return true;
    } 
    if((gameBoardSquares.board[2] === gameBoardSquares.board[5]) && (gameBoardSquares.board[5] === gameBoardSquares.board[8]) && gameBoardSquares.board[2] !== undefined){
        return true;
    }
    // diagonal
    if((gameBoardSquares.board[0] === gameBoardSquares.board[4]) && (gameBoardSquares.board[4] === gameBoardSquares.board[8]) && gameBoardSquares.board[0] !== undefined){
        return true;
    } 
    if((gameBoardSquares.board[6] === gameBoardSquares.board[4]) && (gameBoardSquares.board[4] === gameBoardSquares.board[2]) && gameBoardSquares.board[6] !== undefined){
        return true;
    } else {
        return false;
    }
    
}

//checks if the game is a Draw and returns true
function checkDraw(){
    if((gameBoardSquares.round === 8) && (checkWinner() === false)){
        return true;
    } else return false;
}

const players = player();

//checks if the checkWinner() returns true and changes the winner.innerText. If not it checks if the checkDraw() returns true and changes the winner.innerText
function checkResult(){
    if(checkWinner() === true){
        if(gameBoardSquares.round % 2 === 0){
            winner.innerText = 'The winner is Player 1!';
        } else {
            winner.innerText = 'The winner is Player 2!';
        }
        resetButton.style.display = 'block';
    }
    if(checkDraw()){
        winner.innerText = "It's a Draw!";
    }
}

//adds an EventListener to every button in the gameBoardButtons const
gameBoardButtons.forEach(button => {
    button.addEventListener('click', (e) => {
            //prevents the player from pressing buttons after there is a winner or it's a draw
            if(gameBoardSquares.round === 9 || checkWinner() === true){
                return;
            }
            /*checks if the round value is even. If it's even the player is 1 and the button changes to 'X' storing the value 'X' in the gameBoardSquares.board
            vice versa if the round value is not even*/
            if(gameBoardSquares.round % 2 === 0){
                e.target.innerText = players.player1;
                for(let i = 0; i < gameBoardSquares.board.length; i++){
                    if(e.target.matches(`.gameboard-btn-${i}`)){
                        gameBoardSquares.board[i] = players.player1;
                    }
                }
            } else {
                e.target.innerText = players.player2;
                for(let i = 0; i < gameBoardSquares.board.length; i++){
                    if(e.target.matches(`.gameboard-btn-${i}`)){
                        gameBoardSquares.board[i] = players.player2;
                    }
                }
            }
        checkResult();
        gameBoardSquares.round++;
    })
})

//when the reset button is pressed it resets every variable to its starting value and changes the display of the reset button to 'none'
resetButton.addEventListener('click', () => {
    resetButton.style.display = 'none';
    gameBoardSquares.board = new Array(9);
    for(let i = 0; i < gameBoardButtons.length; i++){
        gameBoardButtons[i].innerText = '';
    }
    winner.innerText = '';
    gameBoardSquares.round = 0;
})