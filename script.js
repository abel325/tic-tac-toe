const GameBoard = (function() {
  let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];


  const getBoard = () => {
    return board;
  }


  const markCell = (mark, row, col) => {
    board[row - 1][col - 1] = mark;
  }


  const isCellOccupied = (row, col) => {
    if (board[row - 1][col - 1] != null) {
      return true;
    } else {
      return false;
    }
  }


  const isBoardFull = () => {
    for (let row of board) {
      if (row.includes(null)) return false;
    }
    return true;
  }


  const clearBoard = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        board[row][col] = null;
      }
    }
  }


  const isWinner = (mark) => {
    if ( ((mark === board[0][0]) && (board[0][0] === board[1][1] && board[1][1] === board[2][2])) || 
         ((mark === board[0][2]) && (board[0][2] === board[1][1] && board[1][1] === board[2][0])) ||
         ((mark === board[0][0]) && (board[0][0] === board[0][1] && board[0][1] === board[0][2])) ||
         ((mark === board[1][0]) && (board[1][0] === board[1][1] && board[1][1] === board[1][2])) ||
         ((mark === board[2][0]) && (board[2][0] === board[2][1] && board[2][1] === board[2][2])) ||
         ((mark === board[0][0]) && (board[0][0] === board[1][0] && board[1][0] === board[2][0])) ||
         ((mark === board[0][1]) && (board[0][1] === board[1][1] && board[1][1] === board[2][1])) ||
         ((mark === board[0][2]) && (board[0][2] === board[1][2] && board[1][2] === board[2][2]))
         ) { return true };

    return false;
  }

  return {
    getBoard, // not used
    markCell,
    isCellOccupied,
    isBoardFull,
    isWinner,
    clearBoard
  }
})();


// --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> 
const GameController = (function() {
  let playerTurn = 'X';
  let redXScore = 0;
  let blue0Score = 0;


  const changePlayerTurn = () => {
    playerTurn = playerTurn === 'X' ? '0' : 'X';
  }


  const getPlayerTurn = () => {
    return playerTurn;
  }

  // const isWinner = (mark) => {
  //   const board = GameBoard.getBoard();
  //   if ( ((mark === board[0][0]) && (board[0][0] === board[1][1] && board[1][1] === board[2][2])) || 
  //        ((mark === board[0][2]) && (board[0][2] === board[1][1] && board[1][1] === board[2][0])) ||
  //        ((mark === board[0][0]) && (board[0][0] === board[0][1] && board[0][1] === board[0][2])) ||
  //        ((mark === board[1][0]) && (board[1][0] === board[1][1] && board[1][1] === board[1][2])) ||
  //        ((mark === board[2][0]) && (board[2][0] === board[2][1] && board[2][1] === board[2][2])) ||
  //        ((mark === board[0][0]) && (board[0][0] === board[1][0] && board[1][0] === board[2][0])) ||
  //        ((mark === board[0][1]) && (board[0][1] === board[1][1] && board[1][1] === board[2][1])) ||
  //        ((mark === board[0][2]) && (board[0][2] === board[1][2] && board[1][2] === board[2][2]))
  //        ) { return true };

  //   return false;
  // }


  const getRoundStatus = () => {
    if (GameBoard.isWinner(player1.getMark())) {
      return 'red';
    } else if (GameBoard.isWinner(player2.getMark())) {
      return 'blue';
    } else if (GameBoard.isBoardFull()) {
      return 'draw';
    } else {
      return null;
    }
  }


  const updateScore = () => {
    if (getRoundStatus() === 'red') {
      redXScore++;
    } else if (getRoundStatus() === 'blue') {
      blue0Score++;
    }
  }


  const getScore = () => {
    return [redXScore, blue0Score];
  }


  const clearRound = () => {
    getRoundStatus() === 'red' ? playerTurn = 'X' : playerTurn = '0';
    updateScore();
    GameBoard.clearBoard();
  }


  const resetGame = () => {
    playerTurn = 'X';
    redXScore = 0;
    blue0Score = 0;
    GameBoard.clearBoard();
  }

  return {  
    getPlayerTurn,
    changePlayerTurn,
    getRoundStatus,
    getScore,
    clearRound,
    resetGame
  }
})();


