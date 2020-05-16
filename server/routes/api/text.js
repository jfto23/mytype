const express = require("express");
const mysql = require("mysql");
const connection = require("../../db");

const router = express.Router();

router.get("/", (req, res) => {
	let sql = "SELECT * FROM text_table ORDER BY RAND() LIMIT 1"
	connection.query(sql, (err, rows, fields) => {
		if (err) throw err;
		res.status(200).send(rows[0]);
	});
});

module.exports = router;
