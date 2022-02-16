const { Pool } = require('pg');
const PG_URI = 'postgres://pqilyecq:Yw1jGNSrnhU2HShzVcwo3nK1PF2oZxZx@kashin.db.elephantsql.com/pqilyecq';

const pool = new Pool({
    connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    }
};
