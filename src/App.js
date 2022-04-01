import React from "react";
import "./styles.scss";
import SquareRow from "./components/SquareRow/SquareRow.jsx";
import ControlPanel from "./components/ControlPanel/controlPanel.jsx";
import { useState, useEffect, useCallback } from "react";
import UserDash from "./components/userDash/userDash.jsx";
import {runGame, clearCells} from "./utils/runGame";

const App = () => {
  const [BOARD_SIZE, SET_BOARD_SIZE] = useState(30);

  const [initialBoardState, setInitialBoardState] = useState(
    new Array(1800).fill(0)
  );
  const [initialGeneration, setInitialGeneration] = useState(0)
  const [boardState, setBoardState] = useState(
    new Array(1800).fill(0)
  );

  const [tick, setTick] = useState(true);
  const [timer, setTimer] = useState(1000);
  const [play, setPlay] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [squareClicked, setSquareClicked] = useState(false);
  const [tickId, setTickId] = useState(false)
  const [resetClicked, setResetClicked] = useState(false)

  useEffect(() => {
    if (play) {
      setBoardState(
        runGame(boardState)
      );
      const id = setTimeout(() => {
        setGeneration(generation + 1);
        setTick(!tick);
      }, timer);
      setTickId(id)
    } else {
      clearTimeout(tickId)
    }
  }, [tick, play]);

  // PAUSE/PLAY - Clears cached cells for algo optimization
  // On Play "saves" initial board state, for future reset.
  useEffect(() => {
    clearCells()
    if (play) {
      setInitialGeneration(generation)
      setInitialBoardState([...boardState]);
    }
  }, [play]);

  // Board Size Changes - pause game, reset generation, reset board with new size.
  useEffect(() => {
    setPlay(false);
    setGeneration(0);
    setInitialGeneration(0)
    const adjustedBoard = new Array(BOARD_SIZE ** 2 * 2).fill(0)
    const nonZeroes = []
    const boardWidth = Math.sqrt(boardState.length / 2) * 2
    const boardSizeOffset = BOARD_SIZE - boardWidth/2
    for (let i = 0; i < boardState.length; i++){
      if(boardState[i] !== 0){
        const col = i % boardWidth
        const row = Math.floor(i / boardWidth)
        nonZeroes.push([col, row])
      }
    }
    for (const [col, row] of nonZeroes){
      adjustedBoard[col + boardSizeOffset + (row+boardSizeOffset/2) * BOARD_SIZE * 2] = Math.floor(Math.random() * 24) + 1
    }
    setBoardState([...adjustedBoard]);
    setInitialBoardState([...adjustedBoard]);
  }, [BOARD_SIZE]);

  // useCallBack for square clicks, 
  // to prevent unneccesary rerenders when this function gets redefined

  const handleSquareClick = useCallback(
    (row, col) => {
      if (!play) {
        clearCells()
        const pos = col + row * BOARD_SIZE * 2;
        let newBoardState = [...boardState];
        newBoardState[pos] = newBoardState[pos]
          ? 0
          : Math.ceil(Math.random() * 24);
        setSquareClicked(!squareClicked);
        setBoardState(newBoardState);
      }
    },
    [squareClicked, play, BOARD_SIZE, initialBoardState, resetClicked]
  );

  const rows = [];

  for (let i = 0; i < BOARD_SIZE; i++) {
    const width = BOARD_SIZE * 2;
    const left = i * width;
    const right = i * width + width;
    rows.push(
      <SquareRow
        row={boardState.slice(left, right)}
        key={i}
        BOARD_SIZE={BOARD_SIZE}
        rowIndex={i}
        handleSquareClick={handleSquareClick}
      />
    );
  }
  return (
    <>
      <div id="main">
        <ControlPanel
          initialBoardState={initialBoardState}
          setBoardState={setBoardState}
          initialGeneration={initialGeneration}
          setInitialGeneration={setInitialGeneration}
          setTimer={setTimer}
          timer={timer}
          setPlay={setPlay}
          play={play}
          generation={generation}
          setGeneration={setGeneration}
          BOARD_SIZE={BOARD_SIZE}
          SET_BOARD_SIZE={SET_BOARD_SIZE}
          resetClicked={resetClicked}
          setResetClicked={setResetClicked}
        />
        <div className="board-container">
          <div id="board">{rows}</div>
          <UserDash
            initialBoardState={initialBoardState}
            boardState={boardState}
            setInitialBoardState={setInitialBoardState}
            setInitialGeneration={setInitialGeneration}
            initialGeneration={initialGeneration}
            setBoardState={setBoardState}
            generation={generation}
            setGeneration={setGeneration}
            play={play}
            setPlay={setPlay}
          />
        </div>
      </div>
    </>
  );
};



export default App;
