import axios from "axios";

const url = "api/"

async function getText() {
	try {
		const response = await axios.get(url.concat("text"))
		return response.data
	}
	catch (error) {
		return error.message;
	}
}

async function postScore(username,text_id,wpm) {
	let score = {
		username: username,
		text_id: text_id,
		wpm: wpm,
	};

	return axios.post(url.concat("scores"), score);
}

async function deleteScores(text_id) {
	return axios.delete(url.concat("scores/", text_id.toString()));
}

async function getScores(text_id) {
	try {
		const response = await axios.get(url.concat("scores/", text_id.toString()));
		return response.data;

	} 
	catch (error) {
		return error.message;

	}
}

export default {getText, postScore, deleteScores, getScores};
