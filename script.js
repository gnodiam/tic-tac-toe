const start = document.querySelector('.btn-primary');
/* const gameControl = ( (trg) => {

})(); */





const playerFactory = (name,mark) => {
    const playTurn = (board,cell) => {
        const id = cell.id;
        if (playerMoves.indexOf(Number(id) == -1)) {
            return id;
        }
        return null; 
    };
    let playerMoves = [];
    return {name,mark,playTurn,playerMoves}
}

const boardModule = (() => {
    const createBoard = () => {
        for (let i = 1; i<=5; i++){
            for (let j = 1 ; j<=5; j++){
                const div = document.createElement('div')
                document.querySelector('#board').appendChild(div);
                div.classList.add('cell');
                div.id = `${i}${j}`
    /*             console.log(`${i}${j}`);
     */        
        }};
    };

    const gameBoard = document.querySelector('#board');
    const cells = Array.from(document.querySelectorAll('.cell'));
    let blankCells = 25;
    let winner = null;

    const reset = () => {
        blankCells = 25;
    };

    const checkWin = (pos) =>{

        for(let i = 0; i<pos.length;i++){
            const arr=[1,10,11,9];
            for (let el of arr) {
                let positionCheck = [];

                for(let j = 1;j<3;j++){
                    positionCheck.push(pos.indexOf(pos[i]+j*el));
                }
                
                if (!positionCheck.includes(-1)){
                    winner = 'current';
                }

            }
        };
        return winner || (blankCells==0 ? 'Tie':null);

    }; 
    return { gameBoard,cells,checkWin,reset,blankCells,createBoard}
})();

const gameplayModule = (() =>{
    const playerOneName = document.querySelector('#player1');
    const playerTwoName = document.querySelector('#player2');
    const form = document.querySelector('.player-info');
    const resetBtn = document.querySelector('#reset')
    let currentPlayer;
    let playerOne;
    let playerTwo;
    

    const switchTurn = () =>{
        currentPlayer = currentPlayer === playerOne ? playerTwo: playerOne;
    };

    const gameRound = () => {
        const board = boardModule;
        const gameStatus = document.querySelector('.game-status');
        if (currentPlayer.name !== '') {
            gameStatus.textContent = `${currentPlayer.name}'s Turn`
        } else {
            gameStatus.textContent= 'Board: ';
        };

        board.gameBoard.addEventListener('click',(e) => {
            e.preventDefault();
            const play = currentPlayer.playTurn(board,e.target);
            if (play != null) {
                document.getElementById(`${play}`).textContent=`${currentPlayer.mark}`;
                currentPlayer.playerMoves.push(Number(play));
                board.blankCells -= 1;
                const winStatus = board.checkWin(currentPlayer.playerMoves);
                if (winStatus==='Tie') {
                    gameStatus.textContent= 'Tie!';

                } else if ( winStatus === null) {
                    switchTurn();
                    gameStatus.textContent=`${currentPlayer.name}'s Turn`;

                } else {
                    gameStatus.textContent= `Winner is ${currentPlayer.name}`;
                    board.reset();
                    window.location.reload();
                }
            }   
        });
    };
    const gameInit = () => {
        if (playerOneName.value !== '' && playerTwoName.value !== '') {
          playerOne = playerFactory(playerOneName.value, 'X');
          playerTwo = playerFactory(playerTwoName.value, 'O');
          currentPlayer = playerOne;
          gameRound();
        }
      };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (playerOneName.value !== '' && playerTwoName.value !== '') {
          gameInit();
          form.classList.add('hidden');
          document.querySelector('.place').classList.remove('hidden');
        } else {
          window.location.reload();
        }
      });

    resetBtn.addEventListener('click', () => {
        document.querySelector('.game-status').textContent = 'Board: ';
        document.querySelector('#player1').value = '';
        document.querySelector('#player2').value = '';
        window.location.reload();
      });
      return {
        gameInit,
      };

})();
start.addEventListener('click', boardModule.createBoard);


