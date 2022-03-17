'use strict';

const login = require("./services/login");
const loadBoards = require("./services/loadBoards");
const saveBoard = require("./services/saveBoard");

module.exports = {
  login,
  loadBoards,
  saveBoard,
};
