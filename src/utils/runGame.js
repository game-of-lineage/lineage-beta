const aliveCells = new Set();

const runGame = (grid) => {
  const ROWS = Math.sqrt(grid.length / 2);
  const COLS = ROWS*2

  const newBoard = [...grid];

  if (aliveCells.size) {
    // If we noted past alive cells in the Set, only check around alive cells.
    const iterator = new Set(aliveCells).values(); // Instantiate Set iterator FROM CLONED SET
    let current = iterator.next(); // Set current to first element
    aliveCells.clear(); // Clear original set, that's why we cloned.
    while (!current.done) {
      // Iterate through set
      const pos = Number(current.value); // Turn stringified coordinate back into numbers
      updateCell(pos); // Update Cell and neighbors.
      current = iterator.next(); // Increment current
    }
  } else {
    // If no set, loop through entire board.
    for (const pos in grid) updateCell(pos);
  }

  function updateCell(pos) {
    let neighborsAlive = 0;
    const tally = {};

    const row = Math.floor(pos / COLS);
    const col = pos % COLS;

    const up = row > 0 ? row - 1 : ROWS - 1;
    const down = row < ROWS - 1 ? row + 1 : 0;
    const right = col < COLS - 1 ? col + 1 : 0;
    const left = col > 0 ? col - 1 : COLS - 1;

    const tallyNeighbor = (x, y) => {
      const pos = y + COLS * x;
      const neighbor = grid[pos];
      if (neighbor in tally) tally[neighbor]++;
      else tally[neighbor] = 1;
      neighborsAlive += neighbor ? 1 : 0;
    };

    tallyNeighbor(up, col);
    tallyNeighbor(up, right);
    tallyNeighbor(row, right);
    tallyNeighbor(down, right);
    tallyNeighbor(down, col);
    tallyNeighbor(down, left);
    tallyNeighbor(row, left);
    tallyNeighbor(up, left);

    const addNeighbors = (x, y) => {
      addNeighbor(row, col);
      addNeighbor(up, col);
      addNeighbor(up, right);
      addNeighbor(row, right);
      addNeighbor(down, right);
      addNeighbor(down, col);
      addNeighbor(down, left);
      addNeighbor(row, left);
      addNeighbor(up, left);
    };

    const addNeighbor = (x, y) => {
      const pos = y + COLS * x;
      aliveCells.add(pos);
    };

    let alive = grid[pos];
    let child;

    if (!alive) {
      if (neighborsAlive === 3) {
        for (const key in tally) {
          if (tally[key] > 1 && key !== "0") child = Number(key);
        }
        newBoard[pos] = child || Math.floor(Math.random() * 24) + 1;
        addNeighbors(row, col);
      }
      return;
    }

    if (alive) {
      if (neighborsAlive === 2 || neighborsAlive === 3) {
        addNeighbors(row, col);
        return;
      }
      newBoard[pos] = 0;
      return;
    }
  }

  return newBoard;
};
const clearCells = () => {
  aliveCells.clear()
}
module.exports = {
  runGame,
  clearCells
}