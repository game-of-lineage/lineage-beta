const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const generateBoard = require('../utils/generateBoard.js');

const boardController = {};

boardController.saveBoard = (req, res, next) => {
  console.log('Entering saveBoard controller.');
  return next();
}

boardController.randomizeBoard = (req, res, next) => {
  let blankBoard = new Array(40).fill(new Array(80).fill(0));
  // check if we have a figure for the requested figure.
  res.locals.randomizeBoard = generateBoard(blankBoard, req.params.id);
  return next();
}

boardController.loadBoard = (req, res, next) => {
  console.log('logic for loadBoard');
  return next();
}

boardController.postBoard = (req, res, next) => {
  const board = req.body;
  return next();
}

boardController.loadBoardFromLexicon = (req, res, next) => {
  console.log('Entering loadBoardFromLexicon controller.');
}

module.exports = boardController;
