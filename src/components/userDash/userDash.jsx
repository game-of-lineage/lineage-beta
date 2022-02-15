import * as React from 'react';
import { useState, useEffect } from 'react';
import './userDash.scss';
import { Button, Menu, MenuItem, Fade } from '@mui/material';
import fetch from 'node-fetch';

const UserDash = ({boardState, initialBoardState, setBoardState, setInitialBoardState}) => {

  const [loadSlot, setLoadSlot] = useState(null);
  const [saveSlot, setSaveSlot] = useState(null);

  function selectSave(event) {
    event.preventDefault();
    setSaveSlot(event.target.value);
    console.log('Currently selected save slot is now ' + event.target.value);
  }

  async function saveBoard(event) {
    event.preventDefault();
    console.log('Here is the current board state');
    console.log(boardState);
    console.log('Saving the board state to slot ' + saveSlot);
    const save = await fetch('http://localhost:3000/api/boards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(boardState)
    }).then((response) => response.json())
    .then((data) => console.log('Finished fetching.'));
  }

  function selectLoad(event) {
    event.preventDefault();
    setLoadSlot(event.target.value);
    console.log('Currently selected load slot is now ' + event.target.value);
  }

  async function loadBoard(event) {
    event.preventDefault();
    console.log('Loading board now.');
    console.log('fetching a random fig');
    const figs = ["block", "bee-hive", "loaf", "boat", "tub", "blinker", "toad", "beacon", "glider", "lwss", "mwss", "hwss"];
    const currentFigNum = Math.round(Math.random() * 12);
    await fetch(`http://localhost:3000/api/boards/${figs[currentFigNum]}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setBoardState(data)
    });
  }

  function submitBoard(event) {
    event.preventDefault();
    console.log('Submitting board...');
    console.log(event.target.value);
  }


  async function uploadBoard(event) {
    event.preventDefault();
    console.log('Uploading board to server. ' + event.target);
    await await fetch('http://localhost:3000/api/boardsLex', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(boardState)
    }).then((response) => response.json())
    .then((data) => console.log(data));
  }


  const slots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const saveoptions = slots.map((num) => {
   return ( <option value={num} class='options' key={num}>
      Save To Slot {num}
    </option>)
  });
  const loadoptions = slots.map((num) => {
    return (<option value={num} class='options' key={num + 10}>
      Load Slot {num}
    </option>)
  });

  return (
    <div>
      <form id='saveload'>
        <span>Name: Squirtle</span>
        <br />
        <span>
          <label for='save'>Save Board:</label>
          <select name='savefiles' id='save' onChange={selectSave}>
            <option value=''>
              Select a Slot to Save To
            </option>
            {saveoptions}
          </select>
          <button name='savefiles' id='savebutton' onClick={saveBoard} type="button">
            Save
          </button>
        </span>
        <span>
          <label for='load'>Load Board:</label>
          <select name='loadfiles' id='load' onChange={selectLoad}>
            <option value=''>
              Select a File to Load
            </option>
            {loadoptions}
          </select>
          <button name='loadfiles' id='load' onClick={loadBoard}>Randomize</button>
        </span>
        <span>
          <label for='upload'>Upload Board:</label>
          <button name='uploadfiles' id='upload' onClick={uploadBoard}>
            Upload
          </button>
        </span>
      </form>
    </div>
  );
};

export default UserDash;
