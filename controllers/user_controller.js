const axios = require("axios");
const User = require("../models/User");
const BASE_URL = "https://jsonplaceholder.typicode.com";

class UserController {
	async createUser(req, res) {
		try {
			const user = new User({
				username: req.body.username,
				password: req.body.password,
			});

			console.log("user:: ", user);
			await user.save();

			return res.status(201).json({
				message: "User created successfully",
				data: {
					id: user._id,
					username: user.username,
				},
			});
		} catch (e) {
			console.log("createUser error:: ", e);
		}
	}

	async findUser(req, res) {
		try {
			var user = await User.findOne({ _id: req.params.id });
			if (user) {
				return res.status(200).json({
					id: user._id,
					username: user.username,
				});
			} else {
				return res.status(404).json({ message: "User does not exist" });
			}
		} catch (e) {
			console.log("findUser error:: ", e);
		}
	}

	async post(req, res) {
		let post = await axios
			.post(`${BASE_URL}/posts`, {
				title: req.body.title,
				body: req.body.body,
				userId: req.body.userId,
			})
			.then(function (response) {
				console.log("Post Saved");
			})
			.catch((err) => "error");

		return res.status(200).json({
			status: 200,
			message: "Post successful",
		});
	}

	async deletePost(req, res) {
		let post = await axios
			.delete(`${BASE_URL}/posts/${req.params.id}`)
			.then(function (response) {
				console.log("Post Deleted");
			})
			.catch((err) => "error");

		return res.status(200).json({
			status: 200,
			message: "Post Deleted!",
		});
	}

	async getUser(req, res) {
		let user = await axios
			.get(`${BASE_URL}/users/1`)
			.then((res) => res.data)
			.catch((err) => "error");

		return res.status(200).json(user);
	}
}

exports.UserController = UserController;
