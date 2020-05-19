const mysql = require("mysql");


let pool = mysql.createPool({
	connectionLimit: 10,
	host: "localhost",
	user: "root",
	password: "password",
	database: "notypo_schema"
});

if (process.env.JAWSDB_URL) {
	let pool = mysql.createPool(process.env.JAWSDB_URL);
}

module.exports = pool;

