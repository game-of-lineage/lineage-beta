import { hot } from 'react-hot-loader/root';
import React from "react";
import './styles.scss';
import Square from './components/Square/Square.jsx';
import SquareGrid from './components/SquareGrid/SquareGrid.jsx';
import ControlPanel from './controlPanel';
import {useState, useEffect} from 'react';
import fetch from 'node-fetch';
import UserDash from './components/userDash/userDash.jsx';

const App = ({ name }) => {
  const [userData, setUserData] = useState(null);
    return (
      <>
        <h1>
          Hello {name} nice to see you
        </h1>
        {/* just passing in an array of nine Squares for testing purposes, we will pass in the
        whole game grid once everything is connected */}
        <UserDash />
        <SquareGrid squareArray={[<Square/>,<Square/>,<Square/>,<Square/>,<Square/>,<Square/>,<Square/>,<Square/>,<Square/>]}/>
        <ControlPanel />
      </>
    );
}


export default App;