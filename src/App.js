import { hot } from 'react-hot-loader/root';
import React from "react";
import './styles.scss';
import Square from './components/Square/Square.jsx'
import SquareGrid from './components/SquareGrid/SquareGrid.jsx'

class App extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>
          Hello {name} nice to see you
        </h1>
        {/* just passing in an array of nine Squares for testing purposes, we will pass in the
        whole game grid once everything is connected */}
        <SquareGrid squareArray={[<Square/>,<Square/>,<Square/>,<Square/>,<Square/>,<Square/>,<Square/>,<Square/>,<Square/>]}/>
      </>
    );
  }
}

export default hot(App);