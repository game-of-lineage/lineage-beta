import {
  FaClock,
  FaPlay,
  FaBackward,
  FaBook,
  FaPause,
  FaBookOpen,
} from "react-icons/fa";
import React from "react";
import { useState, useEffect } from "react";
import { Slider, Button, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Rules from "../Rules/Rules.jsx";
import "./controlPanel.scss"

const ControlPanel = ({
  setPlay,
  play,
  setTimer,
  timer,
  setBoardState,
  initialBoardState,
  setGeneration,
  Generation,
}) => {
  const [openRules, setOpenRules] = useState(false);
  function handleSpeed(event) {
    console.log(event.target.firstChild.value);
    setTimer(10000 / (event.target.firstChild.value**2));
  }

  function showRules() {
    setOpenRules(!openRules);
  }

  const marks = [
    {
      value: 1.5,
      label: "0.1/sec",
    },
    {
      value: 5,
      label: "2/sec",
    },
    {
      value: 10,
      label: "10/sec",
    },
    {
      value: 22,
      label: "20/sec",
    }
  ];

  return (
    <div id="control-panel-container">
      <Accordion id="rules-button">
        <AccordionSummary id="rules-summary"><FaBook />&nbsp;&nbsp;Rules</AccordionSummary>
        <AccordionDetails id="rules-details" className="open-rules"><Rules/></AccordionDetails>
      </Accordion>
      <button>
        <FaBookOpen />
        &nbsp;&nbsp;Lexicon
      </button>
      {/* Start/stop Algo */}
      <button
        onClick={() => {
          setPlay(!play);
        }}
      >
        <FaPlay />
        <FaPause />
        &nbsp;&nbsp;Start/Stop
      </button>
      {/* Pause and go back to initial input */}
      <button
        onClick={() => {
          setPlay(false)
          setBoardState(initialBoardState.map((row) => [...row]))
        }}
      >
        <FaBackward />
        &nbsp;&nbsp;Reset
      </button>
      <div className="speedSliderContainer">
        <h2>Speed</h2>
        <div className="speedSlider">
          <Slider
            key={1}
            sx={{ width: 1 / 5 }}
            aria-label="Speed"
            orientation="vertical"
            valueLabelDisplay="off"
            defaultValue={3}
            marks={marks}
            step={1}
            min={1}
            max={22}
            onChangeCommitted={(e) => handleSpeed(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
