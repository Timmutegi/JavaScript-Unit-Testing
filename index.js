const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const db = require("./db/db_manager");
const config = require("./config/config");

const DBManager = new db.DBManager(config.production.mongoURI, opts = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}, null);

DBManager.connect().then(() => {
	server.listen(process.env.PORT || 4000);
});
