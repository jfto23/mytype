const mysql = require("mysql");

const pool = mysql.createPool({
	connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: "samsung23",
        database: "notypo_schema"
});

module.exports = pool;

