const functions = require("../functions");
const request = require("supertest");
const app = require("../app");

// Test suite is the file
// toBe
test("Adds 2 + 2 to equal 4", () => {
    //Act
    const result = functions.add(2, 2)
    //Assert
	expect(result).toBe(4);
});

// notToBe
test("Adds 2 + 2 to NOT equal 5", () => {
    //Act
    const result = functions.add(2, 2)
    //Assert
	expect(result).not.toBe(5);
});

// toBeNull
test("should be null", () => {
    //Act
    const result = functions.isNull()
    //Assert
	expect(result).toBeNull();
});

// toBeFalsy
test("should be falsy", () => {
	expect(functions.checkValue(null)).toBeFalsy();
});

// toEqual
test("user should be John Doe", () => {
    //Act
    const result = functions.createUser()
	expect(result).toEqual({
		firstName: "John",
		lastName: "Doe",
	});
});

// Working with async data

// Promise
test("User fetched name should be Leanne Graham", () => {
	expect.assertions(1);
	return functions.fetchUser().then((data) => {
		expect(data.name).toEqual("Leanne Graham");
	});
});

// Async Await
test("User fetched name should be Leanne Graham", async () => {
	expect.assertions(1);
	const data = await functions.fetchUser();
	expect(data.name).toEqual("Leanne Graham");
});

// Describe breaks your test suite into components.
// Depending on your test strategy, you might have a describe for each function in your class,
// each module of your plugin, or each user-facing piece of functionality.
describe("Get user route", () => {
	describe("given that user exists", () => {
		test("should return a 200 status code", (done) => {
			request(app)
				.get("/user/user")
				.expect(200)
				.then(function (res) {
					done();
				})
				.catch((err) => done(err));
		});
	});
});

describe("Post Message", () => {
	describe("post message route", () => {
		test("should return a status code 200", (done) => {
			request(app)
				.post("/user/post")
				.send({
					title: "sunt aut facere repellat provident",
					body: "sunt aut facere repellat provident",
					userId: 1,
				})
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.expect(200)
				.then(function (res) {
					done();
				})
				.catch((err) => done(err));
		});
	});

    describe("Delete post message route", () => {
		test("should return a status code 200", (done) => {
			request(app)
			.delete("/user/post/1")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then(function (res) {
				done();
			})
			.catch((err) => done(err));
		});
	});
});


