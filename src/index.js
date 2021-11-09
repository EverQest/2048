import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      board: null,
      message: null,
      gameOver: false
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
    
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === 0) {blankCoordinates.push([r, c])}
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
          } else {
            this.setState({board: upWithRandom});  
          }
        }
      } else if (direction === 'right') {               //RIGHT
        const movedRight = this.moveRight(this.state.board);
        if (this.boardMoved(this.state.board, movedRight.board)) {
          const rightWithRandom = this.randomplace(movedRight.board);
          
          if (this.checkForGameOver(rightWithRandom)) {
            this.setState({board: rightWithRandom, gameOver: true, message: 'Игра окончена'});
          } else {
            this.setState({board: rightWithRandom});  
          }
        }
      } else if (direction === 'down') {                //DOWN
        const movedDown = this.moveDown(this.state.board);
        if (this.boardMoved(this.state.board, movedDown.board)) {
          const downWithRandom = this.randomplace(movedDown.board);
          
          if (this.checkForGameOver(downWithRandom)) {
            this.setState({board: downWithRandom, gameOver: true, message: 'Игра окончена'});
          } else {
            this.setState({board: downWithRandom});
          }
        }
      } else if (direction === 'left') {                //LEFT
        const movedLeft = this.moveLeft(this.state.board);
        if (this.boardMoved(this.state.board, movedLeft.board)) {
          const leftWithRandom = this.randomplace(movedLeft.board);
          
          if (this.checkForGameOver(leftWithRandom)) {
            this.setState({board: leftWithRandom, gameOver: true, message: 'Игра окончена'});  
          } else {
            this.setState({board: leftWithRandom});
          }
        }
      }
    } 
  }
  
  moveUp(inputBoard) {
    let rotatedRight = this.rotateRight(inputBoard);
    let board = [];

    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];
      for (let c = 0; c < rotatedRight[r].length; c++) {
        let current = rotatedRight[r][c];
        (current === 0) ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }


    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
         
        } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }

    board = this.rotateLeft(board);

    return {board};
  }
  
  moveRight(inputBoard) {
    let board = [];



    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];      
      for (let c = 0; c < inputBoard[r].length; c++) {
        let current = inputBoard[r][c];
        (current === 0) ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }

    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
        
        } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }

    return {board};
  }
  
  moveDown(inputBoard) {
    let rotatedRight = this.rotateRight(inputBoard);
    let board = [];
   


    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];      
      for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
        let current = rotatedRight[r][c];
        (current === 0) ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }


    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
      
        } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }


    board = this.rotateLeft(board);

    return {board};
  }
  
  moveLeft(inputBoard) {
    let board = [];
   


    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];      
      for (let c = inputBoard[r].length - 1; c >= 0; c--) {
        let current = inputBoard[r][c];
        (current === 0) ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }


    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
        
        } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }
    
    return {board};
  }
  
  rotateRight(matrix) {
    let result = [];
	
  	for (let c = 0; c < matrix.length; c++) {
	  	let row = [];
	  	for (let r = matrix.length - 1; r >= 0; r--) {
			  row.push(matrix[r][c]);
		  }
      result.push(row);
	  }
	
	  return result;
  }
  
  rotateLeft(matrix) {
  	let result = [];

    for (let c = matrix.length - 1; c >= 0; c--) {
      let row = [];
      for (let r = matrix.length - 1; r >= 0; r--) {
        row.unshift(matrix[r][c]);
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
        
        <p>{this.state.message}</p>
      </div>
    );
  }
};

const Row = ({ row }) => {
  return (
    <tbody>
    <tr>
      {row.map((cell, i) => (<Cell key={i} cellValue={cell} />))}
    </tr>
    </tbody>
  );
};

const Cell = ({ cellValue }) => {
  let color = 'cell';
  let value = (cellValue === 0) ? '' : cellValue;
  if (value) {
    color += ` color-${value}`;
  }

  return (
    <td>
      <div className={color}>
        <div className="number">{value}</div>
      </div>
    </td>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));