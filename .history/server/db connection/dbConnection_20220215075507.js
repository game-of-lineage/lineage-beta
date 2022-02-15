const http = require('http');
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
let error;
let user;

oracledb.getConnection({
    user: dbConfig.dbUser,
    password: dbConfig.dbPassword,
    connectString: dbConfig.connectString

    },
    function(err, connection) {
        if (err) {
            error = err;
            return;
        }
    }


)
