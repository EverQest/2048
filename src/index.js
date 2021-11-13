import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Row} from './row.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      board: null,
      message: null,
      gameOver: false,
      points: 0
    };
  }
  
  initBoard() {
    let board = 
    [[0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]];

    board = this.randomplace(this.randomplace(board));
    this.setState({board, gameOver: false, message: null});
  }

  getBlankCoord(board) {
    const blankCoordinates = [];
    
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {blankCoordinates.push([i, j])}
      }
    }
            
    return blankCoordinates;
  }
  

  randomStartingNumber() {
    const startingNumbers = [2,4];
    const randomNumber = startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
    return randomNumber;
  }
  
//randomcord
  randomplace(board) {
    const blankCoordinates = this.getBlankCoord(board);
    const randomCoordinate = blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
    const randomNumber = this.randomStartingNumber();
    board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
    return board;
  }

  boardMoved(original, updated) {
    return (JSON.stringify(updated) !== JSON.stringify(original)) ? true : false; //new = true
  }

  

  move(direction) {
    if (!this.state.gameOver) {
      if (direction === 'up') {                         //UP
        const movedUp = this.moveUp(this.state.board);
        
        if (this.boardMoved(this.state.board, movedUp.board)) {
          const upWithRandom = this.randomplace(movedUp.board);
          
          if (this.checkForGameOver(upWithRandom)) {
            this.setState({board: upWithRandom, gameOver: true, message: 'Игра окончена'});
          }else {
            this.setState({board: upWithRandom, points: this.state.points += movedUp.points});  
          }
        }
      } else if (direction === 'right') {               //RIGHT
        const movedRight = this.moveRight(this.state.board);
        if (this.boardMoved(this.state.board, movedRight.board)) {
          const rightWithRandom = this.randomplace(movedRight.board);
          
          if (this.checkForGameOver(rightWithRandom)) {
            this.setState({board: rightWithRandom, gameOver: true, message: 'Игра окончена'});
          } else {
            this.setState({board: rightWithRandom, points: this.state.points += movedRight.points});  
          }
        }
      } else if (direction === 'down') {                //DOWN
        const movedDown = this.moveDown(this.state.board);
        if (this.boardMoved(this.state.board, movedDown.board)) {
          const downWithRandom = this.randomplace(movedDown.board);
          
          if (this.checkForGameOver(downWithRandom)) {
            this.setState({board: downWithRandom, gameOver: true, message: 'Игра окончена'});
          } else {
            this.setState({board: downWithRandom, points: this.state.points += movedDown.points});
          }
        }
      } else if (direction === 'left') {                //LEFT
        const movedLeft = this.moveLeft(this.state.board);
        if (this.boardMoved(this.state.board, movedLeft.board)) {
          const leftWithRandom = this.randomplace(movedLeft.board);
          
          if (this.checkForGameOver(leftWithRandom)) {
            this.setState({board: leftWithRandom, gameOver: true, message: 'Игра окончена'});  
          } else {
            this.setState({board: leftWithRandom, points: this.state.points += movedLeft.points});
          }
        }
      }
    } 
  }
  
  moveUp(inputBoard) {
    let rotatedRight = this.rotateRight(inputBoard);
    let board = [];
    let points = 0;
    for (let i = 0; i < rotatedRight.length; i++) {
      let row = [];
      for (let j = 0; j < rotatedRight[i].length; j++) {
        let current = rotatedRight[i][j];
        (current === 0) ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }


    for (let i = 0; i < board.length; i++) {
      for (let j = board[i].length - 1; j >= 0; j--) {
        if (board[i][j] > 0 && board[i][j] === board[i][j - 1]) {
          board[i][j] = board[i][j] * 2;
          board[i][j - 1] = 0;
          points += board[i][j];
        } else if (board[i][j] === 0 && board[i][j - 1] > 0) {
          board[i][j] = board[i][j - 1];
          board[i][j - 1] = 0;
        }
      }
    }

    board = this.rotateLeft(board);
    
    return {board, points};
  }
  
  moveRight(inputBoard) {
    let board = [];
    let points = 0;


    for (let i = 0; i < inputBoard.length; i++) {
      let row = [];      
      for (let j = 0; j < inputBoard[i].length; j++) {
        let current = inputBoard[i][j];
        (current === 0) ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }

    for (let i = 0; i < board.length; i++) {
      for (let j = board[i].length - 1; j >= 0; j--) {
        if (board[i][j] > 0 && board[i][j] === board[i][j - 1]) {
          board[i][j] = board[i][j] * 2;
          board[i][j - 1] = 0;
          points += board[i][j];
        } else if (board[i][j] === 0 && board[i][j - 1] > 0) {
          board[i][j] = board[i][j - 1];
          board[i][j - 1] = 0;
        }
      }
    }

    return {board, points};
  }
  
  moveDown(inputBoard) {
    let rotatedRight = this.rotateRight(inputBoard);
    let board = [];
    let points = 0;


    for (let i = 0; i < rotatedRight.length; i++) {
      let row = [];      
      for (let j = rotatedRight[i].length - 1; j >= 0; j--) {
        let current = rotatedRight[i][j];
        (current === 0) ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }


    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] > 0 && board[i][j] === board[i][j + 1]) {
          board[i][j] = board[i][j] * 2;
          board[i][j + 1] = 0;
          points += board[i][j];
        } else if (board[i][j] === 0 && board[i][j + 1] > 0) {
          board[i][j] = board[i][j + 1];
          board[i][j + 1] = 0;
        }
      }
    }


    board = this.rotateLeft(board);

    return {board, points};
  }
  
  moveLeft(inputBoard) {
    let board = [];
    let points = 0;


    for (let i = 0; i < inputBoard.length; i++) {
      let row = [];      
      for (let j = inputBoard[i].length - 1; j >= 0; j--) {
        let current = inputBoard[i][j];
        (current === 0) ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }


    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] > 0 && board[i][j] === board[i][j + 1]) {
          board[i][j] = board[i][j] * 2;
          board[i][j + 1] = 0;
          points += board[i][j];
        } else if (board[i][j] === 0 && board[i][j + 1] > 0) {
          board[i][j] = board[i][j + 1];
          board[i][j + 1] = 0;
        }
      }
    }
    
    return {board, points};
  }
  
  rotateRight(matrix) {
    let result = [];
	
  	for (let j = 0; j < matrix.length; j++) {
	  	let row = [];
	  	for (let i = matrix.length - 1; i >= 0; i--) {
			  row.push(matrix[i][j]);
		  }
      result.push(row);
	  }
	
	  return result;
  }
  
  rotateLeft(matrix) {
  	let result = [];

    for (let j = matrix.length - 1; j >= 0; j--) {
      let row = [];
      for (let i = matrix.length - 1; i >= 0; i--) {
        row.unshift(matrix[i][j]);
      }
      result.push(row);
    }

    return result;
  }
  

  checkForGameOver(board) {
    let moves = [
      this.boardMoved(board, this.moveUp(board).board),
      this.boardMoved(board, this.moveRight(board).board),
      this.boardMoved(board, this.moveDown(board).board),
      this.boardMoved(board, this.moveLeft(board).board)
    ];
    
    return (moves.includes(true)) ? false : true;
  }
  
  componentWillMount() {
    this.initBoard();  
    const body = document.querySelector('body');
    body.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
  
  handleKeyDown(keytype) {
    const up = 38;
    const right = 39;
    const down = 40;
    const left = 37
    
    
    if (keytype.keyCode === up) {
      this.move('up');
    } else if (keytype.keyCode === right) {
      this.move('right');
    } else if (keytype.keyCode === down) {
      this.move('down');
    } else if (keytype.keyCode === left) {
      this.move('left');
    }
  }
    
  render() {
    return (
      <div>        
        <div className="button" onClick={() => {this.initBoard()}}>Новая игра</div>
                
        <table>
          {this.state.board.map((row, i) => (<Row key={i} row={row} />))}
        </table>

        <div className="points" ><div>Очки: {this.state.points}</div></div>

        <p>{this.state.message}</p>
      </div>
    );
  }
};

<Row />

ReactDOM.render(<App />, document.getElementById('root'));