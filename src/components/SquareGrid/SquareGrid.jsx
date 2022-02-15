import * as React from 'react';
import {useState, useEffect} from 'react';
import Square from '../Square/Square.jsx'
import './squareGridStyles.scss';

const SquareGrid = (props) => {
    // array of Nodes passed in via props
    const {squareArray} = props;
    return (
            <div id="grid-container"> 
                {/* Mapping the passed in array of Nodes and rendering them each here,
                will keep them arranged in scss grid or flexbox, not sure yet*/}
                {squareArray.map((node) => {
                    return <div className="square-node" key={squareArray.indexOf(node)}><Square/></div>
                })}
            </div>
    )
}

export default SquareGrid;