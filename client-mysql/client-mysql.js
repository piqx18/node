const mysql =  require('mysql');

let clientMySQL = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwer",
  database: "museum"
});

module.exports = clientMySQL