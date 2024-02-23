const mongoose = require("mongoose");

class DBManager {
	constructor(mongoURI, opts, mongoServer) {
		this.mongoServer = mongoServer;
		this.mongoUri = mongoURI;
		this.connection = opts;
	}

	async connect() {
		await mongoose.connect(this.mongoUri, this.opts);
	}

	async close() {
		await mongoose.disconnect();
		if (this.mongoServer) {
			await this.mongoServer.stop();
		}
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
