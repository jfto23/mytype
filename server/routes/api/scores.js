const express = require("express");
const mysql = require("mysql");
const pool = require("../../db");

const router = express.Router();

// get top 3 scores given an text_id
router.get("/:text_id", (req, res) => {
	let sql = `SELECT * FROM score_table WHERE text_id=${req.params.text_id} ORDER BY wpm DESC LIMIT 3;`
	pool.query(sql, (err, rows, fields) => {
		if (err) throw err;
		res.status(200).send(rows);
	});
});

// delete all the scores that are not in the top 3
router.delete("/:text_id", (req, res) => {
	pool.getConnection( (err, connection) => {
		if (err) throw err;
		let sql1 = `SELECT COUNT(*) FROM score_table WHERE text_id=${req.params.text_id};`
		connection.query(sql1, (err, rows, fields) => {
			if (err) {
				connection.release();
				throw err;
			}

			let numScores = rows[0]["COUNT(*)"];
			if (numScores > 3) {
				let sql2 = `DELETE FROM score_table WHERE text_id=${req.params.text_id} ORDER BY wpm ASC LIMIT ${numScores-3};`
				connection.query(sql2, (err, rows, fields) => {
					connection.release();
					if (err) throw err;
					res.status(200).send("DELETED");
				});
			}
			else {
				connection.release();
				res.status(200).send("THERE ARE 3 SCORES OR LESS FOR THIS TEXT. NOTHING DELETED");
			}
		});
	});
});


// add high scores
router.post("/", (req, res) => {
	const score = {
		username: req.body.username,
		wpm: req.body.wpm,
		text_id: req.body.text_id,
	};

	let sql = `INSERT INTO score_table (username,wpm,text_id) VALUES ("${score.username}",${score.wpm},${score.text_id});`
	pool.query(sql, (err,rows,fields) => {
		if (err) throw err;
		res.status(200).send("POSTED HIGH SCORE");
	});
});


module.exports = router;
