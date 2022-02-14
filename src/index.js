import React from "react";
import ReactDOM from "react-dom";
import sass from "sass";
import App from "./App";
import "./styles.scss";

var mountNode = document.getElementById("app");
ReactDOM.render(<App name="Squirtle" />, mountNode);