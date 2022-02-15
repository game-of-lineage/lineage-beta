const express = require("express");
const router = express.Router();

const {login, signup} = require('../controllers/userController')
const {saveBoard, loadBoard, postBoard, loadBoardFromLexicon} = require('../controllers/boardController')

// Initial load fetch
router.get('/', (req, res) => {

});

// ***USER ROUTES***

//    "Log In"
router.post('/users/login', login, (req, res) => {

});

//    "Sign Up"
router.post('/users/signup', signup, (req, res) => {

});

// ***BOARD ROUTES***

//    "Load a Board"
router.get('/boards/:id', loadBoard, (req, res) => {
  console.log('Received request to load board.');
  //console.log(res.locals.loadBoard);
  res.json(res.locals.loadBoard);
});

//     "Save a Board"
router.post('/boards', saveBoard, (req, res) => {
  console.log('Received request to save board.');
  res.json();
});

// LEXICON ROUTES

//    "Load a board from public board list"
router.get('/boardsLex', loadBoardFromLexicon, (req, res) => {
  console.log('Completed retrieving a board from lexexon.');
  res.json(res.locals.lexBoard);
});

//     "Post board to public board list"
router.post('/boardsLex', postBoard, (req, res) => {
  console.log('Completed posting board to public board list.');
  res.json();
});


module.exports = router;