const pasteFigure = (initialBoard, figure) => {
  const BOARD_HEIGHT = Math.sqrt(initialBoard.length / 2);
  const pasteTarget = Math.floor(BOARD_HEIGHT * 0.4);
  const newBoard = new Array(initialBoard.length).fill(0);
  for (let row = 0; row < figure.length; row++) {
    for (let i = 0; i < figure[row].length; i++) {
      const pos = i + Math.floor(pasteTarget*2.2) + (pasteTarget + row) * BOARD_HEIGHT * 2;
      newBoard[pos] = figure[row][i];
    }
  }
  return newBoard;
};

module.exports = pasteFigure;
