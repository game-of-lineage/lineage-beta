import * as React from 'react';

const Rules = () => {
    return (
        <div id="rules">
            This is The Game of Life, a visualization of an algorithm originally devised by British mathematician John Horton Conway in 1970.
            <br/>
            <br/>
            You play the game by inputting an initial configuration, and then sitting back and watching the madness unfold.
            <br/>
            <br/>
            To set up an initial "seed" configuration, click the cells in the grid to flip them between "dead" (blue) and "alive" (yellow).
            <br/>
            <br/>
            As they cycle through generations, they will live or die based on their interactions with their eight neighboring cells according to the following rules:
            <br/>
            <br/>
            1. Any live cell with fewer than two live neighbors dies.
            <br/>
            <br/>
            2. Any live cell with two or three live neighbours lives on to the next generation.
            <br/>
            <br/>
            3. Any live cell with more than three live neighbours dies.
            <br/>
            <br/>
            4. Any dead cell with exactly three live neighbours becomes a live cell.
            <br/>
        </div>
    )
}

export default Rules;