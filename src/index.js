import ReactDOM from "react-dom";
import sass from "sass";
import React from 'react'
import App from "./App";
import "./styles.scss";


ReactDOM.render(
  <React.StrictMode>
    <App  name="Squirtle" />
  </React.StrictMode>,
  document.getElementById('app')
);
