const express = require("express");
const router = express.Router();

const {login, signup} = require('../controllers/userController')
const {saveBoard, loadBoard, postBoard, loadBoardFromLexicon} = require('../controllers/boardController')

// Initial load fetch
router.get('/', (req, res) => {

})

// ***USER ROUTES***

//    "Log In"
router.post('/users/login', login, (req, res, error) => {
    if (res.locals.userInformation){
        res.status(200).json(`user found ${res.locals.userInformation.USER_NAME}`)
    } else {
        console.log('Could not find user');
        res.status(404).json(`User not found ${error}`)
    }
})

//    "Sign Up"
router.post('/users/signup', signup, (req, res, error) => {
    if (res.locals.newUser){
        res.status(201).json(`new user created ${res.locals.newUser.username}`)
    } else {
        console.log('Error creating user');
        res.render(`Error creating user ${error}`)
    }
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