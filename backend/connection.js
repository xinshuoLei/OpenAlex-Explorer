const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'academic-world-small',
  password: '870624',
  port: 5432,
});

const runQuery = (query) => {
    return new Promise(function(resolve, reject) {
        pool.query(query, 
          (error, results) => {
          console.log(error,results)
          if (error) {
            reject(error)
          }
          resolve(results.rows);
        })
      }) 
}

module.exports = {
    runQuery,
    pool
}