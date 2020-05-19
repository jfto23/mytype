const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");


const app = express();

app.use(bodyParser.json());
app.use(cors());

const scores = require("./routes/api/scores");
app.use("/api/scores", scores);

const text = require("./routes/api/text");
app.use("/api/text", text);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(__dirname + "/public/"));

	app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));

}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started..."));

