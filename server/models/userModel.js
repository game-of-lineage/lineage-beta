const pkg = require('pg');
const { Pool } = pkg;
const dotenv = require('dotenv');
dotenv.config();

const URI = process.env.PG_URI;
console.log('connecting to server');
console.log(URI);

const pool = new Pool ({connectionString: URI});

module.exports = pool;