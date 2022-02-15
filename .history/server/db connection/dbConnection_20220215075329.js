const http = require('http');
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
let error;
let user;

oracledb.getConnection({
    user: dbConfig.dbUser,
    password: dnConfig.dbPassword

})
