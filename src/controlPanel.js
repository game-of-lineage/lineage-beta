import { FaClock, FaPlay, FaBackward, FaBook, FaPause, FaBookOpen} from 'react-icons/fa';
import React from 'react';

const ControlPanel = () => {
  return (
    <>
      <button><FaBook />Rules</button>
      <button><FaBookOpen />Lexicon</button>

      {/* Start Algo */}
      <button><FaPlay />Start</button>
      <button><FaPause />Pause</button>
      {/* Pause and go back to initial input */}
      <button><FaBackward />Reset</button>
      
      <button><FaClock />IntervalsPerSecond</button>
    </>
  )
}

export default ControlPanel