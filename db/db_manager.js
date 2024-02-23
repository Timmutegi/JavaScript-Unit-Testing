const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const config = require("../config/config");

class DBManager {
	constructor(mongoURI, opts, mongoServer) {
		this.mongoServer = mongoServer;
		this.mongoUri = mongoURI;
		this.connection = opts;
	}

	async connect() {
		// let opts = {};
		// if (process.env.NODE_ENV === "test") {
			this.mongoServer = await MongoMemoryServer.create();

			this.mongoUri = this.mongoServer.getUri();
		// } else {
		// 	this.mongoUri = config.production.mongoURI;
		// 	opts = {
		// 		useNewUrlParser: true,
		// 		useUnifiedTopology: true,
		// 	};
		// }
		await mongoose.connect(this.mongoUri, this.opts);
	}

	async close() {
		await mongoose.disconnect();
		if (this.mongoServer) {
			await this.mongoServer.stop();
		}

		// if (process.env.NODE_ENV === "test") {
		// 	await mongoose.disconnect();
		// 	if (this.mongoServer) {
		// 		await this.mongoServer.stop();
		// 	}
		// } else {
		// 	await mongoose.disconnect();
		// }
	}

	async cleanup() {
		if (mongoose.connection.readyState !== 0) {
			const collections = mongoose.connection.collections;

			for (const key in collections) {
				await collections[key].deleteMany();
			}
		}
	}
}

exports.DBManager = DBManager;
