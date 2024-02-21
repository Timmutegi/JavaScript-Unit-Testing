const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const db = require("./db/db_manager");

const DBManager = new db.DBManager();

DBManager.connect().then(() => {
	server.listen(process.env.PORT || 4000);
});
