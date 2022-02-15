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
      value: 5,
      label: '1/sec',
    },
    {
      value: 100,
      label: '10/sec',
    },
    {
      value: 195,
      label: '20/sec',
    },
  ];

  return (
    <div id={"control-panel-container"}>
      <button><FaBook />&nbsp;&nbsp;Rules</button>
      <button><FaBookOpen />&nbsp;&nbsp;Lexicon</button>

      {/* Start/stop Algo */}
      <button onClick={() => {
        setPlay(!play)
      }}> <FaPlay /><FaPause/>&nbsp;&nbsp;Start/Stop</button>
      {/* Pause and go back to initial input */}
      <button onClick={()=>setBoardState(initialBoardState.map((row)=>[...row]))}><FaBackward />&nbsp;&nbsp;Reset</button>
      <div className='speedSliderContainer'>
        <h2>Speed</h2>
        <div className='speedSlider'>
          <Slider 
          orientation='vertical'
          key={1}
          size="small"
          sx={{ width:1/5}}
          aria-label='Speed'
          valueLabelDisplay='off'
          defaultValue={10}
          marks={marks}
          step={1}
          min={1}
          max={200}
          onChangeCommitted={(e)=>handleSpeed(e)} />
          </div>
        </div>
    </div>
  )
}

export default ControlPanel