// --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> 
function Player(playerMark) {
  const mark = playerMark;


  const getMark = () => {
    return mark;
  }


  const markCell = (row, col) => {
    if (GameController.getPlayerTurn() === mark && GameBoard.isCellOccupied(row, col) === false) {
      GameBoard.markCell(mark, row, col);
      GameController.changePlayerTurn();
    } else {
      console.log('Something is wrong');
    }
  }
  
  return {
    markCell,
    getMark // not used
  }
}


// --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> --> 
const DisplayController = (function() {
  const boardBoxes = document.querySelectorAll('.gameboard-square');
  const redScore = document.querySelector('.red-score');
  const blueScore = document.querySelector('.blue-score');
  const announcements = document.querySelector('.announcements');
  const resetBtn = document.querySelector('.reset-btn');


  const onHover = (target) => {
    target.addEventListener('mouseenter', () => {
      if (GameController.getPlayerTurn() === 'X' && target.textContent === '') {
        target.textContent = 'X';
        target.style.color = 'red';
        target.style.backgroundColor = 'rgba(255, 0, 0, 0.071)';
      } else if (GameController.getPlayerTurn() === '0' && target.textContent === '') {
        target.textContent = '0';
        target.style.color = 'blue';
        target.style.backgroundColor = 'rgba(0, 0, 255, 0.071)';
      }
    })

    target.addEventListener('mouseleave', () => {
     if (!GameBoard.isCellOccupied(target.id[1], target.id[3])) {
      target.textContent = '';
      target.style.color = '';
      target.style.backgroundColor = 'rgb(187, 187, 187)';
     }
      
    })
    
  }


  const onClick = (target) => {
    target.addEventListener('click', () => {
      if (markBox(target)) { // if box was marked
        if (GameController.getPlayerTurn() === 'X') {
          player1.markCell(target.id[1], target.id[3]); 
        } else {
          player2.markCell(target.id[1], target.id[3]);
        }

        if (GameController.getRoundStatus() != null) {
          updateAnnouncements();
          GameController.clearRound();
          clearBoxes();
          updateScore();
        }
      }
    });
  }

  
  const markBox = (target) => {
    if (!GameBoard.isCellOccupied(target.id[1], target.id[3])) {
      target.textContent = GameController.getPlayerTurn();
      if ( GameController.getPlayerTurn() === 'X' ) {
        target.style.cssText = "color: red";
      } else {
        target.style.cssText = "color: blue";
      }

      return true;
    }
    return false;
  }

  
  const clearBoxes = () => {
    for (let box of boardBoxes) {
      box.textContent = '';
    }
  }

  
  const updateScore = () => {
    redScore.textContent = GameController.getScore()[0];
    blueScore.textContent = GameController.getScore()[1];
  }

  
  const updateAnnouncements = () => {
    if (GameController.getRoundStatus() === 'red') {
      announcements.textContent = 'X (Red) has won!';
    } else if (GameController.getRoundStatus() === 'blue') {
      announcements.textContent = '0 (Blue) has won!';
    } else if (GameController.getRoundStatus() === 'draw') {
      announcements.textContent = 'Draw!';
    }

    setTimeout(() => {
      announcements.textContent = '';
    }, 3000)
  }

  
  const setBoxesEventListeners = () => {
    for (let box of boardBoxes) {
      onClick(box);
      onHover(box);
    }
  }

  
  const setResetBtnEventListener = () => {
    resetBtn.addEventListener('click', () => {
      GameController.resetGame();
      clearBoxes();
      updateScore();
      updateAnnouncements();
    });
  }

  
  const runGameUI = () => {
    setBoxesEventListeners();
    setResetBtnEventListener();
  }

  return {
    runGameUI
  }
})();



const player1 = Player('X');
const player2 = Player('0');

DisplayController.runGameUI();  