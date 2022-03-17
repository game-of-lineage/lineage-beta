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
import {
  Slider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Rules from "../Rules/Rules.jsx";
import "./controlPanel.scss";

const ControlPanel = ({
  setPlay,
  play,
  setTimer,
  setBoardState,
  initialBoardState,
  setGeneration,
  initialGeneration,
  SET_BOARD_SIZE,
  BOARD_SIZE,
}) => {

  const [openRules, setOpenRules] = useState(false);

  function handleSpeed(event) {
    setTimer(10000 / event.target.firstChild.value ** 2);
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
    },
  ];

  return (
    <div id="control-panel-container">
      <Accordion id="rules-button">
        <AccordionSummary id="rules-summary">
          <FaBook />
          &nbsp;&nbsp;Rules
        </AccordionSummary>
        <AccordionDetails id="rules-details" className="open-rules">
          <Rules />
        </AccordionDetails>
      </Accordion>
      {/* Start/stop Algo */}
      {play === true ?
        <button
        className="selected"
        onClick={() => {
          setPlay(!play);
        }}
      >
        <FaPlay />
        <FaPause />
        &nbsp;&nbsp; Playing
      </button>
      :
      <button
        onClick={() => {
          setPlay(!play);
        }}
      >
        <FaPlay />
        <FaPause />
        &nbsp;&nbsp; Paused
      </button>
      }
      {/* Pause and go back to initial input */}
      <button
        onClick={() => {
          setPlay(false); 
          setGeneration(initialGeneration);
          setBoardState([...initialBoardState]);
        }}
      >
        <FaBackward />
        &nbsp;&nbsp;Reset
      </button>
      <div className="sizeButtons">
        {BOARD_SIZE === 30 ? 
        <button className="selected" onClick={() => SET_BOARD_SIZE(30)}>S</button> :
        <button onClick={() => SET_BOARD_SIZE(30)}>S</button>
        }
        {BOARD_SIZE === 40 ? 
        <button className="selected" onClick={() => SET_BOARD_SIZE(40)}>M</button> :
        <button onClick={() => SET_BOARD_SIZE(40)}>M</button>
        }
        {BOARD_SIZE === 50 ? 
        <button className="selected" onClick={() => SET_BOARD_SIZE(50)}>L</button> :
        <button onClick={() => SET_BOARD_SIZE(50)}>L</button>
        }
      </div>

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
