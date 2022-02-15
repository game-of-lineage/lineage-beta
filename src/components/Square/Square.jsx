import * as React from 'react';
import {useState, useEffect} from 'react';
import './squareStyles.scss';

// renders a node that is either "alive" or "dead"
const Square = ({alive, rowIndex, columnIndex, boardState, setBoardState}) => {
    // sets state of node for whether it's alive or dead, starts as dead
    const handleClick = () => {
        let newBoardState = boardState.map((row)=>[...row]);
        newBoardState[rowIndex][columnIndex] = alive ? 0 : 1;
        setBoardState(newBoardState);
    }

    return <div onClick={handleClick} style={{width: `${100/boardState[0].length}%`}} className={alive ? `alive` : "dead"}> {} </div>
            {/*  onClick sets board state changing clicked square to opposite 
            i.e. sets dead to alive and vice versa */}
}

export default Square;