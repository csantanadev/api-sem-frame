const UserController = require('./controllers/user.controller')

const router = [
    {
        url: "/users",
        method: "GET",
        controller: UserController.get
    },
    {
        url: "/users/:id",
        method: "GET",
        controller: UserController.getById
    },
    {
        url: "/users",
        method: "POST",
        controller: UserController.post
    },
    {
        url: "/users/:id",
        method: "PUT",
        controller: UserController.put
    },
    {
        url: "/users/:id",
        method: "DELETE",
        controller: UserController.delete
    }
]

module.exports = router



