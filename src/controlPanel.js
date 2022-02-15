import { FaClock, FaPlay, FaBackward, FaBook, FaPause, FaBookOpen} from 'react-icons/fa';
import React from 'react';
import {Slider, Button} from '@mui/material';

const ControlPanel = ({setPlay, play, setTimer, timer, setBoardState, initialBoardState}) => {

  function handleSpeed(event) {
    console.log(event.target.firstChild.value)
    setTimer(10000/event.target.firstChild.value)
  }

  const marks = [
    {
      value: 10,
      label: '1/sec',
    },
    {
      value: 100,
      label: '10/sec',
    },
    {
      value: 200,
      label: '20/sec',
    },
  ];

  return (
    <>
      <button><FaBook />Rules</button>
      <button><FaBookOpen />Lexicon</button>

      {/* Start/stop Algo */}
      <button onClick={() => {
        setPlay(!play)
      }}> <FaPlay />/<FaPause/>Start/Stop</button>
      {/* Pause and go back to initial input */}
      <button onClick={()=>setBoardState(initialBoardState.map((row)=>[...row]))}><FaBackward />Reset</button>
      
      <button><FaClock />IntervalsPerSecond</button>
      <div className='speedSlider'><h2>Speed</h2>
      <Slider 
      key={1} 
      sx={{ width:1/5}} 
      aria-label='Speed' 
      valueLabelDisplay='off'
      defaultValue={10}
      marks={marks}
      step={1}
      min={1} 
      max={200} 
      onChangeCommitted={(e)=>handleSpeed(e)}></Slider></div>
    </>
  )
}

export default ControlPanel