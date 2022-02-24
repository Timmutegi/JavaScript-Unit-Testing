const express = require('express');
const router = express.Router();
const user = require('./users_controller');

let UserController = new user.UserController()

router.get('/user', UserController.getUser)
router.delete('/post/:id', UserController.deletePost)
router.post('/post', UserController.post)



module.exports = router;