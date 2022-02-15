

export default function runGame(grid) {

/* Constants */
const newBoard = grid.map((row)=>[...row]);
const ROWS = grid.length;
const COLS = grid[0].length;
const rowLen = COLS;

// On load of this script, periodically regenerate the grid.
calculateNewGen(grid);

// Update each Cell's nextGen value so that a new grid can be printed.
function calculateNewGen(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < rowLen; col++) {
      updateCell(row, col);
    }
  }
}

// Function calculates number of neighbors (8) that are 1s. Based on number of neighbors,
// this function sets the aliveNextGen value of the cell.
function updateCell(row, col) {
  let alive = grid[row][col];
  let neighborsAlive = 0;
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  directions.forEach((dir) => {
    let newRow = row + dir[0];
    let newCol = col + dir[1];
    if (newRow > -1 && newRow < grid.length - 1 && newCol > -1 && newCol < rowLen - 1) {
      if (grid[newRow][newCol]) neighborsAlive++;
    }
  });

  // If dead
  if (!alive) {
    if (neighborsAlive === 3) {
      newBoard[row][col] = 1;
    } else {
      newBoard[row][col] = 0;
    }
  }

  // If alive
  if (alive) {
    if (neighborsAlive === 2 || neighborsAlive === 3) {
      newBoard[row][col] = 1;
    } else {
      newBoard[row][col] = 0;
    }
  }
}

return newBoard;
}
