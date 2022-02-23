
const axios = require('axios')

class UserController {

    async getUser (req, res) {
       let user = await axios
        .get('https://jsonplaceholder.typicode.com/users/1')
        .then(res => res.data)
        .catch(err => 'error')

        return res.status(200).json(user);
    }
}

exports.UserController = UserController;