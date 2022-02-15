import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import './userDash.scss';
import {Button, Menu, MenuItem, Fade} from '@mui/material';

const UserDash = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const saveoptions = nums.map((num) =>
    <option>Save To Slot {num}</option>
  );
  const loadoptions = nums.map((num) =>
  <option>Load Slot {num}</option>)
    return (
        <div><form>
            <span>Name: Squirtle</span><br />
            <label for="save">Save Board:</label><select name="savefiles" id="save">
              <option value="">Select a Slot to Save To</option>
              {saveoptions}
              </select>
            <span><label for="load">Load Board:</label><select name="loadfiles" id="load">
              <option value="">Select a File to Load</option>
              {loadoptions}
              </select></span>
        </form></div>
    )
}

export default UserDash;