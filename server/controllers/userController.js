const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const bcrypt = require('bcrypt')
const userController = {};



userController.login = async (req, res, next) => {
  const {username, password} = req.body;
  // FIND USER BY USERNAME IN DB
  const userInformation = "database fetch results go here";
  const storedPassword = userInformation.password;

  const result = await comparePassword(password, storedPassword);
  if(result) {
    res.locals.userInformation = userInformation;
    return next();
  }
  res.send(403).json({error: "Wrong username or password"})
}

userController.signup = async (req, res, next) => {
  const {username, password} = req.body
  const hashedPassword = await hashPassword(password)
  // SAVE USER TO DB
  res.locals.newUser = "new user from database goes here."
  next()
}



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