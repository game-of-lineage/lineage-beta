import * as React from 'react';
import {useState, useEffect} from 'react';
import Square from '../Square/Square.jsx'
import './squareRowStyles.scss';

const SquareRow = ({row, rowIndex, BOARD_HEIGHT, BOARD_WIDTH, handleSquareClick}) => {
    // array of Nodes passed in via props
    

    return (
            <div className="row-container" style={{height: `${100/BOARD_HEIGHT}%`}}> 
                {/* Mapping the passed in array of Nodes and rendering them each here,
                will keep them arranged in scss grid or flexbox, not sure yet*/}
                {row.map((alive, idx) => 
                <Square 
                    key={idx} 
                    alive={alive} 
                    rowIndex={rowIndex} 
                    columnIndex={idx} 
                    BOARD_WIDTH={BOARD_WIDTH}
                    handleSquareClick={handleSquareClick} 
                />)}
            </div>
    )
}

export default React.memo(SquareRow)