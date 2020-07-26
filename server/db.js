const mysql = require("mysql");


let pool = mysql.createPool({
	connectionLimit: 10,
	host: "app-db",
	user: "root",
	port: "3306",
	password: "password",
	database: "mytype_database"
});

if (process.env.JAWSDB_URL) {
	pool = mysql.createPool(process.env.JAWSDB_URL);
}

module.exports = pool;

