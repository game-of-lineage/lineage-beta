const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const bcrypt = require('bcrypt')
const userController = {};
const db = require('../models/userModel');


userController.login = async (req, res, next) => {
  const {username, password} = req.body;
  const user = 'SELECT $1 from USERS;';
  db.query(user, username)
    .then((user) => {
      const userInformation = user.rows;
      // userInformation = user.rows;
      const storedPassword = userInformation.USER_PASSWORD;

      const result = await comparePassword(password, storedPassword);
      if(result) {
        res.locals.userInformation = userInformation;
        return next();
      }
      res.send(403).json({error: "Wrong username or password"})
    })
  // const userInformation = "database fetch results go here";
    return next();
};

userController.signup = async (req, res, next) => {
  const {username, password} = req.body;
  const hashedPassword = await hashPassword(password);
  // SAVE USER TO DB
  const newUser = 'INSERT INTO users (user_name, user_pass) VALUES ($1, $2);';
  await db.query(newUser, [username, hashedPassword])
  res.locals.newUser = "new user from database goes here.";
  next()
};



const hashPassword = (password) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
const comparePassword = (password, storedPassword) =>
  new Promise((resolve, reject) => {
  bcrypt.compare(password, storedPassword, (err, hash) => {
    if (err) reject(err);
    resolve(hash);
  })
})


module.exports = userController;