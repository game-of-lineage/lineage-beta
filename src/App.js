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

const aliveCells = new Set();

const App = ({ name }) => {

  const [BOARD_HEIGHT, SET_BOARD_HEIGHT] = useState(40)
  const [BOARD_WIDTH, SET_BOARD_WIDTH] = useState(80)

  const [initialBoardState, setInitialBoardState] = useState(
    new Array(BOARD_WIDTH*BOARD_HEIGHT).fill(0)
  );
  const [boardState, setBoardState] = useState(
    new Array(BOARD_WIDTH*BOARD_HEIGHT).fill(0)
  );

  const [tick, setTick] = useState(true);
  const [timer, setTimer] = useState(1000);
  const [play, setPlay] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [squareClicked, setSquareClicked] = useState(false);

  
  useEffect(() => {
    if (play) {
      setBoardState(runGame(boardState, aliveCells, BOARD_HEIGHT, BOARD_WIDTH));
      setTimeout(() => {
        setGeneration(generation + 1);
        setTick(!tick);
      }, timer);
    }
  }, [tick, play]);

  useEffect(() => {
    aliveCells.clear();
    if (play) setInitialBoardState([...boardState]);
  }, [play]);

  const handleSquareClick = useCallback(
    (row, col) => {
      if (!play) {
        aliveCells.clear();
        const pos = col + row * BOARD_WIDTH
        let newBoardState = [...boardState];
        newBoardState[pos] = newBoardState[pos] ? 0 : Math.ceil(Math.random()*24);
        setSquareClicked(!squareClicked);
        setBoardState(newBoardState);
      }
    },
    [squareClicked, play]
  );

  const rows = []

  for(let i = 0; i < BOARD_HEIGHT; i++){
    const left = i * BOARD_WIDTH
    const right = i * BOARD_WIDTH + BOARD_WIDTH
    rows.push(
    <SquareRow
      row={boardState.slice(left, right)}
      key={i}
      BOARD_WIDTH={BOARD_WIDTH}
      BOARD_HEIGHT={BOARD_HEIGHT}
      rowIndex={i}
      handleSquareClick={handleSquareClick}
    />)
  }


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
        <div className="board-container">
          <div id="board">
            {rows}
          </div>
            <UserDash
              initialBoardState={initialBoardState}
              boardState={boardState}
              setInitialBoardState={setInitialBoardState}
              setBoardState={setBoardState}
            />
        </div>
      </div>
    </>
  );
};

const runGame = (grid, aliveCells, ROWS, COLS) => {
  const newBoard = [...grid]; 
  
  if (aliveCells.size) {                               // If we noted past alive cells in the Set, only check around alive cells.
    const iterator = new Set(aliveCells).values();     // Instantiate Set iterator FROM CLONED SET
    let current = iterator.next();                     // Set current to first element
    aliveCells.clear();                                // Clear original set, that's why we cloned.
    while (!current.done) {                            // Iterate through set
      const pos = Number(current.value);               // Turn stringified coordinate back into numbers
      updateCell(pos);                                 // Update Cell and neighbors.
      current = iterator.next();                       // Increment current
    }
  } else {                                             // If no set, loop through entire board.
    for (const pos in grid) updateCell(pos);
  }

  function updateCell(pos) {
    let neighborsAlive = 0;
    const tally = {}
    
    const row = Math.floor(pos / COLS)
    const col = pos % COLS

    const up = row > 0 ? row - 1 : ROWS - 1
    const down = row < ROWS - 1 ? row + 1 : 0
    const right = col < COLS - 1 ? col + 1 : 0
    const left = col > 0 ? col - 1 : COLS - 1
    
    const tallyNeighbor = (x, y) => {
      const pos = y + COLS * x
      const neighbor = grid[pos]
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
    
    
    const addNeighbors = (x, y) => {
      addNeighbor(row, col);
      addNeighbor(up, col);
      addNeighbor(up, right);
      addNeighbor(row, right);
      addNeighbor(down, right);
      addNeighbor(down, col);
      addNeighbor(down, left);
      addNeighbor(row, left);
      addNeighbor(up, left);
    };

    const addNeighbor = (x, y) => {
      const pos = y + COLS * x
      aliveCells.add(pos);
    }
    
    let alive = grid[pos];
    let child;

    if (!alive) {
      if (neighborsAlive === 3) {
        for(const key in tally){
          if (tally[key] > 1 && key !== '0') 
            child = Number(key);
        }
        newBoard[pos] = child || Math.floor(Math.random()*24)+1
        addNeighbors(row, col);
      }
      return
    }

    if (alive) {
      if (neighborsAlive === 2 || neighborsAlive === 3) {
        addNeighbors(row, col);
        return
      } 
      newBoard[pos] = 0;
      return
    }
  }
  
  return newBoard;
};

export default App;
