const express = require("express");
const router = express.Router();

const {login, signup} = require('../controllers/userController')
const {saveBoard, loadBoard, postBoard, loadBoardFromLexicon} = require('../controllers/boardController')

// Initial load fetch
router.get('/', (req, res) => {

})

// ***USER ROUTES***

//    "Log In"
router.post('/users/login', login, (req, res) => {

})

//    "Sign Up"
router.post('/users/signup', signup, (req, res) => {

})

// ***BOARD ROUTES***

//    "Load a Board"
router.get('/boards', loadBoard, (req, res) => {

})

//     "Save a Board"
router.post('/boards', saveBoard, (req, res) => {

})

// LEXICON ROUTES

//    "Load a board from public board list"
router.get('/boards', loadBoardFromLexicon, (req, res) => {

})

//     "Post board to public board list"
router.post('/boards', postBoard, (req, res) => {

})


module.exports = router;