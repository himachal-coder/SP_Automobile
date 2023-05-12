var mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "parikshit",
    database: "spDatabase"
});

module.exports = con;