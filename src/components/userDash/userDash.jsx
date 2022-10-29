import * as React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./userDash.scss";
import figures from "../../utils/defaultboards";
import pasteFigure from "../../utils/pasteFigure";
import { runGame } from "../../utils/runGame";

const UserDash = ({
  boardState,
  initialBoardState,
  setBoardState,
  setInitialBoardState,
  setInitialGeneration,
  generation,
  play,
  setPlay,
  setGeneration,
}) => {
  const username = useRef(null);
  const password = useRef(null);
  const loadSlot = useRef(null);
  const saveTitle = useRef(null);

  const [random, setRandom] = useState("None");
  const [loggedIn, setLoggedIn] = useState(false);
  const [boards, setBoards] = useState([]);

  const [loggingIn, setLoggingIn] = useState(false);

  //Selects random board from lexicon.
  function randomizeBoard(event) {
    event.preventDefault();
    if (event.nativeEvent.pointerId === -1) {
      handleLogin(event);
      return false;
    } else {
      const figs = [
        "101",
        "acorn",
        "AforAll",
        "ants",
        "aVerage",
        "block",
        "beeHive",
        "b-heptomino",
        "b-heptominoShuttle",
        "diamond",
        "r-palomino",
        "tetromino",
        "loaf",
        "boat",
        "tub",
        "blinker",
        "toad",
        "beacon",
        "glider",
        "lwss",
        "mwss",
        "hwss",
        "bakery(4 loaves)",
      ];

      const rand = Math.floor(Math.random() * figs.length);
      const newBoard = pasteFigure(initialBoardState, figures[figs[rand]]);
      setRandom(figs[rand][0].toUpperCase() + figs[rand].slice(1));
      setBoardState(newBoard);
    }
  }

  const mapBoardToCurrentSize = (board) => {
    const OLD_BOARD_HEIGHT = Math.sqrt(board.length / 2)
    const OLD_BOARD_WIDTH = OLD_BOARD_HEIGHT*2
    const BOARD_HEIGHT = Math.sqrt(boardState.length / 2)
    const adjustedBoard = new Array(BOARD_HEIGHT ** 2 * 2).fill(0)
    const boardSizeOffset = BOARD_HEIGHT - OLD_BOARD_HEIGHT
    const nonZeroes = []

    for (let i = 0; i < board.length; i++){
      if(board[i]){
        const col = i % (OLD_BOARD_WIDTH)
        const row = Math.floor(i / OLD_BOARD_WIDTH)
        nonZeroes.push([col, row])
      }
    }
    for (const [col, row] of nonZeroes){
      adjustedBoard[col + boardSizeOffset + Math.floor(row+boardSizeOffset/2) * BOARD_HEIGHT * 2] = Math.ceil(Math.random() * 24)
    }
    return adjustedBoard
  }

  const handleLoad = (e) => {
    e.preventDefault();
    const idx = Number(loadSlot.current.value);
    const loadedBoard = boards[idx].board.L.map((x) => Number(x.N));
    const adjustedBoard = mapBoardToCurrentSize(loadedBoard)
    setBoardState(adjustedBoard);
    setInitialBoardState(adjustedBoard);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const board_title = saveTitle.current.value;
    const ddbFormat = {};
    ddbFormat.board_title = { S: board_title };
    const ddbBoard = boardState.map((x) => {
      const obj = {
        N: String(x),
      };
      return obj;
    });
    ddbFormat.board = {
      L: ddbBoard,
    };
    const board = ddbFormat.board;
    const username = loggedIn;
    axios
      .post(
        "https://4r6wcqxiw9.execute-api.us-east-1.amazonaws.com/prod/boards",
        {
          username,
          board_title,
          board,
        }
      )
      .then(() => {
        const updatedLoadSlots = [...boards];
        updatedLoadSlots.push(ddbFormat);
        setBoards(updatedLoadSlots);
      });
  };

  const handleLogin = (e) => {
    const usernameField = username.current.value;
    const passwordField = password.current.value;
    setLoggingIn(true);
    axios
      .post(
        "https://4r6wcqxiw9.execute-api.us-east-1.amazonaws.com/prod/users",
        {
          username: usernameField,
          password: passwordField,
        }
      )
      .then(() => {
        setLoggedIn(usernameField);
        setLoggingIn(false);
      })
      .catch((error) => {
        setLoggingIn(false);
        alert("Error Logging In", error);
      });
  };

  const handleGenerationClick = (e) => {
    e.preventDefault();
    if (play) {
      setPlay(false);
    } else {
      const nextGen = runGame(boardState);
      const gen = generation;
      setGeneration(gen + 1);
      setInitialGeneration(gen + 1);
      setBoardState(nextGen);
      setInitialBoardState(nextGen);
    }
  };
  useEffect(() => {
    if (loggedIn) {
      axios
        .get(
          `https://4r6wcqxiw9.execute-api.us-east-1.amazonaws.com/prod/boards/${loggedIn}`
        )
        .then(({ data }) => {
          setBoards(data.Items);
        });
    }
  }, [loggedIn]);

  return (
    <div className="userDash">
      <button id="generation" onClick={handleGenerationClick}>
        Generation:
        <br /> {generation}
      </button>
      {loggingIn === false ? (
        <div id="saveload">
          {loggedIn === false ? (
            <form className="loginBox">
              <div className="set">
                <label htmlFor="logintext">Username:</label>
                <input ref={username} type="text"></input>
              </div>
              <div className="set">
                <label htmlFor="password">Password:</label>
                <input ref={password} type="password"></input>
              </div>

              <button type="button" onClick={handleLogin}>
                Log In
              </button>
              <button id="randomButton" onClick={randomizeBoard}>
                Randomize:
                <br />
                {random}
              </button>
            </form>
          ) : (
            <form>
              <div className="storage">
                <div className="greeting">Hello,</div>
                <div className="greeting">&nbsp;{loggedIn}</div>
              </div>
              <div className="storage wide">
                <div className="outerSet">
                  <div className="set">
                    <label htmlFor="savefiles">Board Title:</label>
                    <input
                      placeholder="Name your board"
                      ref={saveTitle}
                    ></input>
                  </div>
                  <button
                    name="savefiles"
                    id="savebutton"
                    onClick={handleSave}
                    type="button"
                  >
                    Save
                  </button>
                </div>
                <div className="outerSet">
                  <div className="set">
                    <label htmlFor="load">Load Board:</label>
                    <select
                      name="load"
                      id="load"
                      ref={loadSlot}
                      defaultValue="default"
                    >
                      <option value="default" disabled>
                        Select Load Slot
                      </option>
                      {boards.map((board, idx) => (
                        <option key={idx} value={idx}>
                          {board.board_title.S}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button name="loadButton" onClick={handleLoad} type="button">
                    Load
                  </button>
                </div>
                <div className="set">
                  <button
                    name="randomfiles"
                    id="randomButton"
                    onClick={randomizeBoard}
                  >
                    Randomize:
                    <br />
                    {random}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div id="saveload">
          <div className="loggingIn">Logging In...</div>
        </div>
      )}
    </div>
  );
};

export default UserDash;
