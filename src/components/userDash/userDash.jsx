import * as React from 'react';
import { useState, useEffect } from 'react';
import './userDash.scss';
import { Button, Menu, MenuItem, Fade } from '@mui/material';
import fetch from 'node-fetch';

const UserDash = ({ boardState, initialBoardState, setBoardState, setInitialBoardState }) => {
  const [loadSlot, setLoadSlot] = useState(null);
  const [saveSlot, setSaveSlot] = useState(null);
  const [userCookie, setUserCookie] = useState(null);
  // const [user, setUser] = useState(null);
  // const [password, setPassword] = useState(null);

  function selectSave(event) {
    event.preventDefault();
    setSaveSlot(event.target.value);
    // console.log('Currently selected save slot is now ' + event.target.value);
  }

  //Saves boards to user's slots.
  function saveBoard(event) {
    event.preventDefault();
    // console.log('Here is the current board state');
    // console.log(boardState);
    // console.log('Saving the board state to slot ' + saveSlot);

    const postObj = {
      board: boardState,
      saveSlot: saveSlot
    }

    const save = fetch('http://localhost:3000/api/boards', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postObj),
    })
      .then((response) => response.json())
      // .then((data) => console.log('Finished posting.'));
  }

  function loadBoard(event) {
    event.preventDefault();
    console.log(loadSlot);
    fetch(`http://localhost:3000/api/boardsGet`, {
      //Changing to POST, since cookies aren't sent on get
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({loadSlot: loadSlot})
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.parse(data));
        console.log(typeof JSON.parse(data));
        console.log(Array.isArray(JSON.parse(data)));
        setBoardState(JSON.parse(data));
      });
  }

  function handleLogin(event) {
    // // console.log(event.target.form[0].value);
    const username = event.target.form[0].value;
    const password = event.target.form[1].value;
    fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Finished fetching');
        // console.log(data);
        // console.log('cookie');
        // console.log(document.cookie.slice(7));
        setUserCookie(document.cookie.slice(7));
      })
      .catch((err) => {
        // console.log('Hit an error');
        // console.log(err);
      });
  }

  //Selects load slot
  function selectLoad(event) {
    event.preventDefault();
    setLoadSlot(event.target.value);
    // console.log('Currently selected load slot is now ' + event.target.value);
  }



  //Selects random board from lexicon.
  async function randomizeBoard(event) {
    event.preventDefault();
    // console.log('Loading board now.');
    // console.log('fetching a random fig');
    const figs = ['block', 'bee-hive', 'loaf', 'boat', 'tub', 'blinker', 'toad', 'beacon', 'glider', 'lwss', 'mwss', 'hwss'];
    const currentFigNum = Math.round(Math.random() * 12);
    await fetch(`http://localhost:3000/api/randomize/${figs[currentFigNum]}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setBoardState(data);
      });
  }




  //Loads from lexicon.
  function loadBoard2(event) {
    event.preventDefault();
    // console.log('Loading board now.');
    fetch(`http://localhost:3000/api/load/${loadSlot}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setBoardState(data);
      });
  }

  //Uploads to Lexicon.
  function submitBoard(event) {
    event.preventDefault();
    // console.log('Submitting board...');
    // console.log(event.target.value);
  }

  //Uploads to Lexicon.
  async function uploadBoard(event) {
    event.preventDefault();
    // console.log('Uploading board to server. ' + event.target);
    await await fetch('http://localhost:3000/api/boardsLex', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(boardState),
    })
      .then((response) => response.json())
      // .then((data) => console.log(data));
  }

  const slots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const saveoptions = slots.map((num) => {
    return (
      <option value={num} class='options' key={num}>
        Save To Slot {num}
      </option>
    );
  });
  const loadoptions = slots.map((num) => {
    return (
      <option value={num} class='options' key={num + 10}>
        Load Slot {num}
      </option>
    );
  });

  return (
    <div id='saveload'>
      {' '}
      {!userCookie ? (
        <form className='loginBox'>
            <div className='set'>
              <label htmlFor='logintext'>Username:</label>
              <input type='text'></input>
            </div>
            <div className='set'>
              <label htmlFor='password'>Password:</label>
              <input type='password'></input>
            </div>
            
            <button type='button' onClick={handleLogin}>
              Log In
            </button>
            <div className='set'>
              <button name='randomfiles' id='randomButton' onClick={randomizeBoard}>
                Randomize
              </button>
            </div>
        </form>
      ) : (
        <form>
          <div className='storage' >
            <div className='greeting'>Hello,</div>
            <div className='greeting'>&nbsp;{userCookie}</div>
          </div>
          <br />
          <div className='storage wide'>
            <div className='outerSet'>
              <div className='set'>
                <label htmlFor='save'>Save Board:</label>
                <select name='savefiles' id='save' onChange={selectSave} defaultValue='default'>
                  <option value='default' disabled>Select Save Slot</option>
                  {saveoptions}
                </select>
              </div>
              <button name='savefiles' id='savebutton' onClick={saveBoard} type='button'>
                Save
              </button>
            </div>
            <div className='outerSet'>
              <div className='set'>
                <label htmlFor='load'>Load Board:</label>
                <select name='load' id='load' onChange={selectLoad} defaultValue='default'>
                  <option value='default' disabled>Select Load Slot</option>
                  {loadoptions}
                </select>
              </div>
              <button name='loadButton' type='button' onClick={loadBoard}>Load</button>
            </div>
          </div>
          <div className='storage'>
            <div className='set'>
              {/* <label htmlFor='random'>Randomize:</label> */}
              <button name='randomfiles' id='randomButton' style={{marginTop: "auto"}} onClick={randomizeBoard}>
                Randomize
              </button>
            </div>
            <div className='set'>
              {/* <label htmlFor='upload'>Upload Board:</label> */}
              <button name='uploadfiles' id='upload' style={{marginTop: "auto"}} onClick={uploadBoard}>
                Upload
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserDash;
