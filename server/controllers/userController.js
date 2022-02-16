const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const bcrypt = require('bcrypt')
const userController = {};
const db = require('../models/userModel');


userController.login = async (req, res, next) => {
  const {username, password} = req.body;
  const user = 'SELECT user_name, user_pass FROM users WHERE user_name = $1;';
  try {
    const response = await db.query(user, [username]);
    const userInformation = response.rows[0];
    const storedPassword = userInformation.user_pass;
    const result = await comparePassword(password, storedPassword);
    if(result) {
      res.locals.userInformation = userInformation;
      return next();
      }
    res.send(403).json({error: "Wrong username or password"})
    
  } catch (error) {
    console.log(error);
    return next({
      message: error
    })
  }
  //   .then((user) => {
  //     console.log(user);
  //     const userInformation = user.rows[0];
  //     console.log("User Information");
  //     console.log(userInformation);
  //     // userInformation = user.rows;
  //     const storedPassword = userInformation.USER_PASS;
  //     // return storedPassword;
  //   // })
  //   // .then((storedPassword) => {
  //     console.log(storedPassword);
  //     const result = await comparePassword(password, storedPassword);
  //     if(result) {
  //       res.locals.userInformation = userInformation;
  //       return next();
  //     }
  //     res.send(403).json({error: "Wrong username or password"})
    
  // // const userInformation = "database fetch results go here";
  //   return next();

  //   })
};

userController.signup = async (req, res, next) => {
  const {username, password} = req.body;
  console.log(req.body);
  const hashedPassword = await hashPassword(password);
  // SAVE USER TO DB
  const newUser = 'INSERT INTO users (user_name, user_pass) VALUES ($1, $2) RETURNING *;';
  await db.query(newUser, [username, hashedPassword])
    .then((user) => {
      console.log(user.rows[0]);
  res.locals.newUser = user.rows[0];
  return next();
    })
  return next();
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