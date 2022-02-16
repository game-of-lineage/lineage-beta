const express = require("express");
const router = express.Router();

const {login, signup, loggedIn} = require('../controllers/userController')
const {saveBoard, loadBoard, randomizeBoard, postBoard, loadBoardFromLexicon} = require('../controllers/boardController')

// Initial load fetch
router.get('/', (req, res) => {

});

// ***USER ROUTES***

//    "Log In"
router.post('/users/login', login, (req, res, error) => {
    if (res.locals.userInformation){
      console.log('res');
      console.log(res);
      res.status(200).json(res.locals.userInformation.user_name);
        //res.status(200).send(`user found ${res.locals.userInformation.user_name}`)
    } else {
        console.log('Could not find user');
        res.status(404).send(`User not found ${error}`)
    }
});

//    "Sign Up"
router.post('/users/signup', signup, (req, res, error) => {
    if (res.locals.newUser){
        res.status(201).send(`new user created ${res.locals.newUser.user_name}`);
    } else {
        console.log('Error creating user');
        res.render(`Error creating user ${error}`)
    }
})

router.get('/loggedIn', loggedIn, (req, res, error) => {
  if (res.locals.userInformation){
    res.status(200).send(`logged in with ${res.locals.userInformation.user_name}`)
  } else {
    console.log('Not logged in');
    res.status(404).send(`User not logged in ${error}`)
  }
})

// ***BOARD ROUTES***

//    "Load a Board"
router.get('/randomize/:id', randomizeBoard, (req, res) => {
  console.log('Received request to load board.');
  //console.log(res.locals.loadBoard);
  res.status(200).json(res.locals.randomizeBoard);
});

router.get('/boards/:id', loadBoard, (req, res) => {
  console.log('Received request to load board.');
  //console.log(res.locals.loadBoard);
  res.status(200).json(res.locals.loadBoard);
});


//     "Save a Board"
router.post('/boards', saveBoard, (req, res) => {
  console.log('Received request to save board.');
  res.status(201).json(res.locals.board);
});

// LEXICON ROUTES

//    "Load a board from public board list"
router.get('/boardsLex', loadBoardFromLexicon, (req, res) => {
  console.log('Completed retrieving a board from lexexon.');
  res.status(200).json(res.locals.lexBoard);
});

//     "Post board to public board list"
router.post('/boardsLex', postBoard, (req, res) => {
  console.log('Completed posting board to public board list.');
  res.status(201).json();
});


module.exports = router;