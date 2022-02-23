const express = require('express');
const router = express.Router();
const user = require('./users_controller');

let UserController = new user.UserController()

router.get('/user', UserController.getUser)


module.exports = router;