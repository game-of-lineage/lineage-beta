const http = require('http');
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
let error;
let table;

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
        connection.execute('SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE=\'BASE_TABLE\'', [], function (err, result) {
            if (err) {
                error = err;
                return;
            }
            table = result.rows[0][0];
            error = null;
            connection.close(function(err) {
                if (err) {
                    console.log(err);
                }
            })
        })
    }


);

http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    if (error === null) {
        response.end('Connection test succeeded. You connected to table' + table);

    } else if (error instanceof Error){
        response.write('Connection test failed. Check the settings and redeploy app!\n');
        response.end(error.message);
    } else {
        response.end('Connection test pending. Refresh after a few seconds...')
        
    }
})
