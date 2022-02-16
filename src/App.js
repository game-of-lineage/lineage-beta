import { hot } from 'react-hot-loader/root';
import React from "react";
import './styles.scss';
import Square from './components/Square/Square.jsx'
import SquareRow from './components/SquareRow/SquareRow.jsx'
import ControlPanel from './controlPanel.js'
import {useState, useEffect} from 'react';
// import runGame from './runGame.js';
import simulateBoard from './simulateBoard.js';
import UserDash from './components/userDash/userDash.jsx';

const BOARD_WIDTH = 80
const BOARD_HEIGHT = 40

const App = ({ name }) => {
  // Version without simulation - commented out.
  //const [initialBoardState, setInitialBoardState] = useState((new Array(50).fill(new Array(100).fill(0)));
  //const [boardState, setBoardState] = useState((new Array(50).fill(new Array(100).fill(0)));
  const [initialBoardState, setInitialBoardState] = useState(simulateBoard(new Array(BOARD_HEIGHT).fill(new Array(BOARD_WIDTH).fill(0))));
  const [boardState, setBoardState] = useState(simulateBoard(new Array(BOARD_HEIGHT).fill(new Array(BOARD_WIDTH).fill(0))));
  const [tick, setTick] = useState(true)
  const [timer, setTimer] = useState(1000)
  const [play, setPlay] = useState(false)
  const [generation, setGeneration] = useState(0)

  const lastGen = new Set()

  useEffect(() => {
    if(play) {
      const newBoardState = runGame(boardState, lastGen)
      setBoardState(newBoardState);
      setTimeout(()=>{
        setGeneration(generation + 1)
        setTick(!tick)
      }, timer);
    }
  }, [tick, play]);

  useEffect(()=> {
    if(play) setInitialBoardState(boardState.map((row)=>[...row]))
  }, [play])

   return (
      <>
        <div id='main'>
          <ControlPanel initialBoardState={initialBoardState} setBoardState={setBoardState} setTimer={setTimer} timer={timer} setPlay={setPlay} play={play}/>
          <div id='board'>
            {boardState.map((row, idx) =>
            <SquareRow row={row} style={{height: `${100/boardState.length}%`}} key={idx} rowIndex={idx} boardState={boardState} setBoardState={setBoardState}/>)}
          </div>
        </div>
        <div id='footer'>
          <UserDash initialBoardState={initialBoardState} boardState={boardState} setInitialBoardState={setInitialBoardState} setBoardState={setBoardState}/>
        </div>
      </>
    );
}

const runGame = (grid, lastGen) => {
  /* Constants */
  const newBoard = new Array(BOARD_HEIGHT).fill(new Array(BOARD_WIDTH).fill(0));

  const ROWS = grid.length;
  const COLS = grid[0].length;
  
  // On load of this script, periodically regenerate the grid.
  calculateNewGen(grid);
  
  // Update each Cell's nextGen value so that a new grid can be printed.
  function calculateNewGen(grid) {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        updateCell(row, col);
      }
    }
  }
  
  // Function calculates number of neighbors (8) that are 1s. Based on number of neighbors,
  // this function sets the aliveNextGen value of the cell.
  function updateCell(row, col) {
    let alive = grid[row][col];
    let neighborsAlive = 0;

    if(row < ROWS-1 && col < COLS-1) neighborsAlive += grid[row+1][col+1]

    if(col < COLS-1) neighborsAlive += grid[row][col+1]
    if(row < ROWS-1) neighborsAlive += grid[row+1][col]

    if(col < COLS-1 && row > 0) neighborsAlive += grid[row-1][col+1]
    if(row < ROWS-1 && col > 0) neighborsAlive += grid[row+1][col-1]
    
    if(col > 0) neighborsAlive += grid[row][col-1]
    if(row > 0) neighborsAlive += grid[row-1][col]

    if(row > 0 && col > 0) neighborsAlive += grid[row-1][col-1]
    
    // If dead
    if (!alive) newBoard[row][col] = neighborsAlive === 3 ? 1 : 0;
    // If alive
    if (alive) newBoard[row][col] = (neighborsAlive === 2 || neighborsAlive === 3) ? 1 : 0;
  }
  return newBoard;
}

export default App;