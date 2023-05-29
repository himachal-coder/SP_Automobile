var mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin#123",
    database: "spdatabase"
});

module.exports = con;
