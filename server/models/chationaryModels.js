const { Pool } = require('pg');

const PG_URI =
  'postgres://qflflvij:tQfsDqcUkxOZIBNyRpFiVovZmwO3LbtI@suleiman.db.elephantsql.com:5432/qflflvij';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
