const UserController = require('./controllers/user.controller')
const userController = new UserController()

const router = [
    {
        url: "/users",
        method: "GET",
        controller: userController.get
    },
    {
        url: "/users/:id",
        method: "GET",
        controller: userController.getById
    },
    {
        url: "/users",
        method: "POST",
        controller: userController.post
    },
    {
        url: "/users/:id",
        method: "PUT",
        controller: userController.put
    }
]

module.exports = router



