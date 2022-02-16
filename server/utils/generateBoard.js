const figures = require('../constants/defaultboards.js');

function generateBoard(oldB, clientReq) {
  //console.log('clientreq');
  //console.log(clientReq);
  const rand = Math.ceil(Math.random() * 6);
  const board = oldB.map((row)=>[...row]);
  const leftoffset = 15;
  const topoffset = 5;

  for (const fig in figures) {
    //console.log('checking fig ' + fig)
    if (fig === clientReq) {
      //console.log('found a match')
      for (let row = 0; row < figures[fig].length; row++) {
        for (let col = 0; col < figures[fig][0].length; col++) {
          if (figures[fig][row][col] === 1) {
            for (let r = 0; r < rand; r++) {
              const icon = Math.floor(Math.random()*24)+1;
              board[topoffset + row + r*6][leftoffset + col + r*6] = icon;
            }
          }
        }
      }
      break;
    }
  }
  // console.log('board now looks like this');
  // console.log(board);
  //console.log(board);
  return board;
}

module.exports = generateBoard;