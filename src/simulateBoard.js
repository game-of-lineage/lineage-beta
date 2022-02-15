
// Create the initial grid.
export default function createGrid(grid) {
  const newGrid = []
  const ROWS = grid.length;
  const COLS = grid[0].length;
  const rowLen = COLS;
  
  for (let i = 0; i < ROWS; i++) {
    const row = [];
    for (let j = 0; j < COLS; j++) {
      // oscillator
      if (i === 1 && (j === 1 || j === 2 || j === 3)) {
        row.push(1);
        // Fixed image: Beehive, will remain stable.
      } else if (((i === 5 || i === 7) && (j === 2 || j === 3)) || (i == 6 && (j === 1 || j === 4))) {
        row.push(1);
        // Moving image: Glider, which will move.
      } else if ((i === 10 && j === 2) || (i === 11 && (j === 0 || j === 2)) || (i === 12 && (j === 1 || j === 2))) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    newGrid.push(row);
  }
  return newGrid;
}