import * as React from 'react';
import {useState, useEffect} from 'react';
import './squareStyles.scss';

// renders a node that is either "alive" or "dead"
const Square = ({alive, rowIndex, columnIndex, BOARD_WIDTH, handleSquareClick}) => {
    // sets state of node for whether it's alive or dead, starts as dead
    

    return <div onClick={()=>{handleSquareClick(rowIndex, columnIndex)}} style={{width: `${100/BOARD_WIDTH}%`}} className={alive ? `alive` : "dead"}></div>
}

export default React.memo(Square)