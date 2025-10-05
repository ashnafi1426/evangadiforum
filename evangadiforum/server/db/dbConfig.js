const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  host: "localhost",
  user: "first",        // or your correct DB user
  password: "12345678",       // your DB password
  database: "first",   // ✅ add your actual database name here
  connectionLimit: 10
});
module.exports = dbConnection.promise();
