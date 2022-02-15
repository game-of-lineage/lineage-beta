import * as React from 'react';
import {useState, useEffect} from 'react';
import Square from '../Square/Square.jsx'
import './squareRowStyles.scss';

const SquareRow = ({row, rowIndex, setBoardState, boardState}) => {
    // array of Nodes passed in via props
    return (
            <div className="row-container" style={{height: `${100/boardState.length}%`}}> 
                {/* Mapping the passed in array of Nodes and rendering them each here,
                will keep them arranged in scss grid or flexbox, not sure yet*/}
                {row.map((alive, idx) => <Square alive={alive} rowIndex={rowIndex} boardState={boardState} setBoardState={setBoardState} columnIndex={idx}/>)}
            </div>
    )
}

export default SquareRow;