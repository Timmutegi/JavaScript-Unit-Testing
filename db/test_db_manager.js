const { MongoMemoryServer } = require("mongodb-memory-server");
const appDb = require("./db_manager");

async function create() {
	let mongoServer = await MongoMemoryServer.create();
	return new appDb.DBManager(mongoServer.getUri(), {}, mongoServer);
}

module.exports = create;
