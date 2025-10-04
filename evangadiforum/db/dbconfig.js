const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  host: "localhost",
  user: "mama",           // or your correct DB user
  password: "1234",       // your DB password
  database: "evangadidb",   // ✅ add your actual database name here
  connectionLimit: 10
});

module.exports = dbConnection.promise();
