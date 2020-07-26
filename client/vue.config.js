const path = require("path");


module.exports = {
	outputDir: path.resolve(__dirname, "../server/public"),
	devServer: {
		proxy: {
			"/api": {
				target: "http://backend:5000"
			}
		}
	}
}
