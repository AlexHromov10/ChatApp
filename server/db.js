const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.dbUser,
  password: process.env.dbPassword,
  host: process.env.dbHost,
  port: process.env.dbPort,
  database: process.env.dbName,
});

function dbErrorsHandling(errorCode) {
  switch (errorCode) {
    case process.env.postgres_unique_violation:
      console.log("ERROR CODE:" + errorCode);
      return { errorCode: errorCode, message: "The PK value isn't unique!" };
    case process.env.foreign_key_violation:
      console.log("ERROR CODE:" + errorCode);
      return { errorCode: errorCode, message: "The FK does not exists!" };
    default:
      console.log("ERROR CODE:" + errorCode);
      return { errorCode: errorCode, message: "UNHANDLED DB ERROR" };
  }
}

module.exports = { pool, dbErrorsHandling };
