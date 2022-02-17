import { hot } from "react-hot-loader/root";
import React from "react";
import "./styles.scss";
import Square from "./components/Square/Square.jsx";
import SquareRow from "./components/SquareRow/SquareRow.jsx";
import ControlPanel from "./components/ControlPanel/controlPanel.jsx";
import { useState, useEffect, useCallback } from "react";
// import runGame from './runGame.js';
import simulateBoard from "./utils/simulateBoard.js";
import UserDash from "./components/userDash/userDash.jsx";

const BOARD_WIDTH = 60;
const BOARD_HEIGHT = 30;
const aliveCells = new Set();

const App = ({ name }) => {
  // Version without simulation - commented out.
  //const [initialBoardState, setInitialBoardState] = useState((new Array(50).fill(new Array(100).fill(0)));
  //const [boardState, setBoardState] = useState((new Array(50).fill(new Array(100).fill(0)));
  const [initialBoardState, setInitialBoardState] = useState(
    simulateBoard(new Array(BOARD_HEIGHT).fill(new Array(BOARD_WIDTH).fill(0)))
  );
  const [boardState, setBoardState] = useState(
    simulateBoard(new Array(BOARD_HEIGHT).fill(new Array(BOARD_WIDTH).fill(0)))
  );

  const [tick, setTick] = useState(true);
  const [timer, setTimer] = useState(1000);
  const [play, setPlay] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [squareClicked, setSquareClicked] = useState(false);

  useEffect(() => {
    if (play) {
      const newBoardState = runGame(boardState, aliveCells);
      setBoardState(newBoardState);
      setTimeout(() => {
        setGeneration(generation + 1);
        setTick(!tick);
      }, timer);
    }
  }, [tick, play]);

  useEffect(() => {
    aliveCells.clear();
    if (play) setInitialBoardState(boardState.map((row) => [...row]));
  }, [play]);

  const handleSquareClick = useCallback(
    (row, col) => {
      if (!play) {
        aliveCells.clear();
        let newBoardState = boardState.map((row) => [...row]);
        newBoardState[row][col] = newBoardState[row][col] ? 0 : Math.ceil(Math.random()*24);
        setSquareClicked(!squareClicked);
        setBoardState(newBoardState);
      }
    },
    [squareClicked, play]
  );

  return (
    <>
      <div id="main">
        <ControlPanel
          initialBoardState={initialBoardState}
          setBoardState={setBoardState}
          setTimer={setTimer}
          timer={timer}
          setPlay={setPlay}
          play={play}
        />
        <div id="board">
          {boardState.map((row, idx) => (
            <SquareRow
              row={row}
              key={idx}
              BOARD_WIDTH={BOARD_WIDTH}
              BOARD_HEIGHT={BOARD_HEIGHT}
              rowIndex={idx}
              handleSquareClick={handleSquareClick}
            />
          ))}
        </div>
      </div>
      <div id="footer">
        <UserDash
          initialBoardState={initialBoardState}
          boardState={boardState}
          setInitialBoardState={setInitialBoardState}
          setBoardState={setBoardState}
        />
      </div>
    </>
  );
};

const runGame = (grid, aliveCells) => {
  /* Constants */
  const newBoard = grid.map((row) => [...row]);

  const ROWS = grid.length;
  const COLS = grid[0].length;

  // Update each Cell's nextGen value so that a new grid can be printed.
  //If we noted past alive cells in the Set, only check around alive cells.
  if (aliveCells.size) {
    // instantiate Set iterator FROM CLONED SET
    const iterator = new Set(aliveCells).values();
    // set current to iterator.next() *the first element in the set*
    let current = iterator.next();
    // Clear original set, that's why we cloned.
    aliveCells.clear();
    //iterate through set
    while (!current.done) {
      // turn stringified coordinate back into numbers
      const strings = current.value.split(",");
      const row = Number(strings[0]);
      const col = Number(strings[1]);

      // update Cell and neighbors.
      updateCell(row, col);

      //increment current
      current = iterator.next();
    }
    //if no set, loop through entire board.
  } else {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        updateCell(row, col);
      }
    }
  }

  // Function calculates number of neighbors (8) that are 1s. Based on number of neighbors,
  // this function sets the aliveNextGen value of the cell.
  function updateCell(row, col) {

    let neighborsAlive = 0;
    const tally = {}
    
    const up = row > 0 ? row - 1 : ROWS - 1
    const down = row < ROWS - 1 ? row + 1 : 0
    const right = col < COLS - 1 ? col + 1 : 0
    const left = col > 0 ? col - 1 : COLS - 1
    
    const tallyNeighbor = (x, y) => {
      const neighbor = grid[x][y]
      if (neighbor in tally) tally[neighbor]++
      else tally[neighbor] = 1
      neighborsAlive += neighbor ? 1 : 0
    }

    tallyNeighbor(up, col)
    tallyNeighbor(up, right)
    tallyNeighbor(row, right)
    tallyNeighbor(down, right)
    tallyNeighbor(down, col)
    tallyNeighbor(down, left)
    tallyNeighbor(row, left)
    tallyNeighbor(up, left)
    
    
    const addNeighbors = (row, col) => {
      aliveCells.add(`${row},${col}`);
      aliveCells.add(`${up},${col}`);
      aliveCells.add(`${up},${right}`);
      aliveCells.add(`${row},${right}`);
      aliveCells.add(`${down},${right}`);
      aliveCells.add(`${down},${col}`);
      aliveCells.add(`${down},${left}`);
      aliveCells.add(`${row},${left}`);
      aliveCells.add(`${up},${left}`);
    };
    
    let alive = grid[row][col];
    let child;

    // If dead
    if (!alive) {
      if (neighborsAlive === 3) {
        for(const key in tally){
          if (tally[key] > 1 && key !== '0') 
            child = Number(key);
        }
        newBoard[row][col] = child || Math.floor(Math.random()*24)+1
        addNeighbors(row, col);
      }
      return
    }

    // If alive
    if (alive) {
      if (neighborsAlive === 2 || neighborsAlive === 3) {
        addNeighbors(row, col);
        return
      } 
      newBoard[row][col] = 0;
      return
    }
  }
  
  return newBoard;
};

export default App;
