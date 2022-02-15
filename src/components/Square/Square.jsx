import * as React from 'react';
import {useState, useEffect} from 'react';
import './squareStyles.scss';

// renders a node that is either "alive" or "dead"
const Square = () => {
    // sets state of node for whether it's alive or dead, starts as dead
    const [isAlive, setIsAlive] = useState(false);
    const handleClick = () => {
        setIsAlive(!isAlive)
    }
    return (
        <div>
            {/*  onClick sets isAlive to opposite i.e. from alive to dead or vice versa */}
            <button className="square" onClick={handleClick}>{isAlive? "alive" : "dead"}</button>
        </div>
    )
}

export default Square;