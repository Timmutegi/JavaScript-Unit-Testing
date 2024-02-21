
const axios = require('axios')
const BASE_URL = "https://jsonplaceholder.typicode.com"

class UserController {

    async getUser (req, res) {
       let user = await axios
        .get(`${BASE_URL}/users/1`)
        .then(res => res.data)
        .catch(err => 'error')

        return res.status(200).json(user);
    }

    async post (req, res) {
        let post = await axios
         .post(`${BASE_URL}/posts`,  {
            title: req.body.title,
            body: req.body.body,
            userId: req.body.userId
          })
         .then(function (response) {
            console.log("Post Saved");
          })
         .catch(err => 'error')
 
        return res.status(200).json({
             "status": 200,
             "message": 'Post successful',
        });
     }

     async deletePost (req, res) {
        let post = await axios
         .delete(`${BASE_URL}/posts/${req.params.id}`)
         .then(function (response) {
            console.log("Post Deleted");
          })
         .catch(err => 'error')
 
         
        return res.status(200).json({
             "status": 200,
             "message": 'Post Deleted!',
        });
     }

}

exports.UserController = UserController;