const express = require("express");
const router = express.Router();
const user = require("../controllers/user_controller");

let UserController = new user.UserController();

router.get("/user", UserController.getUser);
router.delete("/post/:id", UserController.deletePost);
router.post("/post", UserController.post);
router.post("/createUser", UserController.createUser);
router.get("/:id", UserController.findUser);

module.exports = router;
