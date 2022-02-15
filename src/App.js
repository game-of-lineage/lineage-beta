import { hot } from 'react-hot-loader/root';
import ControlPanel from './controlPanel'
import React from 'react'

const App = ({ name }) => {

    return (
      <>
        <h1>
          Hello {name}
        </h1>
        <ControlPanel />
      </>
    );
}


export default App;