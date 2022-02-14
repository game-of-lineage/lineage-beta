import { hot } from 'react-hot-loader/root';
import React from "react";
import './styles.scss';

class App extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>
          Hello {name} nice to see you
        </h1>
      </>
    );
  }
}

export default hot(App);