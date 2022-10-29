import * as React from 'react';
import {useState, useEffect} from 'react';
import Square from '../Square/Square.jsx'
import './squareRowStyles.scss';

const SquareRow = ({row, rowIndex, BOARD_SIZE, handleSquareClick}) => {
    // array of Nodes passed in via props
    

    return (
            <div className="row-container" style={{minHeight: `${100/BOARD_SIZE}%`, maxHeight: `${100/BOARD_SIZE}%`}}> 
                {row.map((alive, idx) => 
                <Square 
                    key={idx} 
                    alive={alive} 
                    rowIndex={rowIndex} 
                    columnIndex={idx} 
                    BOARD_SIZE={BOARD_SIZE}
                    handleSquareClick={handleSquareClick} 
                />)}
            </div>
    )
}

export default React.memo(SquareRow)