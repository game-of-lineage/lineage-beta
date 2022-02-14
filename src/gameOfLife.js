// Declare an array to contain the grid.
const grid = [];

/* Constants */
// For randomly generated grids, set a randomization factor for generating life.
const randomFactor = 2.5;
const ROWS = 30;
const COLS = 20;
const rowLen = COLS;


// Periodically regenerate the grid.
setInterval(() => {
  calculateNewGen(grid);
  renderNewGen(grid);
}, 500);

function createGrid() {

}


// Iterate through all rows.
for (let i = 0; i < 30; i++) {
  const row = [];

  // Iterate through all columns in a row.
  for (let j = 0; j < 20; j++) {

    // Pick a random number.
    let random = Math.random() * 10;

    // Whether the cell is 'living' depends on whether we picked a number below the constraint value (randomFactor).
    let living = random < randomFactor ? 1 : 0;

    // Fixed image: Oscillator will oscillate.
    if (i === 1 && (j === 1 || j === 2 || j === 3)) {
      row.push(new Cell(1));

      // Fixed image: Beehive, will remain stable.
    } else if (((i === 5 || i === 7) && (j === 2 || j === 3)) || (i == 6 && (j === 1 || j === 4))) {
      row.push(new Cell(1));

      // Moving image: Glider, which will move.
    } else if ((i === 10 && j === 2) || (i === 11 && (j === 0 || j === 2)) || (i === 12 && (j === 1 || j === 2))) {
      row.push(new Cell(1));
    } else {
      row.push(new Cell(0));
    }
  }
  grid.push(row);
}


// Class / Function for creating a new cell.
function Cell(living) {
  this.lineage = null;
  this.icon = null;
  this.aliveThisGen = living;
  this.aliveNextGen = 0;
}

// Generate next generation's grid.
function renderNewGen(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < rowLen; col++) {
      grid[row][col].aliveThisGen = grid[row][col].aliveNextGen;
      //grid[row][col].aliveNextGen = 0;
    }
  }
  console.table(gridPrinter(grid));
}

//
function calculateNewGen(grid) {
  // loop through each row
  for (let row = 0; row < grid.length; row++) {
    // loop through each column
    for (let col = 0; col < rowLen; col++) {
      updateCell(row, col);
    }
  }
}

// Count sum total of neighbors of the cell, and set update.
function updateCell(row, col) {
  let currentCell = grid[row][col];
  let neighborsAlive = 0;
  // count number of neighbors the cell has.

  // check every direction.
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
    // check if cell at that direction is alvie this gen.
    let newRow = row + dir[0];
    let newCol = col + dir[1];

    if (newRow > -1 && newRow < grid.length - 1 && newCol > -1 && newCol < rowLen - 1) {
      if (grid[newRow][newCol].aliveThisGen === 1) neighborsAlive++;
    }
  });

  // if cell is dead and has three live neighbors, then make alive.
  if (currentCell.aliveThisGen === 0) {
    if (neighborsAlive === 3) {
      currentCell.aliveNextGen = 1;
    } else {
      currentCell.aliveNextGen = 0;
    }
  }

  if (currentCell.aliveThisGen === 1) {
    if (neighborsAlive === 2 || neighborsAlive === 3) {
      currentCell.aliveNextGen = 1;
    } else {
      currentCell.aliveNextGen = 0;
    }
  }
}


// Function for printing the grid.
function gridPrinter(grid) {
  const gridArr = [];
  for (let row = 0; row < grid.length; row++) {
    const rowArr = [];
    for (let col = 0; col < rowLen; col++) {
      let currentCellAlive = grid[row][col].aliveThisGen;
      if (currentCellAlive) rowArr.push(1);
      else rowArr.push(0);
    }
    gridArr.push(rowArr);
  }
  return gridArr;
}

