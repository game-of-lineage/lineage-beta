//Converts 2D figures of varying dimensions to a 1D array representing game board
const pasteFigure = (initialBoard, figure) => {
  const BOARD_WIDTH = Math.sqrt(initialBoard.length / 2) * 2;
  const pasteTargetX = Math.floor((BOARD_WIDTH - figure[0].length) / 2);
  const pasteTargetY = Math.floor((BOARD_WIDTH / 2 - figure.length) / 2);
  const newBoard = new Array(initialBoard.length).fill(0);
  for (let row = 0; row < figure.length; row++) {
    for (let col = 0; col < figure[row].length; col++) {
      const pos = col + pasteTargetX + (pasteTargetY + row) * BOARD_WIDTH;
      newBoard[pos] = figure[row][col] ? Math.ceil(Math.random() * 24) : 0;
    }
  }
  return newBoard;
};

module.exports = pasteFigure;
