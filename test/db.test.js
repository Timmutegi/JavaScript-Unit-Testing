const request = require("supertest");
const app = require("../app");
const create = require("../db/test_db_manager");

jest.setTimeout(60000);


describe("User route", () => {
	let testDb;
	let id;

	beforeAll(async () => {
		testDb = await create();
		return testDb.connect();
	});

	afterAll(() => {
		return testDb.close();
	});

	test("should return a 201 status code if user is created successfully", (done) => {
		request(app)
			.post("/user/createUser")
			.send({
				username: "David",
				password: "password",
			})
			.set("Accept", "application/json")
			.expect(201)
			.then(function (res) {
				id = res.body.data.id;
				done();
			})
			.catch((err) => done(err));
	});

	test("should return a 200 if user is found", (done) => {
		request(app)
			.get(`/user/${id}`)
			.set("Accept", "application/json")
			.expect(200)
			.then(function (res) {
				done();
			})
			.catch((err) => done(err));
	});
});
